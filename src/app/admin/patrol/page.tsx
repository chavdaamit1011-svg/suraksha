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
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Radio className="w-6 h-6 text-[#F5C623]" /> Real-time Guard Patrol Desk
        </h1>
        <p className="text-xs text-white/55 mt-1">Monitor guard patrolling checkpoints and site perimeter scans.</p>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Active Site Patrol Feeds</h3>
        <div className="space-y-3 text-xs">
          {patrols.map((p, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">{p.site}</h5>
                <p className="text-white/55 mt-0.5">Officer: {p.guard}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold">{p.status}</span>
                <p className="text-[#F5C623] text-[11px] font-mono">{p.checkpoints}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
