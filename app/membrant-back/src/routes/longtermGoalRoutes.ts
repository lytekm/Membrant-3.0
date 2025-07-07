import { Router } from 'express';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/longtermGoalControllers';

const router = Router();

router.get('/', getGoals);
router.get('/:id', getGoal);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;