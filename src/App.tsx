/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NAYANTHARA & VISHNU VIJAY — WEDDING INVITATION
 * An heirloom Kerala Hindu digital wedding invitation experience.
 */

import React, { useState, useRef } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { OpeningGate } from './components/OpeningGate';
import { MainAnnouncement } from './components/MainAnnouncement';
import { Families } from './components/Families';
import { WeddingCeremony } from './components/WeddingCeremony';
import { CountdownSection } from './components/CountdownSection';
import { ReceptionSection } from './components/ReceptionSection';
import { BlessingsWall } from './components/BlessingsWall';
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { NightAtmosphere } from './components/NightAtmosphere';
import { AudioExperience, AudioExperienceRef } from './components/AudioExperience';
import { HostSheetPortal } from './components/HostSheetPortal';

const WeddingJourney: React.FC = () => {
  const { isNight } = useTheme();
  const [hasOpened, setHasOpened] = useState(false);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);
  const audioRef = useRef<AudioExperienceRef>(null);

  const handleOpenInvitation = () => {
    setHasOpened(true);
    // Start Agam's Sita Kalyana Vaibhogame at exactly 00:52 upon user gesture
    if (audioRef.current) {
      audioRef.current.startPlayback();
    }
  };

  return (
    <div
      className="relative min-h-screen w-full paper-texture transition-colors duration-1000 flex flex-col items-center justify-start overflow-x-hidden"
      style={{
        backgroundColor: isNight ? '#121110' : '#FDFBF7',
        color: isNight ? '#F7F3EE' : '#1E1B18',
      }}
    >
      {/* Night Sky Ambience, Moon, Temple Roof Silhouette & Fireflies */}
      <NightAtmosphere />

      {/* Persistent Audio Experience & Floating Media Control */}
      <AudioExperience ref={audioRef} hasOpenedInvitation={hasOpened} />

      {/* Host & Family Google Sheets Sync Portal Modal */}
      <HostSheetPortal
        isOpen={isHostPortalOpen}
        onClose={() => setIsHostPortalOpen(false)}
      />

      {/* Opening Gateway (Dissolves upon "OPEN THE INVITATION →") */}
      {!hasOpened ? (
        <OpeningGate onOpen={handleOpenInvitation} />
      ) : (
        /* The Continuous Ceremonial Journey */
        <main className="relative z-10 w-full flex flex-col items-center animate-fadeInSlow">
          {/* Subtle Host & Family Google Sheets Access Ribbon */}
          <div className="w-full flex justify-end px-6 pt-4 max-w-5xl">
            <button
              type="button"
              onClick={() => setIsHostPortalOpen(true)}
              className="group inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans-ui rounded-full border opacity-60 hover:opacity-100 transition-all cursor-pointer focus:outline-none"
              style={{
                borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.3)',
                color: isNight ? '#DFC794' : '#681A24',
              }}
            >
              <span>Host Portal</span>
              <span>·</span>
              <span>Google Sheets Sync</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          {/* 1. Main Wedding Announcement */}
          <MainAnnouncement />

          {/* 2. Families (Editorial Composition) */}
          <Families />

          {/* 3. Wedding Ceremony (Thaali Kettu & Muhurtham) */}
          <WeddingCeremony />

          {/* 4. Auspicious Countdown */}
          <CountdownSection />

          {/* 5. Reception (6:00 PM Onwards) */}
          <ReceptionSection />

          {/* 6. Blessings Wall */}
          <BlessingsWall />

          {/* 7. RSVP */}
          <RsvpSection />

          {/* 8. Closing Benediction & Steady Nilavilakku */}
          <ClosingSection />
        </main>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <WeddingJourney />
    </ThemeProvider>
  );
}
