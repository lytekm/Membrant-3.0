/** @jsxImportSource @emotion/react */
'use client';
import React from 'react';
import { css, Interpolation, Theme } from '@emotion/react';

interface PanelProps {
  title?: string;
  children: React.ReactNode;
  customStyle?: Interpolation<Theme>;
}

const panelStyle = css`
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-md);
  height: max-content;

  & h3 {
    margin: 0 0 var(--space-sm) 0;
    color: var(--color-text-primary);
    font-size: var(--h3-size);
  }
`;

export const Panel: React.FC<PanelProps> = ({ title, children, customStyle }) => (
  <div css={[panelStyle, customStyle]}>
    {title && <h3>{title}</h3>}
    {children}
  </div>
);
