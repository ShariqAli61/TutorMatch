//this is session.js

import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  teacherEmail: { type: String, required: true },
  studentId: { type: String },  
  teacherId: { type: String },  
});

export default model("Session", sessionSchema);
