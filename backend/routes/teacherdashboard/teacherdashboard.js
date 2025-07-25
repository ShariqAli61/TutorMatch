// // this is routes/teacherdashboard.js file
// router.get('/:teacherId', async (req, res) => {
//   const { teacherId } = req.params;

//   const sessions = await Session.find({ teacherId });
//   const totalSessions = sessions.length;
//   const totalEarnings = sessions.reduce((acc, s) => acc + s.paymentAmount, 0);
  
//   const upcomingSessions = sessions.filter(s => new Date(s.date) > new Date());

//   const studentRequests = await Session.find({ teacherId, status: 'pending' });

//   const notifications = await Notification.find({ recipientId: teacherId });

//   res.json({
//     name: teacher.name,
//     totalSessions,
//     totalEarnings,
//     upcomingSessions,
//     studentRequests,
//     notifications,
//   });
// });


// routes/teacherdashboard.js
import { Router } from 'express';
const router = Router();
import getTeacherDashboardData from '../../Controllers/TeacherDashboard/getTeacherDashboardData.js';

router.get('/:teacherId', getTeacherDashboardData);

export default router;
