# 🧠 Project Planning Template

> Use this template at the start of any new software project to ensure you're thinking holistically and clearly defining all aspects of the system.

---

## 🧾 Project Overview

- **Project Name**: Membrant
- **Date Started**: July 3, 2023
- **Team Members / Stakeholders**: Kevin Morrison (Founding Engineer), Potential collaborators or design contractors
- **Project Owner**: Kevin Morrison
- **Summary**:
  Membrant is a personal productivity platform designed to support intentional self-improvement. It unifies tasks, projects, routines, and SMART goals into a focused and motivating system. It guides users through goal-setting, tracks progress with visual and metric-driven tools, and fosters sustainable growth through daily engagement.

---

## 🎯 Goals & Objectives

- **Primary Goal**:
  Build a modern, coaching-oriented productivity app that helps users define and track SMART goals tied to actionable daily inputs.

- **Secondary Goals / Stretch Goals**:

  - Implement goal templates and motivational nudges
  - Connect routines, projects, and tasks to goals
  - Gamify user engagement via streaks, badges, and levels
  - Integrate a dashboard and calendar view

- **Business Value**:
  Membrant aims to stand out in the crowded productivity market by focusing on **self-coaching** and **SMART-based goal tracking**. Its integration of goal-oriented design with visual feedback builds daily momentum and long-term retention.

---

## 👥 Target Users

- **User Roles**:

  - Admin (self)
  - Regular User
  - Guest (read-only, limited interaction in future roadmap)

- **User Needs / Pain Points**:

  - Difficulty defining clear, measurable goals
  - Lack of motivation and feedback loops
  - Fragmentation across tools (goals in one place, tasks in another)
  - No actionable link between long-term goals and daily routines

- **User Environment**:

  - Web-first, light-mode optimized
  - Potential future support for mobile
  - Designed to be fast and intuitive
  - Accessible color contrast and input handling

---

## ✅ Functional Requirements

- [x] SMART Goal Wizard (Guided goal creation)
- [x] Goal Dashboard (Progress summary, quick logging)
- [x] Metric Tracker (Numeric, checklist, % progress)
- [x] Reflection Logs
- [x] Goal Templates (e.g. 75 Hard)
- [ ] Projects/tasks/routines linkage
- [ ] Nudges & notifications
- [ ] Calendar visualization
- [ ] Gamification: streaks, points, consistency score
- [ ] Edge Cases to Consider:

  - Goals without metrics
  - Users abandoning or deleting goals
  - Partial progress or paused states
  - Overlapping metrics (same input tied to multiple goals)

---

## ❌ Non-Functional Requirements

- 🕒 **Performance**: Fast rendering, minimal JS overhead
- 🔐 **Security**: Auth handling for personal data (TBD: local or cloud-based)
- ⚙️ **Scalability**: Modular feature design; scalable context and component structure
- 📱 **Responsiveness**: Mobile-ready layout (planned)
- 🧪 **Testability**: Component-based unit tests via Jest + React Testing Library
- 🧼 **Maintainability**: Modular feature folders, clear separation of concerns
- 📚 **Documentation Requirements**: Internal code comments + README per feature
- 🌐 **Browser / Device Support**: Latest Chrome, Firefox, Safari, Edge

---

## 🧑‍💻 User Stories (Agile Format)

- [x] _As a user_, I want to create a goal with clear steps so that I can stay focused.
- [x] _As a user_, I want to log my progress daily so that I see how far I've come.
- [x] _As a user_, I want to browse goal templates so that I can follow a preset program.
- [ ] _As a user_, I want to link tasks and routines to a goal so that I stay aligned day-to-day.
- [ ] _As a user_, I want to see a dashboard with all my goals so that I know what matters most.
- [ ] _As a user_, I want motivational feedback (e.g. streaks, quotes) so that I stay inspired.

---

## 🔄 System Architecture

- **Tech Stack**:

  - Frontend: React, Next.js, Emotion CSS
  - Backend: TBD (likely Supabase or Node + Express)
  - Database: TBD (PostgreSQL or Supabase tables)
  - Hosting/Infrastructure: Vercel (frontend), Supabase or custom VPS (backend)

- **API Structure**: REST-based for simplicity

- **Authentication / Authorization**: TBD – Supabase auth or NextAuth

- **Data Flow Diagrams**: Planned for goal/task/project relationships

- **Third-Party Integrations**: Possibly Google Calendar, OpenAI for coaching nudges

---

## 🧪 Testing Strategy

- Unit Tests: Each core component and utility
- Integration Tests: Full flows like goal creation
- End-to-End Tests: Playwright/Cypress (post-MVP)
- Manual Testing Plan: Weekly regression sweeps
- Test Coverage Goal: \~80% by MVP

---

## 📦 Deployment Plan

- Environments: Local → Dev → Production
- CI/CD Pipeline: GitHub Actions → Vercel
- Rollback Strategy: Vercel auto-rollbacks + feature flags
- Versioning Policy: Semantic versioning post-MVP

---

## 🔁 Maintenance & Support

- Logging & Monitoring: Console + Vercel logs
- Error Handling Strategy: Toasts + Sentry (post-MVP)
- Who maintains this? Kevin Morrison
- Update Schedule / Frequency: Weekly increments; major review every 2 weeks

---

## 📅 Milestones & Timeline

| Milestone    | Target Date        | Status      |
| ------------ | ------------------ | ----------- |
| MVP          | August 15, 2025    | In Progress |
| Beta Release | September 15, 2025 | Planned     |
| Full Launch  | November 1, 2025   | Planned     |

---

## 📌 Risks & Mitigations

| Risk                                 | Likelihood | Impact | Mitigation                                   |
| ------------------------------------ | ---------- | ------ | -------------------------------------------- |
| Over-scoping MVP                     | High       | Medium | Lock down scope to just Goals + Dashboard    |
| Burnout (solo dev)                   | Medium     | High   | Work in cycles, commit weekly retrospectives |
| Data sync issues between goals/tasks | Medium     | Medium | Design proper linking logic and fallback UI  |
| Lack of user traction                | Medium     | High   | Start audience building early via social     |

---

## 📚 Additional Notes

- **Design System**: Defined in `design_language.md` — clean, accessible, modular
- **File Structure**: Modular and scalable with `features/`, `components/`, and `styles/` folders
- **Next Steps**:

  - Lock final `GoalWizard` design
  - Implement `GoalOverview`, `GoalDetail`, and `GoalTemplates`
  - Draft initial templates for 75 Hard, Launch Website, Read 12 Books
  - Explore backend integration options (Supabase vs custom API)
