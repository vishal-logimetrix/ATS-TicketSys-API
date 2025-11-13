
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import UserRoute from "./src/auth/user.route.js";

import mongoose from "mongoose";
import TicketRouter from "./src/ticket/ticket.route.js";
import DeviceRouter from "./src/devices/device.route.js";
mongoose.connect(process.env.DB_URL)
.then(()=>console.log('connected'))
.catch(()=>console.log('error'));

const app = express();
const PORT =  process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("public"));

// Simple route
app.get('/hello', (req, res) => {
    console.log("port is", process.env.PORT + "db url is - ", process.env.DB_URL)
    res.status(200).json({message:"Hello from Server", port: PORT});
});

//routes
app.use("/user", UserRoute);
app.use("/ticket", TicketRouter);
app.use('/device', DeviceRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
