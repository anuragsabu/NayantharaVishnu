/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BLESSINGS WALL
 * Sacred wishes and prayers for Nayanthara & Vishnu Vijay.
 * Google Apps Script Web App integration with private backend persistence.
 * Editorial list layout (no chat bubbles or social cards).
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WISHES_API_URL } from '../config';
import { getAccessToken } from '../services/auth';
import { appendBlessingToSheet } from '../services/googleSheets';
import { ConfirmModal } from './ConfirmModal';

interface BlessingItem {
  id: string;
  name: string;
  message: string;
  date?: string;
}

const INITIAL_BLESSINGS: BlessingItem[] = [
  {
    id: 'b-1',
    name: 'Elders & Family',
    message: 'May Lord Mahadeva shower His divine grace, peace, and eternal auspiciousness upon Nayanthara and Vishnu Vijay as they unite in sacred matrimony.',
  },
  {
    id: 'b-2',
    name: 'Kottayam & Wayanad Well-wishers',
    message: 'ഹൃദയം നിറഞ്ഞ മംഗളാശംസകൾ! May your life together be as radiant as the golden kasavu and as serene as the dawn prayers.',
  },
  {
    id: 'b-3',
    name: 'Adithya & Anjali',
    message: 'Wishing our dearest Vishnu and Nayanthara a lifetime of cherished laughter, deepest companionship, and boundless happiness. We look forward to celebrating this beautiful day with you.',
  },
];

