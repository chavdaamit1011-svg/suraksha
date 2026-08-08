'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Users,
  Shield,
  Star,
  Mail,
  Globe,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  PlusCircle,
  FileText,
  UserCheck,
  RefreshCw,
} from 'lucide-react';

export default function WebsiteAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'users' | 'guards' | 'reviews'>('leads');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedUserStr = localStorage.getItem('suraksha_user');
    if (savedUserStr) {
      try {
        setCurrentUser(JSON.parse(savedUserStr));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const leads = [
    {
      id: 'QRY-2026-104',
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@dlf.in',
      phone: '+91 98101 22334',
      service: 'Armed Escort & VIP Protection',
      message: 'Requirement for 2 Armed Officers for Night Shift escalation.',
      date: '10 Mins Ago',
      status: 'Under Review',
    },
    {
      id: 'QRY-2026-103',
      name: 'Priya Malhotra',
      email: 'priya@techpark.com',
      phone: '+91 98711 55443',
      service: 'Unarmed Security Guards',
      message: 'Need 10 24x7 security personnel for corporate IT park deployment.',
      date: '2 Hours Ago',
      status: 'Contacted',
    },
    {
      id: 'QRY-2026-102',
      name: 'Anil Gupta',
      email: 'anil@guptagroup.org',
      phone: '+91 99100 88776',
      service: 'Event Security Command',
      message: 'Single-day event security cover for 500+ guests in New Delhi.',
      date: 'Yesterday',
      status: 'Closed / Won',
    },
  ];

  const users = [
    {
      id: 'USR-8801',
      name: 'Amit Chavda',
      email: 'chavdaamit1011@gmail.com',
      phone: '+91 98765 43210',
      company: 'SURAKSHA Security Operations Corp',
      role: 'Super Admin',
      joined: 'Active User',
    },
    {
      id: 'USR-8802',
      name: 'Vikram Malhotra',
      email: 'vikram@techpark.com',
      phone: '+91 98112 33445',
      company: 'DLF Cyber City',
      role: 'Corporate Client',
      joined: '3 Days Ago',
    },
  ];

  const guards = [
    {
      id: 'GRD-101',
      name: 'Vikram Singh',
      rank: 'Senior Armed Officer',
      site: 'TechPark Gate 1',
      status: 'On Duty',
      phone: '+91 98112 00112',
    },
    {
      id: 'GRD-102',
      name: 'Ramesh Kumar',
      rank: 'Unarmed Guard',
      site: 'DLF Cyber City Tower B',
      status: 'On Duty',
      phone: '+91 98112 00113',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5C623]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5" /> SURAKSHA WEBSITE ADMIN CONTROL PANEL
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {currentUser?.name || 'Admin'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Public Website Management · Form Queries, User Accounts, Public Catalog & CMS
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
            >
              <Globe className="w-4 h-4 text-[#F5C623]" /> View Public Website <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Form Queries</span>
              <MessageSquare className="w-4 h-4 text-[#F5C623]" />
            </div>
            <p className="text-2xl font-black text-white">3 Inquiries</p>
            <p className="text-[10px] text-emerald-400 font-medium">Recorded in DB</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Registered Users</span>
              <Users className="w-4 h-4 text-[#F5C623]" />
            </div>
            <p className="text-2xl font-black text-white">2 Accounts</p>
            <p className="text-[10px] text-emerald-400 font-medium">Verified Accounts</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Public Guards</span>
              <Shield className="w-4 h-4 text-[#F5C623]" />
            </div>
            <p className="text-2xl font-black text-white">2 Officers</p>
            <p className="text-[10px] text-emerald-400 font-medium">On Active Duty</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Website Rating</span>
              <Star className="w-4 h-4 text-[#F5C623]" />
            </div>
            <p className="text-2xl font-black text-white">4.9 / 5.0</p>
            <p className="text-[10px] text-emerald-400 font-medium">Client Reviews</p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'bg-[#F5C623] text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Form Queries & Inquiries (3)
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-[#F5C623] text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Website User Accounts
        </button>

        <button
          onClick={() => setActiveTab('guards')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'guards'
              ? 'bg-[#F5C623] text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" /> Deployed Guard Roster
        </button>
      </div>

      {/* Tab Content 1: Form Queries */}
      {activeTab === 'leads' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Public Website Form Queries</h3>
              <p className="text-xs text-slate-400">Inquiries submitted via contact and booking forms on surakshaguards.in</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Total: {leads.length}</span>
          </div>

          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#F5C623] font-bold bg-[#F5C623]/10 px-2 py-0.5 rounded border border-[#F5C623]/30">
                      {lead.id}
                    </span>
                    <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                  </div>
                  <span className="text-xs font-bold text-[#F5C623] bg-[#F5C623]/10 px-2.5 py-1 rounded-full border border-[#F5C623]/30 self-start sm:self-auto">
                    {lead.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                  <p><strong className="text-slate-200">Email:</strong> {lead.email}</p>
                  <p><strong className="text-slate-200">Phone:</strong> {lead.phone}</p>
                  <p><strong className="text-slate-200">Service:</strong> {lead.service}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300">
                  "{lead.message}"
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Received: {lead.date}</span>
                  <button className="text-[#F5C623] hover:underline font-bold flex items-center gap-1">
                    Follow Up Query <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: User Accounts */}
      {activeTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Registered Website Accounts</h3>
              <p className="text-xs text-slate-400">User accounts registered on surakshaguards.in</p>
            </div>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{user.name}</h4>
                    <span className="text-[10px] font-bold text-[#F5C623] bg-[#F5C623]/10 px-2 py-0.5 rounded border border-[#F5C623]/30 uppercase">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{user.email} · {user.phone} · {user.company}</p>
                </div>
                <div className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/30 shrink-0">
                  {user.joined}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Deployed Guard Roster */}
      {activeTab === 'guards' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Deployed Guard Roster</h3>
              <p className="text-xs text-slate-400">Active personnel displayed on public portal catalog</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guards.map((guard) => (
              <div key={guard.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{guard.name}</h4>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    {guard.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{guard.rank} · {guard.site}</p>
                <p className="text-xs text-slate-500">{guard.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
