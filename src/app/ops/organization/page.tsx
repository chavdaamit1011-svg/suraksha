'use client';

import React from 'react';
import { Building, ShieldCheck, FileText, CheckCircle2, Award } from 'lucide-react';

export default function OrganizationPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Organization Profile
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Legal agency identity, PSARA licenses, statutory registrations and subscription status.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded bg-[#F5C623]/10 border border-[#F5C623]/30 text-[#F5C623] font-bold text-xs">
          PSARA Valid · Active 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 trinetra-card rounded-xl p-6 space-y-6">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Building className="w-5 h-5 text-[#F5C623]" /> Agency Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#111316] rounded-lg border border-white/[0.08] space-y-1">
              <span className="text-white/40 block">Legal Entity Name</span>
              <span className="font-bold text-white text-sm">Apex Shield Security Pvt Ltd</span>
            </div>
            <div className="p-3 bg-[#111316] rounded-lg border border-white/[0.08] space-y-1">
              <span className="text-white/40 block">PSARA License No</span>
              <span className="font-mono font-bold text-[#F5C623] text-sm">PSARA/DL/2024/0984</span>
            </div>
            <div className="p-3 bg-[#111316] rounded-lg border border-white/[0.08] space-y-1">
              <span className="text-white/40 block">GSTIN</span>
              <span className="font-mono font-bold text-white">07AAAAA1234A1Z5</span>
            </div>
            <div className="p-3 bg-[#111316] rounded-lg border border-white/[0.08] space-y-1">
              <span className="text-white/40 block">PAN</span>
              <span className="font-mono font-bold text-white">AAAAA1234A</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 trinetra-card rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" /> Compliance Status
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> PSARA License Valid
              </span>
              <span className="font-mono font-bold">2028</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> EPF / ESI Clearance
              </span>
              <span className="font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
