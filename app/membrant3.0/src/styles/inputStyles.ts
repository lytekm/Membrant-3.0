/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const baseInput = css`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--body-size);
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); /* --color-accent */
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &:disabled {
    background-color: #f1f5f9;
    color: var(--color-text-secondary);
    cursor: not-allowed;
  }
`;

export const textInput = css`
  ${baseInput}
`;

export const numberInput = css`
  ${baseInput}
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export const dateInput = css`
  ${baseInput}
  position: relative;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.4); /* subtle icon tint */
  }
`;


export const checkbox = css`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 0px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

