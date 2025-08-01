import { api } from '../base';
import { Goal } from '@/features/Goals/types';

export const getGoals = async (
  showError: (msg: string) => void
): Promise<Goal[]> => {
  try {
    const res = await api.get<Goal[]>('/goals');
    return res.data;
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Failed to fetch goals');
    return [];
  }
};

export const getGoal = async (
  showError: (msg: string) => void,
  id: string
): Promise<Goal | null> => {
  try {
    const res = await api.get<Goal>(`/goals/${id}`);
    return res.data;
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Goal not found');
    return null;
  }
};

export const createGoal = async (
  showError: (msg: string) => void,
  payload: Goal
): Promise<Goal | null> => {
  console.log(payload);
  try {
    const res = await api.post<Goal>('/goals', payload);
    return res.data;
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Failed to create goal');
    return null;
  }
};

export const updateGoal = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<Goal, '_id' | 'createdAt' | 'updatedAt'>>
): Promise<Goal | null> => {
  try {
    const res = await api.put<Goal>(`/goals/${id}`, payload);
    return res.data;
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Failed to update goal');
    return null;
  }
};

export const deleteGoal = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    await api.delete(`/goals/${id}`);
    return true;
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Failed to delete goal');
    return false;
  }
};
