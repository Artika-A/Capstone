const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const dashboardRoutes = require("./routes/dashboard");

const verifyToken = require("./middleware/auth");

mongoose.connect("mongodb+srv://artikaafaisal:1234@cluster0.msk6eml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        const app = express();
        app.use(cors({
            origin: 'http://localhost:5173', 
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true, 
        }));
        app.use(express.json());

        app.use("/auth", authRoutes);
        app.use("/tasks", taskRoutes);
        app.use("/dashboard", verifyToken, dashboardRoutes);

        app.listen(3000, () => console.log("Task Manager API running on port 3000"));
});