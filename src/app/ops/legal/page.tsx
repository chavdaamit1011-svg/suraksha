'use client';

import React from 'react';
import { Scale, FileText, CheckCircle2, Shield } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Legal & Dispute Management
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Court cases, legal notices, advocate counsel records, PSARA compliance hearings.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-6 space-y-4 text-center py-12">
        <Scale className="w-12 h-12 text-[#F5C623] mx-auto" />
        <h3 className="text-lg font-bold text-white">Legal Records & Governance Vault</h3>
        <p className="text-xs text-white/55 max-w-md mx-auto">
          0 Pending litigation cases. All 14 client retainer contracts drafted under standard Indian Private Security Agencies Regulation Act guidelines.
        </p>
      </div>
    </div>
  );
}