export const BlessingsWall: React.FC = () => {
  const { isNight } = useTheme();

  const [blessings, setBlessings] = useState<BlessingItem[]>(() => {
    try {
      const saved = localStorage.getItem('guest_blessings_nv');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_BLESSINGS];
      }
    } catch {
      // Fallback
    }
    return INITIAL_BLESSINGS;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingBlessing, setPendingBlessing] = useState<BlessingItem | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: BlessingItem = {
      id: `blessing-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('en-GB'),
    };

    const token = await getAccessToken();
    if (token) {
      // Present user confirmation dialog before updating Google Sheet
      setPendingBlessing(newBlessing);
      setShowConfirmModal(true);
      return;
    }

    await processBlessing(newBlessing, null);
  };

  const processBlessing = async (blessingItem: BlessingItem, token: string | null) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (token) {
        await appendBlessingToSheet(token, blessingItem.name, blessingItem.message);
      }

      // If backend API URL is configured, send to Google Apps Script Web App
      if (WISHES_API_URL && WISHES_API_URL.trim() !== '') {
        await fetch(WISHES_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guestName: blessingItem.name,
            wishes: blessingItem.message,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      // Persist to local storage for immediate guest feedback
      try {
        const existing = JSON.parse(localStorage.getItem('guest_blessings_nv') || '[]');
        const updated = [blessingItem, ...existing];
        localStorage.setItem('guest_blessings_nv', JSON.stringify(updated));
      } catch {
        // Storage full or unavailable
      }

      setBlessings((prev) => [blessingItem, ...prev]);
      setSubmittedSuccess(true);
      setName('');
      setMessage('');
    } catch {
      setSubmitError("We couldn't receive your blessing just now. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      setPendingBlessing(null);
    }
  };

  const handleConfirmSheetSave = async () => {
    const token = await getAccessToken();
    if (pendingBlessing) {
      await processBlessing(pendingBlessing, token);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-28 px-6 flex flex-col items-center text-center">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
        {/* Section Heading */}
        <p
          className="font-sans-ui text-xs tracking-[0.28em] uppercase transition-colors duration-700 mb-2"
          style={{ color: isNight ? '#C7AA71' : '#681A24' }}
        >
          BLESSINGS
        </p>

        {/* Supporting Line */}
        <h3
          className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.05em] transition-colors duration-700 mb-10"
          style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
        >
          Leave a blessing for Nayanthara & Vishnu Vijay
        </h3>

        {/* Form Container */}
        {submittedSuccess ? (
          <div
            className="w-full max-w-lg p-8 border rounded-sm transition-all duration-500 mb-14"
            style={{
              borderColor: isNight ? 'rgba(199, 170, 113, 0.35)' : 'rgba(155, 126, 70, 0.35)',
              backgroundColor: isNight ? 'rgba(28, 25, 23, 0.45)' : 'rgba(244, 239, 234, 0.45)',
            }}
          >
            <p
              className="font-cormorant text-2xl font-light tracking-wider mb-2"
              style={{ color: isNight ? '#DFC794' : '#681A24' }}
            >
              Your blessings have been received.
            </p>
            <p
              className="font-sans-ui text-xs tracking-widest uppercase opacity-75 mb-6"
              style={{ color: isNight ? '#A8A096' : '#7D756C' }}
            >
              Thank you for sharing your prayers and affection.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedSuccess(false)}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans-ui transition-colors hover:underline"
              style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
            >
              Leave another blessing →
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg flex flex-col gap-6 text-left mb-16"
          >
            {/* YOUR NAME Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="blessing-name"
                className="font-sans-ui text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color: isNight ? '#C7AA71' : '#681A24' }}
              >
                YOUR NAME
              </label>
              <input
                id="blessing-name"
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-transparent border rounded-sm font-sans-ui text-sm focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.3)',
                  color: isNight ? '#F7F3EE' : '#1E1B18',
                }}
              />
            </div>

            {/* YOUR WISHES Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="blessing-message"
                className="font-sans-ui text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color: isNight ? '#C7AA71' : '#681A24' }}
              >
                YOUR WISHES
              </label>
              <textarea
                id="blessing-message"
                required
                rows={4}
                maxLength={600}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers, blessings, or message"
                className="w-full px-4 py-3 bg-transparent border rounded-sm font-sans-ui text-sm focus:outline-none transition-colors duration-300 resize-none"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.3)',
                  color: isNight ? '#F7F3EE' : '#1E1B18',
                }}
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <p className="text-xs font-sans-ui text-red-500 tracking-wider">
                {submitError}
              </p>
            )}

            {/* SEND BLESSINGS Button */}
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
                <span>{isSubmitting ? 'SENDING...' : 'SEND BLESSINGS'}</span>
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

        {/* Guest Blessings Feed (Clean Editorial Typography, No Chat Bubbles) */}
        <div className="w-full max-w-xl flex flex-col items-center">
          <div className="w-12 h-[1px] kasavu-line mb-8" />

          <div className="w-full flex flex-col divide-y transition-colors duration-700"
            style={{
              borderColor: isNight ? 'rgba(199, 170, 113, 0.15)' : 'rgba(155, 126, 70, 0.15)',
            }}
          >
            {blessings.map((b) => {
              const isExpanded = !!expandedIds[b.id];
              const isLong = b.message.length > 130;

              return (
                <div key={b.id} className="py-6 text-left flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <p
                      className="font-cormorant text-lg font-medium tracking-wide transition-colors duration-700"
                      style={{ color: isNight ? '#F7F3EE' : '#1E1B18' }}
                    >
                      {b.name}
                    </p>
                    {b.date && (
                      <span
                        className="font-sans-ui text-[10px] tracking-widest uppercase opacity-50"
                        style={{ color: isNight ? '#A8A096' : '#7D756C' }}
                      >
                        {b.date}
                      </span>
                    )}
                  </div>

                  <p
                    className={`font-cormorant text-base sm:text-lg font-light leading-relaxed italic transition-colors duration-700 ${
                      !isExpanded && isLong ? 'line-clamp-3' : ''
                    }`}
                    style={{ color: isNight ? '#D6CEC3' : '#4A443E' }}
                  >
                    "{b.message}"
                  </p>

                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(b.id)}
                      className="self-start text-[11px] tracking-wider uppercase font-sans-ui mt-1 opacity-75 hover:opacity-100 transition-opacity"
                      style={{ color: isNight ? '#DFC794' : '#9B7E46' }}
                    >
                      {isExpanded ? 'Show less ↑' : 'Read more →'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Google Sheet updates */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Submit Blessing to Google Sheet"
        message={`Append the prayer and wish from "${pendingBlessing?.name}" directly to the official Wedding Google Sheet?`}
        confirmLabel="Confirm &amp; Append"
        cancelLabel="Cancel"
        onConfirm={handleConfirmSheetSave}
        onCancel={() => {
          setShowConfirmModal(false);
          setPendingBlessing(null);
        }}
      />

      {/* Visual Flow Divider to RSVP */}
      <div className="w-16 md:w-24 h-[1px] kasavu-line mt-16 md:mt-24" />
    </section>
  );
};
