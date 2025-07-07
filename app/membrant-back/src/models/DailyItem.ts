// src/models/DailyItem.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { DailyItemType } from '../types/global';

export interface IDailyItem extends Document {
  title: string;
  isComplete: boolean;
  type: DailyItemType;
  longTermGoalId?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const DailyItemSchema: Schema<IDailyItem> = new Schema(
  {
    title: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    type: { type: String, enum: Object.values(DailyItemType), required: true },
    longTermGoalId: { type: Schema.Types.ObjectId, ref: 'LongTermGoal' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const DailyItem: Model<IDailyItem> = mongoose.model<IDailyItem>('DailyItem', DailyItemSchema);
