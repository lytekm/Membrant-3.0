// src/models/Task.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { TaskStatus } from '../types/global';

export interface ITask extends Document {
  title: string;
  dueDate: Date;
  status: TaskStatus;
  projectId?: mongoose.Types.ObjectId;
  goalId?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    goalId: { type: Schema.Types.ObjectId, ref: 'LongTermGoal', required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);
