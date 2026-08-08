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
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-[#F5C623]" /> Guard Skill Verification & Training Management
        </h1>
        <p className="text-xs text-white/55 mt-1">Verify guard skill certification & PSARA training qualification.</p>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Officer Skill Test & Onboarding Roster</h3>
        <div className="space-y-3 text-xs">
          {trainingRoster.map((t, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">{t.guard}</h5>
                <p className="text-white/55 mt-0.5">Module: {t.module}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold">{t.status}</span>
                <p className="text-[#F5C623] font-mono text-[11px]">{t.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
