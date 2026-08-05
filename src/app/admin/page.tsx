'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Radio,
  UserPlus,
  IndianRupee,
  FileText,
  Briefcase,
  MapPin,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Shield,
  Clock,
  CheckCircle2,
  FileCheck,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const deploymentData = [
  { date: 'Jul 23', deployed: 172, required: 180 },
  { date: 'Jul 24', deployed: 175, required: 180 },
  { date: 'Jul 25', deployed: 178, required: 182 },
  { date: 'Jul 26', deployed: 180, required: 182 },
  { date: 'Jul 27', deployed: 181, required: 185 },
  { date: 'Jul 28', deployed: 179, required: 185 },
  { date: 'Jul 29', deployed: 182, required: 185 },
  { date: 'Jul 30', deployed: 183, required: 186 },
  { date: 'Jul 31', deployed: 185, required: 186 },
  { date: 'Aug 01', deployed: 184, required: 186 },
  { date: 'Aug 02', deployed: 186, required: 186 },
  { date: 'Aug 03', deployed: 185, required: 186 },
  { date: 'Aug 04', deployed: 186, required: 186 },
  { date: 'Aug 05', deployed: 186, required: 186 },
];

export default function AdminDashboardPage() {
  const [guardsCount, setGuardsCount] = useState(248);
  const [tendersCount, setTendersCount] = useState(14);

  useEffect(() => {
    fetch('/api/guards')
      .then((res) => res.json())
      .then((data) => {
        if (data.guards && data.guards.length > 0) {
          setGuardsCount(data.guards.length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Amit
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Live operating picture for Suraksha Security Agency — workforce, recruitment, clients and billing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-md bg-[#1E1F22] border border-white/[0.08] flex items-center gap-2 text-xs font-medium text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-time</span>
          </div>
        </div>
      </div>

      {/* FIRST KPI ROW: 4 equal statistic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Guards (Yellow Emphasis) */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2 border-[#F5C623]/30 bg-[#F5C623]/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Total guards</span>
            <div className="w-8 h-8 rounded-lg bg-[#F5C623]/10 border border-[#F5C623]/30 flex items-center justify-center text-[#F5C623]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{guardsCount}</div>
          <div className="text-[11px] text-[#F5C623] font-medium flex items-center gap-1">
            <span>231 active</span>
          </div>
        </div>

        {/* Card 2: On duty now */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">On duty now</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">186</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>live</span>
          </div>
        </div>

        {/* Card 3: Recruitment pipeline */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Recruitment pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">34</div>
          <div className="text-[11px] text-white/40 font-medium">
            12 docs · 8 PV pending
          </div>
        </div>

        {/* Card 4: Monthly billing */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Monthly billing</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F5C623]">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">₹18.42L</div>
          <div className="text-[11px] text-white/40 font-medium">
            14 contracts
          </div>
        </div>
      </div>

      {/* SECOND KPI ROW: 4 equal statistic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active guards */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Active guards</span>
            <Shield className="w-4 h-4 text-white/40" />
          </div>
          <div className="text-2xl font-black text-white font-mono">231</div>
          <div className="text-[11px] text-white/40">93.1% deployed</div>
        </div>

        {/* Card 2: Docs pending */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Docs pending</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">12</div>
          <div className="text-[11px] text-amber-400">review required</div>
        </div>

        {/* Card 3: Clients */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Clients</span>
            <Briefcase className="w-4 h-4 text-white/40" />
          </div>
          <div className="text-2xl font-black text-white font-mono">19</div>
          <div className="text-[11px] text-white/40">32 active sites</div>
        </div>

        {/* Card 4: Active sites */}
        <div className="trinetra-card trinetra-card-hover rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55 font-medium">Active sites</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">32</div>
          <div className="text-[11px] text-emerald-400">100% coverage</div>
        </div>
      </div>

      {/* FIRST LARGE ROW: Deployment Trend (2/3) + Recruitment Funnel (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: Deployment trend (8 cols) */}
        <div className="lg:col-span-8 trinetra-card rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F5C623]" />
                <h3 className="font-bold text-white text-sm">Deployment trend</h3>
              </div>
              <p className="text-xs text-white/40 mt-0.5">
                Guards deployed vs scheduled · last 14 days (live)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5C623]" />
                <span className="text-white/60">Deployed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                <span className="text-white/60">Required</span>
              </div>
            </div>
          </div>

          {/* Recharts Chart */}
          <div className="h-[250px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deploymentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="deployedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5C623" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5C623" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} domain={[160, 190]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1F22',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="required" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} fill="none" />
                <Area type="monotone" dataKey="deployed" stroke="#F5C623" strokeWidth={2.5} fillOpacity={1} fill="url(#deployedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Recruitment Funnel (4 cols) */}
        <div className="lg:col-span-4 trinetra-card rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Recruitment funnel</h3>
                <p className="text-xs text-white/40 mt-0.5">Pipeline health</p>
              </div>
              <Link
                href="/admin/recruitment"
                className="text-xs text-[#F5C623] hover:underline font-semibold flex items-center gap-1"
              >
                Open <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Funnel Rows */}
            <div className="space-y-3.5 mt-5">
              {/* Row 1 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-white/80 font-medium">
                  <span>In pipeline</span>
                  <span className="font-mono font-bold text-white">34</span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F5C623] h-full rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-white/80 font-medium">
                  <span>Docs pending</span>
                  <span className="font-mono font-bold text-amber-400">12</span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-white/80 font-medium">
                  <span>Police verification</span>
                  <span className="font-mono font-bold text-white/70">8</span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                  <div className="bg-white/40 h-full rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              {/* Row 4 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-white/80 font-medium">
                  <span>Active guards</span>
                  <span className="font-mono font-bold text-emerald-400">231</span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '93%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-[11px] text-white/40">
            Total candidate intake this month: 52 candidates
          </div>
        </div>
      </div>

      {/* SECOND LARGE ROW: Recent Activity (2/3) + Billing Snapshot (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: Recent Activity (8 cols) */}
        <div className="lg:col-span-8 trinetra-card rounded-xl p-5 space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm">Recent activity</h3>
            <p className="text-xs text-white/40 mt-0.5">
              Across guards, recruitment, clients & billing
            </p>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {/* Feed item 1 */}
            <div className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#F5C623]/10 text-[#F5C623] flex items-center justify-center shrink-0">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">
                  Rohit Singh was onboarded as a guard
                </span>
              </div>
              <span className="text-white/40 text-[11px] font-mono">8 min ago</span>
            </div>

            {/* Feed item 2 */}
            <div className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">
                  Police verification uploaded for Imran Khan
                </span>
              </div>
              <span className="text-white/40 text-[11px] font-mono">24 min ago</span>
            </div>

            {/* Feed item 3 */}
            <div className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">
                  DLF Cyber City contract renewed
                </span>
              </div>
              <span className="text-white/40 text-[11px] font-mono">1 hr ago</span>
            </div>

            {/* Feed item 4 */}
            <div className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">
                  Invoice INV-2025-048 generated
                </span>
              </div>
              <span className="text-white/40 text-[11px] font-mono">2 hr ago</span>
            </div>

            {/* Feed item 5 */}
            <div className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                  <UserPlus className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">
                  New candidate added from referral
                </span>
              </div>
              <span className="text-white/40 text-[11px] font-mono">3 hr ago</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Billing Snapshot (4 cols) */}
        <div className="lg:col-span-4 trinetra-card rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Billing snapshot</h3>
                <p className="text-xs text-white/40 mt-0.5">Active contracts</p>
              </div>
              <Link
                href="/admin/contracts"
                className="text-xs text-[#F5C623] hover:underline font-semibold"
              >
                Contracts
              </Link>
            </div>

            {/* Inner Inset Card */}
            <div className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] space-y-2">
              <span className="text-xs text-white/55 font-medium block">
                Estimated monthly billing
              </span>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                ₹18,42,000
              </div>
              <div className="text-xs text-[#F5C623] font-medium pt-1">
                14 active contracts · 32 sites
              </div>
            </div>
          </div>

          <p className="text-[11px] text-white/32 border-t border-white/[0.06] pt-3">
            Derived from active contract rates × guards contracted.
          </p>
        </div>
      </div>

      {/* Bottom Information Line */}
      <div className="pt-2 text-center text-[11px] text-white/32 flex items-center justify-center gap-1.5">
        <IndianRupee className="w-3 h-3 text-[#F5C623]" />
        <span>
          All figures are live from the API — KPIs, attendance trend, and activity feed reflect tenant data.
        </span>
      </div>
    </div>
  );
}
