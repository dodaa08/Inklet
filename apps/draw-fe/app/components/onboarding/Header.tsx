"use client";

import { useState } from "react";
import { IoTriangleOutline } from "react-icons/io5";
import { FC } from "react";
import { TbRectangle } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { CiText } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { LuEraser } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import React from "react";


interface HeaderT{
    icons_size : number,
    draw? : ()=>void,
    ClearCnavas : ()=>void,
    onSelectShape : (shape: string) => void
}

const Header : FC<HeaderT> = ({icons_size, ClearCnavas, onSelectShape})=>{
    

    const shapeButtons = [
        { name: "rectangle", icon: <TbRectangle /> },
        { name: "triangle", icon: <IoTriangleOutline /> },
        { name: "circle", icon: <FaRegCircle /> },
        { name: "arrow", icon: <FaArrowRightLong /> },
        { name: "text", icon: <CiText /> },
        { name: "line", icon: <MdOutlineHorizontalRule /> },
        { name: "pencil", icon: <LuPencil /> },
        { name: "eraser", icon: <LuEraser /> },
      ];
      
    return(
        <>
        <div className="flex justify-center">
            <div className="flex gap-7 border-2 border-gray-900 rounded-xl py-4 px-10 text-gray-300">
                <button className="cursor-pointer ">
                    <CiLock size={icons_size} className="hover:text-gray-400 transiiton duration-400" />
                </button>

                {shapeButtons.map(({ name, icon }) => (
    <button
      key={name}
      className="cursor-pointer"
      onClick={() => {
        onSelectShape(name);
      }}
    >
      {React.cloneElement(icon, { size: icons_size, className: "hover:text-gray-400 transiiton duration-400" })}
    </button>
  ))}     
            </div>

            <div className="flex justify-center items-center ml-20 gap-7">
                <MdOutlineLightMode size={icons_size}  className="cursor-pointer hover:text-gray-300 transition duration-200"/>

                <button onClick={ClearCnavas} className="bg-red-500 py-2 px-5 rounded-xl text-white font-bold font-mono hover:bg-red-400 transition duration-400 cursor-pointer">
                    Reset
                </button>
            </div>
        </div>
        </>
    )
}

export default Header;