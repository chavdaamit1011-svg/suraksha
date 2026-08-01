'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CompliancePage() {
  const docs = [
    { name: 'State Security Agency Permit 2026', certId: 'GOVT-DL-2026-9817', status: 'Active Verified', expiry: '31 Dec 2030' },
    { name: 'ISO 9001:2015 Quality Management Certificate', certId: 'ISO-9001-SUR-8842', status: 'Active Verified', expiry: '15 Aug 2028' },
    { name: 'EPFO & ESIC Statutory Registration', certId: 'EPFO-DEL-99012', status: '100% Compliant', expiry: 'Perpetual' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" /> Compliance, Legal & Document Vault
          </h1>
          <p className="text-xs text-slate-400">Statutory certifications, security licenses, and police verification documents.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Verified Legal Certificates</h3>
          <div className="space-y-3 text-xs">
            {docs.map((d, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">{d.name}</h5>
                  <p className="text-slate-400 font-mono">ID: {d.certId}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">{d.status}</span>
                  <p className="text-slate-400 text-[10px]">Expiry: {d.expiry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
