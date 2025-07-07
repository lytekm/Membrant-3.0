// src/models/Note.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  content: string;
  createdAt: Date;
  user: mongoose.Types.ObjectId;
}

const NoteSchema: Schema<INote> = new Schema(
  {
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date(), required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  }
);

export const Note: Model<INote> = mongoose.model<INote>('Note', NoteSchema);
