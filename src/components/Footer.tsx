'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { PhoneCall, Mail, MapPin, ShieldCheck, Globe, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setNewsletterLoading(true);
    setNewsletterMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await response.json();
      setNewsletterMessage(data.message || (data.success ? 'Successfully subscribed.' : 'Unable to subscribe.'));
      if (data.success) setNewsletterEmail('');
    } catch {
      setNewsletterMessage('Unable to connect. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="theme-app-bg border-t border-slate-200 dark:border-slate-800 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Column 1: Brand, Accreditation & Social Media Icons */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-xs theme-app-body leading-relaxed max-w-sm">
              SURAKSHA Security Services is an ISO 9001:2015 & Government Accredited security provider. Delivering background-verified armed & unarmed officers, B2B tenders, and 24/7 telemetry command center monitoring across India.
            </p>

            <div className="pt-1 flex flex-col space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold">
                <MapPin className="w-4 h-4 text-[#F5C623] shrink-0" />
                <span className="theme-app-heading">Suraksha Security HQ, Sector 62, Noida, NCR, India</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <PhoneCall className="w-4 h-4 text-[#F5C623] shrink-0" />
                <span className="theme-app-heading">1800-SURAKSHA (+91 1800-7872574)</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Mail className="w-4 h-4 text-[#F5C623] shrink-0" />
                <span className="theme-app-heading">support@surakshasecurity.in | dispatch@surakshasecurity.in</span>
              </div>
            </div>

            {/* Official Social Media Channels Bar */}
            <div className="pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C623] block mb-2.5">
                Official Social Media Channels
              </span>
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-[#F5C623]/30 hover:border-[#F5C623] hover:scale-110 transition duration-200 shadow-md group"
                  title="Follow SURAKSHA on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-[#F5C623] group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-[#F5C623]/30 hover:border-[#F5C623] hover:scale-110 transition duration-200 shadow-md group"
                  title="Follow SURAKSHA on Twitter/X"
                >
                  <svg className="w-4 h-4 fill-[#F5C623] group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-[#F5C623]/30 hover:border-[#F5C623] hover:scale-110 transition duration-200 shadow-md group"
                  title="Follow SURAKSHA on Facebook"
                >
                  <svg className="w-4 h-4 fill-[#F5C623] group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.77-1.61 1.56V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-[#F5C623]/30 hover:border-[#F5C623] hover:scale-110 transition duration-200 shadow-md group"
                  title="Follow SURAKSHA on Instagram"
                >
                  <svg className="w-4 h-4 fill-[#F5C623] group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-[#F5C623]/30 hover:border-[#F5C623] hover:scale-110 transition duration-200 shadow-md group"
                  title="Subscribe to SURAKSHA on YouTube"
                >
                  <svg className="w-4 h-4 fill-[#F5C623] group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Security Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C623]">Security Solutions</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/book-guard" className="theme-app-body hover:text-[#F5C623] transition">
                  Corporate Guarding
                </Link>
              </li>
              <li>
                <Link href="/support" className="theme-app-body hover:text-[#F5C623] transition">
                  Help & Support Center
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="theme-app-body hover:text-[#F5C623] transition">
                  B2B Guard Tenders
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="theme-app-body hover:text-[#F5C623] transition">
                  Enterprise Collaboration
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="theme-app-body hover:text-[#F5C623] transition">
                  Affiliation & Referrals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C623]">Explore</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/gallery" className="theme-app-body hover:text-[#F5C623] transition">
                  Operations Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="theme-app-body hover:text-[#F5C623] transition">
                  Security Blog
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="theme-app-body hover:text-[#F5C623] transition">
                  Affiliation Program
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="theme-app-body hover:text-[#F5C623] transition">
                  Collaboration
                </Link>
              </li>
              <li>
                <Link href="/profile" className="theme-app-body hover:text-[#F5C623] transition">
                  My Client Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C623]">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/privacy-policy" className="theme-app-body hover:text-[#F5C623] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="theme-app-body hover:text-[#F5C623] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="theme-app-body hover:text-[#F5C623] transition">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <Link href="/refund" className="theme-app-body hover:text-[#F5C623] transition">
                  Refund & Cancellation
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 rounded-3xl border border-[#F5C623]/30 bg-[#F5C623]/5 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h4 className="text-base font-bold theme-app-heading flex items-center gap-2"><Mail className="w-5 h-5 text-[#F5C623]" /> Security updates, straight to your inbox</h4>
            <p className="text-xs theme-app-body mt-1">Get safety advisories, deployment updates, and SURAKSHA service news. You can unsubscribe anytime.</p>
          </div>
          <form onSubmit={subscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            <input type="email" required value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="you@company.com" className="min-w-0 sm:w-72 rounded-xl px-4 py-3 text-xs theme-app-heading theme-app-bg border border-slate-300 dark:border-slate-700 focus:border-[#F5C623] outline-none" />
            <button disabled={newsletterLoading} type="submit" className="trust-yellow-btn px-5 py-3 rounded-xl text-xs font-bold flex justify-center items-center gap-2">{newsletterLoading ? 'Subscribing...' : <><Send className="w-4 h-4" /> Subscribe</>}</button>
          </form>
          {newsletterMessage && <p className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {newsletterMessage}</p>}
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-app-body">
          <p>© {new Date().getFullYear()} SURAKSHA Security Services. All Rights Reserved.</p>
          <div className="flex items-center gap-4 font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-500">
              <ShieldCheck className="w-4 h-4" /> ISO 9001:2015 & Govt Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
