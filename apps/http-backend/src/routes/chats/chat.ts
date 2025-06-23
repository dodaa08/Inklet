import express from "express";
import prisma from "@repo/db/prisma";
import { Router } from "express";

const chatRouter : Router = express.Router();

chatRouter.get("/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    try {
      const findChats = await prisma.chat.findMany({
        where: {
          roomId: roomId
        },
        orderBy: [{ id: "desc" }],
        take: 50
      });
  
      return res.status(200).json({ messages: findChats });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });
  

export default chatRouter;