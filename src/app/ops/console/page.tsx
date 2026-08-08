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
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building className="w-6 h-6 text-[#F5C623]" /> Agency Console Overview
        </h1>
        <p className="text-xs text-white/55 mt-1">Aggregated guard counts and deployment metrics across partner agencies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agencies.map((agency, idx) => (
          <div key={idx} className="trinetra-card border border-white/[0.08] p-5 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#F5C623]" />
              <div>
                <h3 className="font-bold text-white text-sm">{agency.name}</h3>
                <p className="text-xs text-white/55">{agency.sites} Active Deployments</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#111316] p-3 rounded-lg border border-white/[0.08] text-center text-xs">
              <div>
                <span className="text-white/40 text-[10px]">Total</span>
                <div className="font-bold text-white mt-0.5">{agency.totalGuards}</div>
              </div>
              <div>
                <span className="text-emerald-400 text-[10px]">Active</span>
                <div className="font-bold text-emerald-400 mt-0.5">{agency.active}</div>
              </div>
              <div>
                <span className="text-[#EF4444] text-[10px]">Inactive</span>
                <div className="font-bold text-[#EF4444] mt-0.5">{agency.inactive}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
