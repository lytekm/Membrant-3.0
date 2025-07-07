// File: src/types/global.d.ts

export interface User {
  _id: string;
  name: string;
  email: string;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in progress',
  COMPLETE = 'complete',
}

export interface Task {
  _id: string;
  title: string;
  dueDate: string;    // ISO date string
  status: TaskStatus;
  projectId: string;  // reference to a Project
  user: string;       // reference to a User (_id)
}

export enum DailyItemType {
  TASK = 'task',
  GOAL = 'goal',
}

export interface DailyItem {
  _id: string;
  title: string;
  isComplete: boolean;
  type: DailyItemType;
  longTermGoalId?: string; // if type is GOAL, optional reference to a LongTermGoal
  user: string;            // reference to a User (_id)
}

export interface LongTermGoal {
  _id: string;
  title: string;
  dueDate: string;    // ISO date string
  metric: string;     // description of how progress is measured
  progress: number;   // e.g. percentage 0-100
  user: string;       // reference to a User (_id)
}

export interface Note {
  _id: string;
  content: string;
  createdAt: string;  // ISO datetime string
  user: string;       // reference to a User (_id)
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  notes: Note[];      // array of Note objects
  dueDate: string;    // ISO date string
  user: string;       // reference to a User (_id)
}

export enum CalendarItemType {
  EVENT = 'event',
  TASK = 'task',
}

export interface CalendarItem {
  _id: string;
  title: string;
  date: string;            // ISO date string for the day
  type: CalendarItemType;
  taskId?: string;         // if type is TASK, reference to a Task
  startTime?: string;      // if type is EVENT, ISO datetime string
  endTime?: string;        // if type is EVENT, ISO datetime string
  user: string;            // reference to a User (_id)
}
