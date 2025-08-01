import mongoose, { Schema, Document, Model } from 'mongoose';

export type MetricType = 'Percent' | 'Number' | 'Checklist';
export type GoalIntent = 'DailyAction' | 'NumericalGoal' | 'HabitBreaking' | 'PremadePlan' | 'Project';
export type GoalStatus = 'In Progress' | 'Completed' | 'Stuck' | 'Paused';

interface IMetric {
  name: string;
  type: MetricType;
  unit?: string;
  targetValue?: number;
  checklistItems?: string[];
}

interface ISubgoal {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface IReflection {
  reflection_id: string;
}

export interface IGoal extends Document {
  title: string;
  description?: string;
  intent: GoalIntent;
  startDate: string;
  targetDate?: string;
  completionDefinition?: string;
  steps?: string;
  habitName?: string;
  frequency?: number;
  startingValue?: number;
  targetValue?: number;
  unit?: string;
  selectedPlan?: string;
  schedule?: { week: number; allowed: number }[];
  metric: IMetric;
  currentValue?: number;
  subgoals?: ISubgoal[];
  reflections?: IReflection[];
  completedChecklistItems?: string[];
  streakCount: number;
  linkedTaskIds?: string[];
  tags?: string[];
  status: GoalStatus;
  user: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const GoalSchema: Schema<IGoal> = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    intent: { type: String, enum: ['DailyAction', 'NumericalGoal', 'HabitBreaking', 'PremadePlan', 'Project'], required: true },
    startDate: { type: String, required: true },
    targetDate: String,
    completionDefinition: String,
    steps: String,
    habitName: String,
    frequency: Number,
    startingValue: Number,
    targetValue: Number,
    unit: String,
    selectedPlan: String,
    schedule: [{ week: Number, allowed: Number }],
    metric: {
      name: { type: String, required: true },
      type: { type: String, enum: ['Percent', 'Number', 'Checklist'], required: true },
      unit: String,
      targetValue: Number,
      checklistItems: [String],
    },
    currentValue: Number,
    subgoals: [
      {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        dueDate: String,
      },
    ],
    reflections: [
      {
        reflection_id: String,
      },
    ],
    completedChecklistItems: [String],
    streakCount: { type: Number, default: 0 },
    linkedTaskIds: [String],
    tags: [String],
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Stuck', 'Paused'],
      default: 'In Progress',
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Goal: Model<IGoal> = mongoose.model<IGoal>('Goal', GoalSchema);
