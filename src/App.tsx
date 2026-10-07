/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NAYANTHARA & VISHNU VIJAYAN — WEDDING INVITATION
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
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { NightAtmosphere } from './components/NightAtmosphere';
import { AudioExperience, AudioExperienceRef } from './components/AudioExperience';

const WeddingJourney: React.FC = () => {
  const { isNight } = useTheme();
  const [hasOpened, setHasOpened] = useState(false);
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

      {/* 1. Opening Gateway (Dissolves upon "OPEN THE INVITATION →") */}
      {!hasOpened ? (
        <OpeningGate onOpen={handleOpenInvitation} />
      ) : (
        /* The Continuous Ceremonial Journey */
        <main className="relative z-10 w-full flex flex-col items-center animate-fadeInSlow">
          {/* 2. Main Wedding Announcement */}
          <MainAnnouncement />

          {/* 3. Families (Editorial Composition) */}
          <Families />

          {/* 4. Wedding Ceremony (Thaali Kettu & Muhurtham) */}
          <WeddingCeremony />

          {/* 5. Auspicious Countdown */}
          <CountdownSection />

          {/* 6. Reception (6:00 PM Onwards) */}
          <ReceptionSection />

          {/* 7. RSVP via WhatsApp */}
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
