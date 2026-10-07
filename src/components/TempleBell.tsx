/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * INTERACTIVE KERALA TEMPLE BELL (MANI / GHANTA)
 * An authentic antique-brass temple bell that gently sways (1-2° pendulum motion)
 * upon entering the viewport for the first time, and can also be tapped.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TempleBellProps {
  className?: string;
}

export const TempleBell: React.FC<TempleBellProps> = ({ className = '' }) => {
  const { isNight, isReducedMotion } = useTheme();
  const bellContainerRef = useRef<HTMLDivElement>(null);
  const [hasSwayed, setHasSwayed] = useState(false);
  const [isSwaying, setIsSwaying] = useState(false);

  useEffect(() => {
    if (isReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasSwayed) {
          setHasSwayed(true);
          setIsSwaying(true);
          // Sway lasts 2.2s, then stops cleanly
          setTimeout(() => {
            setIsSwaying(false);
          }, 2200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (bellContainerRef.current) {
      observer.observe(bellContainerRef.current);
    }

    return () => observer.disconnect();
  }, [hasSwayed, isReducedMotion]);

  const handleTap = () => {
    if (isSwaying || isReducedMotion) return;
    setIsSwaying(true);
    setTimeout(() => {
      setIsSwaying(false);
    }, 2200);
  };

  const brassStroke = isNight ? '#DFC794' : '#9B7E46';
  const brassHighlight = isNight ? '#FFF5D6' : '#CBB482';
  const brassShadow = isNight ? '#8C713D' : '#6A5328';
  const brassBody = isNight ? '#C7AA71' : '#A3844C';

  return (
    <div
      ref={bellContainerRef}
      onClick={handleTap}
      title="Kerala Temple Bell"
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-300 ${className}`}
      style={{
        transformOrigin: 'top center',
      }}
    >
      <div
        className={`transition-transform ${isSwaying ? 'animate-bell-pendulum' : ''}`}
        style={{
          transformOrigin: 'top center',
        }}
      >
        <svg
          width="42"
          height="70"
          viewBox="0 0 42 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-sm"
        >
          <defs>
            {/* Antique Brass Linear Gradient */}
            <linearGradient id="bellBrassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={brassShadow} />
              <stop offset="25%" stopColor={brassHighlight} />
              <stop offset="55%" stopColor={brassBody} />
              <stop offset="85%" stopColor={brassHighlight} />
              <stop offset="100%" stopColor={brassShadow} />
            </linearGradient>

            {/* Rim highlight */}
            <linearGradient id="bellRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={brassShadow} />
              <stop offset="50%" stopColor={brassHighlight} />
              <stop offset="100%" stopColor={brassShadow} />
            </linearGradient>
          </defs>

          {/* Top Hanging Ring / Chain Link */}
          <ellipse cx="21" cy="6" rx="4.5" ry="5" stroke="url(#bellBrassGrad)" strokeWidth="1.8" />
          <line x1="21" y1="11" x2="21" y2="17" stroke="url(#bellBrassGrad)" strokeWidth="2.2" strokeLinecap="round" />

          {/* Bell Top Cap / Finial */}
          <ellipse cx="21" cy="18" rx="6" ry="2" fill="url(#bellBrassGrad)" stroke={brassStroke} strokeWidth="0.8" />
          <path d="M16 18 C16 14, 26 14, 26 18 Z" fill="url(#bellBrassGrad)" />

          {/* Bell Body Dome */}
          <path
            d="M15 18 C15 26, 8 40, 6 52 C5 56, 37 56, 36 52 C34 40, 27 26, 27 18 Z"
            fill="url(#bellBrassGrad)"
            stroke={brassStroke}
            strokeWidth="0.9"
          />

          {/* Engraved Kerala Temple Moldings */}
          <path
            d="M12 34 C16 36, 26 36, 30 34"
            stroke={brassHighlight}
            strokeWidth="0.9"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M9 44 C15 47, 27 47, 33 44"
            stroke={brassShadow}
            strokeWidth="0.9"
            fill="none"
            opacity="0.9"
          />

          {/* Heavy Bell Rim (Flared Lip) */}
          <ellipse
            cx="21"
            cy="53"
            rx="15.5"
            ry="3.8"
            fill="url(#bellRimGrad)"
            stroke={brassStroke}
            strokeWidth="1.2"
          />
          <ellipse
            cx="21"
            cy="54"
            rx="13.5"
            ry="2.6"
            fill={isNight ? '#171513' : '#2A2218'}
            opacity="0.75"
          />

          {/* Clapper / Tongue (Drops slightly below rim) */}
          <line x1="21" y1="52" x2="21" y2="62" stroke={brassShadow} strokeWidth="2" strokeLinecap="round" />
          <circle cx="21" cy="63" r="3.2" fill="url(#bellBrassGrad)" stroke={brassStroke} strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
};
