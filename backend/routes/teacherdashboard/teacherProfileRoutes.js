//this is teacherProfileRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import authMiddleware from '../../middleware/auth.js';

const router = express.Router();

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  bio: String,
  username: { type: String, unique: true },
  password: String,
  levels: [String],
  educationlevels: String,
  timeZone: String,
  availability: [String],
  subjects: [String],
//   instruments: [String],
  studentStatus: String,
  profilePicture: String,
  createdAt: { type: Date, default: Date.now }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get teacher profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select('-password');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update teacher profile
router.put('/', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    const updateData = req.body;
    
    // Handle array fields
    const arrayFields = ['levels', 'availability', 'subjects', ];
    arrayFields.forEach(field => {
      if (updateData[field]) {
        try {
          updateData[field] = JSON.parse(updateData[field]);
        } catch (e) {
          // If parsing fails, keep original value
          delete updateData[field];
        }
      }
    });

    // Handle profile picture
    if (req.file) {
      updateData.profilePicture = req.file.filename;
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select('-password');

    res.json(updatedTeacher);
  } catch (error) {
    // Clean up uploaded file if error occurred
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

export default router;