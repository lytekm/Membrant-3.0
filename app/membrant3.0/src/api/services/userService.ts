// src/api/services/userService.ts
import { API_BASE } from '../base';
import { User } from '@/Types/Types';

export const getUsers = async (
  showError: (msg: string) => void
): Promise<User[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/users`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch users');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching users');
    return [];
  }
};

export const getUser = async (
  showError: (msg: string) => void,
  id: string
): Promise<User | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/users/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'User not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching user');
    return null;
  }
};

export const createUser = async (
  showError: (msg: string) => void,
  payload: Omit<User, 'id'>
): Promise<User | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create user');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating user');
    return null;
  }
};

export const updateUser = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<User, 'id'>>
): Promise<User | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update user');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating user');
    return null;
  }
};

export const deleteUser = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete user');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting user');
    return false;
  }
};
