import { Router } from 'express';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalsControllers';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getGoals);
router.get('/:id', protect, getGoal);
router.post('/', protect, createGoal);
router.put('/:id', protect, updateGoal);
router.delete('/:id', protect, deleteGoal);

export default router;