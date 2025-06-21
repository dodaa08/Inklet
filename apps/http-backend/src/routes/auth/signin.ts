import express, {Router} from "express";
const SIrouter : Router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import prisma from "../../lib/prisma";
import prisma from "@repo/db/prisma";
import config from "@repo/backend-common/config";
import { UserSchema } from "@repo/common/types";

SIrouter.get("/", (req, res)=>{
    res.send("Signin Endpoint..");
});

SIrouter.post("/", async (req : any, res : any)=>{
    const Userdata = UserSchema.safeParse(req.body);
    if (!Userdata.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: Userdata.error.flatten(),
      });
    }
    const {email, password} = Userdata.data;

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
            config.JWT_SECRET ||"",
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



