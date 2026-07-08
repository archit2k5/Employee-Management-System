import path from "path";
import cors from "cors";
import express from "express";
 
const app = express()

//Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
    })
);
app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({ extended: "true", limit: "16kb" }));
app.use(express.static("./public"));

export default app;