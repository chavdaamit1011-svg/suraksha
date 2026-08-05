'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Bell, User, LogOut, Menu, X, Shield, ChevronDown, Sun, Moon, LogIn, UserPlus, PhoneCall, Sparkles, UserCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 32;
      setIsScrolled((current) => current === nextScrolled ? current : nextScrolled);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Read stored theme preference
    const savedTheme = (localStorage.getItem('suraksha_theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Read current user session
    const savedUser = localStorage.getItem('suraksha_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
    localStorage.setItem('suraksha_theme', nextTheme);
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
    { name: 'Platform', href: '/' },
    { name: 'Solutions', href: '/why-choose-us' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Company', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 font-sans">
      <div className={`transition-[padding] duration-300 ease-out ${isScrolled ? 'pt-3 px-4 sm:px-8' : 'pt-0 px-0'}`}>
        <div
          className={`transition-all duration-300 ease-out ${
            isScrolled
              ? theme === 'light'
                ? 'max-w-7xl mx-auto rounded-full bg-white/95 border border-black/10 px-6 py-2.5 shadow-lg backdrop-blur-xl'
                : 'max-w-7xl mx-auto rounded-full bg-[#0B0D0F]/95 border border-white/10 px-6 py-2.5 shadow-2xl backdrop-blur-xl'
              : theme === 'light'
              ? 'bg-[#FAF9F6]/90 border-b border-black/5 px-6 sm:px-12 py-3 backdrop-blur-md'
              : 'bg-[#0B0D0F]/90 border-b border-white/5 px-6 sm:px-12 py-3 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between h-11">
            
            {/* Clean Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Logo size="md" />
            </Link>

            {/* Main Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition duration-200 ${
                      isActive
                        ? 'text-[#B8860B] dark:text-[#F5C623] font-semibold'
                        : theme === 'light'
                        ? 'text-gray-700 hover:text-[#B8860B]'
                        : 'text-gray-300 hover:text-[#F5C623]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions Bar */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition flex items-center justify-center ${
                  theme === 'light'
                    ? 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
                    : 'bg-[#1E2024] border-white/10 text-[#F5C623] hover:bg-[#25282E]'
                }`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F5C623]" /> : <Moon className="w-4 h-4 text-gray-800" />}
              </button>

              {/* Client Login Link */}
              <Link
                href="/admin/login"
                className={`hidden sm:flex items-center gap-1.5 transition ${
                  theme === 'light' ? 'text-gray-800 hover:text-[#B8860B]' : 'text-gray-200 hover:text-[#F5C623]'
                }`}
              >
                <span>Client login</span>
                <span className="text-[10px]">↗</span>
              </Link>

              {/* Get a Quote Button */}
              <Link
                href="/book-guard"
                className="px-5 py-2.5 rounded-full bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold shadow-md shadow-[#F5C623]/20 transition active:scale-95"
              >
                Get a quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border transition ${
                theme === 'light' ? 'bg-gray-100 border-gray-300 text-gray-800' : 'bg-[#1E2024] border-white/10 text-[#F5C623]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b p-4 space-y-3 animate-fadeIn shadow-2xl ${
          theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0B0D0F] border-[#F5C623]/30 text-slate-100'
        }`}>
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
              onClick={toggleTheme}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#1E1F22] border border-slate-300 dark:border-slate-700 text-[#F5C623] text-xs font-bold flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800" />} Theme
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
