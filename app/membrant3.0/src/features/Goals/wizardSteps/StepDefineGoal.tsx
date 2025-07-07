/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { textInput, dateInput } from '@/styles/inputStyles';
import { buttonPrimary, buttonSecondary } from '@/styles/buttonStyles';
import separator from '@/styles/separator';
import { GoalIntent } from '../types';
import { useGoals } from '../GoalsContext';
import { ProjectGoalForm } from './forms/ProjectGoalForm';
import { HabitGoalForm } from './forms/HabitGoalForm';
import { NumericalGoalForm } from './forms/NumericalGoalForm';
import { PremadePlanForm } from './forms/PremadePlanForm';

const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const StepDefineGoal = ({ intent, onBack, onClose }: {
  intent: GoalIntent;
  onBack: () => void;
  onClose: () => void;
}) => {
  const { addGoal } = useGoals();
  const [goalData, setGoalData] = useState<any>({});

  const handleCreateGoal = () => {
    const metric = {
      _id: Math.random().toString(),
      name: 'Progress',
      type: 'Percent',
      createdAt: new Date().toISOString(),
    };

    addGoal({
      ...goalData,
      intent,
      metric,
      status: 'In Progress',
      streakCount: 0,
    });
    onClose();
  };

  return (
    <div>
      <h2>Define Your Goal</h2>
      <p>
        Let’s break it down. Give your goal a clear title and timeframe. Depending on the goal type, we’ll ask for more info to help structure it for success.
      </p>
      <div css={inputContainerStyle}>
        <input
          type="text"
          placeholder="Goal Title"
          onChange={(e) => setGoalData((prev: any) => ({ ...prev, title: e.target.value }))}
          css={textInput}
        />
        <label>Start Date</label>
        <input
          type="date"
          onChange={(e) => setGoalData((prev: any) => ({ ...prev, startDate: e.target.value }))}
          css={dateInput}
        />
        <label>Target Date</label>
        <input
          type="date"
          onChange={(e) => setGoalData((prev: any) => ({ ...prev, targetDate: e.target.value }))}
          css={dateInput}
        />
      </div>

      <div css={separator('lg')} />

      <p>Now let's gather some specifics:</p>

      {intent === 'Project' && <ProjectGoalForm setGoalData={setGoalData} />}
      {intent === 'DailyAction' && <HabitGoalForm mode="build" setGoalData={setGoalData} />}
      {intent === 'HabitBreaking' && <HabitGoalForm mode="break" setGoalData={setGoalData} />}
      {intent === 'NumericalGoal' && <NumericalGoalForm setGoalData={setGoalData} />}
      {intent === 'PremadePlan' && <PremadePlanForm setGoalData={setGoalData} />}


      <div css={[inputContainerStyle, css({flexDirection: 'row'})]}>
        <button onClick={handleCreateGoal} css={buttonPrimary}>Create Goal</button>
        <button onClick={onBack} css={buttonSecondary}>Back</button>
      </div>
    </div>
  );
};

