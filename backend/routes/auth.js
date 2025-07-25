// //this is auth.js file
// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// // import User from "../src/backend/models/User.js";
// import User from "../models/User.js";

// const router = express.Router();

// // Signup Route
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,  // Save the hashed password
//     });

//     // Save user to the database
//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d", // Token expires in 1 hour
//     });

//     // Send success response with token
//     res.status(201).json({
//       message: "User created successfully!",
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error!" });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Send success response with token
//     res.status(200).json({
//       message: "Login successful!",
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error!" });
//   }
// });


// // New GET route to handle GET requests to /api/auth
// router.get("/", (req, res) => {
//   res.status(200).json({ message: "Auth API is up and running." });
// });

// export default router;
