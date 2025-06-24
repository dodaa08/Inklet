import express, { Router, Response } from "express";
import prisma from "@repo/db/prisma"
import { middleware, AuthRequest } from "../middleware/authmiddleware.js";

const roomRouter : Router = express.Router();

roomRouter.post("/", middleware, async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const userId = req.id;
  
  if(!userId){
    res.status(401).json({ error : "UserID not found..." });
    return;
  }

  console.log("USer Id while creating a room :", userId);

  try {
    const findRoom = await prisma.room.findUnique({
      where : {
        name : name
      }
    });
    if(findRoom){
      res.status(200).json({
        message : "Room Already Exists !, choose some other name"
      });
      return;
    }
    else{

      const response = await prisma.room.create({
        data: {
          name,
          adminId: userId
        }
      });
      
      res.status(201).json({ room : response.id });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


roomRouter.get("/:slug", async (req : any, res : any)=>{
  
  const slug = await (req.params.slug);

  try{
        const findSlug = await prisma.room.findUnique({
             where : {
                name : slug
             }
        });

        if(!findSlug){
           res.send("Room not found..");
           return null;
          }

        res.status(200).json({
          message : findSlug
        });
    
    }
    catch(error){
      console.error(error);
      res.send(error);
    }
})

export default roomRouter;

