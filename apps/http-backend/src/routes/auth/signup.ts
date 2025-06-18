import express, {Router} from "express";
const SUrouter : Router = express.Router();
import bcrypt from "bcryptjs";
const salt = 10;
import prisma from "../../lib/prisma";


SUrouter.get("/", (req, res)=>{
    res.send("SignUp Endpoint..");
});


SUrouter.post("/", async (req, res)=>{
    const {email, password} = req.body();
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


