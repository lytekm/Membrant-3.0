/** @jsxImportSource @emotion/react */
'use client';

import React, { ReactNode, useState } from 'react';
import { css } from '@emotion/react';

interface SideMenuProps {
  children: ReactNode;
}

const menuStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 60px;
  background: #fff;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;

  &:hover {
    width: 200px;
  }

  /* Reveal labels on hover */
  &:hover div[data-label] {
    opacity: 1;
  }
`;

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 900;
  /* Prevent blocking pointer events implicitly */
  pointer-events: none;
`;

export const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const titleStyle = (isHovered: boolean) => css`
    opacity: ${isHovered ? 1 : 0};
    transition: opacity 0.3s ease;
    margin-left: 1rem;
  `;

  return (
    <>
      {isHovered && <div css={overlayStyle} />}
      <nav
        css={menuStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {<h2 css={titleStyle(isHovered)}>Membrant</h2>}
        {children}
      </nav>
    </>
  );
};
