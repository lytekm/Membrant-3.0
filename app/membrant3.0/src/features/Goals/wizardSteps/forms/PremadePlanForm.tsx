/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { textInput, numberInput } from '@/styles/inputStyles';
const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const PremadePlanForm = ({ setGoalData }: { setGoalData: (updater: (prev: any) => any) => void }) => {
  return (
    <div>
      <select onChange={(e) => setGoalData((prev) => ({ ...prev, selectedPlan: e.target.value }))}>
        <option value="75Hard">75 Hard</option>
        <option value="Read12Books">Read 12 Books</option>
        <option value="PortfolioLaunch">Launch Portfolio</option>
      </select>
    </div>
  );
};