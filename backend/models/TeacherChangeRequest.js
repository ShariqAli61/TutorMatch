//this is TeacherChangeRequest.js
import { Schema, model } from "mongoose";

const requestSchema = new Schema({
  teacherEmail: { type: String, required: true },
  studentId: { type: String, required: true },
  reason: { type: String },
  requestedAt: { type: Date, default: Date.now },
});

export default model("TeacherChangeRequest", requestSchema);
