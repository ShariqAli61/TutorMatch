import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

export default model('Message', messageSchema);


// // models/studentdashboard/Message.js
// import { Schema, model } from 'mongoose';

// const messageSchema = new Schema({
//   senderId: { type: Schema.Types.ObjectId, required: true, refPath: 'senderModel' },
//   receiverId: { type: Schema.Types.ObjectId, required: true, refPath: 'receiverModel' },
//   senderModel: { type: String, required: true, enum: ['Student', 'Teacher'] },
//   receiverModel: { type: String, required: true, enum: ['Student', 'Teacher'] },
//   message: { type: String, required: true },
//   sentAt: { type: Date, default: Date.now }
// });

// export default model('Message', messageSchema);
