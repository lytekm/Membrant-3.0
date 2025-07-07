// styles/buttonStyles.ts
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const buttonPrimary = css`
  background: var(--color-accent);
  color: white;
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background:rgb(24, 78, 196);
  }
`;

export const buttonSecondary = css`
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-accent);
    color: white;
  }
`;
