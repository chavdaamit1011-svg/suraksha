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
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#F5C623]" /> Compliance & Statutory Certifications
        </h1>
        <p className="text-xs text-white/55 mt-1">Statutory certifications, security licenses, and police verification records.</p>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Verified Legal Certificates</h3>
        <div className="space-y-3 text-xs">
          {docs.map((d, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">{d.name}</h5>
                <p className="text-white/55 font-mono mt-0.5">ID: {d.certId}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold">{d.status}</span>
                <p className="text-white/40 text-[10px]">Expiry: {d.expiry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
