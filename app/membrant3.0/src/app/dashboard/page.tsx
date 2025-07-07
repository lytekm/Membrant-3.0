/** DashboardPage.tsx */
/** @jsxImportSource @emotion/react */
'use client';


import React from 'react';
import { css } from '@emotion/react';
import { useAuth } from '@/globalContexts/UserContext';

const pageStyle = css`
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  // gap: var(--space-xl);
`;

const greetingStyle = css`
  margin-bottom: var(--space-lg);
  font-size: var(--h2-size);
  font-weight: 500;
`;

const fullWidth = css`
  width: 100%;
`;

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const name = user?.name ?? 'there';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div css={pageStyle}>
      <h1 css={greetingStyle}>
        {getGreeting()}, {name}
      </h1>
    </div>
  );
};

export default DashboardPage;
