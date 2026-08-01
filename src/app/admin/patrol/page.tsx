'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Radio, MapPin, CheckCircle2 } from 'lucide-react';

export default function PatrolManagerPage() {
  const patrols = [
    { site: 'TechPark Alpha Perimeter', guard: 'Vikram Singh (SUR-G8841)', status: 'On Route', checkpoints: '8 / 8 Verified', lastScan: '3 Mins Ago' },
    { site: 'Metro Heights Mall Gate 3', guard: 'Rajesh Kumar (SUR-G8842)', status: 'On Patrol', checkpoints: '5 / 6 Verified', lastScan: '10 Mins Ago' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-amber-400" /> Real-time Guard Patrol Patrol Desk
          </h1>
          <p className="text-xs text-slate-400">Monitor guard patrolling checkpoints and site perimeter scans.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Active Site Patrol Feeds</h3>
          <div className="space-y-3 text-xs">
            {patrols.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">{p.site}</h5>
                  <p className="text-slate-400">Officer: {p.guard}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">{p.status}</span>
                  <p className="text-amber-400 text-[11px] font-mono">{p.checkpoints}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
