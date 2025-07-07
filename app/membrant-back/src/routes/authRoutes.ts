// src/routes/auth.ts
import { Router } from 'express';
import { signup, login, logout, getMe } from '../controllers/authControllers';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
