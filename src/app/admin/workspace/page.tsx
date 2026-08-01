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
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-amber-400" /> Individual Guard Workspace
          </h1>
          <p className="text-xs text-slate-400">Track individual officer statuses, active telemetry, and online/offline connections.</p>
        </div>

        {/* Breakdown Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-slate-400 font-bold">Total Guards</span>
            <div className="text-2xl font-black text-white mt-1">4</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-emerald-400 font-bold">Active Guards</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">3</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-rose-400 font-bold">Inactive Guards</span>
            <div className="text-2xl font-black text-rose-400 mt-1">1</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-blue-400 font-bold">Online Network</span>
            <div className="text-2xl font-black text-blue-400 mt-1">3 Connected</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Guard Telemetry Workspace List</h3>
          <div className="space-y-3 text-xs">
            {guardsWorkspace.map((gw) => (
              <div key={gw.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-amber-400 font-bold">{gw.id}</span>
                  <h5 className="font-bold text-white text-sm">{gw.name}</h5>
                  <p className="text-slate-400">{gw.site}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    gw.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {gw.status}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    {gw.network === 'Online' ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-rose-400" />}
                    {gw.network}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
