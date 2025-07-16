/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { InputField } from '@/components/UI/InputField';
const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const NumericalGoalForm = ({ setGoalData }: { setGoalData: (updater: (prev: any) => any) => void }) => {
  return (
    <div css={inputContainerStyle}>
      <InputField
        type="number"
        placeholder="Starting Value"
        onChange={(e) => setGoalData((prev) => ({ ...prev, startingValue: parseFloat(e.target.value) }))}
        name='startingValue'
        description='What is your starting point?'
      />
      <InputField
        type="number"
        placeholder="Target Value"
        onChange={(e) => setGoalData((prev) => ({ ...prev, targetValue: parseFloat(e.target.value) }))}
        name='targetValue'
        description='What is your target?'
      />
      <InputField
        type="text"
        placeholder="Unit (e.g., lbs, dollars)"
        onChange={(e) => setGoalData((prev) => ({ ...prev, unit: e.target.value }))}
        name='unit'
        description='How are you measuring your progress?'
      />
    </div>
  );
};