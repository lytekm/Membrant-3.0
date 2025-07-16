export type MetricType = 'Percent' | 'Number' | 'Checklist';

export interface MetricDefinition {
  _id: string; // unique identifier
  name: string; // user-defined label, e.g. "Pages Read", "Pushups", "Progress %"
  type: MetricType;
  unit?: string; // e.g. "kg", "pages", "reps"
  targetValue?: number; // for Number type (e.g. 100 pages)
  checklistItems?: string[]; // for Checklist type (e.g. ["Research", "Draft", "Edit"])
  createdAt: string;
}

export interface Subgoal {
  _id: string;
  title: string;
  dueDate?: string;
  completed: boolean;
}

export interface Reflection {
  reflection_id: string;
}


export type GoalIntent = 'DailyAction' | 'NumericalGoal' | 'HabitBreaking' | 'PremadePlan' | 'Project';

export interface Goal {
  _id: string;
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
  metric: {
    _id: string;
    name: string;
    type: 'Percent' | 'Number' | 'Checklist';
    targetValue?: number;
    unit?: string;
    checklistItems?: string[];
    createdAt: string;
  };
  currentValue?: number;
  subgoals?: { _id: string; title: string; completed: boolean }[];
  reflections?: { reflection_id: string }[];
  completedChecklistItems?: string[];
  streakCount: number;
  linkedTaskIds?: string[];
  tags?: string[];
  status: 'In Progress' | 'Completed' | 'Stuck' | 'Paused';
  createdAt: string;
  updatedAt: string;
}
