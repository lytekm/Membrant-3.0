// src/api/services/noteService.ts
import { API_BASE } from '../base';
import { Note } from '@/Types/Types';

export const getNotes = async (
  showError: (msg: string) => void
): Promise<Note[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/notes`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch notes');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching notes');
    return [];
  }
};

export const getNote = async (
  showError: (msg: string) => void,
  id: string
): Promise<Note | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/notes/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Note not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching note');
    return null;
  }
};

export const createNote = async (
  showError: (msg: string) => void,
  payload: Omit<Note, 'id'>
): Promise<Note | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create note');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating note');
    return null;
  }
};

export const updateNote = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Omit<Note, 'id'>>
): Promise<Note | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update note');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating note');
    return null;
  }
};

export const deleteNote = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/notes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete note');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting note');
    return false;
  }
};
