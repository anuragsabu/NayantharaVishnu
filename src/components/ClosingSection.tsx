/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CLOSING SECTION
 * Sacred closing blessing:
 * शुभमस्तु
 * N & V
 * NAYANTHARA & VISHNU VIJAY
 * 05 · 11 · 2026
 * With love, with blessings, with gratitude.
 * Signature temple lamp with calm steady flame.
 */

import React from 'react';
import { NilavilakkuLamp } from './NilavilakkuLamp';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

export const ClosingSection: React.FC = () => {
  const { isNight } = useTheme();

  return (
    <footer className="relative w-full py-20 md:py-32 px-6 flex flex-col items-center text-center">
      <div className="max-w-xl mx-auto w-full flex flex-col items-center">
        {/* Sacred Sanskrit Benediction */}
        <p
          className="font-rozha text-xl sm:text-2xl md:text-3xl tracking-[0.2em] transition-colors duration-700 mb-6"
          style={{ color: isNight ? '#DFC794' : '#681A24' }}
        >
          शुभमस्तु
        </p>

        {/* Monogram N & V */}
        <div
          className="font-cinzel text-2xl sm:text-3xl tracking-[0.3em] my-3 transition-colors duration-700"
          style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
        >
          {WEDDING_DETAILS.monogram}
        </div>

        {/* Couple Names */}
        <p
          className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.16em] uppercase transition-colors duration-700 mt-2 mb-3"
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.bride.firstName} &amp; {WEDDING_DETAILS.groom.fullName}
        </p>

        {/* Auspicious Date */}
        <p
          className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors duration-700 mb-8"
          style={{ color: isNight ? '#C7AA71' : '#7D756C' }}
        >
          05 · 11 · 2026
        </p>

        {/* Heartfelt Note */}
        <p
          className="font-cormorant italic text-lg sm:text-xl font-light tracking-wide transition-colors duration-700 mb-12"
          style={{ color: isNight ? '#A8A096' : '#7D756C' }}
        >
          With love, with blessings, with gratitude.
        </p>

        {/* Signature Nilavilakku Heritage Lamp shown at the close */}
        <div className="transform scale-95 transition-transform duration-500">
          <NilavilakkuLamp size="closing" showInteractiveHint={false} />
        </div>

        {/* Very Subtle Peace Subtext */}
        <p
          className="font-sans-ui text-[10px] tracking-[0.3em] uppercase mt-8 opacity-40 transition-colors duration-700"
          style={{ color: isNight ? '#DFC794' : '#7D756C' }}
        >
          A Kerala Hindu Wedding
        </p>
      </div>
    </footer>
  );
};
