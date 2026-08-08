'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Bell, User, LogOut, Menu, X, Shield, ChevronDown, Sun, Moon, LogIn, UserPlus, PhoneCall, Sparkles, UserCheck } from 'lucide-react';

import { checkAndEnforce7DaySession } from '@/lib/session';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('suraksha_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 32;
      setIsScrolled((current) => current === nextScrolled ? current : nextScrolled);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sync theme class to document element
    applyTheme(theme);

    // Global 7-Day Session Security Check (Enforces Re-Login after 7 days for ALL users & admins)
    const isExpired = checkAndEnforce7DaySession();
    if (isExpired) {
      setCurrentUser(null);
    } else {
      const savedUser = localStorage.getItem('suraksha_user');
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
          console.error(e);
        }
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, theme]);

  const applyTheme = (t: 'dark' | 'light') => {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    sessionStorage.setItem('suraksha_theme', nextTheme);
    applyTheme(nextTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('suraksha_token');
    localStorage.removeItem('suraksha_user');
    setCurrentUser(null);
    setUserDropdownOpen(false);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'About Us', href: '/about' },
    { name: 'Pricing & Plans', href: '/pricing' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const dummyNotifications = [
    { id: 1, title: 'New Guard Deployed', time: '5 mins ago', desc: 'Guard SUR-G8841 reported on duty at TechPark Alpha.' },
    { id: 2, title: 'Security Audit Passed', time: '1 hour ago', desc: 'Quarterly compliance audit completed.' },
    { id: 3, title: 'Live Patrol Tracker Active', time: '3 hours ago', desc: '24 active site checkpoints verified.' },
  ];

  return (
    <header suppressHydrationWarning className="fixed top-0 left-0 right-0 z-40 font-sans">
      {/* 1. Official Government Top Utility Bar */}
      <div suppressHydrationWarning className={`border-b text-xs font-semibold px-4 sm:px-8 flex items-center justify-between overflow-hidden transition-[max-height,opacity,transform,padding,border-color] duration-300 ease-out ${
        isScrolled ? 'max-h-0 py-0 opacity-0 -translate-y-full border-transparent pointer-events-none' : 'max-h-10 py-1.5 opacity-100 translate-y-0'
      } bg-slate-200 dark:bg-[#0B0D0F] border-slate-300 dark:border-amber-500/20 text-slate-800 dark:text-slate-300`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#F5C623]">
            🇮🇳 GOVERNMENT ACCREDITED SECURITY PORTAL
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-emerald-500 font-mono">ISO 9001:2015 CERTIFIED</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-[#F5C623]" /> Dispatch: 1800-SURAKSHA (+91 1800-7872574)
          </span>
          <span className="flex items-center gap-1 text-[#F5C623] font-bold">
            <Sparkles className="w-3 h-3 text-[#F5C623]" /> QRT SLA: &lt;4.2 Mins
          </span>
        </div>
      </div>

      {/* 2. Main Navbar Bar */}
      <div suppressHydrationWarning className={`transition-[padding] duration-300 ease-out ${isScrolled ? 'pt-3 px-4 sm:px-8' : 'pt-0 px-0'}`}>
        <div
          suppressHydrationWarning
          className={`transition-[background-color,border-color,border-radius,box-shadow,padding,max-width] duration-300 ease-out ${
            isScrolled
              ? 'max-w-7xl mx-auto rounded-2xl bg-white/98 dark:bg-[#0B0D0F]/98 border border-slate-200 dark:border-amber-500/35 px-4 sm:px-6 py-2 shadow-xl backdrop-blur-xl'
              : 'bg-white/95 dark:bg-[#0B0D0F]/90 border-b border-slate-200 dark:border-[#1E1F22] px-4 sm:px-8 py-2.5 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between h-12">
            
            {/* Clean Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Logo size="md" />
            </Link>

            {/* Main Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition duration-200 ${
                      isActive
                        ? 'text-[#F5C623] bg-[#F5C623]/15 border border-[#F5C623]/30'
                        : 'text-slate-800 dark:text-slate-200 hover:text-[#F5C623] hover:bg-slate-100 dark:hover:bg-[#1E1F22]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Icons Bar */}
            <div className="hidden sm:flex items-center gap-2.5">
              
              {/* 1. Theme Toggle Icon */}
              <button
                suppressHydrationWarning
                onClick={toggleTheme}
                className="p-2 rounded-xl border transition flex items-center justify-center shadow-inner hover:scale-105 bg-slate-100 dark:bg-[#1E1F22] border-slate-300 dark:border-slate-700 text-slate-800 dark:text-[#F5C623]"
                title="Toggle Theme"
              >
                <Sun className="w-4 h-4 text-[#F5C623] hidden dark:block" />
                <Moon className="w-4 h-4 text-slate-800 block dark:hidden" />
              </button>

              {/* 2. Standard Login / Sign Up Dropdown */}
              <div className="relative">
                <button
                  suppressHydrationWarning
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-2 rounded-xl border transition flex items-center gap-1.5 hover:scale-105 bg-slate-100 dark:bg-[#1E1F22] border-slate-300 dark:border-slate-700 text-slate-800 dark:text-[#F5C623]"
                  title="User Account"
                >
                  {currentUser ? (
                    <div className="w-5 h-5 rounded-md bg-[#F5C623] text-[#0B0D0F] font-black flex items-center justify-center text-[10px]">
                      {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                    </div>
                  ) : (
                    <User className="w-4 h-4 text-[#F5C623]" />
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-2xl py-2 shadow-2xl backdrop-blur-xl z-50 animate-fadeIn font-sans border bg-white dark:bg-[#0B0D0F] border-slate-200 dark:border-[#F5C623]/30 text-slate-800 dark:text-slate-200">
                    {currentUser ? (
                      <>
                        <div className="px-3.5 py-2.5 border-b border-slate-200 dark:border-slate-800">
                          <p className="text-xs font-bold text-[#F5C623] flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5" /> {currentUser.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                        </div>

                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3.5 py-2 text-xs bg-[#F5C623]/10 text-[#F5C623] font-bold hover:bg-[#F5C623]/20 transition"
                        >
                          <Shield className="w-3.5 h-3.5" /> Admin Console
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3.5 py-2 text-xs hover:bg-[#F5C623]/15 hover:text-[#F5C623] transition"
                        >
                          <User className="w-3.5 h-3.5 text-[#F5C623]" /> My Account
                        </Link>

                        <button
                          suppressHydrationWarning
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs text-rose-500 hover:bg-rose-500/10 transition border-t border-slate-200 dark:border-slate-800 mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-3.5 py-1.5 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Account Access
                        </div>

                        <Link
                          href="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-[#F5C623] font-bold hover:bg-[#F5C623]/15 transition"
                        >
                          <LogIn className="w-4 h-4 text-[#F5C623]" /> Login
                        </Link>

                        <Link
                          href="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold theme-app-heading hover:text-[#F5C623] hover:bg-[#F5C623]/15 transition"
                        >
                          <UserPlus className="w-4 h-4 text-[#F5C623]" /> Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* 3. Notification Bell Icon & Drawer */}
              <div className="relative">
                <button
                  suppressHydrationWarning
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-xl border transition flex items-center justify-center bg-slate-100 dark:bg-[#1E1F22] border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:text-[#F5C623]"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#F5C623] rounded-full animate-ping" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#F5C623] rounded-full" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl z-50 animate-fadeIn border bg-white dark:bg-[#0B0D0F] border-slate-200 dark:border-[#F5C623]/30 text-slate-800 dark:text-slate-100">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-[#F5C623] text-xs flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5" /> Operations Alerts
                      </span>
                      <span className="text-[10px] bg-[#F5C623]/20 text-[#F5C623] font-semibold px-2 py-0.5 rounded-full">
                        3 New
                      </span>
                    </div>
                    <div className="space-y-2.5 mt-2.5 max-h-64 overflow-y-auto">
                      {dummyNotifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl text-xs border bg-slate-50 dark:bg-[#1E1F22] border-slate-200 dark:border-slate-800">
                          <div className="flex justify-between font-semibold">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-500">{n.time}</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-[11px]">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Primary CTA Button */}
              <Link
                href="/book-guard"
                className="trust-yellow-btn px-4 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition transform active:scale-95 whitespace-nowrap uppercase tracking-wider"
              >
                <Shield className="w-3.5 h-3.5" /> Book Guard / Service
              </Link>

            </div>

            {/* Mobile Menu Toggle */}
            <button
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl border bg-slate-100 dark:bg-[#1E1F22] border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b p-4 space-y-3 animate-fadeIn shadow-2xl bg-white dark:bg-[#0B0D0F] border-slate-200 dark:border-[#F5C623]/30 text-slate-800 dark:text-slate-100">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold hover:text-[#F5C623] hover:bg-[#F5C623]/15 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              suppressHydrationWarning
              onClick={toggleTheme}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#1E1F22] border border-slate-300 dark:border-slate-700 text-[#F5C623] text-xs font-bold flex items-center gap-2"
            >
              <Sun className="w-4 h-4 text-[#F5C623] hidden dark:block" />
              <Moon className="w-4 h-4 text-slate-800 block dark:hidden" />
              Theme
            </button>

            <Link
              href="/book-guard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 trust-yellow-btn py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Shield className="w-3.5 h-3.5" /> Book Guard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
