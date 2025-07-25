// // controllers/TeacherDashboard/getTeacherDashboardData.js
// import Booking from '../../models/studentdashboard/Booking.js';
// import Teacher from '../../routes/teacherdashboard/teacherRoutes.js';
// import Student from '../../models/student.model.js';

// const getTeacherDashboardData = async (req, res) => {
//   try {
//     const teacherId = req.params.teacherId;

//     // Fetch teacher info
//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Get all bookings for this teacher
//     const bookings = await Booking.find({ teacherId })
//       .populate('studentId', 'firstName lastName email')
//       .sort({ createdAt: -1 });

//     // Map bookings as student requests
//     const studentRequests = bookings.map((booking) => ({
//       _id: booking._id,
//       studentName: `${booking.studentId.firstName} ${booking.studentId.lastName}`,
//       email: booking.studentId.email,
//       subjects: booking.subjects,
//       sessionDate: booking.sessionDate,
//       createdAt: booking.createdAt,
//     }));

//     res.json({
//       name: `${teacher.firstName} ${teacher.lastName}`,
//       stats: {
//         totalSessions: bookings.length,
//         totalEarnings: 0, // Replace with real earnings if needed
//       },
//       studentRequests,
//     });
//   } catch (error) {
//     console.error('Error fetching teacher dashboard data:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export default getTeacherDashboardData;





// File: controllers/TeacherDashboard/getTeacherDashboardData.js
// Description: Controller to fetch data for the teacher dashboard.

import Booking from '../../models/studentdashboard/Booking.js';
// Correctly import the Teacher model from its dedicated file
import Teacher from '../../models/teacherdashboard/Teacher.js';
// Assuming Student model is correctly defined and exported from this path
import Student from '../../models/student.model.js'; // Ensure this path and model are correct

const getTeacherDashboardData = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Fetch teacher info using the correctly imported Teacher model
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Get all bookings for this teacher
    // Ensure 'studentId' in Booking schema correctly refers to the Student model
    // and that the Student model has firstName, lastName, and email fields.
    const bookings = await Booking.find({ teacherId })
      .populate('studentId', 'firstName lastName email') // Populates student details
      .sort({ createdAt: -1 });

    // Map bookings as student requests
    const studentRequests = bookings.map((booking) => {
      // Defensive check for populated studentId
      if (!booking.studentId) {
        console.warn(`Booking ${booking._id} is missing studentId details.`);
        return {
          _id: booking._id,
          studentName: 'N/A',
          email: 'N/A',
          subjects: booking.subjects,
          sessionDate: booking.sessionDate,
          createdAt: booking.createdAt,
          error: 'Student details missing'
        };
      }
      return {
        _id: booking._id,
        studentName: `${booking.studentId.firstName} ${booking.studentId.lastName}`,
        email: booking.studentId.email,
        subjects: booking.subjects,
        sessionDate: booking.sessionDate,
        createdAt: booking.createdAt,
      };
    });

    res.json({
      name: `${teacher.firstName} ${teacher.lastName}`,
      stats: {
        totalSessions: bookings.length, // Calculated from the number of bookings
        totalEarnings: teacher.totalEarnings || 0, // Assuming totalEarnings might be a field on teacher or calculated elsewhere
      },
      studentRequests,
    });
  } catch (error) {
    console.error('Error fetching teacher dashboard data:', error);
    // Provide more specific error information if possible, but avoid leaking sensitive details
    if (error.name === 'CastError' && error.path === '_id') {
        return res.status(400).json({ error: 'Invalid teacher ID format.' });
    }
    res.status(500).json({ error: 'Server error while fetching teacher dashboard data.' });
  }
};

export default getTeacherDashboardData;