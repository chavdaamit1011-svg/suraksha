'use client';
'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Building, MapPin } from 'lucide-react';

export default function BranchesPage() {
  const branches = [
    { name: 'Noida HQ & Main Command Center', city: 'Noida, UP', address: 'Plot 45, Sector 62', manager: 'Amit Chavda', status: 'Primary HQ' },
    { name: 'Delhi NCR Regional Command Hub', city: 'New Delhi', address: 'Connaught Place Block B', manager: 'Kalpit Sharma', status: 'Active Hub' },
    { name: 'Gurgaon Commercial Branch', city: 'Gurgaon, HR', address: 'Cyber City Phase 3', manager: 'Vikramaditya R.', status: 'Active Hub' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-amber-400" /> Company Branch Network
          </h1>
          <p className="text-xs text-slate-400">View SURAKSHA office branch locations and regional command hubs across India.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">{b.status}</span>
              <h3 className="font-bold text-white text-base">{b.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {b.address}, {b.city}</p>
              <p className="text-xs text-slate-300 pt-2 border-t border-slate-850">Branch Head: <span className="text-amber-400 font-bold">{b.manager}</span></p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
