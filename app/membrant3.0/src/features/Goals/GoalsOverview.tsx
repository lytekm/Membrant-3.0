/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useGoals } from './GoalsContext';
import { GoalCard } from './GoalCard';
import { buttonPrimary } from '@/styles/buttonStyles';
import { GoalWizardModal } from './GoalWizardModal';
import { GoalDetailModal } from './GoalDetailsModal';
import { useRouter, useSearchParams } from 'next/navigation';

const containerCss = css`
  padding: 2rem;
  background-color: var(--color-bg);
  min-height: 100vh;
`;

const headerCss = css`
  font-size: var(--h1-size);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
`;

const gridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
`;

export const GoalsOverview = () => {
  const { goals } = useGoals();
  const [showWizard, setShowWizard] = useState(false);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync goalId from URL
  useEffect(() => {
    const id = searchParams.get('goalId');
    if (id) {
      setGoalId(id);
      setShowModal(true); // manually trigger modal
    } else {
      setGoalId(null);
      setShowModal(false);
    }
  }, [searchParams]);

  const handleGoalClick = (id: string) => {
    router.push(`/goals?goalId=${id}`);
  };

  return (
    <>
      <div css={containerCss}>
        <h1 css={headerCss}>My Goals</h1>
        <button
          css={[buttonPrimary, { marginBottom: '1rem' }]}
          onClick={() => setShowWizard(true)}
        >
          Add New Goal
        </button>
        {showWizard && <GoalWizardModal onClose={() => setShowWizard(false)} />}

        <div css={gridCss}>
          {goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} onClick={() => handleGoalClick(goal._id)} />
          ))}
        </div>
      </div>

      {showModal && goalId && (
        <GoalDetailModal goalId={goalId} />
      )}
    </>
  );
};

