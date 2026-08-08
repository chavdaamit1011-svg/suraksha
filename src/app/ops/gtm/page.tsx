'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { TrendingUp, Megaphone } from 'lucide-react';

export default function GtmPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#F5C623]" /> Go-To-Market (GTM) & Growth Campaigns
        </h1>
        <p className="text-xs text-white/55 mt-1">Track GTM ID (GTM-W7N6VTZJ) and campaign lead conversions.</p>
      </div>

      <div className="trinetra-card border border-white/[0.08] p-6 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Active Growth Campaigns</h3>
        <p className="text-xs text-white/80">
          Google Tag Manager container ID: <span className="font-mono text-[#F5C623] font-bold">GTM-W7N6VTZJ</span>. GTM conversion events connected to guard booking & contact forms.
        </p>
      </div>
    </div>
  );
}
