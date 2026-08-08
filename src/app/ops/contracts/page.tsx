'use client';

import React from 'react';
import { FileCheck, IndianRupee, Calendar, CheckCircle2 } from 'lucide-react';

const contractsList = [
  { id: 'CNT-2025-01', client: 'DLF Cyber City Tech Park', value: '₹4,50,000 / mo', duration: '01 Jan 2025 - 31 Dec 2026', guardsCount: 18, status: 'Active' },
  { id: 'CNT-2025-02', client: 'Max Super Speciality Hospital', value: '₹3,20,000 / mo', duration: '15 Feb 2025 - 14 Feb 2026', guardsCount: 12, status: 'Active' },
  { id: 'CNT-2025-03', client: 'Ambience Mall Gurgaon', value: '₹6,00,000 / mo', duration: '01 Mar 2025 - 28 Feb 2027', guardsCount: 24, status: 'Active' },
  { id: 'CNT-2025-04', client: 'Hero MotoCorp Plant 2', value: '₹4,72,000 / mo', duration: '01 Apr 2025 - 31 Mar 2026', guardsCount: 30, status: 'Active' },
];

export default function ContractsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Security Service Contracts
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Active B2B service level agreements, billing schedules, and renewal tracking.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Contract ID</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Monthly Value</th>
                <th className="py-3 px-3">Guards Contracted</th>
                <th className="py-3 px-3">Term Period</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {contractsList.map((cnt) => (
                <tr key={cnt.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-mono font-bold text-[#F5C623]">{cnt.id}</td>
                  <td className="py-3 px-3 font-bold text-white">{cnt.client}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{cnt.value}</td>
                  <td className="py-3 px-3 font-mono text-white/80">{cnt.guardsCount} Guards</td>
                  <td className="py-3 px-3 text-white/60">{cnt.duration}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {cnt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
