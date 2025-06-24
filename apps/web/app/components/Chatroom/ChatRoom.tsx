import axios from "axios";
import ChatRoomClient from "./ChatRoomClient";

const Backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL;


const getChats = async (roomId: string) => {
  try {
    const chats = await axios.get(`http://localhost:3001/api/chats/1`);
    return chats.data.message;
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return [];
  }
};

export default async function ChatRoom({ id }: { id: string }) {
  const chats = await getChats(id);

  return chats; 
}
