


import express from "express";
const app = express();
app.listen(8080)

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/hello', (req, res)=>{
    res.status(200).json("Hello from Server")
})

