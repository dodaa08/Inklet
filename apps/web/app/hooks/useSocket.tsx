import { useState, useEffect } from "react";

const useSocket = ()=>{
    const WS_URL = "ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwOWIyYWRlLTU4MzgtNGQ1Ni1iYTJkLTBhNTllMDQwMzljNSIsImlhdCI6MTc1MDcwMzY1N30.l4-Sbtrk2wYUnolOT_1S5IfVvAxzdqT8qgSSXWSx_1Y";
    const [loading, setloading] = useState(false);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        setloading(false);
        setSocket(ws);
    }, []);

    return{
        socket,
        loading
    }
}

export default useSocket;