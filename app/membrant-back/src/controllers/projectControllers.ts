// src/controllers/projectController.ts
import { Request, Response, NextFunction } from 'express';
import { Project, IProject } from '../models/Project';

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects: IProject[] = await Project.find().populate('notes');
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project: IProject | null = await Project.findById(req.params.id).populate('notes');
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newProj = new Project(req.body);
    const saved: IProject = await newProj.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updated: IProject | null = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
