import { useEffect, useState } from "react";

const useSocket = ()=>{
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
    const [error, seterror] = useState("");
    
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

    useEffect(()=>{
        if(wsUrl){
            const ws = new WebSocket(wsUrl);
            ws.onopen = ()=>{
                setLoading(false);
                setSocket(ws);
            }
        }
        else{
            setLoading(false);
            seterror("Socket not found..")
        }

    }, []);

    return {
        socket,
        loading,
        error
    }
}

export default useSocket;
