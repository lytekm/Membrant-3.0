"use client";

/** @jsxImportSource @emotion/react */
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Goal } from '@/features/Goals/types';

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, '_id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
  getGoalById: (goalId: string) => Goal | undefined;
  resetGoals: () => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (goal: Omit<Goal, '_id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goal,
      _id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) =>
        g._id === goalId
          ? {
              ...g,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : g
      )
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g._id !== goalId));
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
