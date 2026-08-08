'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { FileText, Download } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'Monthly Guard Attendance & SLA Audit Report', date: 'July 2026', format: 'PDF / CSV', size: '2.4 MB' },
    { title: 'B2B Tender Revenue & Billing Summary', date: 'Q2 2026', format: 'PDF / XLSX', size: '4.1 MB' },
    { title: 'Incident Prevention & GPS Patrol Logs', date: 'July 2026', format: 'PDF', size: '1.8 MB' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#F5C623]" /> Exportable Operations Reports
        </h1>
        <p className="text-xs text-white/55 mt-1">Download business analytics reports, attendance audits, and financial summaries.</p>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Available Reports Directory</h3>
        <div className="space-y-3 text-xs">
          {reports.map((r, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">{r.title}</h5>
                <p className="text-white/55 mt-0.5">{r.date} • Format: {r.format} ({r.size})</p>
              </div>
              <button
                onClick={() => alert(`Downloading ${r.title}...`)}
                className="px-3 py-1.5 bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold rounded-md transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
