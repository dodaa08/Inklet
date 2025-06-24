import axios from "axios";
import ChatRoom from "../../../components/Chatroom/ChatRoom";

type ChatRoomProps = {
    params: {
        slug: string;
    };
};
const Backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL
const getRoomId = async(slug : string)=>{
    try{
        const response = await axios.get(`${Backend_Url}/api/room/${slug}`);
        return response.data.id;        
    }
    catch(error){
        console.error(error);
        return;
    }
}

const ChatRoomS = async ({ params: { slug } }: ChatRoomProps) => {
    const roomId = await getRoomId(slug);
    if(!roomId){
        return <>
        <div>
            Room n0t found..
        </div>
        </>
    }

    return <ChatRoom id={roomId}/>

};

export default ChatRoomS;
