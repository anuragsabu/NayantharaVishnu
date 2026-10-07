/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type FlameState = 'burning' | 'extinguishing' | 'out' | 'kindling';

interface ThemeContextType {
  isNight: boolean;
  flameState: FlameState;
  toggleTheme: () => void;
  relightLamp: () => void;
  isReducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNight, setIsNight] = useState<boolean>(false);
  const [flameState, setFlameState] = useState<FlameState>('burning');
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isNight) {
      document.documentElement.classList.add('night-mode');
    } else {
      document.documentElement.classList.remove('night-mode');
    }
  }, [isNight]);

  const toggleTheme = useCallback(() => {
    if (!isNight) {
      // Day -> Night sequence:
      // 1. Flame flickers & shrinks (extinguishing)
      // 2. Extinguishes, Ivory transitions into deep night charcoal
      setFlameState('extinguishing');
      const timer1 = setTimeout(() => {
        setIsNight(true);
      }, 400);
      const timer2 = setTimeout(() => {
        setFlameState('out');
      }, 850);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Night -> Day sequence:
      // 1. Fireflies & night atmosphere recede
      // 2. Ember appears (kindling)
      // 3. Flame relights & warm ivory returns
      setFlameState('kindling');
      const timer1 = setTimeout(() => {
        setIsNight(false);
      }, 350);
      const timer2 = setTimeout(() => {
        setFlameState('burning');
      }, 900);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isNight]);

  const relightLamp = useCallback(() => {
    if (flameState === 'out' || isNight) {
      setFlameState('kindling');
      setTimeout(() => {
        setIsNight(false);
        setFlameState('burning');
      }, 600);
    }
  }, [flameState, isNight]);

  return (
    <ThemeContext.Provider
      value={{
        isNight,
        flameState,
        toggleTheme,
        relightLamp,
        isReducedMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
