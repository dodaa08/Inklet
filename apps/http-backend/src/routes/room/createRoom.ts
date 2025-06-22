import express, { Router } from "express";
import {room} from "@repo/common/types";
import prisma from "@repo/db/prisma"
import jwt from "jsonwebtoken";

const roomRouter : Router = express.Router();


roomRouter.post("/create", async (req : any, res : any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  let userId: string;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    userId = payload.id; // ✅ AUTOMATED adminId here
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  const RoomData = room.safeParse(req.body);
  if (!RoomData.success) {
    return res.status(400).json({ error: RoomData.error.format() });
  }

  const { name } = RoomData.data;

  try {
    const response = await prisma.room.create({
      data: {
        name,
        adminId: userId // ✅ AUTOMATED here
      }
    });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default roomRouter;