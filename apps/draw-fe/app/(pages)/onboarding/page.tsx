"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/app/components/onboarding/Header";
import { IoChatbubbleSharp } from "react-icons/io5";


export default function Onboarding(){
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [Startx, setStartx] = useState(0);
    const [Starty, setStarty] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [selectedShape, setSelectedShape] = useState<string>("");

    // why not have a global canvas 
    // also what is getBondingClient 
    // more...

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

                if(selectedShape === "rectangle"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.strokeRect(Startx, Starty, width, height);
                }
                if(selectedShape === "circle"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.arc(Startx, Starty, width, 0, 2 * Math.PI);
                    ctx.stroke();
                }   
                if(selectedShape === "triangle"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(Startx, Starty);
                    ctx.lineTo(Startx + width/2, Starty + height);  
                    ctx.lineTo(Startx + width, Starty);
                    ctx.closePath();
                    ctx.stroke();
                }
                if(selectedShape === "pencil"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(Startx, Starty);
                    ctx.lineTo(Startx + width, Starty + height);
                    ctx.stroke();
                }
                if(selectedShape === "eraser"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(Startx, Starty);
                    ctx.lineTo(Startx + width, Starty + height);
                    ctx.stroke();
                }
                if(selectedShape === "line"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(Startx, Starty);
                    ctx.lineTo(Startx + width, Starty + height);
                    ctx.stroke();
                }   
                if(selectedShape === "text"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(Startx, Starty);
                    ctx.lineTo(Startx + width, Starty + height);
                    ctx.stroke();
                }

                if(selectedShape === "arrow"){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(Startx, Starty);
                    ctx.lineTo(Startx + width, Starty + height);
                    ctx.stroke();   
                }
                if(selectedShape === "eraser"){
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.strokeStyle = "gray";
                  ctx.beginPath();
                  ctx.moveTo(Startx, Starty);
                  ctx.lineTo(Startx + width, Starty + height);
                  ctx.stroke();
                }


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

    }, [clicked, Startx, Starty, selectedShape]);

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
               <Header 
               icons_size={25}
               ClearCnavas={ClearCanvas}
               onSelectShape={setSelectedShape}
               />
            </div>
            <div className="flex justify-center items-center">
                <canvas 
                    width={500} 
                    height={500} 
                    ref={canvasRef}
                    className="transition duration-1000"
                />
            </div>

            <div className="bottom-0 right-0 absolute mt-10 mr-10 mb-10">
                <div className="bg-gray-900 rounded-full p-2">
                    <IoChatbubbleSharp size={40} className="cursor-pointer hover:text-gray-300 transition duration-200 text-orange-300"/>
                </div>
            </div>
        </div>
    )
}