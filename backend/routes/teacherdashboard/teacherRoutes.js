// // this is teacherRoutes.js file
// import express from 'express';
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import authMiddleware from '../../middleware/auth.js';
// import multer from 'multer';
// import path from 'path';

// const router = express.Router();

// // Define the Teacher schema and model
// const teacherSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true, required: true },
//   phone: String,
//   address: String,
//   city: String,
//   state: String,
//   cnic: String, 
//   zip: String,
//   bio: String,
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   levels: [String],
//   educationlevels: String, // This field expects a String
//   timeZone: String,
//   availability: [String],
//   subjects: [String],
//   studentStatus: String,
//   profilePicture: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!', 400), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter: fileFilter
// });

// // --- PUBLIC ROUTES ---

// router.post('/register', upload.single('profilePicture'), async (req, res) => {
//   console.log("📩 Registration Request:", req.body);
//   if (req.file) {
//     console.log("🖼️ Profile Picture File:", req.file);
//   }

//   try {
//     const {
//       firstName, lastName, email, phone, cnic, address, city, state, zip,
//       bio, username, password, levels, educationlevels, timeZone,
//       availability, subjects, studentStatus
//     } = req.body;

//     const existingTeacher = await Teacher.findOne({ $or: [{ email }, { username }] });
//     if (existingTeacher) {
//       return res.status(400).json({ message: 'Email or username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newTeacher = new Teacher({
//       firstName, lastName, email, phone, cnic, address, city, state, zip,
//       bio, username, password: hashedPassword,
//       levels: Array.isArray(levels) ? levels : (levels ? levels.split(',') : []),
//       educationlevels,
//       timeZone,
//       availability: Array.isArray(availability) ? availability : (availability ? availability.split(',') : []),
//       subjects: Array.isArray(subjects) ? subjects : (subjects ? subjects.split(',') : []),
//       studentStatus,
//       profilePicture: req.file ? req.file.filename : '', // ✅ Save the filename if uploaded
//     });

//     await newTeacher.save();

//     res.status(201).json({
//       message: 'Teacher registered successfully',
//       teacher: { id: newTeacher._id, firstName: newTeacher.firstName, email: newTeacher.email },
//     });
//   } catch (error) {
//     console.error('❌ Registration error:', error);
//     res.status(500).json({ message: 'Registration failed', error: error.message });
//   }
// });


// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log("🔑 Login Attempt:", email);
//   try {
//     const teacher = await Teacher.findOne({ email });
//     if (!teacher) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const isMatch = await bcrypt.compare(password, teacher.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const token = jwt.sign(
//       { id: teacher._id, email: teacher.email, role: 'teacher' },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );
//     res.json({
//       token,
//       teacher: { id: teacher._id, name: `${teacher.firstName} ${teacher.lastName}`, email: teacher.email },
//     });
//   } catch (err) {
//     console.error("❌ Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Search teachers by subject and location from student dashboard/home side
// router.get('/search',  async (req, res) => {
//   try {
//     const { subject, location } = req.query;

//     const query = {};
//     if (subject) {
//       query.subjects = { $elemMatch: { $regex: new RegExp(subject, 'i') } };
//     }
//     if (location) {
//       query.city = { $regex: new RegExp(location, 'i') };
//     }

//     const teachers = await Teacher.find(query);
//     res.json(teachers);
//   } catch (error) {
//     console.error('Error fetching teacher data:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });




// // --- PROTECTED ROUTES ---

// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.user.id).select('-password');
//     if (!teacher) {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }
//     res.json(teacher);
//   } catch (error) {
//     console.error("❌ Profile fetch error:", error);
//     res.status(500).json({ message: 'Server error while fetching profile' });
//   }
// });

// // ✅ Update Teacher Profile - PROTECTED (CORRECTED LOGIC)
// router.put('/profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
//   console.log("🔄 Profile Update Request Body:", req.body); // Check this log carefully!
//   if (req.file) {
//     console.log("🖼️ Profile Update Request File:", req.file);
//   }

