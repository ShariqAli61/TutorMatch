//this is Controllers/StudentDashboard/teacherController.js
import Booking from '../../models/studentdashboard/Booking.js'; // You may need to create this model

// POST /api/teachers/book
const bookTeacher = async (req, res) => {
 const { teacherId, sessionDate, subjects, message } = req.body;

  const studentId = req.user.id; // from authMiddleware


  console.log('Received booking request:');
  console.log('teacherId:', teacherId);
  console.log('sessionDate:', sessionDate);
  console.log('subjects:', subjects);
  console.log('studentId:', studentId);
  try {
    if (!teacherId || !sessionDate || !subjects) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBooking = new Booking({
      teacherId,
      studentId,
      sessionDate,
      subjects,
      message,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Teacher booked successfully', data: newBooking });
  } catch (error) {
    console.error('Error booking teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default  bookTeacher ;
