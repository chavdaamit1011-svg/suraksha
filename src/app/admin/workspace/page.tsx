'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Radio, Users, CheckCircle2, XCircle, Wifi, WifiOff } from 'lucide-react';

export default function WorkspacePage() {
  const guardsWorkspace = [
    { id: 'SUR-G8841', name: 'Vikram Singh', site: 'TechPark Alpha', status: 'Active', network: 'Online', battery: '92%' },
    { id: 'SUR-G8842', name: 'Rajesh Kumar', site: 'Metro Heights Mall', status: 'Active', network: 'Online', battery: '85%' },
    { id: 'SUR-G8843', name: 'Sunil Sharma', site: 'Apex Industrial Estate', status: 'Active', network: 'Online', battery: '78%' },
    { id: 'SUR-G8844', name: 'Mahesh Verma', site: 'Standby Barracks', status: 'Inactive', network: 'Offline', battery: '0%' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Radio className="w-6 h-6 text-[#F5C623]" /> Individual Guard Telemetry Workspace
        </h1>
        <p className="text-xs text-white/55 mt-1">Track individual officer statuses, active telemetry, and online/offline connections.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-white/55 font-bold">Total Guards</span>
          <div className="text-2xl font-black text-white mt-1">4</div>
        </div>
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-emerald-400 font-bold">Active Guards</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">3</div>
        </div>
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-[#EF4444] font-bold">Inactive Guards</span>
          <div className="text-2xl font-black text-[#EF4444] mt-1">1</div>
        </div>
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-[#F5C623] font-bold">Online Network</span>
          <div className="text-2xl font-black text-[#F5C623] mt-1">3 Connected</div>
        </div>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Guard Telemetry Workspace List</h3>
        <div className="space-y-3 text-xs">
          {guardsWorkspace.map((gw) => (
            <div key={gw.id} className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="font-mono text-[#F5C623] font-bold">{gw.id}</span>
                <h5 className="font-bold text-white text-sm">{gw.name}</h5>
                <p className="text-white/55">{gw.site}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                  gw.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {gw.status}
                </span>
                <span className="flex items-center gap-1 font-mono text-white/70">
                  {gw.network === 'Online' ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-rose-400" />}
                  {gw.network}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
