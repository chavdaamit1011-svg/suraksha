'use client';

import React from 'react';
import { PieChart, IndianRupee, FileText } from 'lucide-react';

const expenseItems = [
  { category: 'Uniforms & Tactical Gear', vendor: 'Suraksha Tactical Apparel', amount: '₹1,24,000', branch: 'Gurgaon Central', status: 'Approved' },
  { category: 'Fuel & Patrol Vehicles', vendor: 'Indian Oil Corp', amount: '₹68,500', branch: 'Noida Ops', status: 'Approved' },
  { category: 'Guard Accommodation Lease', vendor: 'DLF Realty', amount: '₹1,80,000', branch: 'Gurgaon Central', status: 'Approved' },
];

export default function ExpensesPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Agency Operational Expenses
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Uniform procurement, patrol vehicle fuel, guard barracks rent, equipment maintenance.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Expense Category</th>
                <th className="py-3 px-3">Vendor</th>
                <th className="py-3 px-3">Branch</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Approval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {expenseItems.map((exp, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold text-white">{exp.category}</td>
                  <td className="py-3 px-3 text-white/70">{exp.vendor}</td>
                  <td className="py-3 px-3 text-white/60">{exp.branch}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{exp.amount}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400">
                      {exp.status}
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
