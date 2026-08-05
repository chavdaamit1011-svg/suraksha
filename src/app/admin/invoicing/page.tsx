'use client';

import React from 'react';
import { Receipt, IndianRupee, Download, CheckCircle2 } from 'lucide-react';

const invoicesList = [
  { invId: 'INV-2025-048', client: 'DLF Cyber City Tech Park', date: '01 Aug 2026', amount: '₹4,50,000', gst: '₹81,000', total: '₹5,31,000', status: 'Paid' },
  { invId: 'INV-2025-047', client: 'Max Super Speciality', date: '01 Aug 2026', amount: '₹3,20,000', gst: '₹57,600', total: '₹3,77,600', status: 'Pending' },
  { invId: 'INV-2025-046', client: 'Ambience Mall Gurgaon', date: '01 Aug 2026', amount: '₹6,00,000', gst: '₹1,08,000', total: '₹7,08,000', status: 'Paid' },
];

export default function InvoicingPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Client Invoicing & GST Billing
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Automated monthly tax invoices, GST breakdown (18%), PDF generation and payment receipts.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Invoice No</th>
                <th className="py-3 px-3">Client Name</th>
                <th className="py-3 px-3">Base Amount</th>
                <th className="py-3 px-3">GST (18%)</th>
                <th className="py-3 px-3">Total Payable</th>
                <th className="py-3 px-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {invoicesList.map((inv) => (
                <tr key={inv.invId} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-mono font-bold text-[#F5C623]">{inv.invId}</td>
                  <td className="py-3 px-3 font-bold text-white">{inv.client}</td>
                  <td className="py-3 px-3 font-mono text-white/80">{inv.amount}</td>
                  <td className="py-3 px-3 font-mono text-white/60">{inv.gst}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{inv.total}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {inv.status}
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
