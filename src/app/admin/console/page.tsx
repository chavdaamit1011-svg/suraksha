'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Building, Shield, CheckCircle2 } from 'lucide-react';

export default function ConsolePage() {
  const agencies = [
    { name: 'Suraksha Direct Command Agency', totalGuards: 350, active: 340, inactive: 10, sites: 42 },
    { name: 'Suraksha Allied Regional Agency', totalGuards: 180, active: 172, inactive: 8, sites: 25 },
    { name: 'Suraksha Elite Protection Agency', totalGuards: 95, active: 95, inactive: 0, sites: 14 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-amber-400" /> Agency-Wide Console Overview
          </h1>
          <p className="text-xs text-slate-400">Aggregated guard counts and deployment metrics across partner agencies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agencies.map((agency, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-amber-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">{agency.name}</h3>
                  <p className="text-xs text-slate-400">{agency.sites} Active Deployments</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center text-xs">
                <div>
                  <span className="text-slate-400 text-[10px]">Total</span>
                  <div className="font-bold text-white mt-0.5">{agency.totalGuards}</div>
                </div>
                <div>
                  <span className="text-emerald-400 text-[10px]">Active</span>
                  <div className="font-bold text-emerald-400 mt-0.5">{agency.active}</div>
                </div>
                <div>
                  <span className="text-rose-400 text-[10px]">Inactive</span>
                  <div className="font-bold text-rose-400 mt-0.5">{agency.inactive}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
