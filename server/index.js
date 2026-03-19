import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import userRoutes from "./src/routes/user.routes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes Declaration
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
});
