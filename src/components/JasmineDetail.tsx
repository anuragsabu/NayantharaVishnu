/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * JASMINE BOTANICAL DETAIL (MULLAPPOO)
 * A delicate Kerala jasmine botanical accent near the main wedding announcement.
 * Fades into view with a subtle 1-2px natural movement upon reveal, then remains still.
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface JasmineDetailProps {
  className?: string;
}

export const JasmineDetail: React.FC<JasmineDetailProps> = ({ className = '' }) => {
  const { isNight } = useTheme();

  const stemColor = isNight ? '#DFC794' : '#9B7E46';
  const petalFill = isNight ? '#FDFBF7' : '#FFFFFA';
  const petalStroke = isNight ? '#D8C5A2' : '#C4B599';
  const centerGold = isNight ? '#F5C26B' : '#D4A034';

  return (
    <div
      aria-hidden="true"
      className={`inline-flex items-center justify-center pointer-events-none select-none animate-jasmine-reveal ${className}`}
    >
      <svg
        width="54"
        height="26"
        viewBox="0 0 54 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        {/* Slender curved jasmine vine stem */}
        <path
          d="M3 14 C15 11, 38 11, 51 14"
          stroke={stemColor}
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Small tender leaves */}
        <path
          d="M14 12 C11 8, 8 9, 10 13 Z"
          fill={isNight ? 'rgba(223, 199, 148, 0.4)' : 'rgba(155, 126, 70, 0.35)'}
          stroke={stemColor}
          strokeWidth="0.5"
        />
        <path
          d="M40 12 C43 8, 46 9, 44 13 Z"
          fill={isNight ? 'rgba(223, 199, 148, 0.4)' : 'rgba(155, 126, 70, 0.35)'}
          stroke={stemColor}
          strokeWidth="0.5"
        />

        {/* Left Jasmine Flower (Open 5-Petal Star) */}
        <g transform="translate(19, 11)">
          {/* Petals */}
          <path d="M0 0 C-2 -6, 2 -6, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C-6 -2, -6 2, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C-4 5, -1 6, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C4 5, 1 6, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C6 -2, 6 2, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          {/* Flower Golden Heart */}
          <circle cx="0" cy="0" r="1.1" fill={centerGold} />
        </g>

        {/* Center Jasmine Flower (Slightly larger bud/flower) */}
        <g transform="translate(27, 9)">
          <path d="M0 0 C-2.5 -7, 2.5 -7, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.6" />
          <path d="M0 0 C-7 -2, -7 2, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.6" />
          <path d="M0 0 C-4.5 6, -1 7, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.6" />
          <path d="M0 0 C4.5 6, 1 7, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.6" />
          <path d="M0 0 C7 -2, 7 2, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="1.3" fill={centerGold} />
        </g>

        {/* Right Jasmine Flower */}
        <g transform="translate(35, 11)">
          <path d="M0 0 C-2 -6, 2 -6, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C-6 -2, -6 2, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C-4 5, -1 6, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C4 5, 1 6, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <path d="M0 0 C6 -2, 6 2, 0 0 Z" fill={petalFill} stroke={petalStroke} strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.1" fill={centerGold} />
        </g>
      </svg>
    </div>
  );
};
