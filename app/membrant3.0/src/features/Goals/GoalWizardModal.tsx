/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { ModalOverlay, modalContent } from '@/styles/modalStyles';
import { StepSelectIntent } from './wizardSteps/StepSelectIntent';
import { StepDefineGoal } from './wizardSteps/StepDefineGoal';
import { GoalIntent } from './types';

export const GoalWizardModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<GoalIntent | null>(null);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));

  return (
    <div
      css={ModalOverlay}
      onClick={onClose}
    >
      <div
        css={modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {step === 0 && <StepSelectIntent onSelect={(i) => { setIntent(i); handleNext(); }} />}
        {step === 1 && intent && <StepDefineGoal intent={intent} onBack={handleBack} onClose={onClose} />}
      </div>
    </div>
  );
};
