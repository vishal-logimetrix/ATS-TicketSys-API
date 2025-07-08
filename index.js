
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import UserRoute from "./src/auth/user.route.js";

const app = express();
const PORT =  process.env.PORT || 8081;

// Middleware
app.use(cors()); // allow all domains
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Simple route
app.get('/hello', (req, res) => {
    res.status(200).json({message:"Hello from Server", port: PORT});
});

//routes
app.use("/user", UserRoute)

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
