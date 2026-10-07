/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CLOSING SECTION
 * Minimal heirloom benediction:
 * ॥ शुभमस्तु ॥
 * N & V
 * NAYANTHARA · VISHNU VIJAYAN
 * 05 · 11 · 2026
 * “May this beginning be blessed.”
 * Signature temple lamp with calm steady flame.
 */

import React, { useRef, useEffect, useState } from 'react';
import { NilavilakkuLamp } from './NilavilakkuLamp';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

export const ClosingSection: React.FC = () => {
  const { isNight, isReducedMotion } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isReducedMotion]);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-6 flex flex-col items-center text-center select-none"
    >
      <div className="max-w-xl mx-auto w-full flex flex-col items-center">
        {/* 1. Sacred Sanskrit Benediction (Appears First) */}
        <p
          className={`font-rozha text-xl sm:text-2xl md:text-3xl tracking-[0.25em] transition-all duration-1000 mb-6 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ color: isNight ? '#DFC794' : '#681A24' }}
        >
          ॥ शुभमस्तु ॥
        </p>

        {/* 2. Monogram N & V with Antique Brass Light Sweep (Appears Second) */}
        <div
          className={`font-cinzel text-2xl sm:text-3xl tracking-[0.3em] my-3 transition-all duration-1000 delay-300 px-3 py-1 brass-light-sweep ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
        >
          {WEDDING_DETAILS.monogram}
        </div>

        {/* 3. Couple Names (Appears Third) */}
        <p
          className={`font-cormorant text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.16em] uppercase transition-all duration-1000 delay-500 mt-2 mb-3 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.bride.firstName} · {WEDDING_DETAILS.groom.fullName}
        </p>

        {/* 4. Auspicious Date (Appears Fourth) */}
        <p
          className={`font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase transition-all duration-1000 delay-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ color: isNight ? '#C7AA71' : '#7D756C' }}
        >
          05 · 11 · 2026
        </p>

        {/* 5. Final Heirloom Line (Appears Finally) */}
        <p
          className={`font-cormorant italic text-lg sm:text-xl md:text-2xl font-light tracking-[0.06em] transition-all duration-1000 delay-900 mb-12 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ color: isNight ? '#EAE3DA' : '#681A24' }}
        >
          May this beginning be blessed.
        </p>

        {/* Signature Nilavilakku Heritage Lamp shown at the close with calm flame */}
        <div
          className={`transform scale-95 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <NilavilakkuLamp size="closing" showInteractiveHint={false} />
        </div>

        {/* Generous Whitespace Before Creator Credit */}
        <div className="mt-20 md:mt-28" />

        {/* 7. Creator Credit (Clickable to WhatsApp with prefilled message) */}
        <a
          href={`https://wa.me/${WEDDING_DETAILS.contact.whatsappRaw}?text=${encodeURIComponent(
            WEDDING_DETAILS.creator.prefilledMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] sm:text-xs font-sans-ui tracking-[0.16em] transition-opacity duration-300 opacity-60 hover:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
          style={{ color: isNight ? '#C7AA71' : '#7D756C' }}
        >
          {WEDDING_DETAILS.creator.creditText}
        </a>
      </div>
    </footer>
  );
};
