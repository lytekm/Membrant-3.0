/** ItemCard.tsx */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import { usePomodoro } from '@/globalContexts/PomodoroContext';

const cardStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  cursor: pointer;
  margin-bottom: var(--space-sm);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-md);
  }

  /* Show timer and delete buttons on hover */
  &:hover button.timer-button,
  &:hover button.delete-button {
    opacity: 1;
  }
`;

const checkboxStyle = css`
  margin-right: var(--space-sm);
`;

const titleStyle = css`
  flex: 1;
  color: var(--color-text-primary);
  font-size: var(--body-size);
`;

const deleteButtonStyle = css`
  opacity: 0;
  margin-left: var(--space-sm);
  background: none;
  border: none;
  font-size: var(--caption-size);
  cursor: pointer;
  transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: var(--color-danger);
  }
`;

const timerButtonStyle = css`
  opacity: 0;
  background: none;
  border: none;
  font-size: var(--caption-size);
  cursor: pointer;
  transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: var(--color-accent);
  }
`;

export interface ItemCardProps {
  id: string;
  title: string;
  isComplete: boolean;
  /** Called when user toggles the checkbox */
  onToggleComplete: (id: string, isComplete: boolean) => void;
  /** Called when user clicks the delete button */
  onDelete: (id: string) => void;
  /** Optional click on the rest of the card (e.g. navigate) */
  onClick?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  isComplete,
  onToggleComplete,
  onDelete,
  onClick,
}) => {
  const { openTimer } = usePomodoro();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggleComplete(id, !isComplete);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleStartTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openTimer(title);
  };

  return (
    <div css={cardStyle} onClick={onClick}>
      <input
        css={checkboxStyle}
        type="checkbox"
        checked={isComplete}
        onChange={handleCheckboxChange}
      />

      <div css={titleStyle}>{title}</div>

      <button
        className="timer-button"
        css={timerButtonStyle}
        onClick={handleStartTimer}
        aria-label="Start Pomodoro"
      >
        ⏱️
      </button>

      <button
        className="delete-button"
        css={deleteButtonStyle}
        onClick={handleDelete}
        aria-label="Delete item"
      >
        ✕
      </button>
    </div>
  );
};
