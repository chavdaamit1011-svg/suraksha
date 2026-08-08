'use client';

import React from 'react';
import { MapPin, Shield, Users, CheckCircle2 } from 'lucide-react';

const sitesList = [
  { name: 'DLF Cyber City - Tower A & B', client: 'DLF Cyber City Tech Park', city: 'Gurgaon', guardsReq: 18, supervisor: 'Rakesh Yadav', status: 'Covered' },
  { name: 'Max Hospital Main Gate & ICU', client: 'Max Super Speciality', city: 'Delhi', guardsReq: 12, supervisor: 'Vikram Singh', status: 'Covered' },
  { name: 'Ambience Mall Security Post 1', client: 'Ambience Mall', city: 'Gurgaon', guardsReq: 24, supervisor: 'Dharmendra Kumar', status: 'Covered' },
  { name: 'Hero MotoCorp Plant Perimeter', client: 'Hero MotoCorp', city: 'Dharuhera', guardsReq: 30, supervisor: 'Baldev Singh', status: 'Covered' },
];

export default function SitesPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guarded Sites
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Active Client Sites, security posts, supervisor allocation and coverage state.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sitesList.map((site, idx) => (
          <div key={idx} className="trinetra-card rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{site.name}</h3>
                <div className="text-xs text-[#F5C623]">{site.client} · {site.city}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {site.status}
              </span>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex justify-between text-xs text-white/70">
              <div>Required Guards: <span className="font-mono font-bold text-white">{site.guardsReq}</span></div>
              <div>Supervisor: <span className="font-medium text-white">{site.supervisor}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
