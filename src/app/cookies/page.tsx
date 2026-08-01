'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Cookie Notice</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Cookie Policy</h1>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 text-xs leading-relaxed bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <p>
            SURAKSHA uses essential session cookies to maintain secure admin & client login authentication, preserve active device session tokens, and optimize page rendering. We do not use intrusive tracking cookies.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
