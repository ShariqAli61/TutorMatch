//this student.rout.js
import { Router } from "express";
const router = Router();
import Student from "../models/student.model.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;





// Student Registration
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingEmail = await Student.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already registered" });

    const existingUsername = await Student.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await hash(password, 10);
    const student = new Student({ ...req.body, password: hashedPassword });
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// New GET route to fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// Student Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      student: {
        id: student._id,
        // fullName: student.firstName + " " + student.lastName,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});


// Get Student Profile
router.get("/profile", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const student = await Student.findById(userId).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error("Failed to fetch student profile:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});


// here i write the code for studentdashboard profile

// GET /api/teachers/search?subject=math&location=karachi&rating=4
// router.get('/search', async (req, res) => {
//   const { subject, location, rating } = req.query;

//   const query = {
//     ...(subject && { subject }),
//     ...(location && { location }),
//     ...(rating && { rating: { $gte: Number(rating) } }),
//   };

//   try {
//     const teachers = await Teacher.find(query);
//     res.json(teachers);
//   } catch (err) {
//     res.status(500).json({ error: 'Search failed' });
//   }
// });


export default router;
