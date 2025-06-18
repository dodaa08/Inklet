import express, {Router, NextFunction, Response, Request} from "express";
const router : Router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.jwtSecret || "";


export const middleware = async (req : any, res : any, next: NextFunction)=>{

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try{
        const token = authHeader.split(' ')[1]; // ?

        const decode = await jwt.verify(token, jwtSecret);
        req.user = decode;  // ?
        next();
    }
    catch(error){
        console.error(error);
        res.status(404).json({
            error : error
        });
    }
};



export default router;