/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NIGHT ATMOSPHERE
 * Subtle Kerala temple night environment:
 * - 7 gentle slow-moving fireflies (bounded, non-distracting)
 * - Tiny crescent moon
 * - Barely-visible temple pitched roofline silhouette
 * - Full opacity transition controlled by ThemeContext
 */

import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

export const NightAtmosphere: React.FC = () => {
  const { isNight, isReducedMotion } = useTheme();

  // 7 subtle, precisely bounded fireflies with staggered drift animations
  const fireflies = useMemo(
    () => [
      { id: 1, top: '18%', left: '12%', duration: '14s', delay: '0s', size: 3 },
      { id: 2, top: '28%', left: '82%', duration: '18s', delay: '2s', size: 2.5 },
      { id: 3, top: '44%', left: '22%', duration: '16s', delay: '4s', size: 3.5 },
      { id: 4, top: '58%', left: '88%', duration: '20s', delay: '1s', size: 2 },
      { id: 5, top: '72%', left: '15%', duration: '17s', delay: '3s', size: 3 },
      { id: 6, top: '85%', left: '76%', duration: '19s', delay: '5s', size: 2.5 },
      { id: 7, top: '35%', left: '60%', duration: '22s', delay: '2.5s', size: 2.2 },
    ],
    []
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
      style={{
        opacity: isNight ? 1 : 0,
      }}
    >
      {/* Tiny Sacred Crescent Moon in the subtle sky */}
      <div
        className="absolute top-8 right-8 md:top-14 md:right-16 transition-all duration-1000"
        style={{
          opacity: isNight ? 0.75 : 0,
          transform: isNight ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M17.5 4C11.5 5.2 7 10.5 7 17C7 23.5 11.5 28.8 17.5 30C12 28.5 8 23.5 8 17C8 10.5 12 5.5 17.5 4Z"
            fill="#EAD8B8"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Extremely Faint Kerala Temple Roof Silhouette along lower atmospheric horizon */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 transition-opacity duration-1000 overflow-hidden"
        style={{
          opacity: isNight ? 0.08 : 0,
        }}
      >
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
        >
          {/* Multi-tiered Kerala Koothambalam gabled rooflines */}
          <path
            d="M0 180 L0 140 L160 110 L280 140 L400 95 L500 135 L600 80 L700 135 L800 95 L920 140 L1040 110 L1200 140 L1200 180 Z"
            fill="#DFC794"
          />
          {/* Decorative finials (Stupi) atop temple gables */}
          <line x1="400" y1="95" x2="400" y2="82" stroke="#DFC794" strokeWidth="2" />
          <line x1="600" y1="80" x2="600" y2="65" stroke="#DFC794" strokeWidth="2.5" />
          <line x1="800" y1="95" x2="800" y2="82" stroke="#DFC794" strokeWidth="2" />
        </svg>
      </div>

      {/* Gentle Fireflies */}
      {!isReducedMotion &&
        fireflies.map((fly) => (
          <div
            key={fly.id}
            className="absolute rounded-full"
            style={{
              top: fly.top,
              left: fly.left,
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              backgroundColor: '#F5C26B',
              boxShadow: '0 0 8px 2px rgba(245, 194, 107, 0.45)',
              animation: `fireflyFloat ${fly.duration} ease-in-out infinite alternate ${fly.delay}`,
            }}
          />
        ))}

      <style>{`
        @keyframes fireflyFloat {
          0% {
            transform: translate(0px, 0px) scale(0.85);
            opacity: 0.15;
          }
          35% {
            transform: translate(12px, -18px) scale(1.1);
            opacity: 0.75;
          }
          70% {
            transform: translate(-15px, -8px) scale(0.9);
            opacity: 0.35;
          }
          100% {
            transform: translate(8px, 14px) scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
