'use client';

import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
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
    sm: 'h-8 max-h-8',
    md: 'h-10 max-h-10 sm:h-11 sm:max-h-11',
    lg: 'h-14 max-h-14 sm:h-16 sm:max-h-16',
  };

  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      {/* 
        Logo Image Rendering:
        - In Dark Mode: mix-blend-screen (drops out dark background seamlessly)
        - In Light Mode: mix-blend-multiply (drops out white background seamlessly, keeping logo shield crisp & bold)
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="SURAKSHA Logo"
        className={`${logoHeights[size]} w-auto object-contain transition-all duration-200 hover:opacity-90 ${
          theme === 'light' ? 'mix-blend-multiply filter contrast-125' : 'mix-blend-screen'
        }`}
      />
    </div>
  );
}
