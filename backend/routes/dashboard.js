//this is dashboard.js
import express from "express";
import Session from "../models/home_session.js";
import Notification from "../models/notification.js";
import Student from "../models/student.model.js"; // Import Student model

const router = express.Router();

router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const sessions = await Session.find({ studentId });
    const pendingRequests = sessions.filter((s) => s.status === "pending");
    const upcomingSessions = sessions.filter(
      (s) => s.status === "approved" && new Date(s.date) >= new Date()
    );
    const totalClasses = sessions.length;
    const totalEarnings = sessions
      .filter((s) => s.status === "completed")
      .reduce((sum, s) => sum + (s.earnings || 0), 0);

    const notifications = await Notification.find({ userId: studentId })
      .sort({ createdAt: -1 })
      .limit(5);
    const recentActivity = sessions
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    const student = await Student.findById(studentId);

    res.json({
      // studentName: student.firstName + " " + student.lastName,
      // studentName: student.fullName,
      // studentName: student.name,
      studentName: `${student.firstName} ${student.lastName}`,
      totalClasses,
      totalEarnings,
      pendingRequests,
      upcomingSessions,
      notifications,
      recentActivity,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// router.post('/book', async (req, res) => {
//   try {
//     const { studentId, teacherId } = req.body;

//     const sessionRequest = new Session({
//       student: studentId,
//       teacher: teacherId,
//       status: 'pending',
//     });

//     await sessionRequest.save();
//     res.json({ message: 'Session request sent' });
//   } catch (error) {
//     console.error('Booking error:', error);
//     res.status(500).json({ message: 'Failed to book teacher' });
//   }
// });




export default router;
