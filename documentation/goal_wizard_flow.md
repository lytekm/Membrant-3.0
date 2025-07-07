A strong starting point for designing the **Goal Wizard** is to frame it as a _coaching flow_ that feels like a conversation, while offering the structure and flexibility to accommodate a wide range of goal types (create something, learn a skill, break a habit, build a habit, etc.).

Here’s a strategic approach, broken down into **4 steps**:

---

### 🔑 1. **Define Flexible Goal Archetypes**

Instead of rigid types, allow users to select a _goal intent_, e.g.:

| Intent             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `Create Something` | A project-oriented goal (e.g. launch a website, write a book) |
| `Learn a Skill`    | Progress-tracking via knowledge or skill accumulation         |
| `Build a Habit`    | Daily/weekly repetition is key (e.g. work out, meditate)      |
| `Break a Habit`    | Reverse habit tracking (e.g. no smoking for 30 days)          |
| `Improve a Metric` | Number-based goals (e.g. gain weight, save \$1,000)           |
| `Follow a Program` | Structured challenge (e.g. 75 Hard, Couch to 5K)              |

💡 **Design Tip**: Treat these as “onboarding paths” that slightly alter the wizard flow (pre-fill metrics, hide/show subgoal types, etc.)

---

### 🧙‍♂️ 2. **Expand the SMART Flow**

The current SMART steps are solid. You can improve flexibility by:

| Step           | UX Improvement Idea                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Specific**   | Use a conversational prompt: _“What are you trying to achieve?”_ <br> Include quick tags (Health, Career, etc.)         |
| **Measurable** | Let user choose from: <br>– % Complete <br>– Numeric Target <br>– Checkboxes (milestones) <br>– Streaks (days in a row) |
| **Achievable** | Use prefilled examples for obstacles/resources <br> (_"No time" → suggest time-blocking_)                               |
| **Relevant**   | Ask: _“Why now?”_ + optionally tie to a value (health, mastery, etc.)                                                   |
| **Time-Bound** | Let user choose a _duration_ or _cadence_: <br>– Fixed deadline <br>– Daily/weekly recurrence                           |

You can also add a **bonus step**:

- **"How will you measure consistency?"** → track habit streaks, daily logs, etc.

---

### 🧠 3. **Make it Feel Like Coaching**

To feel like a self-coaching tool:

- Use a conversational tone ("Alright, let's break this down...")
- Show tooltips or examples inline (e.g. “Examples of good goals…”)
- Let users "skip for now" or choose “I’m not sure” (use defaults)

**Microcopy examples**:

- "Don't worry, you can always edit this later."
- "Need ideas? Here's what others have done."

---

### 🛠 4. **Implementation Plan in Steps**

#### ✅ Phase 1 – MVP Wizard Flow

- [ ] Intent selector (dropdown or icons)
- [ ] SMART step-by-step form (reusable component)
- [ ] Flexible metric definition (checkbox, % complete, numeric)
- [ ] Deadline or cadence picker
- [ ] Summary review page + “Start Goal” CTA

#### 🧠 Phase 2 – Smarter Coaching

- [ ] Inline nudge engine: “Based on your goal, we recommend tracking progress daily”
- [ ] Default templates per goal type
- [ ] Optional journal or reflection prompt

---

### 🔄 Suggested Data Model Update

Update your goal schema to support:

```ts
type Goal = {
  id: string;
  title: string;
  intent:
    | "Create"
    | "Learn"
    | "BuildHabit"
    | "BreakHabit"
    | "ImproveMetric"
    | "FollowProgram";
  metricType: "percent" | "numeric" | "checkbox" | "streak";
  cadence?: "daily" | "weekly" | "none";
  targetDate?: Date;
  subgoals?: Subgoal[];
  reason?: string;
  obstacles?: string[];
  resources?: string[];
};
```

---

### 💬 Reflection Questions to Guide You

1. **Where might a user get stuck when trying to define a goal?**
2. **How can we infer the right metric type from their intent?**
3. **What’s the smallest amount of info needed to get them started?**
4. **What types of feedback (progress bars, streaks, milestone celebrations) are most helpful for each intent?**

---

Would you like help drafting the UI wireframes, user flow diagram, or data structure next?
