'use client';

import React, { useState, useEffect } from 'react';

interface SurakshaLoaderProps {
  fullScreen?: boolean;
  targetPercent?: number;
  text?: string;
  subtext?: string;
}

export default function SurakshaLoader({
  fullScreen = true,
  targetPercent = 94,
  text = 'SURAKSHA',
  subtext = 'TRUSTED. VERIFIED. ALWAYS.',
}: SurakshaLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const intervalTime = 30; // ms
    const steps = duration / intervalTime;
    const increment = targetPercent / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetPercent) {
        setProgress(targetPercent);
        clearInterval(timer);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [targetPercent]);

  // Format percent to 3 digits (e.g. 094%)
  const formattedPercent = progress.toString().padStart(3, '0') + '%';

  return (
    <div
      className={`${
        fullScreen ? 'fixed inset-0 z-50 min-h-screen w-full' : 'w-full py-12'
      } bg-[#090A0C] text-white flex flex-col items-center justify-center font-sans overflow-hidden select-none`}
    >
      {/* Background Radial Gold Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#F5C623]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Center Container */}
      <div className="relative flex flex-col items-center justify-center z-10 space-y-7">
        {/* Shield with Rotating Gold Ring */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          {/* Animated Gold Ring SVG */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_5s_linear_infinite]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" stopOpacity="1" />
                <stop offset="40%" stopColor="#F5C623" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#090A0C" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Background thin track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#F5C623"
              strokeOpacity="0.1"
              strokeWidth="1.5"
            />
            {/* Rotating gradient arc */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#ringGoldGrad)"
              strokeWidth="2.5"
              strokeDasharray="210 80"
              strokeLinecap="round"
            />
          </svg>

          {/* Pulse aura glow behind shield */}
          <div className="absolute w-28 h-28 bg-[#F5C623]/15 rounded-full blur-xl animate-pulse" />

          {/* Golden Shield Icon matching screenshot */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center drop-shadow-[0_0_20px_rgba(245,198,35,0.45)]">
            <svg
              viewBox="0 0 100 110"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE885" />
                  <stop offset="50%" stopColor="#F5C623" />
                  <stop offset="100%" stopColor="#997000" />
                </linearGradient>

                <linearGradient id="shieldInnerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#332A10" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#141006" stopOpacity="0.98" />
                </linearGradient>

                <linearGradient id="sGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF099" />
                  <stop offset="40%" stopColor="#F5C623" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>

                <linearGradient id="sGoldSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFE066" />
                  <stop offset="60%" stopColor="#D49B00" />
                  <stop offset="100%" stopColor="#7A5200" />
                </linearGradient>

                <filter id="goldDropGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Shield Outer Shell */}
              <path
                d="M50 6 L88 22 C88 66 68 92 50 102 C32 92 12 66 12 22 L50 6 Z"
                fill="url(#shieldInnerGlow)"
                stroke="url(#shieldBorder)"
                strokeWidth="4"
                strokeLinejoin="round"
                filter="url(#goldDropGlow)"
              />

              {/* Inner Shield Bezel Line */}
              <path
                d="M50 13 L81 26 C81 62 63 85 50 94 C37 85 19 62 19 26 L50 13 Z"
                fill="none"
                stroke="url(#shieldBorder)"
                strokeWidth="1.2"
                strokeOpacity="0.35"
              />

              {/* Modern Golden "S" Shield Emblem Ribbons */}
              {/* Upper S Ribbon */}
              <path
                d="M32 34 C32 28 68 28 68 37 C68 46 34 46 34 56 L64 56"
                fill="none"
                stroke="url(#sGoldPrimary)"
                strokeWidth="7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Lower S Ribbon Interlock */}
              <path
                d="M36 56 C36 66 68 66 68 74 C68 82 32 82 32 75"
                fill="none"
                stroke="url(#sGoldSecondary)"
                strokeWidth="7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Center Accent Slash */}
              <path
                d="M42 46 L58 64"
                fill="none"
                stroke="#FFE885"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>

        {/* Text Details Section */}
        <div className="flex flex-col items-center text-center space-y-2.5">
          {/* Main Brand Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-[0.45em] uppercase pl-[0.45em] drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)] font-sans">
            {text}
          </h1>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-xs font-bold text-[#F5C623] tracking-[0.32em] pl-[0.32em] uppercase opacity-90 font-sans">
            {subtext}
          </p>

          {/* Animated Percentage Counter */}
          <div className="pt-3">
            <span className="text-xs font-mono font-bold text-slate-400/90 tracking-[0.3em] pl-[0.3em]">
              {formattedPercent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
