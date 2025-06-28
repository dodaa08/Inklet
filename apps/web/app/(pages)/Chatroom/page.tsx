"use client";
import { useState } from "react";
import useSocket from "@/app/hooks/useSocket";
import { useEffect } from "react";

type Chatroom = {
    roomId : string,
    chats : string[]
}

export default function({roomId, chats} : Chatroom) {
    const [currentMessage, setCurrentmessage] = useState("");
    const {loading, error, socket} = useSocket();

    useEffect(()=>{
        if(socket){
            socket.send(JSON.stringify({
                type : "join_room",
                roomId : roomId
            }));
        }

    },[]);

    const sendMessage = async ()=>{
        socket?.send(JSON.stringify({
            type : "chat",
            roomId : roomId,
            message : currentMessage
        }));
    }

    return(
    <>
        {
            error && <>
               <div>
                {error}
               </div>
            </>
        }

        {
            loading && <>
              <div>
                Loading..
              </div>
            </>
        }
        <>
         <div className="flex justify-center py-20">
            <div>
                {
                    chats.map((texts, index)=>(
                        <div className="" key={index}>
                            {texts}
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-5 flex-col">
                <input type="text" placeholder="write.." className="py-2 px-10 rounded-xl border-2 border-gray-500" onChange={(e)=>setCurrentmessage(e.target.value)} />

                <div className="flex justify-center">
                <button className="py-2 px-5 rounded-xl cursor-pointer" onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
        </>
    </>
    );
    
}