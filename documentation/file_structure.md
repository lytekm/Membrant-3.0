## 📁 File Structure

```
src/
│
├── components/            # Reusable UI components (cards, buttons, modals, etc.)
│   ├── Button/
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── Input/
│   │   └── TextInput.tsx
│   └── Progress/
│       └── ProgressBar.tsx
│
├── features/              # App-specific modules like Tasks, Goals, Projects
│   ├── Goals/
│   │   ├── DailyGoals.tsx
│   │   ├── LongTermGoals.tsx
│   │   └── GoalCard.tsx
│   ├── Tasks/
│   │   └── TaskList.tsx
│   └── Projects/
│       └── ProjectBoard.tsx
│
├── styles/                # Emotion CSS-in-JS objects and theme variables
│   ├── global.css         # Base variable definitions
│   ├── dark-theme.css     # Overrides for [data-theme="dark"]
│   ├── buttonStyles.ts
│   ├── inputStyles.ts
│   ├── cardStyles.ts
│   └── progressStyles.ts
│
├── context/               # Global state (React Contexts)
│   ├── ThemeContext.tsx
│   └── GoalsContext.tsx
│
├── utils/                 # Helper functions, date formatting, etc.
│   └── formatDate.ts
│
├── app/                 # App routes (if using Next.js or file-based routing)
│   ├── index.tsx
│   ├── goals.tsx
│   ├── tasks.tsx
│   └── projects.tsx
│   └── layout.tsx
│   └── providers.tsx
│   └── page.tsx

```

---

## 📘 File Structure Guide

# 🧭 Project File Structure Guide

This document outlines the organizational structure of the codebase for the Personal Productivity App. This setup promotes **scalability**, **modularity**, and **clarity**.

---

## 🔁 Root Directories

### `components/`

Reusable UI primitives (e.g., buttons, inputs, modals, progress bars).

- Each component lives in its own folder.
- Exports are managed via `index.ts` in each subfolder for easy import.

Example:

```tsx
import { PrimaryButton } from "@/components/Button";
```

---

### `features/`

Domain-specific UI and logic grouped by feature (e.g., Tasks, Goals, Projects).

- Components here are feature-aware and may combine primitives + business logic.
- Use `GoalCard`, `TaskList`, `ProjectBoard`, etc. here.

---

### `styles/`

Global theme variables and Emotion-compatible CSS-in-JS exports.

- `global.css`: App-wide variables and base styles
- `dark-theme.css`: Dark mode overrides for `[data-theme="dark"]`
- `buttonStyles.ts`, etc.: Named exports of Emotion style objects

Use in components like:

```tsx
import { inputField } from "@/styles/inputStyles";
```

---

### `context/`

Holds global or feature-specific contexts using React Context API.

- Example: `GoalsContext`, `ThemeContext`, `UserContext`
- Can also store hook wrappers like `useGoals()` for local/global state

---

### `utils/`

Pure utility functions, formatting helpers, math/statistics, etc.

Example:

```ts
import { formatDate } from "@/utils/formatDate";
```

---

### `app/`

This is where our actual pages live.

Each `.tsx` file maps to a URL and imports components from `features/`.

---

## 🧩 Adding New Components

To add a new UI primitive (e.g., `Toggle`):

1. Create a new folder: `components/Toggle/`
2. Add file: `Toggle.tsx`
3. Add style file if needed: `toggleStyles.ts`
4. Export from `Toggle/index.ts`
5. Import in features or pages

---

## 🎯 Adding New Feature Logic

To add a new app feature (e.g., Habits):

1. Create folder: `features/Habits/`
2. Add UI logic: `HabitTracker.tsx`
3. Add local styles or state
4. Connect to context or create one if needed

---

## 🌒 Dark Mode Setup

- Use `global.css` for default styles
- Add overrides in `dark-theme.css` under `[data-theme="dark"]`
- Toggle using:

```ts
document.documentElement.setAttribute("data-theme", "dark");
```

---

## ✅ Summary

This architecture supports:

- **Encapsulation** – CSS + logic + context scoped to features
- **Reusability** – Shared components live in `components/`
- **Scalability** – Adding a feature is just a new folder
- **Theming** – Clean light/dark toggle using CSS variables
