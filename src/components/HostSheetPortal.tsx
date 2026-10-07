/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Host & Family Portal for Google Sheets Live Synchronization
 * Uses Firebase Auth with Google Workspace OAuth to view and manage
 * real-time RSVPs and Blessings from the official spreadsheets.
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logout,
  initAuth,
  getAccessToken,
} from '../services/auth';
import {
  fetchRsvpFromSheet,
  fetchBlessingsFromSheet,
  SPREADSHEET_IDS,
} from '../services/googleSheets';
import { useTheme } from '../context/ThemeContext';
import { ConfirmModal } from './ConfirmModal';

interface HostSheetPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostSheetPortal: React.FC<HostSheetPortalProps> = ({ isOpen, onClose }) => {
  const { isNight } = useTheme();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'rsvps' | 'blessings'>('rsvps');
  const [sheetRsvps, setSheetRsvps] = useState<Array<{ name: string; attendance: string; guests: string; timestamp?: string }>>([]);
  const [sheetBlessings, setSheetBlessings] = useState<Array<{ name: string; message: string; timestamp?: string }>>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Initialize Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch sheet data when signed in
  useEffect(() => {
    if (!token || !isOpen) return;

    let isMounted = true;
    const loadSheetData = async () => {
      setIsLoadingData(true);
      setLoadError(null);
      try {
        const [rsvps, blessings] = await Promise.all([
          fetchRsvpFromSheet(token).catch(() => []),
          fetchBlessingsFromSheet(token).catch(() => []),
        ]);
        if (isMounted) {
          setSheetRsvps(rsvps);
          setSheetBlessings(blessings);
        }
      } catch (err: any) {
        if (isMounted) {
          setLoadError('Could not read from Google Sheets. Ensure the account has viewer access.');
        }
      } finally {
        if (isMounted) setIsLoadingData(false);
      }
    };

    loadSheetData();
    return () => {
      isMounted = false;
    };
  }, [token, isOpen]);

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err: any) {
      setAuthError('Sign in with Google was not completed. Please try again.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setSheetRsvps([]);
    setSheetBlessings([]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col p-6 sm:p-8 border rounded-sm shadow-2xl transition-colors duration-500 overflow-hidden"
        style={{
          backgroundColor: isNight ? '#161412' : '#FDFBF7',
          borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.4)',
          color: isNight ? '#F7F3EE' : '#1E1B18',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b"
          style={{
            borderColor: isNight ? 'rgba(199, 170, 113, 0.2)' : 'rgba(155, 126, 70, 0.2)',
          }}
        >
          <div>
            <p
              className="font-sans-ui text-[10px] tracking-[0.25em] uppercase"
              style={{ color: isNight ? '#DFC794' : '#681A24' }}
            >
              HOST &amp; FAMILY PORTAL
            </p>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-light tracking-wide mt-1">
              Google Sheets Live Sync
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-sm opacity-60 hover:opacity-100 transition-opacity text-sm font-sans-ui focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-6">
          {!user ? (
            /* Sign-in State */
            <div className="flex flex-col items-center justify-center text-center py-8">
              <p className="font-sans-ui text-xs sm:text-sm max-w-md leading-relaxed mb-6 opacity-80">
                Sign in with your Google account to connect directly to the wedding Google Sheets to view incoming RSVPs and well-wishes.
              </p>

              {/* Official Google Sign-in Button */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoadingAuth}
                className="gsi-material-button inline-flex items-center justify-center border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 font-sans-ui text-xs font-medium shadow-sm hover:shadow transition-shadow cursor-pointer disabled:opacity-50"
              >
                <div className="mr-3 w-4 h-4">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                </div>
                <span>{isLoadingAuth ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>

              {authError && (
                <p className="mt-4 text-xs text-red-500 font-sans-ui">{authError}</p>
              )}
            </div>
          ) : (
            /* Authenticated View */
            <div className="flex flex-col gap-6">
              {/* Connected User Bar */}
              <div
                className="flex items-center justify-between p-3 rounded-sm border"
                style={{
                  backgroundColor: isNight ? 'rgba(28, 25, 23, 0.4)' : 'rgba(244, 239, 234, 0.4)',
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.25)' : 'rgba(155, 126, 70, 0.25)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#9B7E46]/20 flex items-center justify-center font-serif text-sm">
                    {user.displayName?.[0] || user.email?.[0] || 'G'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium font-sans-ui">{user.displayName || 'Google User'}</p>
                    <p className="text-[10px] opacity-70 font-sans-ui">{user.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-3 py-1.5 text-[11px] tracking-wider uppercase font-sans-ui border rounded-sm hover:opacity-75 transition-opacity"
                  style={{
                    borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.3)',
                    color: isNight ? '#DFC794' : '#681A24',
                  }}
                >
                  Sign Out
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-3 border-b pb-2"
                style={{
                  borderColor: isNight ? 'rgba(199, 170, 113, 0.2)' : 'rgba(155, 126, 70, 0.2)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('rsvps')}
                  className={`text-xs tracking-wider uppercase font-sans-ui pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'rsvps' ? 'font-semibold' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    color: activeTab === 'rsvps' ? (isNight ? '#DFC794' : '#681A24') : 'inherit',
                  }}
                >
                  RSVP Responses ({sheetRsvps.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('blessings')}
                  className={`text-xs tracking-wider uppercase font-sans-ui pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'blessings' ? 'font-semibold' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    color: activeTab === 'blessings' ? (isNight ? '#DFC794' : '#681A24') : 'inherit',
                  }}
                >
                  Wishes &amp; Blessings ({sheetBlessings.length})
                </button>
              </div>

              {/* Data Table */}
              {isLoadingData ? (
                <div className="py-8 text-center text-xs font-sans-ui opacity-75">
                  Synchronizing with Google Sheets...
                </div>
              ) : loadError ? (
                <div className="py-6 text-center text-xs font-sans-ui text-red-400">
                  {loadError}
                </div>
              ) : activeTab === 'rsvps' ? (
                <div className="flex flex-col gap-2">
                  {sheetRsvps.length === 0 ? (
                    <p className="text-center py-6 text-xs font-sans-ui opacity-60">
                      No RSVP rows found in spreadsheet yet.
                    </p>
                  ) : (
                    <div className="max-h-64 overflow-y-auto divide-y"
                      style={{
                        borderColor: isNight ? 'rgba(199, 170, 113, 0.15)' : 'rgba(155, 126, 70, 0.15)',
                      }}
                    >
                      {sheetRsvps.map((row, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-left text-xs font-sans-ui">
                          <div>
                            <span className="font-medium">{row.name}</span>
                            <span className="ml-2 text-[10px] opacity-60">{row.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs ${
                                row.attendance === 'Joyfully Accept' ? 'text-green-600 bg-green-50' : 'text-stone-500'
                              }`}
                            >
                              {row.attendance}
                            </span>
                            {row.attendance === 'Joyfully Accept' && (
                              <span className="text-[10px] opacity-75">{row.guests} guest(s)</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {sheetBlessings.length === 0 ? (
                    <p className="text-center py-6 text-xs font-sans-ui opacity-60">
                      No wishes recorded in spreadsheet yet.
                    </p>
                  ) : (
                    <div className="max-h-64 overflow-y-auto divide-y"
                      style={{
                        borderColor: isNight ? 'rgba(199, 170, 113, 0.15)' : 'rgba(155, 126, 70, 0.15)',
                      }}
                    >
                      {sheetBlessings.map((b, idx) => (
                        <div key={idx} className="py-2.5 flex flex-col text-left text-xs font-sans-ui gap-1">
                          <div className="flex justify-between items-baseline">
                            <span className="font-medium">{b.name}</span>
                            <span className="text-[10px] opacity-60">{b.timestamp}</span>
                          </div>
                          <p className="italic font-cormorant text-sm opacity-90">"{b.message}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t flex items-center justify-between text-[11px] font-sans-ui opacity-60"
          style={{
            borderColor: isNight ? 'rgba(199, 170, 113, 0.2)' : 'rgba(155, 126, 70, 0.2)',
          }}
        >
          <span>Spreadsheet Integration Active</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:underline uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
