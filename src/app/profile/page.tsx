'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, CreditCard, History, Smartphone, Building, Edit, Save, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

import { checkAndEnforce7DaySession } from '@/lib/session';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'payment' | 'history' | 'devices' | 'branch'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Amit Chavda',
    email: 'chavdaamit1011@gmail.com',
    phone: '+91 98765 43210',
    company: 'SURAKSHA Command Operations',
    designation: 'Managing Director & Super Admin',
    plan: 'Enterprise Ultimate (Active)',
  });
  const [saveMessage, setSaveMessage] = useState('');

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa Corporate Card', number: '•••• •••• •••• 4242', expiry: '12/28', status: 'Primary (Static Set)' },
    { id: 2, type: 'Razorpay UPI Autopay', number: 'amit@okhdfcbank', expiry: 'Active', status: 'Backup' },
  ]);

  const [sessions, setSessions] = useState([
    { id: '1', device: 'Windows 11 PC (Chrome)', ip: '192.168.1.45', location: 'Noida, UP', lastActive: 'Active Now (Current Session)' },
    { id: '2', device: 'iPhone 15 Pro (Suraksha App)', ip: '103.22.45.12', location: 'New Delhi', lastActive: '2 hours ago' },
  ]);

  const [history, setHistory] = useState([
    { id: 'ORD-9901', service: '2x Armed VIP Escorts', site: 'TechPark Alpha Tower B', date: '28 Jul 2026', amount: '₹ 76,000', status: 'Completed' },
    { id: 'ORD-9902', service: '2-Year Guard Tender Deployment', site: 'Global Logistics Hub', date: '01 Jan 2026', amount: '₹ 1.48 Crore / Yr', status: 'Active Tender' },
  ]);

  // AUTH GUARD: Redirect to login if user is not authenticated or 7-day session expired
  useEffect(() => {
    const isExpired = checkAndEnforce7DaySession();
    if (isExpired) {
      window.location.href = '/admin/login?expired=1';
      return;
    }

    const token = localStorage.getItem('suraksha_token');
    const savedUser = localStorage.getItem('suraksha_user');

    if (!token || !savedUser) {
      window.location.href = '/admin/login';
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      setUser((prev) => ({
        ...prev,
        name: parsed.name || prev.name,
        email: parsed.email || prev.email,
        designation: parsed.designation || 'Client Account',
        company: parsed.company || 'Personal Client Account',
      }));
    } catch (e) {
      window.location.href = '/admin/login';
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    localStorage.setItem('suraksha_user', JSON.stringify(user));
    setSaveMessage('Profile details saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen theme-app-bg font-sans">
      <Navbar />

      <section className="pt-36 pb-12 theme-app-card border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#F5C623] text-[#0B0D0F] font-black text-3xl flex items-center justify-center shadow-lg">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold theme-app-heading">{user.name}</h1>
                <span className="text-[10px] uppercase font-bold bg-[#F5C623]/20 text-[#F5C623] border border-[#F5C623]/30 px-3 py-1 rounded-full">
                  {user.designation}
                </span>
              </div>
              <p className="text-xs theme-app-body">{user.email} | {user.company}</p>
              <p className="text-xs text-emerald-500 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Plan: {user.plan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <section className="py-12 theme-app-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Nav Tabs */}
            <div className="lg:col-span-3 space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                  activeTab === 'profile'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-card hover:text-[#F5C623]'
                }`}
              >
                <User className="w-4 h-4" /> Personal Details
              </button>

              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                  activeTab === 'payment'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-card hover:text-[#F5C623]'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Payment Methods (Razorpay)
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                  activeTab === 'history'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-card hover:text-[#F5C623]'
                }`}
              >
                <History className="w-4 h-4" /> Service & Tender History
              </button>

              <button
                onClick={() => setActiveTab('devices')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                  activeTab === 'devices'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-card hover:text-[#F5C623]'
                }`}
              >
                <Smartphone className="w-4 h-4" /> Device Sessions ({sessions.length})
              </button>

              <button
                onClick={() => setActiveTab('branch')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                  activeTab === 'branch'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-card hover:text-[#F5C623]'
                }`}
              >
                <Building className="w-4 h-4" /> Branch & Guard Info
              </button>
            </div>

            {/* Right Tab Content */}
            <div className="lg:col-span-9">
              <div className="theme-app-card p-6 sm:p-8 rounded-3xl min-h-[400px]">
                
                {/* 1. PERSONAL DETAILS */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-[#F5C623] flex items-center gap-2">
                        <User className="w-5 h-5" /> Account Details
                      </h3>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 theme-app-bg hover:border-[#F5C623] text-[#F5C623] border border-slate-300 dark:border-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Changes
                        </button>
                      )}
                    </div>

                    {saveMessage && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {saveMessage}
                      </div>
                    )}

                    <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                      <div>
                        <label className="font-semibold theme-app-body">Full Name</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          className={`w-full mt-1.5 p-3 rounded-xl border outline-none font-semibold ${
                            isEditing ? 'theme-app-bg border-[#F5C623] text-[#F5C623]' : 'theme-app-bg border-slate-300 dark:border-slate-800 theme-app-heading'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="font-semibold theme-app-body">Email Address</label>
                        <input
                          type="email"
                          disabled={!isEditing}
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className={`w-full mt-1.5 p-3 rounded-xl border outline-none font-semibold ${
                            isEditing ? 'theme-app-bg border-[#F5C623] text-[#F5C623]' : 'theme-app-bg border-slate-300 dark:border-slate-800 theme-app-heading'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="font-semibold theme-app-body">Phone Number</label>
                        <input
                          type="tel"
                          disabled={!isEditing}
                          value={user.phone}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          className={`w-full mt-1.5 p-3 rounded-xl border outline-none font-semibold ${
                            isEditing ? 'theme-app-bg border-[#F5C623] text-[#F5C623]' : 'theme-app-bg border-slate-300 dark:border-slate-800 theme-app-heading'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="font-semibold theme-app-body">Company / Organization</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={user.company}
                          onChange={(e) => setUser({ ...user, company: e.target.value })}
                          className={`w-full mt-1.5 p-3 rounded-xl border outline-none font-semibold ${
                            isEditing ? 'theme-app-bg border-[#F5C623] text-[#F5C623]' : 'theme-app-bg border-slate-300 dark:border-slate-800 theme-app-heading'
                          }`}
                        />
                      </div>
                    </form>
                  </div>
                )}

                {/* 2. PAYMENT METHODS */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <h3 className="text-lg font-bold text-[#F5C623] flex items-center gap-2">
                          <CreditCard className="w-5 h-5" /> Payment Method Configuration
                        </h3>
                        <p className="text-xs theme-app-body mt-1">Static card setup (Razorpay API integration ready).</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {paymentMethods.map((pm) => (
                        <div key={pm.id} className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-8 h-8 text-[#F5C623]" />
                            <div>
                              <h5 className="font-bold theme-app-heading text-sm">{pm.type}</h5>
                              <p className="text-xs font-mono theme-app-body">{pm.number}</p>
                            </div>
                          </div>
                          <span className="text-[10px] uppercase font-bold bg-[#F5C623]/20 text-[#F5C623] px-3 py-1 rounded-full">
                            {pm.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl theme-app-bg border border-[#F5C623]/30 text-xs theme-app-body flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#F5C623] shrink-0" />
                      <span>Razorpay key `rzp_test_SmPXz2pacbbHrO` configured in `.env.local`. Live checkout modal will trigger during invoice settlement.</span>
                    </div>
                  </div>
                )}

                {/* 3. SERVICE HISTORY */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-[#F5C623] flex items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <History className="w-5 h-5" /> Service & Deployment History
                    </h3>

                    <div className="space-y-3">
                      {history.map((h) => (
                        <div key={h.id} className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#F5C623] font-bold">{h.id}</span>
                            <h5 className="font-bold theme-app-heading text-sm">{h.service}</h5>
                            <p className="text-xs theme-app-body">{h.site} • {h.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#F5C623] text-sm">{h.amount}</span>
                            <span className="block text-[10px] text-emerald-500 font-bold uppercase">{h.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. DEVICE SESSIONS */}
                {activeTab === 'devices' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-[#F5C623] flex items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <Smartphone className="w-5 h-5" /> Active Device Sessions
                    </h3>

                    <div className="space-y-3">
                      {sessions.map((s) => (
                        <div key={s.id} className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <h5 className="font-bold theme-app-heading text-sm">{s.device}</h5>
                            <p className="text-xs theme-app-body">IP: {s.ip} • Location: {s.location}</p>
                            <span className="text-[10px] text-[#F5C623] font-medium">{s.lastActive}</span>
                          </div>
                          <button
                            onClick={() => handleRevokeSession(s.id)}
                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold rounded-lg transition"
                          >
                            Revoke Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. BRANCH & GUARD INFO */}
                {activeTab === 'branch' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-[#F5C623] flex items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <Building className="w-5 h-5" /> Branch & Guard Allocation Hub
                    </h3>
                    <p className="text-xs theme-app-body leading-relaxed">
                      Assigned Branch: <span className="text-[#F5C623] font-bold">Suraksha HQ Noida Sector 62</span>. Detailed branch-level guard assignments will display here as your team scales.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
