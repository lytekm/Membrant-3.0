import { Request, Response, NextFunction } from 'express';
import { Goal, IGoal } from '../models/Goal';

// GET /goals - fetch all goals for a user (auth should be required for prod)
export const getGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goals: IGoal[] = await Goal.find({ user: req.userId }); // Assuming `req.user` is injected via middleware
    res.json(goals);
  } catch (err) {
    next(err);
  }
};

// GET /goals/:id - fetch single goal
export const getGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goal: IGoal | null = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    res.json(goal);
  } catch (err) {
    next(err);
  }
};

// POST /goals - create a new goal
export const createGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = {
      ...req.body,
      user: req.userId,
    };

    console.log(data);

    const newGoal = new Goal(data);
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    next(err);
  }
};

// PUT /goals/:id - update an existing goal
export const updateGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedGoal) {
      res.status(404).json({ message: 'Goal not found or not authorized' });
      return;
    }

    res.json(updatedGoal);
  } catch (err) {
    next(err);
  }
};

// DELETE /goals/:id
export const deleteGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleted = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deleted) {
      res.status(404).json({ message: 'Goal not found or not authorized' });
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
