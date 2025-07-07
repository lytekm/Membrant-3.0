/** @jsxImportSource @emotion/react */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from 'react';
import { css, keyframes } from '@emotion/react';

// --- Types ---
interface ErrorContextType {
  showError: (message: string) => void;
}

interface ErrorProviderProps {
  children: ReactNode;
}

// --- Create context ---
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// --- Provider ---
export const ErrorProvider: FC<ErrorProviderProps> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
  };
  const hideError = () => {
    setErrorMessage(null);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errorMessage && (
        <ErrorModal message={errorMessage} onClose={hideError} />
      )}
    </ErrorContext.Provider>
  );
};

// --- Hook to consume ---
export const useError = (): ErrorContextType => {
  const ctx = useContext(ErrorContext);
  if (!ctx) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return ctx;
};

// --- Modal Component ---
interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const overlayStyle = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 200ms ease-out;
  z-index: 1000;
`;

const modalStyle = css`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const buttonStyle = css`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #0070f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorModal: FC<ErrorModalProps> = ({ message, onClose }) => (
  <div css={overlayStyle} onClick={onClose}>
    <div css={modalStyle} onClick={e => e.stopPropagation()}>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button css={buttonStyle} onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);
