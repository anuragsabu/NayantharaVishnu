/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OPENING GATE
 * Fullscreen ceremonial invitation gateway.
 * Physical luxury wedding invitation feel with slow cinematic sequence.
 */

import React, { useState } from 'react';
import { NilavilakkuLamp } from './NilavilakkuLamp';
import { WEDDING_DETAILS } from '../config';
import { useTheme } from '../context/ThemeContext';

interface OpeningGateProps {
  onOpen: () => void;
}

export const OpeningGate: React.FC<OpeningGateProps> = ({ onOpen }) => {
  const { isNight } = useTheme();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Smooth transition sequence: button fades, monogram is focal, gateway recedes
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between px-6 py-12 md:py-16 text-center select-none overflow-y-auto transition-opacity duration-800 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: isNight ? '#121110' : '#FDFBF7',
      }}
    >
      {/* Decorative Traditional Kerala Corner Accent Borders */}
      <div
        className="pointer-events-none absolute top-4 left-4 w-12 h-12 border-t border-l transition-colors duration-700"
        style={{ borderColor: isNight ? 'rgba(199, 170, 113, 0.35)' : 'rgba(155, 126, 70, 0.3)' }}
      />
      <div
        className="pointer-events-none absolute top-4 right-4 w-12 h-12 border-t border-r transition-colors duration-700"
        style={{ borderColor: isNight ? 'rgba(199, 170, 113, 0.35)' : 'rgba(155, 126, 70, 0.3)' }}
      />
      <div
        className="pointer-events-none absolute bottom-4 left-4 w-12 h-12 border-b border-l transition-colors duration-700"
        style={{ borderColor: isNight ? 'rgba(199, 170, 113, 0.35)' : 'rgba(155, 126, 70, 0.3)' }}
      />
      <div
        className="pointer-events-none absolute bottom-4 right-4 w-12 h-12 border-b border-r transition-colors duration-700"
        style={{ borderColor: isNight ? 'rgba(199, 170, 113, 0.35)' : 'rgba(155, 126, 70, 0.3)' }}
      />

      {/* TOP: Sacred Ganesh Invocation & Temple Lamp */}
      <div className="flex flex-col items-center max-w-xl mx-auto w-full pt-4 md:pt-8 animate-fadeInSlow">
        {/* Sacred Ganesh Invocation */}
        <p
          className="font-rozha text-sm sm:text-base md:text-lg tracking-[0.25em] transition-colors duration-700 mb-6"
          style={{ color: isNight ? '#DFC794' : '#681A24' }}
        >
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Signature Nilavilakku Heritage Lamp */}
        <div className="mb-4 transform scale-90 md:scale-100 transition-transform duration-500">
          <NilavilakkuLamp size="normal" showInteractiveHint={true} />
        </div>

        {/* Fine Brass Line Reveal */}
        <div className="w-24 md:w-32 h-[1px] kasavu-line my-4" />
      </div>

      {/* CENTER: Monogram & Grand Names */}
      <div className="flex flex-col items-center max-w-2xl mx-auto w-full my-auto py-6">
        {/* Monogram N & V */}
        <div
          className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.3em] mb-4 transition-colors duration-700"
          style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
        >
          {WEDDING_DETAILS.monogram}
        </div>

        {/* Couple Names */}
        <div className="flex flex-col items-center gap-1.5 md:gap-2">
          <h1
            className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.16em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.bride.firstName}
          </h1>

          <span
            className="font-cormorant italic text-lg sm:text-xl md:text-2xl font-light transition-colors duration-700"
            style={{ color: isNight ? '#DFC794' : '#681A24' }}
          >
            and
          </span>

          <h2
            className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.16em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.groom.fullName}
          </h2>
        </div>

        {/* Auspicious Date */}
        <p
          className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase mt-6 transition-colors duration-700"
          style={{ color: isNight ? '#C7AA71' : '#7D756C' }}
        >
          05 · 11 · 2026
        </p>
      </div>

      {/* BOTTOM: OPEN THE INVITATION CTA */}
      <div className="flex flex-col items-center max-w-md mx-auto w-full pb-6 md:pb-10">
        <button
          type="button"
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase font-sans-ui border rounded-sm transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
          style={{
            borderColor: isNight ? 'rgba(199, 170, 113, 0.45)' : 'rgba(155, 126, 70, 0.5)',
            backgroundColor: isNight ? 'rgba(28, 25, 23, 0.6)' : 'rgba(244, 239, 234, 0.6)',
            color: isNight ? '#F7F3EE' : '#1E1B18',
          }}
        >
          <span className="relative z-10 transition-transform duration-300">
            OPEN THE INVITATION
          </span>
          <span
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
            style={{ color: isNight ? '#DFC794' : '#681A24' }}
          >
            →
          </span>
        </button>

        <p
          className="mt-4 text-[10px] tracking-[0.2em] uppercase font-sans-ui transition-colors duration-700"
          style={{ color: isNight ? 'rgba(223, 199, 148, 0.5)' : 'rgba(125, 117, 108, 0.65)' }}
        >
          An heirloom Kerala wedding
        </p>
      </div>
    </div>
  );
};
