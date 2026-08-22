const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "KindLink API is running successfully"
    });
});

// Server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`KindLink server running on port ${PORT}`);
});