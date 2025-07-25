// this is routes/studentdashboard/teacherRout.js
import { Router } from 'express';
const router = Router();
import  bookTeacher  from '../../Controllers/StudentDashboard/teacherController.js';
import authMiddleware from '../../middleware/auth.js';

router.post('/book', authMiddleware, bookTeacher);

export default router;
