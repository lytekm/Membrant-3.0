/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { textInput, numberInput } from '@/styles/inputStyles';

const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const HabitGoalForm = ({ setGoalData, mode }: { setGoalData: (updater: (prev: any) => any) => void, mode: 'build' | 'break' }) => {
  return (
    <div css={inputContainerStyle}>
      <input
        type="text"
        placeholder={mode === 'build' ? 'What habit do you want to build?' : 'What habit do you want to break?'}
        onChange={(e) => setGoalData((prev) => ({ ...prev, habitName: e.target.value }))}
        css={textInput}
      />
      <input
        type="number"
        placeholder="Times per week"
        onChange={(e) => setGoalData((prev) => ({ ...prev, frequency: parseInt(e.target.value) }))}
        css={numberInput}
      />
    </div>
  );
};