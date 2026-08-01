'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';

const quickReplies = [
  { label: 'Book Guard / Service', href: '/book-guard' },
  { label: 'See pricing & plans', href: '/pricing' },
  { label: 'Verify Guard Credentials', href: '/admin/live-tracking' },
  { label: 'B2B Tender Proposal', href: '/collaboration' },
  { label: 'Official Support Desk', href: '/support' },
];

/** Flaticon Assistance Animated Chatbot for Public Website */
export default function SurakshaChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide public chatbot on admin routes (AdminChatbot takes over on /admin/*)
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end gap-3 font-sans select-none">
      
      {/* Chat Drawer Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-[20rem] sm:w-[22rem] overflow-hidden rounded-3xl border border-[#F5C623]/40 bg-[#0B0D0F]/98 dark:bg-[#0B0D0F]/98 light:bg-white/98 shadow-2xl backdrop-blur-xl text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F5C623]/20 bg-[#F5C623]/10 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F5C623]/20 border border-[#F5C623]/40 text-[#F5C623]">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#F5C623]">SURAKSHA Public AI Assistant</p>
                  <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Website Guide Active
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-[#F5C623] p-1.5 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5">
              <div className="rounded-2xl rounded-tl-sm theme-app-card p-3.5 text-xs theme-app-body leading-relaxed shadow-inner">
                Namaste! 🤖 I am your official Website AI guide. How can I assist your security guarding or B2B tender requirement today?
              </div>

              {/* Quick Replies List */}
              <div className="flex flex-col gap-2">
                {quickReplies.map((q) => {
                  const external = q.href.startsWith('http');
                  const cls =
                    'flex items-center justify-between rounded-xl theme-app-card px-3.5 py-2.5 text-xs font-semibold theme-app-heading transition-colors hover:border-[#F5C623]/50 hover:text-[#F5C623] shadow-sm';
                  const inner = (
                    <>
                      <span>{q.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#F5C623] shrink-0" />
                    </>
                  );
                  return external ? (
                    <a key={q.label} href={q.href} className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </a>
                  ) : (
                    <Link key={q.label} href={q.href} className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  );
                })}
              </div>

              <a
                href="mailto:dispatch@surakshasecurity.in"
                className="block text-center text-[11px] theme-app-body transition-colors hover:text-[#F5C623] pt-1"
              >
                or email official dispatch: dispatch@surakshasecurity.in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIRECT FLOATING FLATICON CHATBOT ROBOT MATCHED WITH SURAKSHA TRUST YELLOW THEME */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="relative bg-transparent border-0 p-0 outline-none focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_20px_rgba(245,198,35,0.45)] group"
        title="SURAKSHA Assistance AI Chatbot"
      >
        {open ? (
          <div className="w-14 h-14 rounded-2xl bg-[#0B0D0F] border-2 border-[#F5C623] flex items-center justify-center shadow-2xl">
            <X className="h-7 w-7 text-[#F5C623] font-black" />
          </div>
        ) : (
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center">
            
            {/* Custom SVG Recreating Exact Flaticon Animated Icon in SURAKSHA Trust Yellow Theme */}
            <svg
              className="w-full h-full"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>{`
                  @keyframes flaticonBlink {
                    0%, 45%, 55%, 100% { opacity: 1; }
                    48%, 52% { opacity: 0; }
                  }
                  @keyframes flaticonSquint {
                    0%, 45%, 55%, 100% { opacity: 0; }
                    48%, 52% { opacity: 1; }
                  }
                  @keyframes flaticonPill {
                    0%, 100% { transform: translateX(0px); }
                    50% { transform: translateX(24px); }
                  }
                  @keyframes flaticonBob {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                  }
                  .flaticon-blink { animation: flaticonBlink 4s infinite; }
                  .flaticon-squint { animation: flaticonSquint 4s infinite; }
                  .flaticon-pill { animation: flaticonPill 2s ease-in-out infinite; }
                  .flaticon-bob { animation: flaticonBob 3s ease-in-out infinite; }
                `}</style>
              </defs>

              <g className="flaticon-bob">
                {/* 1. Speech Bubble (Top Right) - Trust Yellow Styled */}
                <rect x="300" y="45" width="145" height="95" rx="36" fill="#0B0D0F" stroke="#F5C623" strokeWidth="20" />
                <path d="M330 140 L300 175 L350 140 Z" fill="#F5C623" />
                {/* Animated Typing Pill inside speech bubble */}
                <g className="flaticon-pill">
                  <rect x="330" y="80" width="40" height="20" rx="10" fill="#F5C623" />
                </g>

                {/* 2. Top Antenna */}
                <line x1="230" y1="90" x2="230" y2="155" stroke="#F5C623" strokeWidth="22" strokeLinecap="round" />
                <circle cx="230" cy="70" r="22" fill="#F5C623" stroke="#0B0D0F" strokeWidth="10" />

                {/* 3. Ears (Left & Right) */}
                <path d="M110 230 C75 230 75 320 110 320" stroke="#F5C623" strokeWidth="24" strokeLinecap="round" fill="#0B0D0F" />
                <path d="M350 230 C385 230 385 320 350 320" stroke="#F5C623" strokeWidth="24" strokeLinecap="round" fill="#0B0D0F" />

                {/* 4. Robot Head Box */}
                <rect x="110" y="155" width="240" height="190" rx="65" fill="#0B0D0F" stroke="#F5C623" strokeWidth="24" />

                {/* 5. Animated Eyes (Trust Yellow Circular Eyes & Squinting Happy Arcs) */}
                {/* Left Eye Open */}
                <circle cx="175" cy="225" r="18" fill="#F5C623" className="flaticon-blink" />
                {/* Left Eye Squint Arc */}
                <path d="M157 230 C157 210 193 210 193 230" stroke="#F5C623" strokeWidth="16" strokeLinecap="round" fill="none" className="flaticon-squint" />

                {/* Right Eye Open */}
                <circle cx="285" cy="225" r="18" fill="#F5C623" className="flaticon-blink" />
                {/* Right Eye Squint Arc */}
                <path d="M267 230 C267 210 303 210 303 230" stroke="#F5C623" strokeWidth="16" strokeLinecap="round" fill="none" className="flaticon-squint" />

                {/* 6. Cheerful Smile */}
                <path d="M185 275 Q230 315 275 275" stroke="#F5C623" strokeWidth="20" strokeLinecap="round" fill="none" />

                {/* 7. Headset Chin Bar & Mic Puck */}
                <path d="M125 345 C125 435 335 435 335 345" stroke="#F5C623" strokeWidth="24" strokeLinecap="round" fill="none" />
                <ellipse cx="230" cy="415" rx="34" ry="20" fill="#F5C623" stroke="#0B0D0F" strokeWidth="8" />

              </g>
            </svg>

            {/* Online Status Green Dot */}
            <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0B0D0F] animate-pulse" />
          </div>
        )}
      </button>

    </div>
  );
}
