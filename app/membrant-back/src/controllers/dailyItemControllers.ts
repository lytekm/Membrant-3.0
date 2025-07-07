// src/controllers/dailyItemController.ts
import { Request, Response, NextFunction } from 'express';
import { DailyItem, IDailyItem } from '../models/DailyItem';

export const getDailyItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items: IDailyItem[] = await DailyItem.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getDailyItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item: IDailyItem | null = await DailyItem.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createDailyItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newItem = new DailyItem(req.body);
    const saved: IDailyItem = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateDailyItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updated: IDailyItem | null = await DailyItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteDailyItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await DailyItem.findByIdAndDelete(req.params.id);
    // 204 No Content
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
