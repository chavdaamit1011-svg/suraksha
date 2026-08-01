'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Share2, DollarSign, Gift, CheckCircle2, Copy } from 'lucide-react';

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Refer & Earn</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Affiliation & Referral Program</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Earn up to 10% commission on every client contract, B2B tender, or security guard deployment referred to SURAKSHA.
        </p>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">1. Share Your Link</h3>
              <p className="text-xs text-slate-400">Share your unique referral code or link with estate managers & business owners.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">2. Client Signs Tender</h3>
              <p className="text-xs text-slate-400">When your referral deploys guards or signs a B2B guarding tender contract.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">3. Earn Monthly Payouts</h3>
              <p className="text-xs text-slate-400">Receive direct bank payouts for every month the security contract remains active.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-amber-500/30 p-8 rounded-3xl space-y-4 max-w-xl mx-auto text-center">
            <h4 className="text-lg font-bold text-amber-400">Your Demo Affiliate Referral Code</h4>
            <div className="flex items-center justify-center gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-lg font-bold text-white">
              <span>SURAKSHA-AMIT-REF2026</span>
              <button
                onClick={() => alert('Referral code copied!')}
                className="p-2 text-amber-400 hover:bg-slate-900 rounded-lg transition"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Share this code with clients to get referral credit instantly.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
