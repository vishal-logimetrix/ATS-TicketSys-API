
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

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

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
