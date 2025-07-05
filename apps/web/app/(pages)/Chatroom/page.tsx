"use client";
import React, { useState, useEffect } from "react";
import useSocket from "@/app/hooks/useSocket";

type ChatMessage = {
    id? : number;
    message: string;
    userId? : string;
    roomId: number;
    createdAt?: string;
}

type Chatroom = {
    roomId : any,
    chats : ChatMessage[]
}

export default function({roomId, chats} : Chatroom) {
    const [currentMessage, setCurrentmessage] = useState("");
    const [allChats, setAllChats] = useState<ChatMessage[]>(chats);
    const {loading, socket} = useSocket();

    useEffect(()=>{
        if(socket && !loading && roomId){
            socket.onmessage = (event)=>{
                try{
                    const parsedData = JSON.parse(event.data);
                    if(parsedData.type == "chat"){
                        const newMessage : ChatMessage = {
                            roomId : Number(parsedData.roomId),
                            message : parsedData.message 
                        }
                        setAllChats((prev)=>[...prev, newMessage]);
                    }
                }
                catch(error){
                    console.error("Error parsing WebSocket message:", error);
                }
            }

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        }
    },[socket, loading, roomId]);

    useEffect(()=>{
        const numericID = Number(roomId);
        if(socket && !loading && roomId){
             socket.send(JSON.stringify({
                type : "join_room",
                roomId : numericID
             }))
        }
    }, [socket, loading, roomId]);

    const sendMessage = async ()=>{
        if (!currentMessage.trim() || !socket || !roomId) return;
        
        const numericRoomId = Number(roomId);
        socket.send(JSON.stringify({
            type : "chat",
            roomId : numericRoomId,
            message : currentMessage
        }));
        
        setCurrentmessage("");
    }

    useEffect(()=>{
        setAllChats(chats)
    },[chats]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        e.key === "Enter" ? sendMessage() : null;
    }

    return(
    <>
        <div className="flex justify-center py-20">
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                {/* Chat Messages Display with ternary */}
                <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
                    {allChats.length === 0 ? (
                        <div className="text-gray-500 text-center">No messages yet. Start the conversation!</div>
                    ) : (
                        allChats.map((chat, index) => (
                            <div className="mb-2 p-2 bg-white rounded shadow-sm" key={index}>
                                <div className="text-gray-800">{chat.message}</div>
                            </div>
                        ))
                    )}
                </div>
                
                {/* Message Input */}
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1 py-2 px-4 rounded-xl border-2 border-gray-500 focus:border-blue-500 focus:outline-none" 
                        value={currentMessage}
                        onChange={(e) => setCurrentmessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className={`py-2 px-6 rounded-xl cursor-pointer ${
                            !currentMessage.trim() || !socket || loading 
                                ? "bg-gray-400 text-gray-600" 
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={sendMessage}
                        disabled={!currentMessage.trim() || !socket || loading}
                    >
                        Send
                    </button>
                </div>
                
                {/* Connection Status with ternary operators */}
                {loading ? (
                    <div className="text-yellow-600 text-center">Connecting to chat...</div>
                ) : !socket ? (
                    <div className="text-red-600 text-center">Not connected to chat</div>
                ) : (
                    <div className="text-green-600 text-center">Connected ✓</div>
                )}
            </div>
        </div>
    </>
    );
}