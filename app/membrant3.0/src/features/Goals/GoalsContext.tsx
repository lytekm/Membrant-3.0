"use client";

/** @jsxImportSource @emotion/react */
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';
import { Goal } from '@/features/Goals/types';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal as updateGoalAPI,
  deleteGoal as deleteGoalAPI,
} from '@/api/services/goalService';

import { useError } from '@/globalContexts/errorContext';
import { useAuth } from '@/globalContexts/UserContext';

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Goal) => Promise<void>;
  updateGoal: (goalId: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  getGoalById: (goalId: string) => Goal | undefined;
  resetGoals: () => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const { showError } = useError();
  const { user } = useAuth();

  // Load goals from API on mount
  useEffect(() => {
    (async () => {
      const fetchedGoals = await getGoals(showError);
      setGoals(fetchedGoals);
    })();
  }, []);

  const addGoal = async (goal: Goal) => {
    const newGoal = await createGoal(showError, goal);
    if (newGoal) {
      setGoals((prev) => [...prev, newGoal]);
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    const updated = await updateGoalAPI(showError, goalId, updates);
    if (updated) {
      setGoals((prev) =>
        prev.map((g) => (g._id === goalId ? { ...g, ...updated } : g))
      );
    }
  };

  const deleteGoal = async (goalId: string) => {
    const success = await deleteGoalAPI(showError, goalId);
    if (success) {
      setGoals((prev) => prev.filter((g) => g._id !== goalId));
    }
  };

  const getGoalById = (goalId: string) => {
    return goals.find((g) => g._id === goalId);
  };

  const resetGoals = () => setGoals([]);

  const value = useMemo(
    () => ({
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      getGoalById,
      resetGoals,
    }),
    [goals]
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
};

export const useGoals = (): GoalsContextType => {
  const context = useContext(GoalsContext);
  if (!context) throw new Error('useGoals must be used within a GoalsProvider');
  return context;
};
