# 🧠 Goals Feature Design – Strategic Self-Improvement Hub

The **Goals** section is the **central pillar** of the application, connecting tasks, projects, routines, and metrics around the pursuit of intentional self-improvement.

This document outlines the conceptual UI/UX for building a **coaching-focused, SMART-aligned, metric-driven goal management system**.

---

## 🎯 Key Objectives

1. **Coach users** into defining meaningful goals using the SMART framework.
2. **Support tracking** via flexible metrics, subgoals, and daily/weekly inputs.
3. Offer **preset programs** like "75 Hard" for guided development paths.
4. Make progress and feedback **visual, intuitive, and motivating**.
5. Ensure all major features (tasks, projects, routines) can eventually **tie into goals**.

---

## 🧱 Core UI Components

### 1. 📋 Goal Dashboard (`GoalsOverview.tsx`)

> A summary view of all active goals with a motivational top bar.

**Features:**

- “Start a new goal” button (opens Goal Wizard)
- Cards for each goal showing:
  - Progress bar
  - Days active
  - Current streak
  - Quick log/metric input
  - Status tags (e.g. "On Track", "Stuck", "Completed")
- Tabs or filters: `All`, `In Progress`, `Completed`, `Templates`

---

### 2. 🧙 Goal Wizard (`GoalWizard.tsx`)

> A step-by-step guided form to create a new goal using the **SMART** framework.

**Step Breakdown:**

1. **S – Specific**
   - Ask: “What do you want to achieve?” + optional tags (e.g. Health, Career)
2. **M – Measurable**
   - Choose metric types:
     - Manual progress % (e.g. Learn JavaScript: 0 → 100%)
     - Numeric tracking (e.g. Weight, Money, Reps)
     - Checkbox steps/subgoals
3. **A – Achievable**
   - Prompt user to outline obstacles & resources
4. **R – Relevant**
   - Ask: “Why does this matter to you right now?”
5. **T – Time-Bound**
   - Let them set a target date or cadence (daily, weekly)

**Final Screen:**

- Summary + “Start Goal” CTA
- Optional: Add to calendar, generate first task, recommend routines

---

### 3. 🧱 Goal Detail View (`GoalDetail.tsx`)

> A single-goal workspace where the user can track, reflect, and adjust.

**Sections:**

- **Header:** Title, tags, status, % complete, edit button
- **Progress Visualization**: Metric chart, streak counter, timeline view
- **Subgoals/Milestones:** Checkable items with due dates
- **Metric Tracker:** Inline input for latest data (e.g. weight, pages read)
- **Reflection Journal:** Optional text input to track how it's going
- **Linked Actions (future):** Projects, tasks, routines

---

### 4. 🧠 Goal Templates (`GoalTemplates.tsx`)

> Prebuilt frameworks the user can “adopt” to build habits or accomplish known challenges.

**Example Templates:**

- **75 Hard**
  - Checklist of daily activities
  - Fixed duration (75 days)
- **Read 12 Books in 12 Months**
  - Monthly progress check
- **Launch a Portfolio Website**
  - Milestones like “Pick stack”, “Buy domain”, “Deploy MVP”

Each template offers:

- Preset name, description
- Preloaded steps or metrics
- Optional modification before starting

---

## 📈 UX Enhancements & Ideas

- **Smart Nudges:** “You’re falling behind on this goal—want to create a task?”
- **Celebration Moments:** Confetti 🎉 when subgoals completed or streaks hit
- **Progress Forecasting:** Based on recent updates, show estimated completion date
- **Motivational Hooks:** Pull in quotes, streaks, or stats on the overview page
- **Gamification Ideas:**
  - Points, badges, streaks, trophies
  - “Consistency” score
  - “Goal leveling system”

---

## 🧩 Integration-Ready Design

| Future Tie-In | Hook into Goals UI                        |
| ------------- | ----------------------------------------- |
| **Tasks**     | Auto-generate from subgoals or user input |
| **Projects**  | Assign to a goal to group related work    |
| **Routines**  | Daily habits to track against a goal      |
| **Dashboard** | Roll up goal status into homepage summary |
| **Calendar**  | Visualize timelines and deadlines         |

---

## 🛠 Components

| Component       | File Name           | Description                       |
| --------------- | ------------------- | --------------------------------- |
| `GoalsOverview` | `GoalsOverview.tsx` | Dashboard of all goals            |
| `GoalWizard`    | `GoalWizard.tsx`    | Step-by-step creation experience  |
| `GoalDetail`    | `GoalDetail.tsx`    | Detailed tracking view            |
| `GoalTemplates` | `GoalTemplates.tsx` | Browse and apply preset goals     |
| `GoalCard`      | `GoalCard.tsx`      | Single card preview in overview   |
| `MetricInput`   | `MetricInput.tsx`   | Tracker for numerical progress    |
| `SubgoalList`   | `SubgoalList.tsx`   | Checkable breakdown of milestones |
| `ReflectionLog` | `ReflectionLog.tsx` | Optional user journaling field    |

---

## Data Structures

## ✅ Next Steps

- Lock in final flow for `GoalWizard`
- Build UI wireframes for `GoalsOverview` and `GoalDetail`
- Decide which goal templates to include by default
