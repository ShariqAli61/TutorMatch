//this is student.model.js
import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true , required: true },
  phone: String,
  Grade: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  profilePicture: String,
  username: { type: String, unique: true },
  password: String, // Hashed
});

export default model("Student", studentSchema);
