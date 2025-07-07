/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { GoalIntent } from '../types';

const options: { label: string; value: GoalIntent; description: string }[] = [
  {
    label: 'Build a new habit',
    value: 'DailyAction',
    description: 'Something you want to start doing regularly (e.g., journaling, running).'
  },
  {
    label: 'Reach a numerical goal',
    value: 'NumericalGoal',
    description: 'Track progress toward a number (e.g., lose 10 lbs, save $5,000).'
  },
  {
    label: 'Break a bad habit',
    value: 'HabitBreaking',
    description: 'Something you want to stop doing or reduce over time (e.g., smoking, scrolling).'
  },
  {
    label: 'Follow a premade plan',
    value: 'PremadePlan',
    description: 'Use a structured challenge or template like 75 Hard or Read 12 Books.'
  },
  {
    label: 'Create something',
    value: 'Project',
    description: 'Work toward building or launching something (e.g., a website, a portfolio).'
  }
];

export const StepSelectIntent = ({ onSelect }: { onSelect: (intent: GoalIntent) => void }) => {
  return (
    <div>
      <h2>Select Goal Intention</h2>
      <p>
        The first step in setting your goal is identifying its purpose. Take a moment to think about what you're trying to accomplish, then choose the option that fits best.
      </p>
      <p>What you pick will determine the type of goal you create.</p>
      <ul css={css`display: flex; flex-direction: column; gap: var(--space-sm);`}>
        {options.map((opt) => (
          <li key={opt.value}>
            <button
              onClick={() => onSelect(opt.value)}
              css={css`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: var(--space-md);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-md);
                background: var(--color-surface);
                font-size: var(--body-size);
                cursor: pointer;
                text-align: left;
                width: 100%;

                &:hover {
                  background-color: var(--color-bg);
                }
              `}
            >
              <strong>{opt.label}</strong>
              <span css={css`font-size: var(--small-size); color: var(--color-text-secondary);`}>
                {opt.description}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