//   try {
//     const teacherId = req.user.id;
//     const updates = { ...req.body }; // Shallow copy

//     // Ensure array fields are correctly handled if they arrive as single strings
//     // (though frontend FormData with `fieldName[]` should make them arrays)
//     ['levels', 'availability', 'subjects'].forEach(field => {
//         if (updates[field] && !Array.isArray(updates[field])) {
//             // If it's a single string that should be an array (e.g. from a non-[] form field)
//             // This might not be necessary if frontend always sends fieldName[] for these.
//             console.warn(`[SERVER WARNING] Field '${field}' received as string, converting to array: ${updates[field]}`);
//             updates[field] = [updates[field]];
//         }
//     });
    
//     //
//     // ▼▼▼ THIS IS THE CRUCIAL FIX for 'educationlevels' ▼▼▼
//     //
//     // The error message indicates 'educationlevels' is arriving as an array.
//     // Mongoose schema expects 'educationlevels' to be a String.
//     // This block ensures it is converted to a string before saving.
//     if (updates.hasOwnProperty('educationlevels')) {
//         if (Array.isArray(updates.educationlevels)) {
//             // This is the scenario your error log pointed to.
//             console.warn(`[SERVER WARNING] 'educationlevels' was received as an array: ${JSON.stringify(updates.educationlevels)}. Converting to string using the first element.`);
//             // Use the first element of the array, or an empty string if the array is empty.
//             updates.educationlevels = updates.educationlevels.length > 0 ? String(updates.educationlevels[0]) : '';
//         } else if (updates.educationlevels !== null && updates.educationlevels !== undefined) {
//             // If it's not an array but some other type (e.g. number), explicitly cast to String.
//             updates.educationlevels = String(updates.educationlevels);
//         }
//         // If updates.educationlevels was initially null or undefined, it remains so,
//         // and $set will handle it appropriately (either ignore or set to null).
//     }
//     //
//     // ▲▲▲ END OF CRUCIAL FIX ▲▲▲
//     //

//     // Handle the profile picture file if a new one was uploaded
//     if (req.file) {
//       updates.profilePicture = req.file.filename;
//     } else {
//         // If no new file is uploaded, and 'profilePicture' is in updates (e.g. from hidden input or old value)
//         // We need to decide if we want to unset it or keep the old value.
//         // If `updates.profilePicture` contains the old filename string, $set will just re-set it.
//         // If `updates.profilePicture` is an empty string and you want to remove the picture,
//         // you might need to explicitly set `updates.profilePicture = null` or `undefined`
//         // or use `$unset: { profilePicture: "" }` in the update operation.
//         // For now, if no new file, we assume the existing string value in `updates.profilePicture` is intentional or benign.
//     }
    
//     const updatedTeacher = await Teacher.findByIdAndUpdate(
//       teacherId,
//       { $set: updates }, // Use $set to update only provided fields
//       { new: true, runValidators: true } // runValidators to ensure schema validation on update
//     ).select('-password');

//     if (!updatedTeacher) {
//       return res.status(404).json({ message: 'Teacher not found for update' });
//     }

//     res.json({ message: 'Profile updated successfully', teacher: updatedTeacher });

//   } catch (error) {
//     console.error("❌ Profile update error:", error);
//     if (error.name === 'CastError') {
//         // This will catch errors like the one you were seeing for educationlevels
//         return res.status(400).json({ 
//             message: 'Data type error. Please check the fields.', 
//             field: error.path, // e.g., 'educationlevels'
//             value: error.value, // The problematic value
//             reason: error.reason?.message || error.message 
//         });
//     }
//     if (error.name === 'ValidationError') {
//         return res.status(400).json({ message: 'Validation failed', errors: error.errors });
//     }
//     if (error.code === 11000) { // Mongoose duplicate key error
//       return res.status(400).json({ message: 'Update failed. Email or username may already be in use.' });
//     }
//     res.status(500).json({ message: 'Server error during profile update', error: error.message });
//   }
// });

