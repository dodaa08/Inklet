"use client";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Home(){

  const [room, Setroom] = useState();
  const router = useRouter(); 

  return(
    <>
      <div className="bg-black h-screen flex justify-center">
          <div className="flex flex-col py-10 gap-5">
               <input onChange={(e : any)=>{
                Setroom(e.target.value);
               }} type="text" className="border-2 border-gray-400 py-2 px-5 rounded-xl" placeholder="Enter Room:" />
               <div className="flex justify-center">
               
               <button onClick={()=>{
                router.push(`/rooms/${room}`)
               }} className="border-2 border-gray-500 py-2 px-5 w-max rounded-xl">Join Room</button>
                
               </div>
          </div>
      </div>
    </>
  )
}