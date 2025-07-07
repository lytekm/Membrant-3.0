// src/api/services/calendarItemService.ts
import { API_BASE } from '../base';
import { CalendarItem } from '@/Types/Types';

export const getCalendarItems = async (
  showError: (msg: string) => void
): Promise<CalendarItem[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/calendaritems`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch calendar items');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching calendar items');
    return [];
  }
};

export const getCalendarItem = async (
  showError: (msg: string) => void,
  id: string
): Promise<CalendarItem | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/calendaritems/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Calendar item not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching calendar item');
    return null;
  }
};

export const createCalendarItem = async (
  showError: (msg: string) => void,
  payload: Omit<CalendarItem, 'id'>
): Promise<CalendarItem | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/calendaritems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create calendar item');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating calendar item');
    return null;
  }
};

export const updateCalendarItem = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<CalendarItem, 'id'>>
): Promise<CalendarItem | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/calendaritems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update calendar item');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating calendar item');
    return null;
  }
};

export const deleteCalendarItem = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/calendaritems/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete calendar item');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting calendar item');
    return false;
  }
};
