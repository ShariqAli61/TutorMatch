// // this is models/studentdashboard/Booking.js
import { Schema, model } from 'mongoose';

// const bookingSchema = new Schema({
//   teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
//   studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
//   sessionDate: { type: Date, required: true },
//   subjects: { type: Array, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// export default model('Booking', bookingSchema);


// models/studentdashboard/Booking.js
const bookingSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  sessionDate: { type: Date, required: true },
  subjects: { type: Array, required: true },
  message: String, 
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
export default model('Booking', bookingSchema);