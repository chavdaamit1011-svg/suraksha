'use client';

import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Detect theme class on html element
    const updateThemeState = () => {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    };

    updateThemeState();

    // Observe class attribute changes on html element
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const logoHeights = {
    sm: 'h-7 max-h-7',
    md: 'h-8 max-h-8 sm:h-9 sm:max-h-9',
    lg: 'h-11 max-h-11 sm:h-13 sm:max-h-13',
  };

  return (
    <div className={`flex items-center gap-2 select-none cursor-pointer ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/suraksha-mark.png"
        alt="SURAKSHA Mark"
        className={`${logoHeights[size]} w-auto object-contain transition-all duration-200 hover:scale-105`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/logo.png';
        }}
      />
      {showText && (
        <span className="font-black tracking-[0.16em] text-sm sm:text-base theme-app-heading font-sans uppercase">
          SURAKSHA
        </span>
      )}
    </div>
  );
}
