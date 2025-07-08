"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@repo/ui/button";

export default function Onboarding(){
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [Startx, setStartx] = useState(0);
    const [Starty, setStarty] = useState(0);
    const [clicked, setClicked] = useState(false);

    // why not have a global canvas 
    // also what is getBondingClient 
    // more ... 


    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        const handleMouseup = (e : MouseEvent) => {
            setClicked(false)
        }
        const handleMouseDown = (e : MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            setClicked(true);
            setStartx(e.clientX - rect.left);
            setStarty(e.clientY - rect.top);
        }

        const handleMouseMove = (e : MouseEvent) => {
            if(clicked){
                const rect = canvas.getBoundingClientRect();
                const currentX = e.clientX - rect.left;
                const currentY = e.clientY - rect.top;
                const width = currentX - Startx;
                const height = currentY - Starty;
        
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "white";
                ctx.strokeRect(Startx, Starty, width, height);
            }
        }

        canvas.addEventListener("mouseup", handleMouseup);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseup);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };

    }, [clicked, Startx, Starty]);

    const ClearCanvas = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return(
        <div className="h-screen bg-black text-white">
            <div className="flex justify-center py-5">
                <Button onClick={ClearCanvas} className="bg-red-500 py-2 px-5 rounded-xl text-white font-bold font-mono hover:bg-red-400 transition duration-400 cursor-pointer">
                    Reset
                </Button>
            </div>
            <div className="flex justify-center items-center text-white">
                <canvas 
                    width={500} 
                    height={500} 
                    ref={canvasRef}
                />
            </div>
        </div>
    )
}