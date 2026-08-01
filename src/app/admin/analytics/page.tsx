'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Map, Globe, Activity, Shield } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Map className="w-6 h-6 text-amber-400" /> Operational Analytics & Interactive Command Map Globe
          </h1>
          <p className="text-xs text-slate-400">Interactive operations globe dashboard displaying live site guard deployments across India.</p>
        </div>

        {/* INTERACTIVE EARTH GLOBE / MAP CANVAS PLACEHOLDER */}
        <div className="bg-slate-900 border border-amber-500/30 p-8 rounded-3xl space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Globe className="w-5 h-5 animate-spin" /> Interactive Operations Globe View (Real-time GIS Telemetry)
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-mono font-bold px-3 py-1 rounded-full">
              42 ACTIVE DEPLOYMENT NODES
            </span>
          </div>

          <div className="h-96 w-full rounded-2xl bg-slate-950 border border-slate-850 relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
            {/* Glowing Map Ring Simulation */}
            <div className="w-64 h-64 rounded-full border-2 border-dashed border-amber-500/40 animate-[spin_20s_linear_infinite] flex items-center justify-center">
              <div className="w-44 h-44 rounded-full border border-blue-500/40 animate-ping flex items-center justify-center" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-slate-950/60 backdrop-blur-xs">
              <Globe className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
              <h3 className="text-xl font-bold text-white">SURAKSHA Operations Interactive Globe</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Displaying real-time guard pins across Noida (Sector 62), Delhi NCR, Gurgaon, and partner industrial zones.
              </p>
              <div className="flex gap-3 pt-2">
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-amber-400 px-3 py-1 rounded-full font-bold">Noida: 45 Guards</span>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-blue-400 px-3 py-1 rounded-full font-bold">Delhi: 20 Guards</span>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full font-bold">Gurgaon: 30 Guards</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
