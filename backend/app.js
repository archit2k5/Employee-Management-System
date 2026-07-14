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

//import routes
import healthRoute from "./src/routes/healthcheck.route.js";
import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import hrRoutes from "./src/routes/hr.routes.js";
import { errorHandler, notFound } from "./src/middleware/error.middleware.js";

app.use("/api/healthCheck", healthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/hr", hrRoutes);

// Must be LAST — catches unmatched routes and any thrown ApiError
app.use(notFound);
app.use(errorHandler);

export default app;
