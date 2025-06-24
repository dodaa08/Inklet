"use client";

import useSocket from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";

export default function({
    messages,
    id
} : {
    messages : {message : string}[],
    id : string
}){
    const [chats, setChats] = useState(messages);
    const {loading, socket} = useSocket();
    if(!socket){
        return null;
    }
    const [message, setmessage] = useState<any>();

    useEffect(()=>{
        if(socket && !loading){
            socket.send(JSON.stringify({
                type : "join_room",
                roomId : id
            }))
        }
    }, [socket, id])

    useEffect(()=>{
        if(socket && !loading){

            socket.onmessage = (event)=>{
                const parsedData = JSON.parse(event.data);
                if( parsedData.type === "chat" ){
                    setChats((c)=>[...c, parsedData.message]);                  
                }
            }
        }
    },[loading, socket])

    return(
        <>
        <div className="">
            <div>
                {
                    chats.map((c : any, index)=> <div key={index} >{c.messages}</div> )
                }
            </div>

             <div className="flex flex-col gap-5 justify-center">
                 <input onChange={(e)=>{
                    setmessage(e.target.value)
                 }} type="text" placeholder="Chat: " className="text-2xl border-2" />

                 <button className="" onClick={()=>
                    socket.send(JSON.stringify({
                        type : "chat",
                        roomId : id,
                        messages : message
                    }))
                 }>Send</button>
             </div>
        </div>
        </>
    )
}