// // receive bookings from student side
// // routes/teacher.js or similar
// router.get('/bookings/:teacherId', async (req, res) => {
//   try {
//     const { teacherId } = req.params;
//     const bookings = await Session.find({ teacherId });
//     res.status(200).json({ data: bookings });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch bookings' });
//   }
// });

// // receive messages from student side
// router.get('/messages/:teacherId', async (req, res) => {
//   try {
//     const messages = await Message.find({ teacherId });
//     res.status(200).json({ data: messages });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch messages' });
//   }
// });


// router.get('/teachers', async (req, res) => {
//   try {
//     const teachers = await Teacher.find();
//     res.json(teachers);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     const teachers = await Teacher.find(); // Replace with your DB model
//     res.json(teachers);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // this rout will display teacher profile on website tutur page
// router.get('/profile/:id', async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id);
//     if (!teacher) {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }
//     res.json(teacher);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// router.get('/teacher/:id', async (req, res) => {
//     try {
//         const teacherId = req.params.id;
//         const teacher = await Teacher.findById(teacherId); // Fetch teacher by ID from your database

//         if (!teacher) {
//             return res.status(404).json({ message: 'Teacher not found' });
//         }

//         // Structure your response data as expected by the frontend
//         const teacherData = {
//             name: teacher.firstName + ' ' + teacher.lastName, // Or just teacher.username, depending on what you store
//             stats: {
//                 totalSessions: teacher.totalSessions || 0, // Assuming these fields exist
//                 earnings: teacher.earnings || 0,
//                 upcomingSessions: teacher.upcomingSessionsCount || 0,
//             },
//             upcomingSessions: teacher.sessions || [], // Assuming sessions are stored here
//             studentRequests: teacher.requests || [], // Assuming requests are stored here
//             notifications: teacher.notifications || [], // Assuming notifications are stored here
//         };

//         res.status(200).json(teacherData);
//     } catch (error) {
//         console.error('Error fetching teacher by ID:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// // PUT /api/teacher/request/:requestId
// router.put("/request/:requestId", authMiddleware, async (req, res) => {
//   const { requestId } = req.params;
//   const { status } = req.body;
//   try {
//     const updated = await StudentRequest.findByIdAndUpdate(requestId, { status }, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update request" });
//   }
// });


// export default router;


// // // GET /api/teacher/:id
// // router.get('/:id', authMiddleware, async (req, res) => {
// //   try {
// //     const teacher = await Teacher.findById(req.params.id);

// //     if (!teacher) {
// //       return res.status(404).json({ message: "Teacher not found" });
// //     }

// //     // Dummy stats – replace with actual logic if available
// //     const stats = {
// //       totalSessions: 5, // Count from Sessions collection if exists
// //       earnings: 300,     // Calculate from past session payments if available
// //       upcomingSessions: 2
// //     };

// //     // Dummy data for demonstration
// //     const upcomingSessions = [
// //       { studentName: "John Doe", date: "2025-06-10", time: "10:00 AM" },
// //     ];

// //     const studentRequests = [
// //       { _id: "req123", studentName: "Ali", message: "Need help with Math", status: "pending" },
// //     ];

// //     const notifications = [
// //       { message: "New request received from Ali" },
// //     ];

// //     res.json({
// //       name: `${teacher.firstName} ${teacher.lastName}`,
// //       stats,
// //       upcomingSessions,
// //       studentRequests,
// //       notifications,
// //     });
// //   } catch (err) {
// //     console.error("Error fetching teacher data:", err);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });





// File: routes/teacherdashboard/teacherRoutes.js
// Description: Defines API routes related to teachers.

import express from 'express';
import mongoose from 'mongoose'; // Still needed for ObjectId, etc., if used directly
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../../middleware/auth.js'; // Ensure this path is correct
import multer from 'multer';
import path from 'path';

// Import the Teacher model from its dedicated file
import Teacher from '../../models/teacherdashboard/Teacher.js';
// Import other models if they are used in these routes
// For example, StudentRequest model if it's used in PUT /request/:requestId
// import StudentRequest from '../../models/studentRequest.model.js'; // Example path

