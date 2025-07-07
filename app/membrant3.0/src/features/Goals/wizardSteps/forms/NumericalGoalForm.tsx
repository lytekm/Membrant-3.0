/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { textInput, numberInput } from '@/styles/inputStyles';
const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const NumericalGoalForm = ({ setGoalData }: { setGoalData: (updater: (prev: any) => any) => void }) => {
  return (
    <div css={inputContainerStyle}>
      <input
        type="number"
        placeholder="Starting Value"
        onChange={(e) => setGoalData((prev) => ({ ...prev, startingValue: parseFloat(e.target.value) }))}
        css={numberInput}
      />
      <input
        type="number"
        placeholder="Target Value"
        onChange={(e) => setGoalData((prev) => ({ ...prev, targetValue: parseFloat(e.target.value) }))}
        css={numberInput}
      />
      <input
        type="text"
        placeholder="Unit (e.g., lbs, dollars)"
        onChange={(e) => setGoalData((prev) => ({ ...prev, unit: e.target.value }))}
        css={textInput}
      />
    </div>
  );
};