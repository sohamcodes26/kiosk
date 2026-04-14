import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import userRoutes from "./src/routes/user.routes.js";
import reportRoutes from "./src/routes/report.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import testRoutes from "./src/routes/test.routes.js";

import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


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
app.use("/api/report", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
});
