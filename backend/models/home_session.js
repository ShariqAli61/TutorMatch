// this is home_session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  // studentId: mongoose.Schema.Types.ObjectId,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  teacherId: mongoose.Schema.Types.ObjectId,
  subject: String,
  status: { type: String, enum: ["pending", "approved", "completed"], default: "pending" },
  date: Date,
  time: String,
  earnings: Number,
}, { timestamps: true });

export default mongoose.model("home_session", sessionSchema);
