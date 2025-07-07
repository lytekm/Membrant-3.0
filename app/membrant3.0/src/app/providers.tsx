// src/app/providers.tsx
'use client';

import { ReactNode } from 'react';
import { ErrorProvider } from '@/globalContexts/errorContext';
import { AuthProvider } from '@/globalContexts/UserContext';
import { PomodoroProvider } from '@/globalContexts/PomodoroContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
  <ErrorProvider>
    <AuthProvider>
      <PomodoroProvider>
        {children}
      </PomodoroProvider>
    </AuthProvider>
  </ErrorProvider>
  );
}