const router = express.Router();

// Multer setup for file uploads (profile pictures)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists at the root of your project or adjust path
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false); // Pass error to multer
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter
});

// --- PUBLIC ROUTES ---

// POST /api/teacher/register - Teacher registration
router.post('/register', upload.single('profilePicture'), async (req, res) => {
  console.log("📩 Registration Request Body:", req.body);
  if (req.file) {
    console.log("🖼️ Profile Picture File:", req.file);
  }

  try {
    const {
      firstName, lastName, email, phone, cnic, address, city, state, zip,
      bio, username, password, levels, educationlevels, timeZone,
      availability, subjects, studentStatus
    } = req.body;

    const existingTeacher = await Teacher.findOne({ $or: [{ email }, { username }] });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      firstName, lastName, email, phone, cnic, address, city, state, zip,
      bio, username, password: hashedPassword,
      levels: Array.isArray(levels) ? levels : (levels ? String(levels).split(',') : []),
      educationlevels, // Schema expects a String
      timeZone,
      availability: Array.isArray(availability) ? availability : (availability ? String(availability).split(',') : []),
      subjects: Array.isArray(subjects) ? subjects : (subjects ? String(subjects).split(',') : []),
      studentStatus,
      profilePicture: req.file ? req.file.filename : '', // Save the filename if uploaded
    });

    await newTeacher.save();

    res.status(201).json({
      message: 'Teacher registered successfully',
      teacher: { id: newTeacher._id, firstName: newTeacher.firstName, email: newTeacher.email },
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// POST /api/teacher/login - Teacher login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 Login Attempt:", email);
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email, role: 'teacher' },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your environment variables
      { expiresIn: '7d' }
    );
    res.json({
      token,
      teacher: { id: teacher._id, name: `${teacher.firstName} ${teacher.lastName}`, email: teacher.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// GET /api/teacher/search - Search teachers by subject and location
router.get('/search', async (req, res) => {
  try {
    const { subject, location } = req.query;
    const query = {};
    if (subject) {
      // Using $in for subjects array and $regex for case-insensitive partial match
      query.subjects = { $regex: new RegExp(subject, 'i') };
    }
    if (location) {
      query.city = { $regex: new RegExp(location, 'i') };
    }

    const teachers = await Teacher.find(query).select('-password'); // Exclude password
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teacher data for search:', error);
    res.status(500).json({ message: 'Server Error during teacher search' });
  }
});

// --- PROTECTED ROUTES (require authentication via authMiddleware) ---

// GET /api/teacher/profile - Get logged-in teacher's profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // req.user.id should be populated by authMiddleware
    const teacher = await Teacher.findById(req.user.id).select('-password');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error("❌ Profile fetch error:", error);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid teacher ID format.' });
    }
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// PUT /api/teacher/profile - Update logged-in teacher's profile
router.put('/profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  console.log("🔄 Profile Update Request Body:", req.body);
  if (req.file) {
    console.log("🖼️ Profile Update Request File:", req.file);
  }

  try {
    const teacherId = req.user.id;
    const updates = { ...req.body };

    // Ensure array fields are correctly handled if they arrive as comma-separated strings
    ['levels', 'availability', 'subjects'].forEach(field => {
      if (updates[field] && typeof updates[field] === 'string') {
        updates[field] = updates[field].split(',').map(item => item.trim());
      } else if (updates[field] && !Array.isArray(updates[field])) {
        // If it's a single value that should be in an array
         updates[field] = [updates[field]];
      }
    });
    
    // Handle 'educationlevels' - schema expects a String
    if (updates.hasOwnProperty('educationlevels')) {
      if (Array.isArray(updates.educationlevels)) {
        // If frontend sends an array (e.g., from a multi-select, though schema is String)
        // Take the first element, or ensure it's a string. Adjust if multiple education levels need to be stored differently.
        updates.educationlevels = String(updates.educationlevels[0] || '');
      } else if (updates.educationlevels !== null && updates.educationlevels !== undefined) {
        updates.educationlevels = String(updates.educationlevels);
      }
    }

    if (req.file) {
      updates.profilePicture = req.file.filename;
    } else if (updates.profilePicture === '' || updates.profilePicture === null) {
      // If frontend explicitly sends an empty string or null to remove picture
      // updates.profilePicture = ''; // or null, depending on how you want to represent "no picture"
    } else {
        // If no new file and profilePicture field is not in updates or is the old filename,
        // delete it from updates so it doesn't overwrite with undefined or an empty string unintentionally.
        delete updates.profilePicture;
    }
    
    // Remove password from updates if it's accidentally sent empty or unchanged
    // Password updates should typically be handled in a separate, dedicated route.
    if (updates.password === '' || updates.password === undefined) {
        delete updates.password;
    } else if (updates.password) {
        // If password is being updated, hash it.
        // Consider if this is the right place or if a separate "change password" endpoint is better.
        updates.password = await bcrypt.hash(updates.password, 10);
    }


    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found for update' });
    }

    res.json({ message: 'Profile updated successfully', teacher: updatedTeacher });

  } catch (error) {
    console.error("❌ Profile update error:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Data type error. Please check the fields.', 
        field: error.path,
        value: error.value,
        reason: error.reason?.message || error.message 
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    if (error.code === 11000) { // Mongoose duplicate key error
      return res.status(400).json({ message: 'Update failed. Email or username may already be in use.' });
    }
    res.status(500).json({ message: 'Server error during profile update', error: error.message });
  }
});



// GET /api/teacher/teachers - Get a list of all teachers (publicly accessible for search, perhaps)
// Consider pagination and what fields to expose.
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password -cnic'); // Example: hide sensitive fields
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching all teachers:', error);
    res.status(500).json({ message: 'Server error while fetching teachers list' });
  }
});

