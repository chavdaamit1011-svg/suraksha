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
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" /> Exportable Operations Reports
          </h1>
          <p className="text-xs text-slate-400">Download business analytics reports, attendance audits, and financial summaries.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 font-sans">Available Reports Directory</h3>
          <div className="space-y-3 text-xs">
            {reports.map((r, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">{r.title}</h5>
                  <p className="text-slate-400">{r.date} • Format: {r.format} ({r.size})</p>
                </div>
                <button
                  onClick={() => alert(`Downloading ${r.title}...`)}
                  className="px-4 py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
