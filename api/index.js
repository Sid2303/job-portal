import express from "express"

const app = express()

console.log("Hello World")

app.get("/api/login",(req,res)=>{
    res.send("Hello")
})

app.listen(4000)