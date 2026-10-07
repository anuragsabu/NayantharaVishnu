/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WEDDING CONFIGURATION & CONSTANTS
 * Private backend spreadsheets are handled via Google Apps Script Web App endpoints.
 * Never expose raw spreadsheet IDs or credentials to the client.
 */

export const WEDDING_DETAILS = {
  bride: {
    firstName: 'Nayanthara',
    fullName: 'Nayanthara Sunil',
    parents: 'Mr. Sunil V. K. & Mrs. Shaima Sunil',
    home: 'Pulpally · Wayanad',
    fullHome: 'Pulpally, Wayanad, Kerala',
  },
  groom: {
    firstName: 'Vishnu',
    fullName: 'Vishnu Vijay',
    parents: 'Mr. Vijayan V. N. & Mrs. Sheela Vijayan',
    home: 'Pala · Kottayam',
    fullHome: 'Pala, Kottayam, Kerala',
  },
  monogram: 'N & V',
  ceremony: {
    title: 'THE WEDDING',
    subheading: 'THAALI KETTU',
    day: 'THURSDAY',
    date: '05 NOVEMBER 2026',
    formattedDate: 'Thursday, 05 November 2026',
    muhurtham: '8:34 AM — 9:22 AM',
    venue: 'Ettumanoor Shri Mahadeva Temple',
    city: 'Ettumanoor · Kottayam · Kerala',
    fullVenue: 'Ettumanoor Shri Mahadeva Temple, Ettumanoor, Kottayam, Kerala',
    locationLink: 'https://share.google/api2d7T8CcYje2IrT',
    isoStart: '2026-11-05T08:34:00+05:30',
    isoEnd: '2026-11-05T09:22:00+05:30',
  },
  reception: {
    title: 'THE RECEPTION',
    subheading: 'A CELEBRATION OF LOVE & FAMILY',
    day: 'SUNDAY',
    date: '08 NOVEMBER 2026',
    formattedDate: 'Sunday, 08 November 2026',
    time: '6:00 PM ONWARDS',
    venue: 'Mulankolly Queen Mary Auditorium',
    locationLink: 'https://share.google/Bdx7VWJm7AbdDbstE',
    isoStart: '2026-11-08T18:00:00+05:30',
  },
  contact: {
    whatsapp: '+91 6238594886',
    whatsappRaw: '916238594886',
  },
  music: {
    youtubeId: 'zvP6UqVBNEw',
    startTimeSeconds: 52,
    title: 'Walk of the Bride | Sita Kalyana Vaibhogame',
    artist: 'Agam',
  },
} as const;
