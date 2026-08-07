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
      style={{ backgroundColor: '#0B0D0F', color: '#FFFFFF' }}
      className={`${
        fullScreen ? 'fixed inset-0 z-50 min-h-screen w-full' : 'w-full py-12'
      } bg-[#0B0D0F] text-white flex flex-col items-center justify-center font-sans overflow-hidden select-none`}
    >
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
                <stop offset="100%" stopColor="#0B0D0F" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Background thin track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#F5C623"
              strokeOpacity="0.15"
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

          {/* Official Suraksha Mark Logo Image */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/suraksha-mark.png"
              alt="SURAKSHA Mark Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
            />
          </div>
        </div>

        {/* Text Details Section */}
        <div className="flex flex-col items-center text-center space-y-2.5">
          {/* Main Brand Title */}
          <h1
            style={{ color: '#FFFFFF' }}
            className="text-2xl sm:text-3xl font-black text-white tracking-[0.45em] uppercase pl-[0.45em] font-sans"
          >
            {text}
          </h1>

          {/* Subtitle */}
          <p
            style={{ color: '#F5C623' }}
            className="text-[10px] sm:text-xs font-bold text-[#F5C623] tracking-[0.32em] pl-[0.32em] uppercase font-sans"
          >
            {subtext}
          </p>

          {/* Animated Percentage Counter */}
          <div className="pt-3">
            <span
              style={{ color: '#94A3B8' }}
              className="text-xs font-mono font-bold text-slate-400 tracking-[0.3em] pl-[0.3em]"
            >
              {formattedPercent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
