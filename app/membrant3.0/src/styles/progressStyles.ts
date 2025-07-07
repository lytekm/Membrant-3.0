/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const progressContainer = css`
  background: var(--color-border);
  border-radius: var(--radius-sm);
  height: 8px;
  width: 100%;
  overflow: hidden;
`;

export const progressBar = (percent: number) => css`
  background: var(--color-success);
  height: 100%;
  width: ${percent}%;
  transition: width 0.4s ease;
`;
