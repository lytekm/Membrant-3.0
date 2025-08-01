/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { ProgressBar } from '@/components/UI/ProgressBar';

const cardCss = css`
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const titleCss = css`
  font-size: var(--h3-size);
  font-weight: 600;
  color: var(--color-text-primary);
`;

const tagCss = css`
  font-size: var(--small-size);
  font-weight: 500;
  color: var(--color-text-secondary);
  background-color: var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.2rem 0.5rem;
  display: inline-block;
`;

const metaCss = css`
  font-size: var(--small-size);
  color: var(--color-text-secondary);
`;

const statusTagCss = (status: string) => css`
  font-size: var(--small-size);
  font-weight: 600;
  color: white;
  background-color: ${{
    'In Progress': 'var(--color-accent)',
    Completed: 'var(--color-success)',
    Stuck: 'var(--color-warning)',
    Paused: 'var(--color-info)',
  }[status] || 'gray'};
  border-radius: var(--radius-sm);
  padding: 0.25rem 0.5rem;
  display: inline-block;
`;

export const GoalCard = ({ goal, onClick }: { goal: any; onClick?: () => void }) => {
  const percent =
    goal.metric.type === 'Checklist'
      ? ((goal.completedChecklistItems?.length || 0) / (goal.metric.checklistItems?.length || 1)) * 100
      : goal.metric.type === 'Percent'
      ? goal.currentValue ?? 0
      : goal.metric.type === 'Number' && goal.metric.targetValue
      ? ((goal.currentValue ?? 0) / goal.metric.targetValue) * 100
      : 0;

  return (
    <div css={cardCss} onClick={onClick}>
      <div css={titleCss}>{goal.title}</div>
      <div css={tagCss}>{goal.metric.name}</div>
      <div css={statusTagCss(goal.status)}>{goal.status}</div>
      <ProgressBar percent={Math.min(percent, 100)} />
      <div css={metaCss}>
        Started: {new Date(goal.startDate).toLocaleDateString()}<br />
        Target: {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : '—'}
      </div>
    </div>
  );
};
