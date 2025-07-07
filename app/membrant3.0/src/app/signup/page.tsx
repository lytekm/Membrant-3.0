/** @jsxImportSource @emotion/react */
'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/globalContexts/UserContext';
import { css } from '@emotion/react';

const container = css`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const inputStyle = css`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.75rem;
  border: 1px solid #bbb;
  border-radius: 4px;
`;
const buttonStyle = css`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #0070f3;
  color: white;
  cursor: pointer;
`;

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div css={container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            css={inputStyle}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            css={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            css={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button css={buttonStyle} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
