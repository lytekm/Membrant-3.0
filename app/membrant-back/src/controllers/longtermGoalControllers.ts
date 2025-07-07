// src/controllers/longTermGoalController.ts
import { Request, Response, NextFunction } from 'express';
import { LongTermGoal, ILongTermGoal } from '../models/LongtermGoal';

export const getGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goals: ILongTermGoal[] = await LongTermGoal.find();
    res.json(goals);
  } catch (err) {
    next(err);
  }
};

export const getGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goal: ILongTermGoal | null = await LongTermGoal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    res.json(goal);
  } catch (err) {
    next(err);
  }
};

export const createGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newGoal = new LongTermGoal(req.body);
    const saved: ILongTermGoal = await newGoal.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updated: ILongTermGoal | null = await LongTermGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await LongTermGoal.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
