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
import { JasmineDetail } from './JasmineDetail';

export const MainAnnouncement: React.FC = () => {
  const { isNight } = useTheme();

  return (
    <section className="relative w-full py-20 md:py-32 px-6 flex flex-col items-center text-center">
      {/* Decorative Traditional Kerala Crest Motifs with Brass Light Sweep on Monogram */}
      <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
        <div className="w-8 md:w-16 h-[1px] kasavu-line" />
        <span
          className="text-xs md:text-sm tracking-[0.3em] font-cinzel transition-colors duration-700 px-2 py-0.5 brass-light-sweep"
          style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
        >
          {WEDDING_DETAILS.monogram}
        </span>
        <div className="w-8 md:w-16 h-[1px] kasavu-line" />
      </div>

      {/* D. Delicate Jasmine / Mullappoo Botanical Detail */}
      <JasmineDetail className="mb-4" />

      {/* Small Ceremonial Opening Kicker */}
      <p
        className="font-sans-ui text-xs sm:text-sm tracking-[0.28em] uppercase transition-colors duration-700 mb-8 max-w-md"
        style={{ color: isNight ? '#DFC794' : '#681A24' }}
      >
        WITH THE BLESSINGS OF OUR FAMILIES
      </p>

      {/* Grand Three-Line Couple Lockup */}
      <div className="flex flex-col items-center justify-center my-6 md:my-10 max-w-4xl w-full">
        {/* Line 1: NAYANTHARA */}
        <h2
          className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold uppercase transition-colors duration-700 leading-none animate-hero-bride select-text"
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.bride.firstName}
        </h2>

        {/* Line 2: WEDS (Typographic Bridge) */}
        <div className="my-6 sm:my-8 md:my-10 flex items-center justify-center">
          <p
            className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase font-normal transition-colors duration-700 animate-hero-weds select-text"
            style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
          >
            WEDS
          </p>
        </div>

        {/* Line 3: VISHNU VIJAYAN */}
        <div className="flex items-center justify-center">
          <h2
            className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold uppercase transition-colors duration-700 leading-none animate-hero-groom select-text"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.groom.fullName}
          </h2>
        </div>
      </div>

      {/* Auspicious Date Callout */}
      <div
        className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase mt-10 mb-4 transition-colors duration-700"
        style={{ color: isNight ? '#C7AA71' : '#681A24' }}
      >
        THURSDAY · 05 NOVEMBER 2026
      </div>

      {/* Visual Flow Divider to Next Section */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-14 md:mt-20" />
    </section>
  );
};
