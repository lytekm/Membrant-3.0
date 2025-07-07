/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const card = css`
  background: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;
