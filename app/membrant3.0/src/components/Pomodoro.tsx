/** PomodoroModal.tsx */
/** @jsxImportSource @emotion/react */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';

// ——— CONFIGURABLE DURATIONS (in seconds) ———
// You can also turn these into props if you want them dynamic.
const FOCUS_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

// —— Helper to convert seconds → "MM:SS" string
function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const pad = (n: number) => (n < 10 ? '0' + n : n);
  return `${pad(m)}:${pad(s)}`;
}

interface PomodoroModalProps {
  title: string;
  onClose: () => void;
}

const closeButtonStyle = css`
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  background: none;
  border: none;
  font-size: var(--h3-size);
  cursor: pointer;
  color: var(--color-surface);

  &:hover {
    color: var(--color-danger);
  }
`;

const PomodoroModal: React.FC<PomodoroModalProps> = ({ title, onClose }) => {
  // —— State for minimized vs big
  const [isMinimized, setIsMinimized] = useState(false);

  // —— State for dragging
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const draggingRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // —— Timing & controls
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [remainingSeconds, setRemainingSeconds] = useState(FOCUS_DURATION);
  const [isPaused, setIsPaused] = useState(true);

  // —— Decrement timer every second when not paused
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (mode === 'focus') {
            setMode('break');
            return BREAK_DURATION;
          } else {
            setMode('focus');
            return FOCUS_DURATION;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, mode]);

  // —— Handlers for Pause, Restart, Skip
  const handlePauseResume = () => {
    setIsPaused((p) => !p);
  };
  const handleRestart = () => {
    setIsPaused(true);
    if (mode === 'focus') {
      setRemainingSeconds(FOCUS_DURATION);
    } else {
      setRemainingSeconds(BREAK_DURATION);
    }
  };
  const handleSkip = () => {
    setIsPaused(true);
    if (mode === 'focus') {
      setMode('break');
      setRemainingSeconds(BREAK_DURATION);
    } else {
      setMode('focus');
      setRemainingSeconds(FOCUS_DURATION);
    }
  };

  // —— Dragging logic
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - draggingRef.current.startX;
    const dy = e.clientY - draggingRef.current.startY;
    setPosition({
      x: draggingRef.current.origX + dx,
      y: draggingRef.current.origY + dy,
    });
  }, []);
  const onMouseUp = useCallback(() => {
    draggingRef.current = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  // —— Toggle minimized ↔ big
  const toggleMinimize = () => {
    setIsMinimized((m) => !m);
  };

  // —— Calculate SVG circle progress
  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progress =
    1 -
    remainingSeconds /
      (mode === 'focus' ? FOCUS_DURATION : BREAK_DURATION);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      css={css`
        position: fixed;
        top: ${position.y}px;
        left: ${position.x}px;
        z-index: 1000;
        user-select: none;
      `}
      onMouseDown={onMouseDown} // Entire modal is the drag handle
    >
      <div
        css={css`
          position: relative;
          background: var(--color-text-primary);
          color: var(--color-surface);
          box-shadow: var(--shadow-md);
          border-radius: ${isMinimized
            ? 'var(--radius-lg)'
            : 'var(--radius-lg)'};
          width: ${isMinimized ? '260px' : '320px'};
          height: ${isMinimized ? '60px' : '320px'};
          display: flex;
          flex-direction: ${isMinimized ? 'row' : 'column'};
          align-items: center;
          justify-content: ${isMinimized
            ? 'space-between'
            : 'center'};
          padding: ${isMinimized
            ? '0 var(--space-md)'
            : 'var(--space-lg)'};
          transition: width 0.3s ease, height 0.3s ease,
            border-radius 0.3s ease, flex-direction 0.3s ease,
            padding 0.3s ease;
        `}
      >
        {/* Close Button */}
        <button
          css={closeButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close Pomodoro"
        >
          ×
        </button>

        {/* Title only when expanded */}
        {!isMinimized && (
          <div
            css={css`
              font-size: var(--h2-size);
              font-weight: 700;
              margin-bottom: var(--space-md);
            `}
          >
            {title}
          </div>
        )}

        {/* SVG Circular Timer */}
        <div
          css={css`
            position: relative;
            width: ${isMinimized ? '48px' : '120px'};
            height: ${isMinimized ? '48px' : '120px'};
            margin-bottom: ${isMinimized
              ? '0'
              : 'var(--space-lg)'};
            flex-shrink: 0;
          `}
        >
          <svg width="100%" height="100%" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="var(--color-text-secondary)"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={
                mode === 'focus'
                  ? 'var(--color-accent)'
                  : 'var(--color-success)'
              }
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          </svg>
          {/* Time text */}
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: ${isMinimized
                ? 'var(--caption-size)'
                : 'var(--h3-size)'};
              font-weight: 500;
              color: var(--color-surface);
            `}
          >
            {formatTime(remainingSeconds)}
          </div>
        </div>

        {/* Controls Row */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-md);
            flex-direction: row;
            ${isMinimized ? 'margin-left: var(--space-xs);' : ''}
          `}
        >
          {/* Expand/Minimize Toggle */}
          {isMinimized ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize();
              }}
              css={css`
                background: none;
                border: none;
                cursor: pointer;
                font-size: var(--body-size);
                color: var(--color-surface);
              `}
            >
              🔼
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize();
              }}
              css={css`
                background: none;
                border: none;
                cursor: pointer;
                font-size: var(--body-size);
                color: var(--color-surface);
              `}
            >
              🔽
            </button>
          )}

          {/* Pause/Resume */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePauseResume();
            }}
            css={css`
              background: none;
              border: none;
              cursor: pointer;
              font-size: var(--body-size);
              color: var(--color-surface);
            `}
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>

          {/* Skip */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            css={css`
              background: none;
              border: none;
              cursor: pointer;
              font-size: var(--body-size);
              color: var(--color-surface);
            `}
          >
            ⏭️
          </button>

          {/* Only show Restart when in big mode */}
          {!isMinimized && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRestart();
              }}
              css={css`
                background: none;
                border: none;
                cursor: pointer;
                font-size: var(--body-size);
                color: var(--color-surface);
              `}
            >
              🔄
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PomodoroModal;
