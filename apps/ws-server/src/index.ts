import {WebSocketServer} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@repo/backend-common/config";

const PORT = Number(config.PORT);
const ws = new WebSocketServer({port : PORT});

ws.on("connecton", async (ws, request)=>{
    const url = request.url;

    if(!url){
        return;
    }
    
    const queryParams = new URLSearchParams(url.split("")[1]); // search the second element of the array: the token;
    const token = queryParams.get("token")  || "";  // get the token from 
    const decode = await jwt.verify(token, config.JWT_SECRET || "");

    if(!decode || !(decode as JwtPayload).id){
        ws.close();
        return;
    }

    ws.on("message", (data : any)=>{
        ws.send("pong..")
    });

})
