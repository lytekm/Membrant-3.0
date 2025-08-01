import { Router } from 'express';
import userRoutes from './userRoutes';
import noteRoutes from './noteRoutes';
import projectRoutes from './projectRoutes';
import longTermGoalRoutes from './longtermGoalRoutes';
import dailyItemRoutes from './dailyItemRoutes';
import taskRoutes from './taskRoutes';
import calendarItemRoutes from './calendarItemRoutes';
import authRoutes from './authRoutes'

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/projects', projectRoutes);
router.use('/goals', longTermGoalRoutes);
router.use('/dailyitems', dailyItemRoutes);
router.use('/tasks', taskRoutes);
router.use('/calendaritems', calendarItemRoutes);
router.use('/auth', authRoutes);

// You’ll later `import router from './user'`, etc.
export default router;
