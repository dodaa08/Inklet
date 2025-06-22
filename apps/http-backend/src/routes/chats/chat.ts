import express from "express";
import prisma from "@repo/db/prisma";

const chatRouter = express.Router();

chatRouter.get("/chats", async (req : any, res : any)=>{
    
    try{
        const response = await prisma.chat.findMany();

        return res.status().json({
            chats : response
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            error : error
        })
    }
})