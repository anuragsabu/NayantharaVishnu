/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * COUNTDOWN SECTION
 * Sacred muhurtham countdown timer calculated in Asia/Kolkata timezone.
 * Refined editorial typography with thin antique brass separators.
 */

import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

export const CountdownSection: React.FC = () => {
  const { isNight } = useTheme();

  // Target: 05 November 2026, 08:34 AM Asia/Kolkata (IST = UTC+05:30)
  const targetTimestamp = new Date(WEDDING_DETAILS.ceremony.isoStart).getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return (
    <section className="relative w-full py-16 md:py-24 px-6 flex flex-col items-center text-center">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
        {/* Heading */}
        <p
          className="font-sans-ui text-xs tracking-[0.3em] uppercase transition-colors duration-700 mb-8 md:mb-12"
          style={{ color: isNight ? '#C7AA71' : '#681A24' }}
        >
          UNTIL THE AUSPICIOUS MOMENT
        </p>

        {timeLeft.isPast ? (
          <div className="py-6">
            <p
              className="font-cormorant italic text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.1em] transition-colors duration-700"
              style={{ color: isNight ? '#DFC794' : '#681A24' }}
            >
              Forever has begun.
            </p>
          </div>
        ) : (
          /* Editorial Countdown Grid with Thin Brass Separators */
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 max-w-xl w-full">
            {/* DAYS */}
            <div className="flex flex-col items-center min-w-[55px] sm:min-w-[75px]">
              <span
                className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light tabular-nums leading-none transition-colors duration-700"
                style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
              >
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span
                className="font-sans-ui text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-2.5 transition-colors duration-700"
                style={{ color: isNight ? '#A8A096' : '#7D756C' }}
              >
                DAYS
              </span>
            </div>

            {/* Separator */}
            <div
              className="h-8 sm:h-12 w-[1px] transition-colors duration-700"
              style={{ backgroundColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.25)' }}
              aria-hidden="true"
            />

            {/* HOURS */}
            <div className="flex flex-col items-center min-w-[55px] sm:min-w-[75px]">
              <span
                className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light tabular-nums leading-none transition-colors duration-700"
                style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
              >
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span
                className="font-sans-ui text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-2.5 transition-colors duration-700"
                style={{ color: isNight ? '#A8A096' : '#7D756C' }}
              >
                HOURS
              </span>
            </div>

            {/* Separator */}
            <div
              className="h-8 sm:h-12 w-[1px] transition-colors duration-700"
              style={{ backgroundColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.25)' }}
              aria-hidden="true"
            />

            {/* MINUTES */}
            <div className="flex flex-col items-center min-w-[55px] sm:min-w-[75px]">
              <span
                className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light tabular-nums leading-none transition-colors duration-700"
                style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
              >
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span
                className="font-sans-ui text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-2.5 transition-colors duration-700"
                style={{ color: isNight ? '#A8A096' : '#7D756C' }}
              >
                MINUTES
              </span>
            </div>

            {/* Separator */}
            <div
              className="h-8 sm:h-12 w-[1px] transition-colors duration-700"
              style={{ backgroundColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.25)' }}
              aria-hidden="true"
            />

            {/* SECONDS */}
            <div className="flex flex-col items-center min-w-[55px] sm:min-w-[75px]">
              <span
                className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light tabular-nums leading-none transition-colors duration-700"
                style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
              >
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span
                className="font-sans-ui text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-2.5 transition-colors duration-700"
                style={{ color: isNight ? '#A8A096' : '#7D756C' }}
              >
                SECONDS
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Visual Flow Divider to Reception */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
