// this is routes/studentdashboard/messageRoutes.js
import { Router } from 'express';
const router = Router();
import  sendMessage  from '../../Controllers/StudentDashboard/messageController.js';
import authMiddleware from '../../middleware/auth.js';

router.post('/send', authMiddleware, sendMessage);

export default router;



// // routes/messageRoutes.js
// import express from 'express';
// import { sendMessage, getMessages } from '../../Controllers/StudentDashboard/messageController.js';
// import authMiddleware from '../../middleware/auth.js';

// const router = express.Router();

// router.post('/send', authMiddleware, sendMessage);
// router.get('/all', authMiddleware, getMessages);

// export default router;
