/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RSVP SECTION
 * Private backend persistence via Google Apps Script Web App.
 * Clear feedback with optional WhatsApp follow-up confirmation.
 */

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { RSVP_API_URL, WEDDING_DETAILS } from '../config';
import { getAccessToken } from '../services/auth';
import { appendRsvpToSheet } from '../services/googleSheets';
import { ConfirmModal } from './ConfirmModal';

type AttendanceOption = 'Joyfully Accept' | 'Regretfully Decline';
type GuestCount = '1' | '2' | '3' | '4+';

export const RsvpSection: React.FC = () => {
  const { isNight } = useTheme();

  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceOption>('Joyfully Accept');
  const [numberOfGuests, setNumberOfGuests] = useState<GuestCount>('2');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const payload = {
      guestName: guestName.trim(),
      attendance,
      numberOfGuests: attendance === 'Regretfully Decline' ? '0' : numberOfGuests,
      submittedAt: new Date().toISOString(),
    };

    const token = await getAccessToken();
    if (token) {
      // User is authenticated with Google Workspace - present mandatory confirmation dialog before mutating Google Sheet
      setPendingPayload(payload);
      setShowConfirmModal(true);
      return;
    }

    await processRsvp(payload, null);
  };

  const processRsvp = async (payload: any, token: string | null) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // If Google token is active, save directly to Google Sheet
      if (token) {
        await appendRsvpToSheet(token, payload.guestName, payload.attendance, payload.numberOfGuests);
      }

      // If backend Webhook/Apps Script URL is configured
      if (RSVP_API_URL && RSVP_API_URL.trim() !== '') {
        await fetch(RSVP_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      // Record in local cache to retain state
      try {
        localStorage.setItem('guest_rsvp_nv', JSON.stringify(payload));
      } catch {
        // Handled gracefully
      }

      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't save your RSVP just now. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      setPendingPayload(null);
    }
  };

  const handleConfirmSheetSave = async () => {
    const token = await getAccessToken();
    if (pendingPayload) {
      await processRsvp(pendingPayload, token);
    }
  };

  const handleWhatsAppFollowUp = () => {
    const textMessage = encodeURIComponent(
      `Namaskaram Vishnu & Nayanthara, this is ${guestName.trim()}.\nI have submitted my RSVP (${attendance}${
        attendance === 'Joyfully Accept' ? ` for ${numberOfGuests} guests` : ''
      }) for your wedding celebrations.`
    );
    const waUrl = `https://wa.me/${WEDDING_DETAILS.contact.whatsappRaw}?text=${textMessage}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative w-full py-16 md:py-28 px-6 flex flex-col items-center text-center">
      <div className="max-w-xl mx-auto w-full flex flex-col items-center">
        {/* Section Heading */}
        <p
          className="font-sans-ui text-xs tracking-[0.28em] uppercase transition-colors duration-700 mb-2"
          style={{ color: isNight ? '#C7AA71' : '#681A24' }}
        >
          RSVP
        </p>

        {/* Supporting Line */}
        <h3
          className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.05em] transition-colors duration-700 mb-10"
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          We would be delighted to have you with us.
        </h3>

        {submitted ? (
          /* Success State with Optional WhatsApp Follow-up */
          <div
            className="w-full p-8 sm:p-10 border rounded-sm transition-all duration-500 text-center flex flex-col items-center"
            style={{
              borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.4)',
              backgroundColor: isNight ? 'rgba(28, 25, 23, 0.5)' : 'rgba(244, 239, 234, 0.5)',
            }}
          >
            <p
              className="font-cormorant text-3xl font-light tracking-wide mb-2"
              style={{ color: isNight ? '#DFC794' : '#681A24' }}
            >
              Thank you.
            </p>
            <p
              className="font-cormorant text-xl font-light tracking-wide mb-8"
              style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
            >
              Your RSVP has been received.
            </p>

            {/* Optional WhatsApp confirmation follow-up */}
            <div className="flex flex-col items-center gap-3 pt-4 border-t w-full"
              style={{
                borderColor: isNight ? 'rgba(199, 170, 113, 0.2)' : 'rgba(155, 126, 70, 0.2)',
              }}
            >
              <p
                className="font-sans-ui text-[11px] tracking-wider uppercase opacity-75 max-w-sm"
                style={{ color: isNight ? '#A8A096' : '#7D756C' }}
              >
                Optional: Share a note directly on WhatsApp
              </p>

              <button
                type="button"
                onClick={handleWhatsAppFollowUp}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-sans-ui border rounded-sm transition-colors duration-300 hover:opacity-90"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.4)',
                  color: isNight ? '#DFC794' : '#681A24',
                }}
              >
                CONNECT VIA WHATSAPP →
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 text-left"
          >
            {/* GUEST NAME Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="rsvp-guest-name"
                className="font-sans-ui text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color: isNight ? '#C7AA71' : '#681A24' }}
              >
                GUEST NAME
              </label>
              <input
                id="rsvp-guest-name"
                type="text"
                required
                maxLength={100}
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

            {/* Error Notice */}
            {submitError && (
              <p className="text-xs font-sans-ui text-red-500 tracking-wider">
                {submitError}
              </p>
            )}

            {/* CONFIRM RSVP Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs tracking-[0.22em] uppercase font-sans-ui font-medium border rounded-sm transition-all duration-300 cursor-pointer disabled:opacity-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.45)' : 'rgba(155, 126, 70, 0.5)',
                  backgroundColor: isNight ? 'rgba(28, 25, 23, 0.5)' : 'rgba(244, 239, 234, 0.5)',
                  color: isNight ? '#F7F3EE' : '#1E1B18',
                }}
              >
                <span>{isSubmitting ? 'CONFIRMING...' : 'CONFIRM RSVP'}</span>
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

      {/* Confirmation Modal for Google Sheet updates */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Record RSVP to Google Sheet"
        message={`Save attendance response for "${pendingPayload?.guestName}" (${pendingPayload?.attendance}${
          pendingPayload?.attendance === 'Joyfully Accept' ? `, ${pendingPayload?.numberOfGuests} guests` : ''
        }) directly into the official Wedding Google Sheet?`}
        confirmLabel="Confirm &amp; Record"
        cancelLabel="Cancel"
        onConfirm={handleConfirmSheetSave}
        onCancel={() => {
          setShowConfirmModal(false);
          setPendingPayload(null);
        }}
      />

      {/* Visual Flow Divider to Closing */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
