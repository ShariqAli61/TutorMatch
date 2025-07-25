//this is profile.js
import { Router } from 'express';
const router = Router();
import Student from '../models/student.model.js';
// import Teacher from '../models/Teacher';
// import { single } from '../middleware/uploads.js';
import { compare, genSalt, hash } from 'bcryptjs';
import path from 'path';
import authMiddleware from '../middleware/auth.js'; // uncomment this line to protect all routes in this file
import multer from "multer";

router.use(authMiddleware); // uncomment this line to protect all routes in this file studentdashboard will work but teacherdashboard will not work because authMiddleware is not implemented for teacher model


// Dynamic model selector
const getModel = (userType) => {
  if (userType === 'student') return Student;
  if (userType === 'teacher') return Teacher;
  throw new Error('Invalid user type');
};

// const getModel = (userType) => {
//   if (userType === 'student') return Student;
//   if (userType === 'teacher') throw new Error('Teacher model not implemented');
//   throw new Error('Invalid user type');
// };


// Get profile
// router.get('/:userType/profile', async (req, res) => {
  router.get('/profile/:userType',  async (req, res) => {

  try {
    console.log("➡️ Hitting profile route");
    console.log("User Type:", req.params.userType);
    console.log("Decoded Token User ID:", req.user.id);


    const Model = getModel(req.params.userType);
    const userId = req.user.id; // Use auth middleware or dummy ID for testing
    const user = await Model.findById(userId).lean();
    console.log("👤 Retrieved user from DB:", user);

    if (!user){
      console.log("❌ No user found with ID:", req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("✅ Sending user data:", user);
    res.json(user);
  } catch (err) {
    console.error("🔥 Error fetching profile:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Configure file upload for profilePicture
import fs from 'fs';
// import path from 'path';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Update Student Profile
router.put("/profile",  upload.single("profilePicture"), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updateFields = {
      name: req.body.name,
      phone: req.body.phone,
      username: req.body.username,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      Grade: req.body.Grade,
    };

    if (req.file) {
      updateFields.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select("-password");

    res.json(updatedStudent);
  } catch (err) {
    console.error("Failed to update student profile:", err);
        // Clean up uploaded file if error occurred
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).json({ message: "Failed to update profile", error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  }
});

router.put("/profile/change-password", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await hash(newPassword, 10);
    student.password = hashedNewPassword;
    await student.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Failed to change password:", err);
    res.status(500).json({ message: "Failed to change password" });
  }
});


export default router;
