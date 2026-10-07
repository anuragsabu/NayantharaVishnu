/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AUDIO EXPERIENCE
 * Agam - "Walk of the Bride | Sita Kalyana Vaibhogame" (YouTube: zvP6UqVBNEw)
 * Starts strictly at 00:52 upon invitation open.
 * Hidden iframe with luxury floating editorial media control.
 */

import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_DETAILS } from '../config';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface AudioExperienceRef {
  startPlayback: () => void;
}

interface AudioExperienceProps {
  hasOpenedInvitation: boolean;
}

export const AudioExperience = forwardRef<AudioExperienceRef, AudioExperienceProps>(
  ({ hasOpenedInvitation }, ref) => {
    const { isNight } = useTheme();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const playerRef = useRef<any>(null);
    const containerId = 'yt-audio-hidden-player';

    // Initialize YouTube IFrame Player API
    useEffect(() => {
      let isMounted = true;

      const initPlayer = () => {
        if (!window.YT || !window.YT.Player) return;
        if (playerRef.current) return;

        try {
          playerRef.current = new window.YT.Player(containerId, {
            videoId: WEDDING_DETAILS.music.youtubeId,
            playerVars: {
              start: WEDDING_DETAILS.music.startTimeSeconds,
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
            },
            events: {
              onReady: () => {
                if (isMounted) setIsReady(true);
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                // State: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
                if (event.data === 1) {
                  setIsPlaying(true);
                } else if (event.data === 2) {
                  setIsPlaying(false);
                } else if (event.data === 0) {
                  // Loop back from 52 seconds as required
                  event.target.seekTo(WEDDING_DETAILS.music.startTimeSeconds, true);
                  event.target.playVideo();
                }
              },
            },
          });
        } catch {
          // Fallback silently if YouTube API is blocked in strict offline sandboxes
        }
      };

      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          initPlayer();
        };
      } else {
        initPlayer();
      }

      return () => {
        isMounted = false;
      };
    }, []);

    const playMusic = useCallback(() => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.seekTo(WEDDING_DETAILS.music.startTimeSeconds, true);
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {
          // Handled gracefully
        }
      }
    }, []);

    const pauseMusic = useCallback(() => {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        try {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } catch {
          // Handled gracefully
        }
      }
    }, []);

    const togglePlay = useCallback(() => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    }, [isPlaying, pauseMusic, playMusic]);

    const toggleMute = useCallback(() => {
      if (!playerRef.current) return;
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch {
        // Handled gracefully
      }
    }, [isMuted]);

    // Expose startPlayback to parent component (invoked when OPEN THE INVITATION is tapped)
    useImperativeHandle(ref, () => ({
      startPlayback: () => {
        playMusic();
      },
    }));

    if (!hasOpenedInvitation) {
      return (
        <div
          id={containerId}
          className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        />
      );
    }

    return (
      <>
        {/* Hidden YouTube Iframe Player Container */}
        <div
          id={containerId}
          className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        />

        {/* Floating Luxury Editorial Media Control */}
        <div className="fixed bottom-5 right-5 z-40 transition-all duration-700">
          <div
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-md transition-colors duration-700"
            style={{
              backgroundColor: isNight ? 'rgba(24, 22, 20, 0.85)' : 'rgba(253, 251, 247, 0.88)',
              borderColor: isNight ? 'rgba(199, 170, 113, 0.3)' : 'rgba(155, 126, 70, 0.25)',
              color: isNight ? '#EAD8B8' : '#681A24',
            }}
          >
            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              className="p-1 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" strokeWidth={2} />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" strokeWidth={2} />
              )}
            </button>

            {/* Subtle Title & Artist */}
            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-[10px] font-medium tracking-wider uppercase font-sans-ui leading-tight opacity-90 truncate max-w-[140px]">
                {WEDDING_DETAILS.music.title}
              </span>
              <span className="text-[9px] tracking-widest uppercase opacity-60 font-sans-ui">
                {WEDDING_DETAILS.music.artist}
              </span>
            </div>

            {/* Tiny Animated Waveform Bars */}
            <div className="flex items-center gap-[2px] h-4 px-1" aria-hidden="true">
              <div
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'audio-bar-1' : 'h-[3px]'
                }`}
                style={{ backgroundColor: isNight ? '#C7AA71' : '#9B7E46' }}
              />
              <div
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'audio-bar-2' : 'h-[6px]'
                }`}
                style={{ backgroundColor: isNight ? '#C7AA71' : '#9B7E46' }}
              />
              <div
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'audio-bar-3' : 'h-[4px]'
                }`}
                style={{ backgroundColor: isNight ? '#C7AA71' : '#9B7E46' }}
              />
              <div
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'audio-bar-4' : 'h-[8px]'
                }`}
                style={{ backgroundColor: isNight ? '#C7AA71' : '#9B7E46' }}
              />
            </div>

            {/* Mute / Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              className="p-1 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7E46]"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 opacity-60" strokeWidth={2} />
              ) : (
                <Volume2 className="w-3.5 h-3.5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </>
    );
  }
);

AudioExperience.displayName = 'AudioExperience';
