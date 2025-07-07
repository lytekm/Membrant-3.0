# 🎨 Design Language – Personal Productivity App

A modern, clean, and minimal interface that fosters focus, growth, and self-improvement.

---

## ✦ Visual Identity

- **Theme**: Light mode first, clean and neutral
- **Mood**: Uplifting, minimal, focused
- **Purpose**: Help users organize their day and move toward long-term goals through clarity and subtle motivation

---

## 🎨 Color Palette

| Variable                 | Hex     | Use Case                    |
| ------------------------ | ------- | --------------------------- |
| `--color-bg`             | #eaebeb | App background              |
| `--color-surface`        | #FFFFFF | Cards, modals, panels       |
| `--color-text-primary`   | #1F2937 | Headings, main text         |
| `--color-text-secondary` | #6B7280 | Hints, labels, captions     |
| `--color-border`         | #E2E8F0 | Inputs, separators          |
| `--color-accent`         | #3B82F6 | Main call-to-action color   |
| `--color-success`        | #10B981 | Streaks, completions        |
| `--color-warning`        | #F59E0B | Urgency, deadlines          |
| `--color-danger`         | #EF4444 | Errors, destructive actions |
| `--color-info`           | #6366F1 | Secondary accents, metadata |

---

## 🖋 Typography

- **Font**: `'Inter', system-ui, sans-serif`
- **Sizes**:
  - `--h1-size`: `2.25rem` (36px)
  - `--h2-size`: `1.5rem` (24px)
  - `--h3-size`: `1.25rem` (20px)
  - `--body-size`: `1rem` (16px)
  - `--small-size`: `0.875rem` (14px)

Use consistent `line-height: 1.5` for readability.

---

## 📏 Spacing

- Use a 4px-based scale:
  - `--space-xs`: 4px
  - `--space-sm`: 8px
  - `--space-md`: 16px
  - `--space-lg`: 24px
  - `--space-xl`: 32px
  - `--space-2xl`: 48px

---

## 🔲 Border Radius & Elevation

| Variable      | Value                      | Use Case              |
| ------------- | -------------------------- | --------------------- |
| `--radius-sm` | 4px                        | Buttons, inputs       |
| `--radius-md` | 8px                        | Cards, sections       |
| `--radius-lg` | 12px                       | Modals, dialogs       |
| `--shadow-sm` | 0 1px 3px rgba(0,0,0,0.06) | Inputs, light hover   |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.08) | Modals, focused cards |

---

## 🧩 Component Guidelines

- **Buttons**: Use `--color-accent` for primary, border-only for secondary. Subtle shadow and rounded edges.
- **Cards**: White surface, `--shadow-sm`, `--radius-md`, use `space-md` padding.
- **Inputs**: Full-width, rounded borders, 1px `--color-border`, focus shows `--color-accent`.
- **Progress Indicators**: Rounded bars, `--color-success` or `--color-accent`.
- **Checkboxes**: Rounded with `--color-success`, animate on check.

---

## 🔗 Interaction Guidelines

- Use subtle transitions for hover and focus
- Animate progress-related actions (e.g. goal checked ✅)
- Use visual cues (streaks, badges, progress bars) to reward behavior

---

## ✧ Accessibility

- Contrast meets WCAG 2.1 AA
- Font sizes are scalable and responsive
- All buttons and inputs have accessible focus states
