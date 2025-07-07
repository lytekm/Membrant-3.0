// src/api/services/projectService.ts
import { API_BASE } from '../base';
import { Project } from '@/Types/Types';

export const getProjects = async (
  showError: (msg: string) => void
): Promise<Project[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to fetch projects');
      return [];
    }
    return await res.json();
  } catch {
    showError('Network error while fetching projects');
    return [];
  }
};

export const getProject = async (
  showError: (msg: string) => void,
  id: string
): Promise<Project | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`);
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Project not found');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while fetching project');
    return null;
  }
};

export const createProject = async (
  showError: (msg: string) => void,
  payload: Omit<Project, '_id'>
): Promise<Project | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to create project');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while creating project');
    return null;
  }
};

export const updateProject = async (
  showError: (msg: string) => void,
  id: string,
  payload: Partial<Project>
): Promise<Project | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to update project');
      return null;
    }
    return await res.json();
  } catch {
    showError('Network error while updating project');
    return null;
  }
};

export const deleteProject = async (
  showError: (msg: string) => void,
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      showError(err.message || 'Failed to delete project');
      return false;
    }
    return true;
  } catch {
    showError('Network error while deleting project');
    return false;
  }
};
