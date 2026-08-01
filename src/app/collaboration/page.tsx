'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Handshake, Building, Send, CheckCircle2, Shield } from 'lucide-react';

export default function CollaborationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">B2B & Agency Partnerships</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Enterprise Collaboration</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Partner your security agency or real estate corporation with SURAKSHA for tender sub-contracting and command integration.
        </p>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-amber-500/30 p-8 sm:p-10 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Handshake className="w-8 h-8 text-amber-400" />
              <div>
                <h3 className="text-xl font-bold text-amber-400">Submit Collaboration Proposal</h3>
                <p className="text-xs text-slate-400">For multi-year tenders, agency sub-contracts, and facility alliances.</p>
              </div>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3 bg-slate-950 p-6 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Proposal Transmitted!</h4>
                <p className="text-xs text-slate-300">Our B2B Corporate Desk will review your proposal and schedule a meeting.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-300">Agency / Enterprise Name *</label>
                    <input type="text" required placeholder="e.g. Apex Security Solutions" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300">Contact Executive *</label>
                    <input type="text" required placeholder="Full Name" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300">Official Email *</label>
                    <input type="email" required placeholder="name@agency.com" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300">Phone Number *</label>
                    <input type="tel" required placeholder="+91 98765 43210" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300">Collaboration Type</label>
                  <select className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500">
                    <option>B2B Multi-Year Guard Tender Sub-Contracting</option>
                    <option>Agency Guard Roster Integration</option>
                    <option>Command Center Telemetry Integration</option>
                    <option>Equipment & Asset Supply Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300">Proposal Details *</label>
                  <textarea rows={4} required placeholder="Describe your agency capacity, active guard headcount, and proposed terms..." className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Partnership Proposal
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
