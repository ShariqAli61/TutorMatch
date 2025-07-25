// this is server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file



import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const __dirname = dirname(fileURLToPath(import.meta.url)); // if using ES modules

// Import your routes
// import authRoutes from "./routes/auth.js";         // Handles /api/auth routes
import studentRoutes from "./routes/student.rout.js";   // Handles /api/students routes
import loginRoute from "./routes/login.rout.js";
import dashboardRoutes from "./routes/dashboard.js"
// import teacherProfileRoutes from './routes/teacherdashboard/teacherProfileRoutes.js';
import teacherRoutes from "./routes/teacherdashboard/teacherRoutes.js"; // Handles /api/teachers routes

import profileRoutes from "./routes/profile.js"; // Handles /api/profile routes

import teacherDashboardRoutes from './routes/teacherdashboard/teacherdashboard.js';

import Session from "./models/Session.js";
import TeacherChangeRequest from "./models/TeacherChangeRequest.js";
// const messageRoutes = require('./routes/messageRoutes');
import messageRoutes from './routes/studentdashboard/messageRoutes.js'; //message routes for student dashboard
import requestRoutes from './routes/teacherdashboard/requestRoute.js';
import teacherRout from './routes/studentdashboard/teacherRout.js'; // teacher routes for student dashboard

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies/tokens if needed
})); // Allows frontend (e.g., on different port) to access backend
app.use(express.json()); // Parses incoming JSON requests
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serves static files from the uploads directory
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
// app.use("/api/auth", authRoutes);         // e.g., /api/auth/signup
app.use("/api/students", studentRoutes);  // e.g., /api/students/register
app.use("/api/login", loginRoute); 
app.use("/api", dashboardRoutes);
app.use('/api', profileRoutes);
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 app.use('/api/teacher', requestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/teachers', teacherRout);
app.use('/api/teacher', teacherDashboardRoutes);
// app.use('/api/teacher/profile', teacherProfileRoutes);
app.use("/api/teachers", teacherRoutes);
app.use('/api', teacherRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to TutorMatch API");
});


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tutormatch", {
  // useNewUrlParser: true,    //this is showing warinig
  // useUnifiedTopology: true  //remover these both lines latter
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });




  // Get all sessions
app.get("/api/sessions", async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// Add new session
app.post("/api/sessions", async (req, res) => {
  const { date, time, teacherEmail, studentId } = req.body;
  try {
    const newSession = new Session({ date, time, teacherEmail, studentId });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ error: "Failed to save session" });
  }
});

// Teacher change request
app.post("/api/teacher-change", async (req, res) => {
  const { teacherEmail } = req.body;
  try {
    const request = new TeacherChangeRequest({ teacherEmail });
    await request.save();
    res.status(201).json({ message: "Request submitted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit request" });
  }
});
