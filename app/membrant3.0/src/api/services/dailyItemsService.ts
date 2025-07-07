import { API_BASE } from '../base';
import { DailyItem } from '@/Types/Types';

export const getDailyItems = async (
  showError: (msg: string) => void
): Promise<DailyItem[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/dailyitems`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch daily items');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching daily items');
    return [];
  }
};

export const getDailyItem = async (
  showError: (msg: string) => void,
  id: string
): Promise<DailyItem | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/dailyitems/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Daily item not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching daily item');
    return null;
  }
};

export const createDailyItem = async (
  showError: (msg: string) => void,
  payload: Omit<DailyItem, '_id'>
): Promise<DailyItem | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/dailyitems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create daily item');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating daily item');
    return null;
  }
};

export const updateDailyItem = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<DailyItem, 'id'>>
): Promise<DailyItem | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/dailyitems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update daily item');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating daily item');
    return null;
  }
};

export const deleteDailyItem = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/dailyitems/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete daily item');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting daily item');
    return false;
  }
};
