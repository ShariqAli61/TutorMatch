import { Schema, model } from "mongoose";

const studentRequestSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
  },
  requestedDate: {
    type: Date,
    default: Date.now,
  },
  scheduledDate: {
    type: Date,
  },
});

const StudentRequest = model("StudentRequest", studentRequestSchema);

export default StudentRequest;
