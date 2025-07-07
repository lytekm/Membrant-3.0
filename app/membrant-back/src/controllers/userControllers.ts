import { Request, Response } from 'express';
import { User, IUser } from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await User.find();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: IUser = new User(req.body);
  const saved = await newUser.save();
  res.status(201).json(saved);
};

export const updateUser = async (req: Request, res: Response) => {
  const updated: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
