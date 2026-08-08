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
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building className="w-6 h-6 text-[#F5C623]" /> Agency Branch Network
        </h1>
        <p className="text-xs text-white/55 mt-1">View Suraksha Security Agency office locations and regional hubs across India.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {branches.map((b, idx) => (
          <div key={idx} className="trinetra-card border border-white/[0.08] p-5 rounded-xl space-y-3">
            <span className="text-[10px] font-bold uppercase text-[#F5C623] bg-[#F5C623]/10 px-2 py-0.5 rounded">{b.status}</span>
            <h3 className="font-bold text-white text-sm">{b.name}</h3>
            <p className="text-xs text-white/55 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#F5C623]" /> {b.address}, {b.city}</p>
            <p className="text-xs text-white/70 pt-2 border-t border-white/[0.08]">Branch Head: <span className="text-[#F5C623] font-bold">{b.manager}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
