import express from 'express';
import { createGroup, getUserGroups, getGroupById, deleteGroup } from '../controllers/groupController.js';
import { protect } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/', protect, getUserGroups);
router.get('/:id', protect, getGroupById);
router.delete('/:id', protect, deleteGroup);

export default router;