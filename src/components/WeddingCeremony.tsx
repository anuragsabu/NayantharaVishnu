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
import { TempleBell } from './TempleBell';

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
    title: `Nayanthara & Vishnu Vijayan — Thali Kettu`,
    description: `Wedding Ceremony (Thali Kettu) of Nayanthara & Vishnu Vijayan.\nMuhurtham: ${WEDDING_DETAILS.ceremony.muhurtham}\nVenue: ${WEDDING_DETAILS.ceremony.fullVenue}`,
    location: WEDDING_DETAILS.ceremony.fullVenue,
    startDate: WEDDING_DETAILS.ceremony.isoStart,
    endDate: WEDDING_DETAILS.ceremony.isoEnd,
  };

  const handleDownloadICS = () => {
    downloadICS(eventDetails, 'nayanthara-vishnu-vijayan-thali-kettu');
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
      className="relative w-full py-16 md:py-28 px-6 flex flex-col items-center text-center overflow-hidden"
    >
      {/* 2. AUTHENTIC KERALA TEMPLE ARCHITECTURAL LINE-ART ENGRAVING — Behind Ceremony Content */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 transition-all duration-[1800ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div
          className="w-[340px] sm:w-[480px] md:w-[620px] max-w-full transition-opacity duration-700 opacity-[0.11] dark:opacity-[0.16]"
          style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
        >
          <svg
            viewBox="0 0 400 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto mx-auto"
          >
            {/* Sacred Thazhikakkudam (Pinnacle Stupi Finial) */}
            <path d="M200 8 L203 15 L200 22 L197 15 Z" fill="currentColor" />
            <line x1="200" y1="22" x2="200" y2="34" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="200" cy="26" rx="3.5" ry="1.8" fill="currentColor" />
            <ellipse cx="200" cy="34" rx="5" ry="2.2" fill="currentColor" />

            {/* Upper Tier Pitched Kerala Copper Roof (Dwithala Vimana) */}
            <line x1="168" y1="35" x2="232" y2="35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M200 35 L144 76 H256 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
            {/* Roof Timber Rafters */}
            <line x1="200" y1="35" x2="162" y2="76" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="35" x2="182" y2="76" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="35" x2="218" y2="76" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="35" x2="238" y2="76" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />

            {/* Upper Sweeping Eaves Projection (Chhajja Rim) */}
            <path d="M140 78 L144 76 H256 L260 78" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

            {/* Louvered Timber Clerestory / Griva (Attic Ventilation) */}
            <rect x="158" y="78" width="84" height="22" stroke="currentColor" strokeWidth="1" fill="none" />
            <line x1="168" y1="78" x2="168" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="178" y1="78" x2="178" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="188" y1="78" x2="188" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="198" y1="78" x2="198" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="202" y1="78" x2="202" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="212" y1="78" x2="212" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="222" y1="78" x2="222" y2="100" stroke="currentColor" strokeWidth="0.7" />
            <line x1="232" y1="78" x2="232" y2="100" stroke="currentColor" strokeWidth="0.7" />

            {/* Main Sweeping Lower Overhanging Tiled Roof (Ekathala Eaves) */}
            <path d="M200 100 L68 144 H332 Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
            {/* Rafter Ribs */}
            <line x1="200" y1="100" x2="104" y2="144" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="100" x2="138" y2="144" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="100" x2="172" y2="144" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="100" x2="228" y2="144" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="100" x2="262" y2="144" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="200" y1="100" x2="296" y2="144" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />

            {/* Lower Eaves Timber Molding (Valabhi Beam) */}
            <line x1="62" y1="146" x2="338" y2="146" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="66" y1="149" x2="334" y2="149" stroke="currentColor" strokeWidth="0.8" />

            {/* Traditional Kerala Timber Pillars (Thoonukal) & Sanctum Cloister */}
            <rect x="96" y="149" width="208" height="48" stroke="currentColor" strokeWidth="1" fill="none" />
            <line x1="112" y1="149" x2="112" y2="197" stroke="currentColor" strokeWidth="1.4" />
            <line x1="134" y1="149" x2="134" y2="197" stroke="currentColor" strokeWidth="1" />
            <line x1="156" y1="149" x2="156" y2="197" stroke="currentColor" strokeWidth="1" />
            <line x1="178" y1="149" x2="178" y2="197" stroke="currentColor" strokeWidth="1" />
            <line x1="222" y1="149" x2="222" y2="197" stroke="currentColor" strokeWidth="1" />
            <line x1="244" y1="149" x2="244" y2="197" stroke="currentColor" strokeWidth="1" />
            <line x1="266" y1="149" x2="266" y2="197" stroke="currentColor" strokeWidth="1" />
            <line x1="288" y1="149" x2="288" y2="197" stroke="currentColor" strokeWidth="1.4" />

            {/* Sanctum Portal (Sreekovil Dvara) */}
            <path d="M190 197 V163 C190 159 210 159 210 163 V197" stroke="currentColor" strokeWidth="1.2" />

            {/* Moulded Granite Basement Courses (Adhisthana) */}
            <rect x="84" y="197" width="232" height="7" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="74" y="204" width="252" height="8" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <rect x="62" y="212" width="276" height="10" stroke="currentColor" strokeWidth="1.4" fill="none" />
            <line x1="50" y1="222" x2="350" y2="222" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center">
        {/* A. INTERACTIVE TEMPLE BELL (Gentle 1-2° Pendulum Sway upon entering viewport) */}
        <div className="mb-4">
          <TempleBell />
        </div>

        {/* B. Antique Brass Kasavu Line Draws Smoothly */}
        <div
          className={`w-20 md:w-32 h-[1px] kasavu-line mb-4 transition-transform duration-1000 ${
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

        {/* Venue Information Reveal */}
        <div
          className={`flex flex-col items-center mt-6 mb-8 w-full transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
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
