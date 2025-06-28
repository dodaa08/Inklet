"use client";
import { useState } from "react";
import useSocket from "@/app/hooks/useSocket";
import { useEffect } from "react";

type ChatMessage = {
    id: number;
    message: string;
    userId: string;
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

    // Update chats when props change
    useEffect(() => {
        setAllChats(chats);
    }, [chats]);

    useEffect(()=>{
        if(socket && !loading && roomId){
            // Fix 3: Convert roomId to number for backend compatibility
            const numericRoomId = Number(roomId);
            socket.send(JSON.stringify({
                type : "join_room",
                roomId : numericRoomId
            }));
        }
    }, [socket, loading, roomId]);  

    // Fix 4 & 6: Add WebSocket message handling for real-time updates
    // useEffect(() => {
    //     if (socket && !loading) {
    //         socket.onmessage = (event) => {
    //             try {
    //                 const parsedData = JSON.parse(event.data);
    //                 if (parsedData.type === "chat") {
    //                     // Add new message to the chat list
    //                     const newMessage: ChatMessage = {
    //                         id: Date.now(), // Temporary ID
    //                         message: parsedData.message,
    //                         userId: parsedData.userId || "unknown",
    //                         roomId: Number(parsedData.roomId)
    //                     };
    //                     setAllChats(prev => [...prev, newMessage]);
    //                 }
    //             } catch (error) {
    //                 console.error("Error parsing WebSocket message:", error);
    //             }
    //         };

    //         socket.onerror = (error) => {
    //             console.error("WebSocket error:", error);
    //         };
    //     }
    // }, [socket, loading]);

    const sendMessage = async ()=>{
        if (!currentMessage.trim() || !socket || !roomId) return;
        
        // Fix 3: Convert roomId to number for backend compatibility
        const numericRoomId = Number(roomId);
        socket.send(JSON.stringify({
            type : "chat",
            roomId : numericRoomId,
            message : currentMessage
        }));
        
        // Clear the input after sending
        setCurrentmessage("");
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    return(
    <>
        <div className="flex justify-center py-20">
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                {/* Chat Messages Display */}
                <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
                    {allChats.length === 0 ? (
                        <div className="text-gray-500 text-center">No messages yet. Start the conversation!</div>
                    ) : (
                        allChats.map((chat, index) => (
                            <div className="mb-2 p-2 bg-white rounded shadow-sm" key={index}>
                                {/* Fix 5: Properly handle chat data structure */}
                                <div className="text-sm text-gray-600">User: {chat.userId}</div>
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
                        className="py-2 px-6 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600 disabled:bg-gray-400" 
                        onClick={sendMessage}
                        disabled={!currentMessage.trim() || !socket || loading}
                    >
                        Send
                    </button>
                </div>
                
                {/* Connection Status */}
                {loading && <div className="text-yellow-600 text-center">Connecting to chat...</div>}
                {!socket && !loading && <div className="text-red-600 text-center">Not connected to chat</div>}
            </div>
        </div>
    </>
    );
}