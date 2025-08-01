/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { css, keyframes } from '@emotion/react';
import { ProgressBar } from '@/components/UI/ProgressBar';
import { Goal, GoalIntent } from './types';
import { useGoals } from './GoalsContext';
import { useState } from 'react';
import { InputField } from '@/components/UI/InputField';
import { buttonPrimary, buttonSecondary } from '@/styles/buttonStyles';

const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const scaleIn = keyframes` from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } `;

const overlayCss = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease forwards;
`;

const modalCss = css`
  position: fixed;
  inset: 0;
  background-color: var(--color-bg);
  padding: var(--space-2xl);
  overflow-y: auto;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  animation: ${scaleIn} 0.25s ease-out forwards;
`;

const headerCss = (isEditing: boolean) => css`
  width: 100%;
  display: flex;
  justify-content: ${isEditing ? 'flex-end' : 'space-between'};
  align-items: center;
`;

const titleCss = css`
  font-size: var(--h2-size);
  font-weight: 700;
  color: var(--color-text-primary);
`;

const closeBtnCss = css`
  font-size: var(--h1-size);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;

  &:hover {
    color: var(--color-text-primary);
  }
`;

const sectionCss = css`
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
`;

const labelCss = css`
  font-size: var(--small-size);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
`;

const subgoalItemCss = (completed: boolean) => css`
  text-decoration: ${completed ? 'line-through' : 'none'};
  color: ${completed ? 'var(--color-success)' : 'var(--color-text-primary)'};
  font-size: var(--body-size);
