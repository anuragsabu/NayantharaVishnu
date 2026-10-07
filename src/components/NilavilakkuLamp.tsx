/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIGNATURE TEMPLE LAMP (NILAVILAKKU)
 * A bespoke vector Kerala brass oil lamp with realistic gentle flame animation.
 * Tapping the lamp transitions the atmosphere between daytime ceremony and night temple.
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface NilavilakkuLampProps {
  size?: 'normal' | 'compact' | 'closing';
  showInteractiveHint?: boolean;
}

export const NilavilakkuLamp: React.FC<NilavilakkuLampProps> = ({
  size = 'normal',
  showInteractiveHint = true,
}) => {
  const { isNight, flameState, toggleTheme, isReducedMotion } = useTheme();

  // Width and height based on size variant
  const dimensions = {
    normal: { width: 140, height: 260 },
    compact: { width: 90, height: 170 },
    closing: { width: 120, height: 220 },
  }[size];

  const flameOpacity =
    flameState === 'out'
      ? 0
      : flameState === 'extinguishing'
      ? 0.25
      : flameState === 'kindling'
      ? 0.7
      : 0.95;

  const flameScale =
    flameState === 'out'
      ? 0
      : flameState === 'extinguishing'
      ? 0.35
      : flameState === 'kindling'
      ? 0.65
      : 1;

  const brassStroke = isNight ? '#C7AA71' : '#9B7E46';
  const brassHighlight = isNight ? '#DFC794' : '#C4A76E';
  const brassShadow = isNight ? '#8C713D' : '#6A5328';

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isNight ? 'Relight the temple lamp' : 'Extinguish lamp to enter night temple'}
        className="relative group cursor-pointer p-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46] transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Soft Ambient Radial Light Behind Flame */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full pointer-events-none transition-opacity duration-1000"
          style={{
            background: isNight
              ? 'radial-gradient(circle, rgba(240, 168, 78, 0.18) 0%, rgba(220, 140, 50, 0.05) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(235, 160, 60, 0.14) 0%, rgba(235, 160, 60, 0.03) 45%, transparent 70%)',
            opacity: flameState === 'out' ? 0 : 1,
          }}
        />

        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 140 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Antique Brass Gradient */}
            <linearGradient id={`brassGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={brassShadow} />
              <stop offset="25%" stopColor={brassHighlight} />
              <stop offset="50%" stopColor={brassStroke} />
              <stop offset="75%" stopColor={brassHighlight} />
              <stop offset="100%" stopColor={brassShadow} />
            </linearGradient>

            {/* Sacred Oil Flame Gradient */}
            <linearGradient id="sacredFlameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#E65100" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#F57C00" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FFB300" stopOpacity="1" />
              <stop offset="90%" stopColor="#FFF9C4" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>

            {/* Flame Inner Core */}
            <radialGradient id="flameInnerCore" cx="50%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFF176" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFA000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ================= FLAME (Sacred Wick & Teardrop Flame) ================= */}
          <g
            className={!isReducedMotion && flameState === 'burning' ? 'flame-burning' : ''}
            style={{
              transformOrigin: '70px 42px',
              transition: isReducedMotion
                ? 'none'
                : 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: flameOpacity,
              transform: `scale(${flameScale})`,
            }}
          >
            {/* Outer Subtle Flame Glow */}
            <path
              d="M70 12 C74 24, 82 28, 80 38 C78 46, 62 46, 60 38 C58 28, 66 24, 70 12 Z"
              fill="url(#sacredFlameGrad)"
              opacity="0.95"
            />
            {/* Inner Core Bright Light */}
            <path
              d="M70 20 C72 27, 77 30, 76 37 C75 42, 65 42, 64 37 C63 30, 68 27, 70 20 Z"
              fill="url(#flameInnerCore)"
            />
            {/* Wick Thread (Thiri) */}
            <line
              x1="70"
              y1="37"
              x2="70"
              y2="44"
              stroke="#2B1A09"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>

          {/* ================= BRASS FINIAL / CROWNING BUD (Pravu) ================= */}
          {/* Top Lotus Bud Tip */}
          <path
            d="M70 43 C71.5 45, 73 47, 73 49 C73 51, 71 52, 70 52 C69 52, 67 51, 67 49 C67 47, 68.5 45, 70 43 Z"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="0.6"
          />

          {/* Finial Stem & Tiered Collar */}
          <path
            d="M66 52 H74 V56 H66 Z"
            fill={`url(#brassGrad-${size})`}
          />
          <line x1="64" y1="56" x2="76" y2="56" stroke={brassStroke} strokeWidth="1" />

          {/* ================= OIL DISH (THATTU) ================= */}
          {/* Flared Rim Lip */}
          <path
            d="M26 63 C26 60, 44 58, 70 58 C96 58, 114 60, 114 63 C114 67, 96 71, 70 71 C44 71, 26 67, 26 63 Z"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="0.8"
          />

          {/* Inner Well of the Oil Basin */}
          <ellipse
            cx="70"
            cy="62.5"
            rx="40"
            ry="4.5"
            fill="none"
            stroke={brassHighlight}
            strokeWidth="0.75"
            strokeDasharray="1.5 2"
          />

          {/* Beaded Oil Basin Underside Curves */}
          <path
            d="M32 64 C36 73, 52 79, 70 79 C88 79, 104 73, 108 64"
            fill="none"
            stroke={brassStroke}
            strokeWidth="1.2"
          />
          <path
            d="M42 75 C50 82, 60 84, 70 84 C80 84, 90 82, 98 75"
            fill="none"
            stroke={brassHighlight}
            strokeWidth="0.9"
          />

          {/* Decorative Wick Notches (Koodu) */}
          <circle cx="34" cy="63.5" r="1.5" fill={brassShadow} />
          <circle cx="106" cy="63.5" r="1.5" fill={brassShadow} />
          <circle cx="50" cy="65.5" r="1.2" fill={brassShadow} />
          <circle cx="90" cy="65.5" r="1.2" fill={brassShadow} />
          <circle cx="70" cy="66.5" r="1.5" fill={brassShadow} />

          {/* ================= SLENDER BRASS STEM (THANDU) ================= */}
          {/* Upper Neck Baluster */}
          <path
            d="M62 84 C62 86, 64 88, 64 92 C64 98, 60 102, 60 106 H80 C80 102, 76 98, 76 92 C76 88, 78 86, 78 84 Z"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="0.8"
          />

          {/* Central Ornamental Ribbed Node (Mani) */}
          <ellipse
            cx="70"
            cy="114"
            rx="14"
            ry="7.5"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="1"
          />
          <line x1="57" y1="114" x2="83" y2="114" stroke={brassHighlight} strokeWidth="0.8" />
          <circle cx="70" cy="114" r="2.2" fill={brassShadow} />

          {/* Lower Stem Column */}
          <path
            d="M63 121 C63 127, 60 136, 59 154 H81 C80 136, 77 127, 77 121 Z"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="0.8"
          />

          {/* Architectural Turned Rings on Stem */}
          <line x1="62" y1="131" x2="78" y2="131" stroke={brassShadow} strokeWidth="1" />
          <line x1="61" y1="133" x2="79" y2="133" stroke={brassHighlight} strokeWidth="0.8" />
          <line x1="60" y1="145" x2="80" y2="145" stroke={brassShadow} strokeWidth="1" />
          <line x1="59.5" y1="147" x2="80.5" y2="147" stroke={brassHighlight} strokeWidth="0.8" />

          {/* Lower Baluster Node */}
          <ellipse
            cx="70"
            cy="161"
            rx="16"
            ry="7"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="1"
          />

          {/* ================= PEDESTAL BASE (PEEDAM) ================= */}
          {/* Bell-shaped Spreading Flange */}
          <path
            d="M57 167 C54 182, 38 198, 22 216 H118 C102 198, 86 182, 83 167 Z"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="1"
          />

          {/* Base Concentric Ornamental Relief Ridges */}
          <path
            d="M32 204 C44 208, 57 210, 70 210 C83 210, 96 208, 108 204"
            fill="none"
            stroke={brassHighlight}
            strokeWidth="1"
          />
          <path
            d="M26 211 C40 216, 55 218, 70 218 C85 218, 100 216, 114 211"
            fill="none"
            stroke={brassShadow}
            strokeWidth="1.2"
          />

          {/* Plinth Base Foot (Padam) */}
          <path
            d="M18 217 H122 V226 C122 228, 120 230, 117 230 H23 C20 230, 18 228, 18 226 Z"
            fill={`url(#brassGrad-${size})`}
            stroke={brassStroke}
            strokeWidth="1"
          />
          <line x1="16" y1="222" x2="124" y2="222" stroke={brassHighlight} strokeWidth="1" />

          {/* Subtle Ground Shadow */}
          <ellipse
            cx="70"
            cy="234"
            rx="56"
            ry="4.5"
            fill={isNight ? 'rgba(0,0,0,0.45)' : 'rgba(125, 117, 108, 0.16)'}
          />
        </svg>
      </button>

      {/* Atmospheric Interactive Hint */}
      {showInteractiveHint && (
        <p
          className="mt-2 text-[11px] tracking-[0.22em] uppercase font-sans-ui transition-colors duration-700 opacity-60 hover:opacity-90"
          style={{ color: isNight ? '#C7AA71' : '#7D756C' }}
        >
          {isNight ? '✦ Tap lamp to rekindle daylight' : '✦ Tap lamp to awaken night temple'}
        </p>
      )}
    </div>
  );
};
