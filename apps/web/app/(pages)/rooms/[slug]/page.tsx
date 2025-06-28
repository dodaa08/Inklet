"use client";

import Chatroom from "../../Chatroom/page";

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import axios from "axios";

export default function(){

    const params = useParams();
    const id = params.slug;
    
    const [roomId, setRoomid] = useState("");
    const [chats, setChats] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(""); 
   


    const backendUrl = process.env.NEXT_PUBLIC_BE_URL;

    const findroomId = async ()=>{
        try{
            const response = await fetch(`${backendUrl}/api/room/${id}`, {
                method : "GET",
            });
            
            const result = await response.json();
            setRoomid(result.id);        
            setloading(false)
           
        }
        catch(error : any){
          console.error(error);
          setError(error.message || "Failed to fetch room")
          setloading(false)
          return;
        }
    }

    useEffect(()=>{
        if(id && backendUrl){
            findroomId();
        } else {
            setloading(false)
            setError("Invalid room ID or backend URL missing");
        }
    }, [id, backendUrl]);


    const findChats = async ()=>{
        try{
            const chats : any = await axios.get(`${backendUrl}/api/chats/${roomId}`);
            setChats(chats.data.messages);
            
        }
        catch(error){
            console.error(error);
            return;
        }
    }

    useEffect(()=>{
        if(!loading && !error && roomId){
            findChats();
        }
    }, [roomId, loading, error]);

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

       <div>
        <Chatroom  roomId={roomId} chats={chats}/>
       </div>
        </>
    )
}