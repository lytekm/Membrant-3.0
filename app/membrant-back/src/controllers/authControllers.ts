// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

// Helper to sign a token
function signToken(user: IUser): string {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    // 1) Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // 2) Hash password & save
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    const saved = await user.save();

    // 3) Sign token & respond
    const token = signToken(saved);
    // omit password from response
    const safeUser = { _id: saved._id, name: saved.name, email: saved.email };
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    // 1) Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // 2) Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // 3) Sign & respond
    const token = signToken(user);
    const safeUser = { _id: user._id, name: user.name, email: user.email };
    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/logout
 * Since we’re stateless JWT, just return 204.
 * Client should delete its stored token.
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * Protected route. Expects a valid JWT in Authorization header.
 * (You’ll need an auth middleware to set req.userId.)
 */
export const getMe = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.userId;
    if (!id) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
