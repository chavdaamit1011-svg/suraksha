'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function IncidentDeskPage() {
  const incidents = [
    { id: 'INC-2026-881', title: 'Unauthorized Parking Gate Access Attempt', site: 'Metro Heights Mall Gate 2', severity: 'Medium', status: 'Resolved', reportedBy: 'Rajesh Kumar (SUR-G8842)', date: '28 Jul 2026' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" /> Incident Management Desk
          </h1>
          <p className="text-xs text-slate-400">Log, track, and resolve emergency security incidents reported across client sites.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Reported Site Incidents</h3>
          <div className="space-y-3 text-xs">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-amber-400 font-bold">{inc.id}</span>
                  <h5 className="font-bold text-white text-sm">{inc.title}</h5>
                  <p className="text-slate-400">{inc.site} • Reported by: {inc.reportedBy}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">{inc.status}</span>
                  <p className="text-slate-400 text-[10px]">{inc.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
