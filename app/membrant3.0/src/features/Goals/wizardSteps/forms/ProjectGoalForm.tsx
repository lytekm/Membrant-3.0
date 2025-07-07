/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { textInput } from '@/styles/inputStyles';
const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const ProjectGoalForm = ({ setGoalData }: { setGoalData: (updater: (prev: any) => any) => void }) => {
  return (
    <div css={inputContainerStyle}>
      <input
        type="text"
        placeholder="What does completion look like?"
        onChange={(e) => setGoalData((prev) => ({ ...prev, completionDefinition: e.target.value }))}
        css={textInput}
      />
      <textarea
        placeholder="List the major steps"
        onChange={(e) => setGoalData((prev) => ({ ...prev, steps: e.target.value }))}
        css={textInput}
      />
    </div>
  );
};