// GET /api/teacher/ - Root for /api/teacher, might be redundant if /teachers exists
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password -cnic');
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers at root /api/teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/teacher/profile/:id - Public profile view for a teacher by ID
// This is different from the protected /profile route which uses logged-in user's ID.
router.get('/profile/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select('-password -email -phone -address -cnic -zip -username'); // Select fields for public view
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching public teacher profile by ID:', error);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid teacher ID format.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/teacher/teacher/:id - Another route to get teacher by ID.
// This seems similar to /profile/:id. Consolidate if functionality is the same.
// The response structure here is specific, as per your original code.
router.get('/teacher/:id', async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await Teacher.findById(teacherId).select('-password'); // Exclude password

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Data for this specific route structure
        // Note: totalSessions, earnings, upcomingSessionsCount, sessions, requests, notifications
        // are not part of the Teacher schema by default. They would need to be populated
        // or calculated. For now, using placeholders or schema fields if they existed.
        const teacherData = {
            name: teacher.firstName + ' ' + teacher.lastName,
            stats: { // These stats need to be derived or stored on the teacher model
                totalSessions: teacher.totalSessions || 0, // Placeholder: replace with actual data
                earnings: teacher.earnings || 0,           // Placeholder: replace with actual data
                upcomingSessions: teacher.upcomingSessionsCount || 0, // Placeholder
            },
            // These arrays also need to be populated from related collections or stored on teacher model
            upcomingSessions: teacher.sessions || [],     // Placeholder
            studentRequests: teacher.requests || [],      // Placeholder
            notifications: teacher.notifications || [],   // Placeholder
            // Include other fields from teacher model as needed by frontend for this view
            profilePicture: teacher.profilePicture,
            bio: teacher.bio,
            subjects: teacher.subjects,
            levels: teacher.levels,
            educationlevels: teacher.educationlevels,
            // etc.
        };

        res.status(200).json(teacherData);
    } catch (error) {
        console.error('Error fetching teacher by ID for /teacher/:id route:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid teacher ID format.' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});




export default router;