// src/api/services/taskService.ts
import { API_BASE } from '../base';
import { Task } from '@/Types/Types';

export const getTasks = async (
  showError: (msg: string) => void
): Promise<Task[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch tasks');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching tasks');
    return [];
  }
};

export const getTask = async (
  showError: (msg: string) => void,
  id: string
): Promise<Task | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Task not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching task');
    return null;
  }
};

export const createTask = async (
  showError: (msg: string) => void,
  payload: Omit<Task, '_id'>
): Promise<Task | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create task');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating task');
    return null;
  }
};

export const updateTask = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<Task, 'id'>>
): Promise<Task | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update task');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating task');
    return null;
  }
};

export const deleteTask = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete task');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting task');
    return false;
  }
};
