"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function(){
    const [slug, setSlug] = useState("");
    const router = useRouter();

    const navigate = ()=>{
        if(slug == "" || !slug){
            alert("Provide the room name !");
            return;
        }
        router.push(`/rooms/${slug}`);
    }

    return(
        <>
        <div className="flex justify-center py-20">
            <div className="flex flex-col gap-5">
             <input onChange={(e)=>setSlug(e.target.value)} type="text" placeholder="Enter Room name:" className="py-2 px-10 rounded-xl border-2 border-gray-800 overflow:focus-none"/>
             <div className="flex justify-center">
             <button onClick={navigate} className="py-2 px-5 rounded-xl cursor-pointer">Join Room</button>
             </div>
            </div>
        </div>
        </>
    )
}