// src/api/services/longTermGoalService.ts
import { API_BASE } from '../base';
import { LongTermGoal } from '@/Types/Types';

export const getLongTermGoals = async (
  showError: (msg: string) => void
): Promise<LongTermGoal[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/longtermgoals`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch goals');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching goals');
    return [];
  }
};

export const getLongTermGoal = async (
  showError: (msg: string) => void,
  id: string
): Promise<LongTermGoal | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/longtermgoals/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Goal not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching goal');
    return null;
  }
};

export const createLongTermGoal = async (
  showError: (msg: string) => void,
  payload: Omit<LongTermGoal, 'id'>
): Promise<LongTermGoal | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/longtermgoals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create goal');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating goal');
    return null;
  }
};

export const updateLongTermGoal = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<LongTermGoal, 'id'>>
): Promise<LongTermGoal | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/longtermgoals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update goal');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating goal');
    return null;
  }
};

export const deleteLongTermGoal = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/longtermgoals/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete goal');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting goal');
    return false;
  }
};
