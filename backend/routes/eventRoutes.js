import express from "express";
import { createEvent, getEventsByGroup, getEventById } from "../controllers/eventController.js";
import { protect } from "../middleware/protectMiddleware.js";

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/group/:groupId', protect, getEventsByGroup);
router.get('/:id', protect, getEventById);

export default router;