/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WEDDING CEREMONY (THAALI KETTU)
 * Architectural line art of Kerala temple sanctuary.
 * Exact details and genuine cross-platform calendar functionality.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';
import { downloadICS, getGoogleCalendarUrl, CalendarEventDetails } from '../utils/calendar';

export const WeddingCeremony: React.FC = () => {
  const { isNight, isReducedMotion } = useTheme();
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isReducedMotion]);

  const eventDetails: CalendarEventDetails = {
    title: `Nayanthara & Vishnu Vijay — Thali Kettu`,
    description: `Wedding Ceremony (Thali Kettu) of Nayanthara & Vishnu Vijay.\nMuhurtham: ${WEDDING_DETAILS.ceremony.muhurtham}\nVenue: ${WEDDING_DETAILS.ceremony.fullVenue}`,
    location: WEDDING_DETAILS.ceremony.fullVenue,
    startDate: WEDDING_DETAILS.ceremony.isoStart,
    endDate: WEDDING_DETAILS.ceremony.isoEnd,
  };

  const handleDownloadICS = () => {
    downloadICS(eventDetails, 'nayanthara-vishnu-thali-kettu');
    setShowCalendarMenu(false);
  };

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl(eventDetails);
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowCalendarMenu(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-28 px-6 flex flex-col items-center text-center"
    >
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
        {/* Antique Brass Line Draws First */}
        <div
          className={`w-16 md:w-24 h-[1px] kasavu-line mb-4 transition-transform duration-1000 ${
            isVisible ? 'animate-line-draw' : 'scale-x-0'
          }`}
        />

        {/* Section Heading Reveals */}
        <p
          className={`font-sans-ui text-xs tracking-[0.28em] uppercase transition-all duration-700 delay-200 mb-2 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ color: isNight ? '#C7AA71' : '#681A24' }}
        >
          {WEDDING_DETAILS.ceremony.title}
        </p>

        {/* Ceremony Name */}
        <h2
          className={`font-cormorant text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.18em] uppercase transition-all duration-700 delay-300 mb-6 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.ceremony.subheading}
        </h2>

        {/* Staggered Date & Muhurtham */}
        <div
          className={`flex flex-col items-center gap-2 my-2 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p
            className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#C7AA71' : '#681A24' }}
          >
            {WEDDING_DETAILS.ceremony.day}
          </p>

          <p
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.14em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.ceremony.date}
          </p>

          <div className="flex items-center gap-3 mt-3 mb-1">
            <span
              className="font-sans-ui text-[11px] tracking-[0.25em] uppercase transition-colors duration-700 font-medium"
              style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
            >
              MUHURTHAM
            </span>
          </div>

          <p
            className="font-cormorant text-xl sm:text-2xl md:text-3xl font-normal tracking-[0.12em] transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.ceremony.muhurtham}
          </p>
        </div>

        {/* Strong Venue Reveal with Refined Temple Architectural Line Art */}
        <div
          className={`flex flex-col items-center mt-8 mb-8 w-full transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Temple Architectural Line Art */}
          <div className="w-full max-w-xs md:max-w-sm mb-6 transition-opacity duration-700 opacity-85">
            <svg
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto mx-auto"
            >
              {/* Stupi / Kalasam (Golden Finial) */}
              <path
                d="M160 12 L163 18 L160 24 L157 18 Z"
                fill={isNight ? '#DFC794' : '#9B7E46'}
              />
              <line
                x1="160"
                y1="24"
                x2="160"
                y2="34"
                stroke={isNight ? '#DFC794' : '#9B7E46'}
                strokeWidth="1.2"
              />
              <ellipse
                cx="160"
                cy="34"
                rx="4"
                ry="2"
                fill={isNight ? '#DFC794' : '#9B7E46'}
              />

              {/* Upper Tier Copper Roof (Gabled Pitch) */}
              <path
                d="M160 36 L118 70 H202 Z"
                stroke={isNight ? '#DFC794' : '#9B7E46'}
                strokeWidth="1.2"
                fill={isNight ? 'rgba(223, 199, 148, 0.04)' : 'rgba(155, 126, 70, 0.03)'}
              />
              <line x1="160" y1="36" x2="135" y2="70" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.6" strokeDasharray="2 3" />
              <line x1="160" y1="36" x2="185" y2="70" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.6" strokeDasharray="2 3" />

              {/* Middle Louvered Clerestory */}
              <rect
                x="132"
                y="70"
                width="56"
                height="18"
                stroke={isNight ? '#DFC794' : '#9B7E46'}
                strokeWidth="1"
              />
              <line x1="140" y1="70" x2="140" y2="88" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />
              <line x1="150" y1="70" x2="150" y2="88" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />
              <line x1="160" y1="70" x2="160" y2="88" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />
              <line x1="170" y1="70" x2="170" y2="88" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />
              <line x1="180" y1="70" x2="180" y2="88" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />

              {/* Lower Broad Overhanging Tile Roof */}
              <path
                d="M160 88 L60 126 H260 Z"
                stroke={isNight ? '#DFC794' : '#9B7E46'}
                strokeWidth="1.3"
                fill={isNight ? 'rgba(223, 199, 148, 0.05)' : 'rgba(155, 126, 70, 0.04)'}
              />
              <line x1="160" y1="88" x2="100" y2="126" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.6" strokeDasharray="2 3" />
              <line x1="160" y1="88" x2="220" y2="126" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.6" strokeDasharray="2 3" />

              {/* Eaves Underside Timber Molding */}
              <line x1="56" y1="128" x2="264" y2="128" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="1" />

              {/* Pillars */}
              <rect x="95" y="128" width="130" height="34" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="1" />
              <line x1="110" y1="128" x2="110" y2="162" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="1.2" />
              <line x1="130" y1="128" x2="130" y2="162" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />
              <line x1="190" y1="128" x2="190" y2="162" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="0.8" />
              <line x1="210" y1="128" x2="210" y2="162" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="1.2" />

              {/* Portal */}
              <path
                d="M148 162 V138 C148 135 172 135 172 138 V162"
                stroke={isNight ? '#DFC794' : '#9B7E46'}
                strokeWidth="1.2"
                fill={isNight ? '#1B1816' : '#FAF6EE'}
              />
              <circle cx="160" cy="148" r="1.5" fill="#F57C00" />

              {/* Granite Plinth Base */}
              <path
                d="M75 162 H245 V170 H75 Z"
                stroke={isNight ? '#DFC794' : '#9B7E46'}
                strokeWidth="1.2"
                fill={isNight ? 'rgba(223, 199, 148, 0.08)' : 'rgba(155, 126, 70, 0.06)'}
              />
              <line x1="65" y1="170" x2="255" y2="170" stroke={isNight ? '#DFC794' : '#9B7E46'} strokeWidth="1.4" />
            </svg>
          </div>

          <p
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.1em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.ceremony.venue}
          </p>

          {/* Thin Brass Line Drawing Under Venue */}
          <div
            className={`w-28 md:w-36 h-[1px] kasavu-line my-3 ${
              isVisible ? 'animate-line-draw' : 'scale-x-0'
            }`}
          />

          <p
            className="font-sans-ui text-xs sm:text-sm tracking-[0.22em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#A8A096' : '#7D756C' }}
          >
            {WEDDING_DETAILS.ceremony.city}
          </p>
        </div>

        {/* Action Buttons: VIEW LOCATION & ADD TO CALENDAR */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* VIEW LOCATION Button */}
          <a
            href={WEDDING_DETAILS.ceremony.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs tracking-[0.22em] uppercase font-sans-ui font-medium border rounded-sm transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
            style={{
              borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.45)',
              backgroundColor: isNight ? 'rgba(28, 25, 23, 0.5)' : 'rgba(244, 239, 234, 0.5)',
              color: isNight ? '#F7F3EE' : '#1E1B18',
            }}
          >
            <span>VIEW LOCATION</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: isNight ? '#DFC794' : '#681A24' }}
            >
              →
            </span>
          </a>

          {/* ADD TO CALENDAR Button with Options */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              aria-expanded={showCalendarMenu}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs tracking-[0.22em] uppercase font-sans-ui font-medium border rounded-sm transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
              style={{
                borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.45)',
                backgroundColor: isNight ? 'rgba(28, 25, 23, 0.5)' : 'rgba(244, 239, 234, 0.5)',
                color: isNight ? '#F7F3EE' : '#1E1B18',
              }}
            >
              <span>ADD TO CALENDAR</span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: isNight ? '#DFC794' : '#681A24' }}
              >
                →
              </span>
            </button>

            {/* Calendar Options Dropdown */}
            {showCalendarMenu && (
              <div
                className="absolute top-full left-0 right-0 sm:left-auto sm:right-auto sm:min-w-[200px] mt-2 py-2 rounded-sm border shadow-md backdrop-blur-md z-30 flex flex-col text-left transition-all duration-200"
                style={{
                  backgroundColor: isNight ? '#1E1B18' : '#FAF8F5',
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.3)',
                }}
              >
                <button
                  type="button"
                  onClick={handleGoogleCalendar}
                  className="px-4 py-2 text-xs tracking-wider font-sans-ui text-left transition-colors hover:bg-[#9B7E46]/10"
                  style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
                >
                  Google Calendar
                </button>
                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="px-4 py-2 text-xs tracking-wider font-sans-ui text-left transition-colors hover:bg-[#9B7E46]/10"
                  style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
                >
                  Apple / Outlook (.ics)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Flow Divider to Countdown */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
