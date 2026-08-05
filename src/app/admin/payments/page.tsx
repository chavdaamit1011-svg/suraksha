'use client';

import React from 'react';
import { CreditCard, IndianRupee, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Payments & Collections
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Payment gateway transactions, NEFT/RTGS receipts, overdue recovery aging.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="trinetra-card rounded-xl p-5 space-y-2">
          <span className="text-xs text-white/55">Collected This Month</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">₹14,20,000</div>
          <span className="text-[11px] text-white/40">8 Client payouts processed</span>
        </div>
        <div className="trinetra-card rounded-xl p-5 space-y-2">
          <span className="text-xs text-white/55">Overdue Accounts</span>
          <div className="text-3xl font-black text-amber-400 font-mono">₹4,22,000</div>
          <span className="text-[11px] text-amber-400">2 Invoices pending (&lt; 15 days)</span>
        </div>
        <div className="trinetra-card rounded-xl p-5 space-y-2">
          <span className="text-xs text-white/55">Payment Success Rate</span>
          <div className="text-3xl font-black text-[#F5C623] font-mono">99.2%</div>
          <span className="text-[11px] text-white/40">Razorpay / ICICI Banking Link</span>
        </div>
      </div>
    </div>
  );
}
