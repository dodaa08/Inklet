// things to work on : Queing for real time chats..,  good state management using redux singleton or something, auth support..

import {WebSocketServer} from "ws";
import jwt from "jsonwebtoken";
import config from "@repo/backend-common/config";
import WebSocket from "ws";
import prisma from "@repo/db/prisma"

interface User {
    ws : WebSocket,
    rooms : string[],
    userId : string
}

const users : User[] = []  // A global variable to manage states... 

console.log("Config values:", config);


const PORT = Number(config.PORTWS);
const ws = new WebSocketServer({port : PORT});

const JWT_SECRET = config.JWT_SECRET;


const checkUser = async (token : string)=>{
    try{
        if(!JWT_SECRET) return null;

        const decode = jwt.verify(token, JWT_SECRET);
        
        if(typeof decode == "string") return null;
        if(!decode || !decode.id) return null;
        
        return decode.id;
    }
    catch(error){
        console.error(error);
        return null;
    }
}

ws.on("connection", async (ws, request) => {
    const url : any = request.url;

    try {
        const queryParams = new URLSearchParams(url.split("?")[1] || "");
        const token = queryParams.get("token") || "";
        const userId = await checkUser(token);
        
        if (!userId) {
            ws.send("Unauthorized");
            ws.close();
            return;
        }

        users.push({ userId, rooms: [], ws });

        ws.on("message", async (data) => {
            
            let parsedData;
            try {
                parsedData = JSON.parse(data.toString());
            } catch {
                ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
                return;
            }

            if (parsedData.type === "join_room") {
                const user = users.find(u => u.ws === ws);
                user?.rooms.push(parsedData.roomId);
            }
            else if (parsedData.type == "leave_room"){
                const user = users.find(u => u.ws === ws);
                if(!user){
                    return;
                }
                user.rooms = user?.rooms.filter(x => x !== parsedData.room);
                
            }
            else if (parsedData.type == "chat"){
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                await prisma.chat.create({
                    data : {
                        roomId,
                        message,
                        userId
                    }
                })

                users.forEach(user=>{
                    if(user.rooms.includes(roomId)){
                        user.ws.send(JSON.stringify({
                            message : message,
                            roomId,
                            type : "chat"
                        }));
                    }
                })
            }
        
        });

        ws.on("close", () => {
            const idx = users.findIndex(u => u.ws === ws);
            if (idx !== -1) users.splice(idx, 1);
        });
    } catch (error) {
        console.error("Connection error:", error);
    }
});
