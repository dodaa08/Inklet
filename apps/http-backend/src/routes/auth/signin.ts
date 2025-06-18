import express, {Router} from "express";
const SIrouter : Router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";

const jwtsecret = process.env.JWTSecret || "";

SIrouter.get("/", (req, res)=>{
    res.send("Signin Endpoint..");
});

SIrouter.post("/", async (req : any, res : any)=>{
    const {email, password} = req.body();   

    try{
        const findUser = await prisma.user.findUnique({
            where: { email },
          });
          
          if (!findUser) {
            return res.status(404).json({ error: "User not found" });
          }
          
          // ✅ Now TS knows findUser is not null, so no `undefined`
          const isPasswordValid = await bcrypt.compare(password, findUser.password);
          
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          
          const token = jwt.sign(
            {
              email: findUser.email,
              userId: findUser.id,
            },
            jwtsecret,
            { expiresIn: "7d" }
          );
          
          return res.status(200).json({
            message: "User Signed In",
            email: findUser.email,
            token,
          });
          

    }
    catch(error){
        console.error(error);
        res.status(404).json({
            error : error
        })
    }
});


export default SIrouter;



