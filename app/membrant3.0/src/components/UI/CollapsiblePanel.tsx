/** @jsxImportSource @emotion/react */
import React, { ReactNode, useState } from 'react';
import { css } from '@emotion/react';

interface CollapsiblePanelProps {
  title?: string;
  /** Panel body (everything below the header) */
  children: ReactNode;
  /** Whether it starts open or closed */
  defaultOpen?: boolean;
}

const containerStyle = css`
  flex: 1;
  overflow: hidden;
  padding: var(--space-sm);
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  user-select: none;

  & strong {
    color: var(--color-text-primary);
    font-size: var(--h3-size);
  }

  & span {
    color: var(--color-text-secondary);
    font-size: var(--body-size);
    transition: transform 0.2s ease;
  }
`;

const contentStyle = (isOpen: boolean) => css`
  max-height: ${isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding-top: ${isOpen ? 'var(--space-sm)' : '0'};
`;

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  return (
    <div css={containerStyle}>
      <div
        css={headerStyle}
        onClick={() => setOpen(o => !o)}
        aria-expanded={isOpen}
      >
        {title && <strong>{title}</strong>}
        <span
          css={css`
            transform: rotate(${isOpen ? '90deg' : '0deg'});
          `}
        >
          ▸
        </span>
      </div>
      <div css={contentStyle(isOpen)}>{children}</div>
    </div>
  );
};
