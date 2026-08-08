'use client';

import React from 'react';
import { UserCheck, Shield, Clock, CheckCircle2 } from 'lucide-react';

const visitorLogs = [
  { visitor: 'Aman Deep', vehicle: 'HR-26-AB-1234', site: 'DLF Cyber City', host: 'TechCorp India', entryTime: '10:15 AM', exitTime: 'In Site', status: 'Verified' },
  { visitor: 'Priyanka Mittal', vehicle: 'DL-01-CA-9876', site: 'Max Hospital', host: 'Admin Office', entryTime: '09:45 AM', exitTime: '11:30 AM', status: 'Checked Out' },
];

export default function VisitorsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Visitor & Vehicle Log
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Gate pass management, visitor verification, ANPR vehicle plate log, host notifications.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Visitor Name</th>
                <th className="py-3 px-3">Vehicle Plate</th>
                <th className="py-3 px-3">Site</th>
                <th className="py-3 px-3">Host Entity</th>
                <th className="py-3 px-3">Entry Time</th>
                <th className="py-3 px-3">Exit Time</th>
                <th className="py-3 px-3">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {visitorLogs.map((v, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold text-white">{v.visitor}</td>
                  <td className="py-3 px-3 font-mono text-[#F5C623]">{v.vehicle}</td>
                  <td className="py-3 px-3 text-white/70">{v.site}</td>
                  <td className="py-3 px-3 text-white/60">{v.host}</td>
                  <td className="py-3 px-3 font-mono text-white">{v.entryTime}</td>
                  <td className="py-3 px-3 font-mono text-white/60">{v.exitTime}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400">
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
