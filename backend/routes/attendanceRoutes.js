import express from 'express';
import { joinEvent, getEventParticipants,exportEventAttendance,exportGroupAttendance } from '../controllers/attendanceController.js';
import { protect } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.post('/join', protect, joinEvent);
router.get('/event/:eventId', protect, getEventParticipants);
router.get('/export/event/:eventId', protect, exportEventAttendance);
router.get('/export/group/:groupId', protect, exportGroupAttendance);

export default router;