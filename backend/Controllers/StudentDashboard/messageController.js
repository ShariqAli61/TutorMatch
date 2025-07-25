// this is Controllers/StudentDashboard/messageController.js
import Message from '../../models/studentdashboard/Message.js'; // create a model if needed

// Example: Send a message to a teacher
const sendMessage = async (req, res) => {
  const { teacherId, message } = req.body;
  const senderId = req.user.id; // assuming authMiddleware sets req.user

  try {
    if (!teacherId || !message) {
      return res.status(400).json({ error: 'Teacher ID and message are required.' });
    }

    // Save the message in the DB (adjust model as needed)
    const newMessage = new Message({
      teacherId,
      studentId: senderId,
      message,
      sentAt: new Date()
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default  sendMessage ;


// // controllers/messageController.js
// import Message from '../../models/studentdashboard/Message.js';

// export const sendMessage = async (req, res) => {
//   const { receiverId, message, receiverModel } = req.body;
//   const senderId = req.user.id;
//   const senderModel = req.user.role; // "Student" or "Teacher"

//   if (!receiverId || !message || !receiverModel) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const newMsg = new Message({
//       senderId,
//       receiverId,
//       senderModel,
//       receiverModel,
//       message,
//     });

//     await newMsg.save();
//     res.status(201).json({ message: 'Message sent', data: newMsg });
//   } catch (err) {
//     console.error('Message error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const getMessages = async (req, res) => {
//   const userId = req.user.id;
//   const userModel = req.user.role;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { senderId: userId, senderModel: userModel },
//         { receiverId: userId, receiverModel: userModel }
//       ]
//     }).sort({ sentAt: 1 });

//     res.status(200).json(messages);
//   } catch (err) {
//     console.error('Fetching messages error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
