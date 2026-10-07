/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Google Sheets API v4 Service
 * Performs secure client-side reads and appends to the wedding spreadsheets.
 */

export const SPREADSHEET_IDS = {
  wishes: '1xkRZbaCvUXHbMvTbORYdwp9E3mrTfuI2SxNjzif5L3w',
  rsvp: '1S15XGnoddcIOuHzG1rHeL5sYVAwDkl5Kv05llHcN6DQ',
};

/**
 * Retrieves the first sheet/tab name dynamically from spreadsheet metadata
 */
async function getFirstSheetTitle(spreadsheetId: string, accessToken: string): Promise<string> {
  try {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch spreadsheet metadata: ${res.status}`);
    }
    const data = await res.json();
    return data.sheets?.[0]?.properties?.title || 'Sheet1';
  } catch {
    return 'Sheet1';
  }
}

/**
 * Appends an RSVP row to the Google Sheet
 */
export async function appendRsvpToSheet(
  accessToken: string,
  guestName: string,
  attendance: string,
  numberOfGuests: string
): Promise<boolean> {
  const sheetTitle = await getFirstSheetTitle(SPREADSHEET_IDS.rsvp, accessToken);
  const range = `${sheetTitle}!A:D`;
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_IDS.rsvp}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[guestName, attendance, numberOfGuests, timestamp]],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error('Failed to append RSVP to Google Sheet:', errText);
    throw new Error('Failed to update Google Sheet.');
  }

  return true;
}

/**
 * Appends a Blessing row to the Google Sheet
 */
export async function appendBlessingToSheet(
  accessToken: string,
  guestName: string,
  message: string
): Promise<boolean> {
  const sheetTitle = await getFirstSheetTitle(SPREADSHEET_IDS.wishes, accessToken);
  const range = `${sheetTitle}!A:C`;
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_IDS.wishes}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[guestName, message, timestamp]],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error('Failed to append blessing to Google Sheet:', errText);
    throw new Error('Failed to update Google Sheet.');
  }

  return true;
}

/**
 * Reads all RSVP entries from the Google Sheet
 */
export async function fetchRsvpFromSheet(accessToken: string): Promise<Array<{
  name: string;
  attendance: string;
  guests: string;
  timestamp?: string;
}>> {
  const sheetTitle = await getFirstSheetTitle(SPREADSHEET_IDS.rsvp, accessToken);
  const range = `${sheetTitle}!A2:D1000`;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_IDS.rsvp}/values/${encodeURIComponent(range)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to read RSVPs from Google Sheet: ${res.status}`);
  }

  const data = await res.json();
  const rows: any[][] = data.values || [];

  return rows.map((row) => ({
    name: row[0] || 'Guest',
    attendance: row[1] || 'Joyfully Accept',
    guests: row[2] || '1',
    timestamp: row[3] || '',
  }));
}

/**
 * Reads all Blessings entries from the Google Sheet
 */
export async function fetchBlessingsFromSheet(accessToken: string): Promise<Array<{
  name: string;
  message: string;
  timestamp?: string;
}>> {
  const sheetTitle = await getFirstSheetTitle(SPREADSHEET_IDS.wishes, accessToken);
  const range = `${sheetTitle}!A2:C1000`;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_IDS.wishes}/values/${encodeURIComponent(range)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to read blessings from Google Sheet: ${res.status}`);
  }

  const data = await res.json();
  const rows: any[][] = data.values || [];

  return rows.map((row) => ({
    name: row[0] || 'Well-wisher',
    message: row[1] || '',
    timestamp: row[2] || '',
  }));
}
