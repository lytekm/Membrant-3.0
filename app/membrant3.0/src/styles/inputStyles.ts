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

export const selectInput = css`
  ${baseInput}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='%236B7280' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-md) center;
  background-size: 1rem;
  padding-right: 2.5rem;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const selectInputError = css`
  ${selectInput}
  border-color: var(--color-danger);
`;

export const checkboxWrapper = css`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
`;

export const hiddenCheckbox = css`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const customCheckbox = css`
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);

  input:focus + & {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); /* --color-accent outline */
  }

  input:checked + & {
    background-color: var(--color-success);
    border-color: var(--color-success);
  }

  input:checked + &::after {
    content: "✓";
    font-size: 14px;
    color: white;
  }
`;



