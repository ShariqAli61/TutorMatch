// routes/teacherdashboard/requestRoutes.js
import { Router } from 'express';
import { handleBookingRequest } from '../../Controllers/TeacherDashboard/requestController.js';
import authMiddleware from '../../middleware/auth.js';

const router = Router();

router.put('/request/:bookingId', authMiddleware, handleBookingRequest);

export default router;
