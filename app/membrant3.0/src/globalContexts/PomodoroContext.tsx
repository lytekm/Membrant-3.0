/** contexts/PomodoroContext.tsx */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import PomodoroModal from '@/components/Pomodoro';

// 1) Shape of our context
interface PomodoroContextProps {
  // If true, the Pomodoro modal is visible
  isOpen: boolean;
  // The title shown in the Pomodoro (usually the task title)
  title: string;
  // Call to open the modal with a given title
  openTimer: (taskTitle: string) => void;
  // Call to close/hide the modal
  closeTimer: () => void;
}

// 2) Create the context with default stubs
const PomodoroContext = createContext<PomodoroContextProps>({
  isOpen: false,
  title: '',
  openTimer: () => {},
  closeTimer: () => {},
});

// 3) Provider component
export const PomodoroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const openTimer = (taskTitle: string) => {
    setTitle(taskTitle);
    setIsOpen(true);
  };

  const closeTimer = () => {
    setIsOpen(false);
    setTitle('');
  };

  return (
    <PomodoroContext.Provider value={{ isOpen, title, openTimer, closeTimer }}>
      {children}
      {/* Render the PomodoroModal once, at the top level.
          Only show it when isOpen === true. */}
      {isOpen && (
        <PomodoroModal
          title={title}
          // If your PomodoroModal accepts an onClose prop, you can pass closeTimer.
          // Otherwise, you could add a “close” button inside PomodoroModal that calls context.closeTimer().
          // For example:
          onClose={() => closeTimer()}
        />
      )}
    </PomodoroContext.Provider>
  );
};

// 4) Custom hook for consumers
export const usePomodoro = () => useContext(PomodoroContext);
