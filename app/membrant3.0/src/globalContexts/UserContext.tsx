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
import { api } from '../api/base';
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

    api.get<User>('/auth/me')
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        showError('Session expired');
      });
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await api.post<{ user: User; token: string }>('/auth/signup', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err: any) {
      showError(err?.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await api.post<{ user: User; token: string }>('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err: any) {
      showError(err?.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore errors on logout
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
