// // Define the Teacher schema and model
// import { Schema, model } from 'mongoose';
// const teacherSchema = new Schema({
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
// export default model("Teacher", teacherSchema);


// File: models/teacher.model.js
// Description: Defines the Mongoose schema and model for a Teacher.

import mongoose from 'mongoose';

// this is models/teacherdashboard/Teacher.js
// Define the Teacher schema
const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  address: String,
  city: String,
  state: String,
  cnic: String,
  zip: String,
  bio: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  levels: [String],
  educationlevels: String, // This field expects a String
  timeZone: String,
  availability: [String],
  subjects: [String],
  studentStatus: String,
  profilePicture: String, // Stores the filename or path of the profile picture
  createdAt: { type: Date, default: Date.now },
  // Note: Fields like totalSessions, earnings, etc., if needed directly on the model,
  // should be added here. However, they are often calculated/aggregated rather than stored directly.
});

// Create and export the Teacher model
// The `mongoose.models.Teacher ||` part prevents recompilation errors during development (e.g., with HMR)
const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

export default Teacher;