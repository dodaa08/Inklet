import express, {Router} from "express";
const router : Router = express.Router();

import { middleware } from "../middleware/authmiddleware";


router.get("/", middleware, (req, res)=>{
    res.send(".");
});


router.post("/", middleware, async (req, res)=>{
    try{
        
    }
    catch(error){
        
    }
});


export default router;


