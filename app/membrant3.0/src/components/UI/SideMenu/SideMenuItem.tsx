// src/components/UI/SideMenu/SideMenuItem.tsx
/** @jsxImportSource @emotion/react */
'use client';

import React from 'react';
import { css, SerializedStyles } from '@emotion/react';

interface SideMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  /** Extra styling, e.g. highlight when active */
  customCss?: SerializedStyles;
}

const itemStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s ease;
  &:hover {
    background: rgb(151, 151, 151);
  }
`;

const iconStyle = css``;

const labelStyle = css`
  margin-left: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

export const SideMenuItem: React.FC<SideMenuItemProps> = ({
  icon,
  label,
  onClick,
  customCss,
}) => (
  <div css={[itemStyle, customCss]} onClick={onClick}>
    <div css={iconStyle}>{icon}</div>
    <div css={labelStyle} data-label>
      {label}
    </div>
  </div>
);
