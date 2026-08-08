'use client';

import React from 'react';
import { Activity, ShieldAlert, Radio, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CommandCenterPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            High-Priority Command Center
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Real-time coverage monitoring, emergency SOS alerts, SLA escalations, under-staffed post warnings.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All 32 Sites Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="trinetra-card rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span>SOS Queue</span>
            <span className="text-emerald-400">0 Active</span>
          </div>
          <p className="text-xs text-white/40">Zero distress calls or panic button triggers in past 24 hrs.</p>
        </div>

        <div className="trinetra-card rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span>Open Incidents</span>
            <span className="text-[#F5C623]">1 Low Severity</span>
          </div>
          <p className="text-xs text-white/40">DLF Cyber City: Minor parking barrier glitch logged.</p>
        </div>

        <div className="trinetra-card rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span>Night Alertness Score</span>
            <span className="text-emerald-400">98.4%</span>
          </div>
          <p className="text-xs text-white/40">Random hourly ping responses verified last night.</p>
        </div>
      </div>
    </div>
  );
}
