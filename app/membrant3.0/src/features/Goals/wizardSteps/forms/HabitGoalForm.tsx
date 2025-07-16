/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { textInput, numberInput } from '@/styles/inputStyles';
import { Checkbox } from '@/components/UI/Checkbox';
import { InputField } from '@/components/UI/InputField';

const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const HabitGoalForm = ({ setGoalData, mode, goalData }: { setGoalData: (updater: (prev: any) => any) => void, mode: 'build' | 'break', goalData: any }) => {
  const [startVal, setStartVal] = useState(0);
  const [targetVal, setTargetVal] = useState(mode === 'build' ? 7 : 0);
  const [unit, setUnit] = useState('times per week');
  const [usePlan, setUsePlan] = useState(true);
  const [schedule, setSchedule] = useState<{ week: number; allowed: number }[]>([]);

  useEffect(() => {
    const startDate = new Date(goalData.startDate || new Date().toISOString());
    const endDate = new Date(goalData.targetDate || new Date(Date.now() + 6 * 7 * 24 * 60 * 60 * 1000).toISOString());
    const weeks = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));

    if (!usePlan) {
      setSchedule([]);
      setGoalData((prev) => ({ ...prev, frequency: targetVal, startingValue: startVal, unit, schedule: [] }));
      return;
    }

    const steps: { week: number; allowed: number }[] = [];
    const totalChange = startVal - targetVal;
    const stepChange = totalChange / (weeks - 1);

    for (let i = 0; i < weeks; i++) {
      steps.push({ week: i + 1, allowed: Math.round(startVal - i * stepChange) });
    }
    setSchedule(steps);
    setGoalData((prev) => ({ ...prev, frequency: targetVal, startingValue: startVal, unit, schedule: steps }));
  }, [startVal, targetVal, unit, usePlan]);

  return (
    <div css={inputContainerStyle}>
      <h3>{mode === 'build' ? 'What habit are you trying to build?' : 'What habit are you trying to break?'}</h3>
      <p>This will help us create a plan tailored to you. First, let’s understand your current habit and your target.</p>

      <InputField
        type="text"
        name="habitName"
        placeholder={mode === 'build' ? 'e.g. Meditate' : 'e.g. Smoke cigarettes'}
        onChange={(e) => setGoalData((prev) => ({ ...prev, habitName: e.target.value }))}
      />

      <label>How often do you currently do this?</label>
      <InputField
        type="number"
        name="start-frequency"
        placeholder="e.g. 20"
        value={startVal}
        onChange={(e) => setStartVal(parseInt(e.target.value))}
      />

      <label>What is your goal frequency?</label>
      <InputField
        type="number"
        name="goal-frequency"
        placeholder={mode === 'build' ? 'e.g. 7 (every day)' : 'e.g. 0'}
        value={targetVal}
        onChange={(e) => setTargetVal(parseInt(e.target.value))}
      />

      <label>Unit of frequency</label>
      <InputField
        type="text"
        name="unit"
        placeholder="e.g. times per day"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <label>How do you want to approach this?</label>
      <div css={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div css={{ display: 'flex', gap: '0.5rem' }}>
        <Checkbox
            checked={usePlan}
            onChange={() => setUsePlan(true)}
            label='Gradual — start slow and end at your target'
        />

      </div>
      <div css={{ display: 'flex', gap: '0.5rem' }}>
        <Checkbox
            checked={!usePlan}
            onChange={() => setUsePlan(false)}
            label='All-in — start immediately at your target'
        />
      </div>
      </div>

      {usePlan && (
        <div>
          <h4>Suggested Plan</h4>
          <p>This schedule gradually adjusts your habit over time based on your chosen start and end dates. You can edit this later if needed.</p>
          <ul>
            {schedule.map((s) => (
              <li key={s.week}>Week {s.week}: {s.allowed} {unit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

