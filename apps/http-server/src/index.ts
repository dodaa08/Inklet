import express from "express";

const app = express();


app.get("/", (res, req)=>{
    console.log("working..");
    res.message("Woreking..");
})


app.listen(3000, ()=>{
    console.log("Listening on 3000..");
});
