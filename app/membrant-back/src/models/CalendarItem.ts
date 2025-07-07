// src/models/CalendarItem.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { CalendarItemType } from '../types/global';

export interface ICalendarItem extends Document {
  title: string;
  date: Date;
  type: CalendarItemType;
  taskId?: mongoose.Types.ObjectId;
  startTime?: Date;
  endTime?: Date;
  user: mongoose.Types.ObjectId;
}

const CalendarItemSchema: Schema<ICalendarItem> = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: Object.values(CalendarItemType), required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
    startTime: { type: Date },
    endTime: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const CalendarItem: Model<ICalendarItem> = mongoose.model<ICalendarItem>('CalendarItem', CalendarItemSchema);