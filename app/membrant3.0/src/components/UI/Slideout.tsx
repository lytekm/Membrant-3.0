/** @jsxImportSource @emotion/react */
'use client';
import React, { ReactNode, useEffect } from 'react';
import { css } from '@emotion/react';

interface SlideOutProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: ReactNode;
}

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const slideContainer = (width: string) => css`
  position: fixed;
  top: 0;
  right: 0;
  width: ${width};
  height: 100vh;
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  z-index: 1001;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  padding: var(--space-lg);
  border-left: 1px solid var(--color-border);

  &.open {
    transform: translateX(0);
  }
`;

const closeButtonStyle = css`
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
`;

export default function SlideOut({
  isOpen,
  onClose,
  width = '400px',
  children,
}: SlideOutProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div css={overlayStyle} onClick={onClose} />}
      <div css={slideContainer(width)} className={isOpen ? 'open' : ''}>
        <button css={closeButtonStyle} onClick={onClose} aria-label="Close panel">
          ×
        </button>
        {children}
      </div>
    </>
  );
}
