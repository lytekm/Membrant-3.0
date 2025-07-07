/** @jsxImportSource @emotion/react */
'use client';

import React, { useState, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import { DailyItem } from '@/Types/Types';

interface ProgressInputProps {
  onAdd: (text: string) => void;
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;
const inputStyle = css`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export const ProgressInput: React.FC<ProgressInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <div css={containerStyle}>
      <input
        css={inputStyle}
        placeholder="Add item..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};