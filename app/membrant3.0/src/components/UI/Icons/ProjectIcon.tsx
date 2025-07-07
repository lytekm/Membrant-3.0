import React from 'react';

export interface WindowIconProps {
  /**
   * The fill color of the icon. Defaults to 'currentColor'.
   */
  color?: string;
  /**
   * The width and height of the icon. Defaults to 24.
   */
  size?: number | string;
}

/**
 * A reusable window/dashboard icon component.
 */
export const ProjectIcon: React.FC<WindowIconProps> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 7.00013H15V12.0001H9V7.00013ZM10.5 8.50013V10.5001H13.5V8.50013H10.5Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 4.00024H6V6.00016H4V7.50016H6V11.0112H4V12.5112H6V16.0223H4V17.5223H6V20.0002H18V4.00024ZM7.5 5.50024V18.5002H16.5V5.50024H7.5Z"
      fill={color}
    />
  </svg>
);
