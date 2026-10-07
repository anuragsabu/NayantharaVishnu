/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RSVP SECTION (WHATSAPP RSVP)
 * Direct, elegant WhatsApp confirmation without any external database or storage.
 * Dynamic message composition with manual send via WhatsApp (+91 6238594886).
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

type AttendanceOption = 'Joyfully Accept' | 'Regretfully Decline';
type GuestCount = '1' | '2' | '3' | '4+';

export const RsvpSection: React.FC = () => {
  const { isNight, isReducedMotion } = useTheme();

  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceOption>('Joyfully Accept');
  const [numberOfGuests, setNumberOfGuests] = useState<GuestCount>('2');
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [openError, setOpenError] = useState(false);

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

  const generateWhatsAppUrl = (name: string, attend: AttendanceOption, count: GuestCount) => {
    let messageText = '';
    if (attend === 'Joyfully Accept') {
      messageText = `Hello, I’m ${name.trim()}.\nI’d like to confirm my RSVP for Nayanthara & Vishnu Vijay’s wedding.\n\nAttendance: Joyfully Accept\nNumber of Guests: ${count}`;
    } else {
      messageText = `Hello, I’m ${name.trim()}.\nI’m sorry, but I won’t be able to attend Nayanthara & Vishnu Vijay’s wedding.\n\nAttendance: Regretfully Decline`;
    }

    return `https://wa.me/${WEDDING_DETAILS.contact.whatsappRaw}?text=${encodeURIComponent(messageText)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setOpenError(false);
    const waUrl = generateWhatsAppUrl(guestName, attendance, numberOfGuests);

    try {
      const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
      setWhatsappOpened(true);
      if (!opened) {
        // Pop-up blocker triggered
        setOpenError(true);
      }
    } catch {
      setOpenError(true);
    }
  };

  const handleManualOpen = () => {
    const waUrl = generateWhatsAppUrl(guestName, attendance, numberOfGuests);
    window.location.href = waUrl;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-28 px-6 flex flex-col items-center text-center"
    >
      <div className="max-w-xl mx-auto w-full flex flex-col items-center">
        {/* Antique Brass Line Draws First */}
        <div
          className={`w-16 md:w-24 h-[1px] kasavu-line mb-4 transition-transform duration-1000 ${
            isVisible ? 'animate-line-draw' : 'scale-x-0'
          }`}
        />

        {/* Section Heading */}
        <h2
          className={`font-cormorant text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.18em] uppercase transition-all duration-700 delay-200 mb-2 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          RSVP
        </h2>

        {/* Supporting Line */}
        <p
          className={`font-cormorant italic text-lg sm:text-xl md:text-2xl font-light tracking-[0.05em] transition-all duration-700 delay-300 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ color: isNight ? '#DFC794' : '#681A24' }}
        >
          We would be delighted to have you with us.
        </p>

        {/* Clear Communication Notice */}
        <p
          className="font-sans-ui text-[11px] tracking-[0.2em] uppercase opacity-70 mb-8"
          style={{ color: isNight ? '#A8A096' : '#7D756C' }}
        >
          Your RSVP will be confirmed via WhatsApp.
        </p>

        {whatsappOpened ? (
          /* WhatsApp Action Notice */
          <div
            className="w-full p-8 sm:p-10 border rounded-sm transition-all duration-500 text-center flex flex-col items-center animate-fadeInSlow"
            style={{
              borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.4)',
              backgroundColor: isNight ? 'rgba(28, 25, 23, 0.5)' : 'rgba(244, 239, 234, 0.5)',
            }}
          >
            <p
              className="font-cormorant text-2xl sm:text-3xl font-light tracking-wide mb-3"
              style={{ color: isNight ? '#DFC794' : '#681A24' }}
            >
              Opening WhatsApp...
            </p>
            <p
              className="font-sans-ui text-xs leading-relaxed max-w-sm opacity-80 mb-6"
              style={{ color: isNight ? '#EAE3DA' : '#4A443E' }}
            >
              Please press <strong>Send</strong> in WhatsApp to complete your RSVP message to Vishnu &amp; Nayanthara.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleManualOpen}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-sans-ui border rounded-sm transition-colors duration-300 hover:opacity-90 cursor-pointer"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.4)',
                  color: isNight ? '#DFC794' : '#681A24',
                }}
              >
                OPEN WHATSAPP AGAIN →
              </button>

              <button
                type="button"
                onClick={() => setWhatsappOpened(false)}
                className="text-[11px] tracking-wider uppercase font-sans-ui opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: isNight ? '#A8A096' : '#7D756C' }}
              >
                Edit Details
              </button>
            </div>

            {openError && (
              <p className="mt-4 text-xs font-sans-ui text-amber-600 tracking-wider">
                WhatsApp couldn’t be opened. Please contact us directly at {WEDDING_DETAILS.contact.whatsapp}.
              </p>
            )}
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className={`w-full flex flex-col gap-8 text-left transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* YOUR NAME Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="rsvp-guest-name"
                className="font-sans-ui text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color: isNight ? '#C7AA71' : '#681A24' }}
              >
                YOUR NAME
              </label>
              <input
                id="rsvp-guest-name"
                type="text"
                required
                maxLength={80}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Full name of guest / family"
                className="w-full px-4 py-3 bg-transparent border rounded-sm font-sans-ui text-sm focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.3)',
                  color: isNight ? '#F7F3EE' : '#1E1B18',
                }}
              />
            </div>

            {/* ATTENDANCE Selector */}
            <div className="flex flex-col gap-3">
              <span
                className="font-sans-ui text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color: isNight ? '#C7AA71' : '#681A24' }}
              >
                ATTENDANCE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('Joyfully Accept')}
                  className={`px-4 py-3 text-xs tracking-[0.16em] uppercase font-sans-ui font-medium border rounded-sm transition-all duration-300 cursor-pointer ${
                    attendance === 'Joyfully Accept' ? 'shadow-sm' : 'opacity-70 hover:opacity-90'
                  }`}
                  style={{
                    borderColor:
                      attendance === 'Joyfully Accept'
                        ? isNight
                          ? '#DFC794'
                          : '#9B7E46'
                        : isNight
                        ? 'rgba(199, 170, 113, 0.2)'
                        : 'rgba(155, 126, 70, 0.2)',
                    backgroundColor:
                      attendance === 'Joyfully Accept'
                        ? isNight
                          ? 'rgba(223, 199, 148, 0.15)'
                          : 'rgba(155, 126, 70, 0.12)'
                        : 'transparent',
                    color: isNight ? '#F7F3EE' : '#1E1B18',
                  }}
                >
                  Joyfully Accept
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('Regretfully Decline')}
                  className={`px-4 py-3 text-xs tracking-[0.16em] uppercase font-sans-ui font-medium border rounded-sm transition-all duration-300 cursor-pointer ${
                    attendance === 'Regretfully Decline' ? 'shadow-sm' : 'opacity-70 hover:opacity-90'
                  }`}
                  style={{
                    borderColor:
                      attendance === 'Regretfully Decline'
                        ? isNight
                          ? '#DFC794'
                          : '#9B7E46'
                        : isNight
                        ? 'rgba(199, 170, 113, 0.2)'
                        : 'rgba(155, 126, 70, 0.2)',
                    backgroundColor:
                      attendance === 'Regretfully Decline'
                        ? isNight
                          ? 'rgba(223, 199, 148, 0.15)'
                          : 'rgba(155, 126, 70, 0.12)'
                        : 'transparent',
                    color: isNight ? '#F7F3EE' : '#1E1B18',
                  }}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* NUMBER OF GUESTS (Visible if Joyfully Accept) */}
            {attendance === 'Joyfully Accept' && (
              <div className="flex flex-col gap-3">
                <span
                  className="font-sans-ui text-[11px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: isNight ? '#C7AA71' : '#681A24' }}
                >
                  NUMBER OF GUESTS
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {(['1', '2', '3', '4+'] as GuestCount[]).map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setNumberOfGuests(count)}
                      className={`py-2.5 text-xs font-sans-ui tracking-wider border rounded-sm transition-all duration-300 cursor-pointer ${
                        numberOfGuests === count ? 'font-semibold' : 'opacity-70 hover:opacity-90'
                      }`}
                      style={{
                        borderColor:
                          numberOfGuests === count
                            ? isNight
                              ? '#DFC794'
                              : '#9B7E46'
                            : isNight
                            ? 'rgba(199, 170, 113, 0.2)'
                            : 'rgba(155, 126, 70, 0.2)',
                        backgroundColor:
                          numberOfGuests === count
                            ? isNight
                              ? 'rgba(223, 199, 148, 0.15)'
                              : 'rgba(155, 126, 70, 0.12)'
                            : 'transparent',
                        color: isNight ? '#F7F3EE' : '#1E1B18',
                      }}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CONFIRM RSVP Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs tracking-[0.22em] uppercase font-sans-ui font-medium border rounded-sm transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.45)' : 'rgba(155, 126, 70, 0.5)',
                  backgroundColor: isNight ? 'rgba(28, 25, 23, 0.5)' : 'rgba(244, 239, 234, 0.5)',
                  color: isNight ? '#F7F3EE' : '#1E1B18',
                }}
              >
                <span>CONFIRM RSVP</span>
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: isNight ? '#DFC794' : '#681A24' }}
                >
                  →
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Visual Flow Divider to Closing */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
