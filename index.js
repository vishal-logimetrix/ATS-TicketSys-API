import express from "express";
import cors from "cors";

const app = express();
const PORT =  8080;

// Middleware
app.use(cors()); // allow all domains
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Simple route
app.get('/hello', (req, res) => {
    res.status(200).json("Hello from Server");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
