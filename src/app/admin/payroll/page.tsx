'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { DollarSign, FileText, Download, CheckCircle2, Sliders, Calendar, ArrowUpRight } from 'lucide-react';

export default function PayrollPage() {
  const [activeSubTab, setActiveSubTab] = useState<'payroll' | 'invoices' | 'ledger'>('payroll');

  const payrollData = [
    { id: 'PAY-8801', guard: 'Vikram Singh (SUR-G8841)', dutySite: 'TechPark Alpha Tower B', baseSalary: '₹ 18,500', overtime: '₹ 2,400', netPay: '₹ 20,900', status: 'Paid via Razorpay' },
    { id: 'PAY-8802', guard: 'Rajesh Kumar (SUR-G8842)', dutySite: 'Metro Heights Mall', baseSalary: '₹ 18,500', overtime: '₹ 1,200', netPay: '₹ 19,700', status: 'Paid via Bank' },
    { id: 'PAY-8803', guard: 'Sunil Sharma (SUR-G8843)', dutySite: 'Apex Industrial Estate', baseSalary: '₹ 19,000', overtime: '₹ 3,500', netPay: '₹ 22,500', status: 'Processing' },
  ];

  const invoiceData = [
    { invNo: 'INV-2026-091', client: 'Global Tech Park Ltd', tender: 'TND-2026-001 (45 Guards)', amount: '₹ 12,33,333', dueDate: '10 Aug 2026', status: 'Paid' },
    { invNo: 'INV-2026-092', client: 'Express Logistics Corp', tender: 'TND-2026-002 (20 Guards)', amount: '₹ 5,16,666', dueDate: '15 Aug 2026', status: 'Pending' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-850">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-amber-400" /> Finance, Payroll & Invoicing Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">Manage guard monthly salaries, client B2B invoice billing, and statutory ledgers.</p>
          </div>

        </div>

        {/* Finance Sub-Tabs Navigation */}
        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setActiveSubTab('payroll')}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition ${
              activeSubTab === 'payroll'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400'
            }`}
          >
            Guard Monthly Payroll
          </button>
          <button
            onClick={() => setActiveSubTab('invoices')}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition ${
              activeSubTab === 'invoices'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400'
            }`}
          >
            B2B Client Invoices & Billing
          </button>
          <button
            onClick={() => setActiveSubTab('ledger')}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition ${
              activeSubTab === 'ledger'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400'
            }`}
          >
            Statutory PF & ESIC Ledger
          </button>
        </div>

        {/* Tab 1: Guard Payroll */}
        {activeSubTab === 'payroll' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-amber-400">July 2026 Guard Salary Roster</h3>
              <button className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold text-xs hover:bg-slate-850 flex items-center gap-1.5">
                <Download className="w-4 h-4" /> Download Salary Statement
              </button>
            </div>

            <div className="space-y-3">
              {payrollData.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono text-amber-400 font-bold text-[11px]">{p.id}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{p.guard}</h4>
                    <p className="text-slate-400">{p.dutySite}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Net Payable</span>
                      <span className="text-base font-black text-amber-400 font-mono">{p.netPay}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      p.status.includes('Paid') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Client Invoices */}
        {activeSubTab === 'invoices' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-amber-400">Enterprise B2B Invoices</h3>
              <button className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-1.5">
                + Generate New Invoice
              </button>
            </div>

            <div className="space-y-3">
              {invoiceData.map((inv) => (
                <div key={inv.invNo} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono text-amber-400 font-bold text-[11px]">{inv.invNo}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{inv.client}</h4>
                    <p className="text-slate-400">{inv.tender}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Invoice Amount</span>
                      <span className="text-base font-black text-amber-400 font-mono">{inv.amount}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Statutory Ledger */}
        {activeSubTab === 'ledger' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-amber-400">EPFO & ESIC Compliance Ledger</h3>
            <p className="text-slate-300">Monthly statutory returns deposited with government EPFO & ESIC portals for all guards on roll.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">EPFO Monthly Return (June 2026)</span>
                <p className="text-slate-400">Total Remitted: ₹ 2,45,000 for 128 Officers</p>
                <span className="text-emerald-400 font-bold block text-[11px]">✓ ECR Receipt #889102 Verified</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">ESIC Health Contribution (June 2026)</span>
                <p className="text-slate-400">Total Remitted: ₹ 88,400 for 128 Officers</p>
                <span className="text-emerald-400 font-bold block text-[11px]">✓ ESIC Challan #009182 Verified</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
