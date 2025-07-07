import { Request, Response } from 'express';
import { CalendarItem, ICalendarItem } from '../models/CalendarItem';

export const getCalendarItems = async (req: Request, res: Response) => {
  const items: ICalendarItem[] = await CalendarItem.find();
  res.json(items);
};

export const getCalendarItem = async (req: Request, res: Response) => {
  const item: ICalendarItem | null = await CalendarItem.findById(req.params.id);
  if (!item){
     res.status(404).json({ message: 'Calendar item not found' });
     return;
    }
    console.log(item);
    res.json(item);
};

export const createCalendarItem = async (req: Request, res: Response) => {
  const newItem: ICalendarItem = new CalendarItem(req.body);
  const saved = await newItem.save();
  res.status(201).json(saved);
};

export const updateCalendarItem = async (req: Request, res: Response) => {
  const updated: ICalendarItem | null = await CalendarItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404).json({ message: 'Calendar item not found' });
    return;
  }
  res.json(updated);
};

export const deleteCalendarItem = async (req: Request, res: Response) => {
  await CalendarItem.findByIdAndDelete(req.params.id);
  res.status(204).send();
};