`;

export const GoalDetailModal = ({ goalId }: { goalId: string }) => {
  const router = useRouter();
  const { goals, updateGoal } = useGoals();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(goal ? { ...goal } : null);

  useEffect(() => {
    const goal = goals.find(g => g._id === goalId);
    setGoal(goal || null);
    setEditedGoal(goal || null);
  }, [goals, goalId]);


  if (!goal || !editedGoal) return <div>Loading...</div>;

  const progress =
    goal.metric.type === 'Checklist'
      ? (goal.completedChecklistItems?.length || 0) / (goal.metric.checklistItems?.length || 1)
      : goal.metric.type === 'Percent'
      ? (goal.currentValue ?? 0) / 100
      : goal.metric.type === 'Number' && goal.metric.targetValue
      ? (goal.currentValue ?? 0) / goal.metric.targetValue
      : 0;

  const handleChange = (field: keyof Goal) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value;

      setEditedGoal(prev =>
        prev ? { ...prev, [field]: value } : null
      );
    };

  const saveChanges = () => {
    if (editedGoal) {
      updateGoal(goalId, editedGoal);
      setIsEditing(false);
    }
  };

  return (
    <div css={overlayCss}>
      <div css={modalCss}>
        <div css={headerCss(isEditing)}>
          {isEditing ? (
            <InputField value={editedGoal.title || ''} type='text' name='title' onChange={handleChange('title')} inputCss={[titleCss, css`width: 80%;`]} />
          ) : (
            <h2 css={titleCss}>{goal.title}</h2>
          )}
          <div css={css`display: flex; align-items: center;`}>
            <button css={buttonPrimary} onClick={() => setIsEditing(e => !e)}>
              {isEditing ? 'Cancel' : 'Edit Goal'}
            </button>
            {isEditing && (
              <button onClick={saveChanges} css={[buttonSecondary, { marginLeft: '1rem', width: 'max-content' }]}>
                Save Changes
              </button>
            )}
            <button onClick={() => router.push('/goals')} css={closeBtnCss}>&times;</button>
          </div>
        </div>

        <section css={sectionCss}>
          <div css={labelCss}>Progress</div>
          <ProgressBar percent={Math.min(progress * 100, 100)} />
        </section>

        <section css={sectionCss}>
          <div css={labelCss}>Description</div>
          {isEditing ? (
            <InputField value={editedGoal.description || ''} type='text-area' name='description' onChange={handleChange('description')} />
          ) : (
            <p>{goal.description}</p>
          )}
        </section>

        <section css={sectionCss}>
          <div css={labelCss}>Start Date</div>
          {isEditing ? (
            <input
              type="date"
              value={editedGoal.startDate.split('T')[0]}
              onChange={e => setEditedGoal(g => g ? { ...g, startDate: e.target.value } : g)}
            />
          ) : (
            <p>{new Date(goal.startDate).toLocaleDateString()}</p>
          )}
        </section>

        {isEditing ? (
          <InputField
            type="date"
            name="targetDate"
            label="Target Date"
            value={editedGoal.targetDate?.split('T')[0] || ''}
            onChange={(e) =>
              setEditedGoal((g) =>
                g ? { ...g, targetDate: e.target.value } : g
              )
            }
          />
        ) : goal.targetDate && (
          <section css={sectionCss}>
            <div css={labelCss}>Target Date</div>
            <p>{new Date(goal.targetDate).toLocaleDateString()}</p>
          </section>
        )}

        <section css={sectionCss}>
          <div css={labelCss}>Intent</div>
          {isEditing ? (
            <InputField
              type="select"
              name="intent"
              value={editedGoal.intent}
              onChange={(e)=> setEditedGoal(g => g ? { ...g, intent: e.target.value as GoalIntent } : g)}
              options={[
                { value: 'DailyAction', label: 'Daily Action' },
                { value: 'NumericalGoal', label: 'Numerical Goal' },
                { value: 'HabitBreaking', label: 'Habit Breaking' },
                { value: 'PremadePlan', label: 'Premade Plan' },
                { value: 'Project', label: 'Project' },
              ]}
            />
          ) : (
            <p>{goal.intent}</p>
          )}
        </section>

        {isEditing ? (
          <InputField
            type="text-area"
            name="completionDefinition"
            label="Completion Definition"
            value={editedGoal.completionDefinition || ''}
            onChange={(e) => setEditedGoal(g => g ? { ...g, completionDefinition: e.target.value } : g)}
          />
        ) : goal.completionDefinition && (
          <section css={sectionCss}>
            <div css={labelCss}>Completion Definition</div>
            <p>{goal.completionDefinition}</p>
          </section>
        )}

        {isEditing ? (
          <InputField
            type="text-area"
            name="steps"
            label="Steps"
            value={editedGoal.steps || ''}
            onChange={(e) => setEditedGoal(g => g ? { ...g, steps: e.target.value } : g)}
          />
        ) : goal.steps && (
          <section css={sectionCss}>
            <div css={labelCss}>Steps</div>
            <p>{goal.steps}</p>
          </section>
        )}

        {editedGoal.intent === 'HabitBreaking' && (
          <section css={sectionCss}>
            <div css={labelCss}>Habit</div>
            {isEditing ? (
              <InputField
                type="text"
                name="habitName"
                value={editedGoal.habitName || ''}
                onChange={(e) => setEditedGoal(g => g ? { ...g, habitName: e.target.value } : g)}
              />
            ) : (
              <p>{goal.habitName}</p>
            )}
          </section>
        )}

        {editedGoal.intent === 'DailyAction' && (
          <section css={sectionCss}>
            <div css={labelCss}>Frequency (per week)</div>
            {isEditing ? (
              <InputField
                type="number"
                name="frequency"
                value={editedGoal.frequency || 0}
                onChange={(val) => setEditedGoal(g => g ? { ...g, frequency: Number(val) } : g)}
              />
            ) : (
              <p>{goal.frequency}</p>
            )}
          </section>
        )}

        {isEditing ? (
          <InputField
            type="number"
            name="startingValue"
            label="Starting Value"
            value={editedGoal.startingValue || 0}
            onChange={(val) => setEditedGoal(g => g ? { ...g, startingValue: Number(val) } : g)}
          />
        ) : goal.startingValue !== undefined && (
          <section css={sectionCss}>
            <div css={labelCss}>Starting Value</div>
            <p>{goal.startingValue}</p>
          </section>
        )}

        {isEditing ? (
          <InputField
            type="number"
            name="targetValue"
            label="Target Value"
            value={editedGoal.targetValue || 0}
            onChange={(val) => setEditedGoal(g => g ? { ...g, targetValue: Number(val) } : g)}
          />
        ) : goal.targetValue !== undefined && (
          <section css={sectionCss}>
            <div css={labelCss}>Target Value</div>
            <p>{goal.targetValue}</p>
          </section>
        )}

        {isEditing ? (
          <InputField
            type="text"
            name="unit"
            label="Unit"
            value={editedGoal.unit || ''}
            onChange={(e) => setEditedGoal(g => g ? { ...g, unit: e.target.value } : g)}
          />
        ) : goal.unit && (
          <section css={sectionCss}>
            <div css={labelCss}>Unit</div>
            <p>{goal.unit}</p>
          </section>
        )}

        {editedGoal.intent === 'PremadePlan' && (
          <section css={sectionCss}>
            <div css={labelCss}>Selected Plan</div>
            {isEditing ? (
              <InputField
                type="text"
                name="selectedPlan"
                value={editedGoal.selectedPlan || ''}
                onChange={(e) => setEditedGoal(g => g ? { ...g, selectedPlan: e.target.value } : g)}
              />
            ) : (
              <p>{goal.selectedPlan}</p>
            )}
          </section>
        )}

        {isEditing ? (
          <InputField
            type="select"
            name="status"
            label="Status"
            value={editedGoal.status}
            onChange={(e) => setEditedGoal(g => g ? { ...g, status: e.target.value as Goal['status'] } : g)}
            options={[
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Stuck', label: 'Stuck' },
              { value: 'Paused', label: 'Paused' },
            ]}
          />
        ) : (
          <section css={sectionCss}>
            <div css={labelCss}>Status</div>
            <p>{goal.status}</p>
          </section>
        )}


      </div>
    </div>
  );
};
