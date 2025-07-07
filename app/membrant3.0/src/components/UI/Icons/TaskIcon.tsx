import React from 'react';

export interface ListTaskIconProps {
  /**
   * The color of the icon. Defaults to 'currentColor'.
   */
  color?: string;
  /**
   * The width and height of the icon. Defaults to 16.
   */
  size?: number | string;
}

/**
 * A reusable ListTask icon component.
 */
export const ListTaskIcon: React.FC<ListTaskIconProps> = ({
  color = 'currentColor',
  size = 16,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill={color}
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
  >
    <path d="M14.563,17.167l7.468,-7.468l2.61,2.61l-10.107,10.107l-6.359,-6.358l2.64,-2.64l3.748,3.749Zm41.456,0.806l-27.993,0l0,-3.969l27.993,0l0,3.969Z" />
    <path d="M14.563,17.167l7.468,-7.468l2.61,2.61l-10.107,10.107l-6.359,-6.358l2.64,-2.64l3.748,3.749Zm41.456,0.806l-27.993,0l0,-3.969l27.993,0l0,3.969Z" />
    <path d="M14.563,49.167l7.468,-7.468l2.61,2.61l-10.107,10.107l-6.359,-6.358l2.64,-2.64l3.748,3.749Zm41.456,0.806l-27.993,0l0,-3.969l27.993,0l0,3.969Z" />
    <path d="M14.563,49.167l7.468,-7.468l2.61,2.61l-10.107,10.107l-6.359,-6.358l2.64,-2.64l3.748,3.749Zm41.456,0.806l-27.993,0l0,-3.969l27.993,0l0,3.969Z" />
    <path d="M14.563,33.167l7.468,-7.468l2.61,2.61l-10.107,10.107l-6.359,-6.358l2.64,-2.64l3.748,3.749Zm41.456,0.806l-27.993,0l0,-3.969l27.993,0l0,3.969Z" />
    <path d="M14.563,33.167l7.468,-7.468l2.61,2.61l-10.107,10.107l-6.359,-6.358l2.64,-2.64l3.748,3.749Zm41.456,0.806l-27.993,0l0,-3.969l27.993,0l0,3.969Z" />
  </svg>
);
