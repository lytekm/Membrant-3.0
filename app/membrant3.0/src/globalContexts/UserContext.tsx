// src/context/UserContext.tsx
'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from 'react';
import { User } from '@/Types/Types';
import { API_BASE } from '../api/base';
import { useError } from './errorContext';

interface AuthContextType {
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showError } = useError();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem('token');
          throw new Error('Session expired');
        }
        const data: User = await res.json();
        setUser(data);
      })
      .catch((err) => showError(err.message));
  }, [showError]);

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        showError(err.message || 'Signup failed');
        return false;
      }
      const { user: u, token } = (await res.json()) as {
        user: User;
        token: string;
      };
      localStorage.setItem('token', token);
      setUser(u);
      return true;
    } catch {
      showError('Network error during signup');
      return false;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        showError(err.message || 'Login failed');
        return false;
      }
      const { user: u, token } = (await res.json()) as {
        user: User;
        token: string;
      };
      localStorage.setItem('token', token);
      setUser(u);
      return true;
    } catch {
      showError('Network error during login');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      /* ignore */
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
