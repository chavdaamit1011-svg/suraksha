'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Legal Agreement</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Terms & Conditions</h1>
        <p className="text-slate-400 text-xs mt-2">Effective Date: July 2026</p>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-xs leading-relaxed bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-2">1. Guard Service Agreement</h3>
            <p>
              By booking guards or entering into a multi-year B2B tender contract with SURAKSHA, clients agree to comply with statutory security guard deployment guidelines and provide safe site working conditions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-2">2. Payment & Invoice Terms</h3>
            <p>
              Invoices are issued monthly and must be settled within 7 business days. Payments can be processed via credit/debit card, static bank transfer, or Razorpay payment links.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-2">3. SLA & Attendance Guarantee</h3>
            <p>
              SURAKSHA guarantees 100% replacement SLA for guard absenteeism within 30 minutes of notification from our 24/7 command center.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
