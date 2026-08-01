'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export default function TrainingPage() {
  const trainingRoster = [
    { guard: 'Vikram Singh (SUR-G8841)', module: 'Advanced Tactical Escort & Fire Safety', score: '98%', status: 'Certified Passed' },
    { guard: 'Rajesh Kumar (SUR-G8842)', module: 'Crowd De-escalation & Biometric Access', score: '92%', status: 'Certified Passed' },
    { guard: 'Mahesh Verma (SUR-G8844)', module: 'Basic Guard Orientation & Vigilance', score: 'In Progress', status: 'Enrolled' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-400" /> Guard Skill Verification & Training Management
          </h1>
          <p className="text-xs text-slate-400">Verify guard skill certification & agency subscription training qualification.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Officer Skill Test & Onboarding Roster</h3>
          <div className="space-y-3 text-xs">
            {trainingRoster.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">{t.guard}</h5>
                  <p className="text-slate-400">Module: {t.module}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">{t.status}</span>
                  <p className="text-amber-400 font-mono text-[11px]">{t.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
