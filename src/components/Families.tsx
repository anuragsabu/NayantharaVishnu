/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FAMILIES SECTION
 * Editorial traditional composition without boxed cards or profile containers.
 * Bride's lineage first, divided by a subtle antique brass ornamental motif.
 */

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

export const Families: React.FC = () => {
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
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 px-6 flex flex-col items-center text-center"
    >
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
        {/* BRIDE'S FAMILY - Appears first */}
        <div
          className={`flex flex-col items-center w-full transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h3
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.16em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.bride.firstName}
          </h3>

          <p
            className="font-sans-ui text-xs tracking-[0.22em] uppercase mt-2 mb-1.5 transition-colors duration-700"
            style={{ color: isNight ? '#C7AA71' : '#681A24' }}
          >
            Daughter of
          </p>

          <p
            className="font-cormorant text-lg sm:text-xl md:text-2xl font-light transition-colors duration-700"
            style={{ color: isNight ? '#EAE3DA' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.bride.parents}
          </p>

          <p
            className="font-sans-ui text-xs tracking-[0.25em] uppercase mt-2 transition-colors duration-700"
            style={{ color: isNight ? '#A8A096' : '#7D756C' }}
          >
            {WEDDING_DETAILS.bride.home}
          </p>
        </div>

        {/* SUBTLE BRASS ORNAMENTAL DIVIDER - Draws itself */}
        <div
          className={`flex items-center justify-center gap-3 my-12 md:my-16 w-full transition-opacity duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <div
            className={`w-16 md:w-28 h-[1px] kasavu-line ${
              isVisible ? 'animate-line-draw' : 'scale-x-0'
            }`}
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-70">
            {/* Traditional Kasavu Floral / Padmam Motif */}
            <path
              d="M12 4 C14 8, 16 10, 20 12 C16 14, 14 16, 12 20 C10 16, 8 14, 4 12 C8 10, 10 8, 12 4 Z"
              fill={isNight ? '#DFC794' : '#9B7E46'}
            />
            <circle cx="12" cy="12" r="1.5" fill={isNight ? '#121110' : '#FDFBF7'} />
          </svg>
          <div
            className={`w-16 md:w-28 h-[1px] kasavu-line ${
              isVisible ? 'animate-line-draw' : 'scale-x-0'
            }`}
          />
        </div>

        {/* GROOM'S FAMILY - Appears second */}
        <div
          className={`flex flex-col items-center w-full transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h3
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.16em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.groom.fullName}
          </h3>

          <p
            className="font-sans-ui text-xs tracking-[0.22em] uppercase mt-2 mb-1.5 transition-colors duration-700"
            style={{ color: isNight ? '#C7AA71' : '#681A24' }}
          >
            Son of
          </p>

          <p
            className="font-cormorant text-lg sm:text-xl md:text-2xl font-light transition-colors duration-700"
            style={{ color: isNight ? '#EAE3DA' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.groom.parents}
          </p>

          <p
            className="font-sans-ui text-xs tracking-[0.25em] uppercase mt-2 transition-colors duration-700"
            style={{ color: isNight ? '#A8A096' : '#7D756C' }}
          >
            {WEDDING_DETAILS.groom.home}
          </p>
        </div>
      </div>

      {/* Visual Flow Divider to The Wedding */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
