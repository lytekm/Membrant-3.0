/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface ProgressBarProps {
  percent: number;
  /** When true, render a circular progress indicator */
  circular?: boolean;
  /** Diameter (px) of the circle; only applies when circular=true */
  size?: number;
  /** Stroke width (px) of the circle; only applies when circular=true */
  strokeWidth?: number;
}

const containerStyle = css`
  width: 100%;
  background: #ddd;
  border-radius: 4px;
  overflow: hidden;
  height: 8px;
  margin: 0.5rem 0;
`;

const fillerStyle = (percent: number) => css`
  width: ${percent}%;
  height: 100%;
  background: #0070f3;
  transition: width 0.3s ease;
`;

const circularWrapperStyle = (size: number) => css`
  width: ${size}px;
  height: ${size}px;
  margin: 0.5rem 0;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  circular = false,
  size = 50,
  strokeWidth = 8,
}) => {

  if (!circular) {
    // Linear bar
    return (
      <div css={containerStyle}>
        <div css={fillerStyle(percent)} />
      </div>
    );
  }

  // Circular indicator
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div css={circularWrapperStyle(size)}>
      <svg width={size} height={size}>
        {/* background circle */}
        <circle
          stroke="#ddd"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={cx}
          cy={cy}
          transform={`rotate(90 ${cx} ${cy})`}
        />
        {/* foreground progress circle */}
        <circle
          stroke="#0070f3"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={cx}
          cy={cy}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform={`rotate(90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
    </div>
  );
};
