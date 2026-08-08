'use client';

import React from 'react';
import { Moon, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const nightPings = [
  { guard: 'Rohit Singh', post: 'DLF Gate 3', shiftTime: '22:00 - 06:00', lastPing: '03:15 AM', status: 'Alert · Responded in 12s' },
  { guard: 'Imran Khan', post: 'Max Hospital Back Gate', shiftTime: '22:00 - 06:00', lastPing: '03:15 AM', status: 'Alert · Responded in 8s' },
  { guard: 'Balwant Singh', post: 'Ambience Mall VIP Entry', shiftTime: '22:00 - 06:00', lastPing: '03:15 AM', status: 'Alert · Responded in 15s' },
];

export default function NightAlertnessPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Night Shift Alertness Desk
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Automated hourly alertness pings, response latency timers, supervisor wake-up calls.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#F5C623]" /> Night Guard Ping Audit Log (00:00 - 06:00)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Guard</th>
                <th className="py-3 px-3">Post Location</th>
                <th className="py-3 px-3">Shift</th>
                <th className="py-3 px-3">Last Random Ping</th>
                <th className="py-3 px-3">Alertness Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {nightPings.map((p, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold text-white">{p.guard}</td>
                  <td className="py-3 px-3 text-white/70">{p.post}</td>
                  <td className="py-3 px-3 text-white/60">{p.shiftTime}</td>
                  <td className="py-3 px-3 font-mono text-[#F5C623]">{p.lastPing}</td>
                  <td className="py-3 px-3 text-emerald-400 font-medium">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
