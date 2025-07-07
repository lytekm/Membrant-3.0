import React from 'react';

export interface HomeIconProps {
  /**
   * The fill color of the icon. Defaults to 'currentColor'.
   */
  color?: string;
  /**
   * The width and height of the icon (in pixels or any valid CSS size unit). Defaults to 16.
   */
  size?: number | string;
}

/**
 * A reusable Home icon component.
 */
export const HomeIcon: React.FC<HomeIconProps> = ({
  color = 'currentColor',
  size = 16,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
      fill={color}
    />
  </svg>
);
