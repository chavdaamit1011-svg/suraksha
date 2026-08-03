'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import {
  Shield,
  FileCheck,
  Users,
  AlertTriangle,
  Radio,
  MapPin,
  TrendingUp,
  Activity,
  Box,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  DollarSign,
  Briefcase,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [guards, setGuards] = useState<any[]>([]);
  const [tenders, setTenders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/guards')
      .then((res) => res.json())
      .then((data) => {
        if (data.guards) setGuards(data.guards);
      })
      .catch((e) => console.error(e));

    fetch('/api/tenders')
      .then((res) => res.json())
      .then((data) => {
        if (data.tenders) setTenders(data.tenders);
      })
      .catch((e) => console.error(e));

    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      fetch('/api/guards').then((res) => res.json()).then((data) => { if (data.guards) setGuards(data.guards); }).catch((e) => console.error(e));
      fetch('/api/tenders').then((res) => res.json()).then((data) => { if (data.tenders) setTenders(data.tenders); }).catch((e) => console.error(e));
    }, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = [
    { title: 'Total Guards Roster', value: guards.length || '4', sub: '3 On Duty / 1 Standby', icon: Shield, color: 'text-amber-400' },
    { title: 'Active B2B Tenders', value: tenders.length || '2', sub: '₹ 2.1 Crore Contract Value', icon: FileCheck, color: 'text-emerald-400' },
    { title: 'Active Subscribers & Clients', value: '128 Units', sub: 'B2B & B2C Guard Plans', icon: Users, color: 'text-amber-300' },
    { title: 'Live Incident Reports', value: '1 Resolved', sub: 'Zero High Severity SLA', icon: AlertTriangle, color: 'text-purple-400' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-10 overflow-y-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-850">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-3xl font-black text-white">Suraksha Command Dashboard</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">Super Admin Console: Amit Chavda (chavdaamit1011@gmail.com)</p>
          </div>
        </div>

        {/* Spacious KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-8 rounded-3xl space-y-3 transition duration-200 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.title}</span>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white">{s.value}</div>
                <p className="text-xs text-slate-400 font-medium">{s.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Guard Telemetry & B2B Tenders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Live Guard Telemetry Roster */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2.5">
                <Shield className="w-5 h-5" /> Live Guard Telemetry Roster
              </h3>
              <a href="/admin/guards" className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1">
                View Roster <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-4">
              {guards.length > 0 ? (
                guards.map((g) => (
                  <div key={g._id || g.guardId} className="p-5 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-between text-xs hover:border-amber-500/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-800 text-amber-400 font-mono font-bold flex items-center justify-center text-sm shadow-inner">
                        {g.guardId.slice(-3)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{g.name}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{g.assignedSite} • ID: {g.guardId}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        g.status === 'On Duty' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {g.status}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{g.onlineStatus}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">Loading guards database...</div>
              )}
            </div>
          </div>

          {/* Active Tenders summary */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2.5">
                <FileCheck className="w-5 h-5" /> B2B Tenders
              </h3>
            </div>

            <div className="space-y-4">
              {tenders.map((t) => (
                <div key={t._id || t.tenderId} className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-2.5 text-xs hover:border-amber-500/30 transition">
                  <span className="text-[11px] font-mono text-amber-400 font-bold">{t.tenderId}</span>
                  <div className="font-bold text-white text-sm leading-snug">{t.title}</div>
                  <div className="flex justify-between text-slate-400 text-xs pt-1 border-t border-slate-900">
                    <span>{t.clientCompany}</span>
                    <span className="text-amber-400 font-bold">{t.guardsRequired} Guards</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
