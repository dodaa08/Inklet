//  ws layer room management, broadcast messages, 

import {WebSocketServer} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@repo/backend-common/config";
import { Jwt } from "jsonwebtoken";

console.log("Config values:", config);

const PORT = Number(config.PORTWS);
const ws = new WebSocketServer({port : PORT});

const checkUser = async (token : string)=>{
    const decode = await jwt.verify(token, config.JWT_SECRET || "");

    if(typeof decode == "string"){
        return null; // ?
    }

    if(!decode || decode.userId){
        return null; 
    }

    return decode.userId; // or  true !
}

ws.on("connecton", async (ws, request)=>{
    const url = request.url;

    if(!url){
        return;
    }
    
    const queryParams = new URLSearchParams(url.split("")[1]); // search the second element of the array: the token;
    const token = queryParams.get("token")  || "";  // get the token from 

    const findUser = await checkUser(token);
    if(!findUser){
        ws.close();
    }
    
    ws.on("message", (data : any)=>{
        ws.send("pong..")
    });

})
