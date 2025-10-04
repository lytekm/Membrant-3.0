// src/models/Project.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { INote } from './Note';

export interface IProject extends Document {
  title: string;
  description: string;
  notes: INote['_id'][];
  dueDate: Date;
  user: mongoose.Types.ObjectId;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    dueDate: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);