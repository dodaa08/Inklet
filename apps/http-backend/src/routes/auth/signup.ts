import express, {Router} from "express";
const SUrouter : Router = express.Router();
import bcrypt from "bcryptjs";
const salt = 10;
import prisma from "@repo/db/prisma";
import {UserSchema} from "@repo/common/types"

// use zod for advance input validation : and then send over the data to the postgres..

SUrouter.get("/", (req, res)=>{
    res.send("SignUp Endpoint..");
});

SUrouter.post("/", async (req : any, res : any)=>{
    // use Zod object here : 
    const parseResult = UserSchema.safeParse(req.body);  // What's happening under the hood ? 
    if (!parseResult.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: parseResult.error.flatten(),
        });
      }
    const {email, password} = await parseResult.data;
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try{
        const response = await prisma.user.create({
           data : {
            email : email,
            password : hashedPassword
           }
        });

        console.log("User Created..", response);
        res.status(200).json({
            message : "User Created !",
            email : email
        });
    }
    catch(error){
        console.error(error);
        res.status(404).json({
            error : error
        });
    }
});


export default SUrouter;


