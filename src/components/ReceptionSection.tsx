/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RECEPTION SECTION
 * Evening celebration details with exact location link and open-ended calendar scheduling.
 * No invented end time.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';
import { downloadICS, getGoogleCalendarUrl, CalendarEventDetails } from '../utils/calendar';

export const ReceptionSection: React.FC = () => {
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
    title: `Nayanthara & Vishnu Vijayan — Wedding Reception`,
    description: `Wedding Reception of Nayanthara & Vishnu Vijayan.\nTime: ${WEDDING_DETAILS.reception.time}\nVenue: ${WEDDING_DETAILS.reception.venue}, ${WEDDING_DETAILS.reception.city}`,
    location: `${WEDDING_DETAILS.reception.venue}, ${WEDDING_DETAILS.reception.city}`,
    startDate: WEDDING_DETAILS.reception.isoStart,
  };

  const handleDownloadICS = () => {
    downloadICS(eventDetails, 'nayanthara-vishnu-vijayan-reception');
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

        {/* Section Heading */}
        <h2
          className={`font-cormorant text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.18em] uppercase transition-all duration-700 delay-200 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          {WEDDING_DETAILS.reception.title}
        </h2>

        {/* Date & Time */}
        <div
          className={`flex flex-col items-center gap-2 mb-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p
            className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#C7AA71' : '#681A24' }}
          >
            {WEDDING_DETAILS.reception.day}
          </p>

          <p
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.14em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.reception.date}
          </p>

          <p
            className="font-cormorant text-xl sm:text-2xl md:text-3xl font-normal tracking-[0.12em] mt-3 uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.reception.time}
          </p>
        </div>

        {/* Venue Information */}
        <div
          className={`flex flex-col items-center gap-2 mb-10 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.1em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
          >
            {WEDDING_DETAILS.reception.venue}
          </p>
          <p
            className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase transition-colors duration-700"
            style={{ color: isNight ? '#C7AA71' : '#681A24' }}
          >
            {WEDDING_DETAILS.reception.city}
          </p>
        </div>

        {/* Action Buttons: VIEW LOCATION & ADD TO CALENDAR */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* VIEW LOCATION Button */}
          <a
            href={WEDDING_DETAILS.reception.locationLink}
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

          {/* ADD TO CALENDAR Button with Dropdown */}
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

      {/* Visual Flow Divider to RSVP */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
