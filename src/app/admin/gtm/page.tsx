'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { TrendingUp, Megaphone } from 'lucide-react';

export default function GtmPage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-400" /> Go-To-Market (GTM) & Growth Campaigns
          </h1>
          <p className="text-xs text-slate-400">Track GTM ID (GTM-W7N6VTZJ) and campaign lead conversions.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Active Growth Campaigns</h3>
          <p className="text-xs text-slate-300">
            Google Tag Manager container ID: <span className="font-mono text-amber-400 font-bold">GTM-W7N6VTZJ</span>. GTM conversion events connected to guard booking & contact forms.
          </p>
        </div>
      </main>
    </div>
  );
}
