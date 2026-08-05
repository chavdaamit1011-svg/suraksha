'use client';

import React from 'react';
import { Users, Crown, Shield, Lock, CheckCircle2 } from 'lucide-react';

const staffMembers = [
  { name: 'Amit Chavda', role: 'Super Admin', email: 'chavdaamit1011@gmail.com', phone: '+91 98765 43210', access: 'Full Command Access' },
  { name: 'Rajesh Sharma', role: 'Operations Director', email: 'rajesh@apexshield.com', phone: '+91 98112 00112', access: 'Force & Roster Control' },
  { name: 'Pooja Verma', role: 'HR & Recruitment Head', email: 'pooja@apexshield.com', phone: '+91 98223 11223', access: 'Recruitment & Payroll' },
  { name: 'Sanjay Rawat', role: 'Field Operations Manager', email: 'sanjay@apexshield.com', phone: '+91 98334 22334', access: 'Live Patrol & Incidents' },
];

export default function TeamPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Team & Roles
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Internal agency staff, command permissions, role-based access control (RBAC).
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-white text-sm">Staff Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Permission Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {staffMembers.map((member, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F5C623]/10 text-[#F5C623] font-bold text-xs flex items-center justify-center">
                      {member.name[0]}
                    </div>
                    {member.name}
                  </td>
                  <td className="py-3 px-3 text-[#F5C623] font-semibold">{member.role}</td>
                  <td className="py-3 px-3 text-white/70">
                    <div>{member.email}</div>
                    <div className="text-[11px] text-white/40">{member.phone}</div>
                  </td>
                  <td className="py-3 px-3 text-white/80">{member.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
