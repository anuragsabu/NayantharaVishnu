/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MAIN WEDDING ANNOUNCEMENT
 * The central ceremonial herald of the union.
 * Grand editorial typography with antique brass hairlines.
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

export const MainAnnouncement: React.FC = () => {
  const { isNight } = useTheme();

  return (
    <section className="relative w-full py-20 md:py-32 px-6 flex flex-col items-center text-center">
      {/* Decorative Traditional Kerala Crest Motifs */}
      <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
        <div className="w-8 md:w-16 h-[1px] kasavu-line" />
        <span
          className="text-xs md:text-sm tracking-[0.3em] font-cinzel transition-colors duration-700"
          style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
        >
          {WEDDING_DETAILS.monogram}
        </span>
        <div className="w-8 md:w-16 h-[1px] kasavu-line" />
      </div>

      {/* Small Ceremonial Opening Kicker */}
      <p
        className="font-sans-ui text-xs sm:text-sm tracking-[0.28em] uppercase transition-colors duration-700 mb-8 max-w-md"
        style={{ color: isNight ? '#DFC794' : '#681A24' }}
      >
        WITH THE BLESSINGS OF OUR FAMILIES
      </p>

      {/* Grand Couple Names Lockup */}
      <div className="flex flex-col items-center gap-2 md:gap-4 my-2 max-w-3xl">
        <h2
          className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.12em] uppercase transition-colors duration-700 leading-tight"
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.bride.firstName}
        </h2>

        <div className="flex items-center gap-4 my-1">
          <div className="w-6 md:w-12 h-[1px] bg-current opacity-30" />
          <span
            className="font-cormorant italic text-xl sm:text-2xl md:text-3xl font-light transition-colors duration-700"
            style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
          >
            weds
          </span>
          <div className="w-6 md:w-12 h-[1px] bg-current opacity-30" />
        </div>

        <h2
          className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.12em] uppercase transition-colors duration-700 leading-tight"
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.groom.fullName}
        </h2>
      </div>

      {/* Auspicious Date Callout */}
      <div
        className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase mt-10 mb-6 transition-colors duration-700"
        style={{ color: isNight ? '#C7AA71' : '#681A24' }}
      >
        THURSDAY · 05 NOVEMBER 2026
      </div>

      {/* One Concise Ceremonial Sentence */}
      <p
        className="font-cormorant text-base sm:text-lg md:text-xl font-light italic max-w-lg mx-auto leading-relaxed transition-colors duration-700"
        style={{ color: isNight ? '#A8A096' : '#7D756C' }}
      >
        We invite you to grace our solemn vows with your prayers, warmth, and blessings.
      </p>

      {/* Visual Flow Divider to Next Section */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
