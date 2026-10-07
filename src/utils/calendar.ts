/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CALENDAR INTEGRATION UTILITIES
 * Generates genuine RFC 5545 iCalendar (.ics) files and Google Calendar links.
 * Correctly accounts for Asia/Kolkata timezone (UTC+05:30).
 */

export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string or YYYY-MM-DDTHH:mm:ss+05:30
  endDate?: string;   // Optional ISO string
}

/**
 * Converts ISO date to iCalendar UTC timestamp: YYYYMMDDTHHMMSSZ
 */
function formatDateToICS(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Downloads a genuine .ics file to user's device (Apple Calendar, Outlook, Mobile devices)
 */
export function downloadICS(event: CalendarEventDetails, filename: string): void {
  const dtStamp = formatDateToICS(new Date().toISOString());
  const dtStart = formatDateToICS(event.startDate);
  const dtEnd = event.endDate ? formatDateToICS(event.endDate) : dtStart;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nayanthara & Vishnu Vijayan Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@invitation.kerala`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
  ];

  if (event.endDate) {
    icsLines.push(`DTEND:${dtEnd}`);
  }

  icsLines.push(
    `SUMMARY:${event.title.replace(/[,;]/g, ' ')}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location.replace(/[,;]/g, ' ')}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  );

  const icsContent = icsLines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Creates a direct Google Calendar Web URL
 */
export function getGoogleCalendarUrl(event: CalendarEventDetails): string {
  const dtStart = formatDateToICS(event.startDate);
  // If no end time, Google Calendar accepts same start date or +2h default for web URL
  const dtEnd = event.endDate
    ? formatDateToICS(event.endDate)
    : formatDateToICS(new Date(new Date(event.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString());

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${dtStart}/${dtEnd}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
