'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Map, Globe, Activity, Shield } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Map className="w-6 h-6 text-[#F5C623]" /> Operational Analytics & Command Map Globe
        </h1>
        <p className="text-xs text-white/55 mt-1">Interactive operations dashboard displaying live site guard deployments across India.</p>
      </div>

      <div className="trinetra-card border border-[#F5C623]/30 p-6 rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#F5C623] font-bold text-sm">
            <Globe className="w-5 h-5 animate-spin" /> Interactive Operations View (Real-time GIS Telemetry)
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 font-mono font-bold px-3 py-1 rounded-full">
            42 ACTIVE DEPLOYMENT NODES
          </span>
        </div>

        <div className="h-96 w-full rounded-xl bg-[#111316] border border-white/[0.08] relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
          <div className="w-64 h-64 rounded-full border-2 border-dashed border-[#F5C623]/40 animate-[spin_20s_linear_infinite] flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border border-blue-500/40 animate-ping flex items-center justify-center" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#0B0D0F]/80 backdrop-blur-xs">
            <Globe className="w-16 h-16 text-[#F5C623] drop-shadow-[0_0_15px_rgba(245,198,35,0.6)]" />
            <h3 className="text-xl font-bold text-white">SURAKSHA Operations Interactive Globe</h3>
            <p className="text-xs text-white/70 max-w-md">
              Displaying real-time guard pins across Noida (Sector 62), Delhi NCR, Gurgaon, and partner industrial zones.
            </p>
            <div className="flex gap-3 pt-2">
              <span className="text-[10px] bg-[#1E1F22] border border-white/[0.08] text-[#F5C623] px-3 py-1 rounded-full font-bold">Noida: 45 Guards</span>
              <span className="text-[10px] bg-[#1E1F22] border border-white/[0.08] text-blue-400 px-3 py-1 rounded-full font-bold">Delhi: 20 Guards</span>
              <span className="text-[10px] bg-[#1E1F22] border border-white/[0.08] text-emerald-400 px-3 py-1 rounded-full font-bold">Gurgaon: 30 Guards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
