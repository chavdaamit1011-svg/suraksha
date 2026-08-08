'use client';

import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, UserX } from 'lucide-react';

const attendanceRecords = [
  { guard: 'Rohit Singh', site: 'DLF Cyber City', shift: 'Day (06:00-14:00)', checkIn: '05:52 AM', status: 'On Time' },
  { guard: 'Imran Khan', site: 'Max Hospital', shift: 'Day (06:00-14:00)', checkIn: '05:58 AM', status: 'On Time' },
  { guard: 'Vikramaditya Sharma', site: 'Ambience Mall', shift: 'Day (06:00-14:00)', checkIn: '06:12 AM', status: 'Late Check-in' },
  { guard: 'Dinesh Prasad', site: 'Hero MotoCorp', shift: 'Day (06:00-14:00)', checkIn: '-', status: 'On Leave' },
];

export default function AttendancePage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guard Attendance
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Biometric & GPS shift check-in logs, late arrivals, overtime, and leave management.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Guard</th>
                <th className="py-3 px-3">Site</th>
                <th className="py-3 px-3">Shift</th>
                <th className="py-3 px-3">GPS Check-in</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {attendanceRecords.map((rec, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold text-white">{rec.guard}</td>
                  <td className="py-3 px-3 text-white/70">{rec.site}</td>
                  <td className="py-3 px-3 text-white/60">{rec.shift}</td>
                  <td className="py-3 px-3 font-mono text-[#F5C623]">{rec.checkIn}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        rec.status === 'On Time'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : rec.status === 'Late Check-in'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-white/[0.04] text-white/50'
                      }`}
                    >
                      {rec.status}
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
