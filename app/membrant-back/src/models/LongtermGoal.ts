// src/models/LongTermGoal.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILongTermGoal extends Document {
  title: string;
  dueDate: Date;
  metric: string;
  progress: number;
  user: mongoose.Types.ObjectId;
  steps: {
    title: string;
    isComplete: boolean;
  }[];
}

const LongTermGoalSchema: Schema<ILongTermGoal> = new Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    metric: { type: String, required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    steps: [
      {
        title: { type: String, required: true },
        isComplete: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const LongTermGoal: Model<ILongTermGoal> = mongoose.model<ILongTermGoal>('LongTermGoal', LongTermGoalSchema);
