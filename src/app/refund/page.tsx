'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Refund Policy</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Refund & Cancellation</h1>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 text-xs leading-relaxed bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <p>
            Guard booking deployment fees are fully refundable up to 48 hours prior to the scheduled shift start. For B2B tenders, contract cancellations follow the mutually signed SLA terms and notice periods.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
