'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Users, UserPlus, Shield, CheckCircle2, ShieldCheck, Lock, Mail, Loader2, Check, X } from 'lucide-react';

const availableModules = [
  { key: 'guards', label: 'Guard Roster & Patrols', path: '/admin/guards' },
  { key: 'tenders', label: 'B2B Tenders & Contracts', path: '/admin/tenders' },
  { key: 'sales-leads', label: 'Sales & Field Leads', path: '/admin/sales-leads' },
  { key: 'incidents', label: 'Incidents & Alerts', path: '/admin/incidents' },
  { key: 'assets', label: 'Tactical Asset Inventory', path: '/admin/assets' },
  { key: 'live-tracking', label: 'Live Telemetry Radar', path: '/admin/live-tracking' },
  { key: 'payroll', label: 'Payroll & ESIC Disbursal', path: '/admin/payroll' },
  { key: 'compliance', label: 'Training & Govt Audit', path: '/admin/compliance' },
  { key: 'support-desk', label: 'Customer Support Desk', path: '/admin/support-desk' },
  { key: 'cms', label: 'CMS Website Content', path: '/admin/cms' },
];

export default function UsersSubscribersPage() {
  const [activeSubTab, setActiveSubTab] = useState<string>('superadmins');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // New Admin Form State
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    designation: 'Operations Sub-Admin Officer',
    role: 'admin',
    permissions: ['guards', 'tenders', 'sales-leads', 'incidents', 'support-desk'],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePermission = (key: string) => {
    if (newAdmin.permissions.includes(key)) {
      setNewAdmin({
        ...newAdmin,
        permissions: newAdmin.permissions.filter((p) => p !== key),
      });
    } else {
      setNewAdmin({
        ...newAdmin,
        permissions: [...newAdmin.permissions, key],
      });
    }
  };

  const handleSelectAll = () => {
    setNewAdmin({
      ...newAdmin,
      permissions: availableModules.map((m) => m.key),
    });
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setShowAddAdminModal(false);
        setFeedbackMsg(`New Admin (${newAdmin.email}) created with ${newAdmin.permissions.length} module permissions!`);
        setTimeout(() => setFeedbackMsg(''), 4000);
        fetchUsers();
        setNewAdmin({
          name: '',
          email: '',
          password: '',
          designation: 'Operations Sub-Admin Officer',
          role: 'admin',
          permissions: ['guards', 'tenders', 'sales-leads', 'incidents', 'support-desk'],
        });
      } else {
        alert(data.message || 'Failed to create admin.');
      }
    } catch (err) {
      setLoading(false);
      alert('Error creating admin user.');
    }
  };

  const superAdmins = users.filter((u) => u.role === 'superadmin');
  const adminsList = users.filter((u) => ['admin', 'agency'].includes(u.role));
  const clientAccounts = users.filter((u) => u.role === 'user' && (u.accountType === 'client' || (!u.accountType && u.company && u.company !== 'Personal Client Account')));
  const normalUsers = users.filter((u) => u.role === 'user' && !clientAccounts.some((client) => client._id === u._id));
  const visibleAdminAccounts = activeSubTab === 'superadmins' ? superAdmins : adminsList;

  return (
    <div className="flex min-h-screen theme-app-bg font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold theme-app-heading flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#F5C623]" /> Sub-Admin Creation & Granular Access Control (RBAC)
            </h1>
            <p className="text-xs theme-app-body mt-1">Create sub-admins and explicitly select which system modules each admin can access.</p>
          </div>

          <button
            onClick={() => setShowAddAdminModal(true)}
            className="trust-yellow-btn px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg uppercase tracking-wider"
          >
            <UserPlus className="w-4 h-4" /> Create New Admin
          </button>
        </div>

        {feedbackMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-2xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4.5 h-4.5" /> {feedbackMsg}
          </div>
        )}

        {/* Sub Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveSubTab('superadmins')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'superadmins' ? 'trust-yellow-btn shadow-md' : 'theme-app-card hover:text-[#F5C623]'
            }`}
          >
            Super Admin ({superAdmins.length})
          </button>
          <button
            onClick={() => setActiveSubTab('admins')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'admins' ? 'trust-yellow-btn shadow-md' : 'theme-app-card hover:text-[#F5C623]'
            }`}
          >
            System Admins ({adminsList.length})
          </button>
        </div>

        {/* 1. ADMINS LIST WITH GRANULAR MODULE PERMISSIONS */}
        {(activeSubTab === 'superadmins' || activeSubTab === 'admins') && (
          <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-[#F5C623]">{activeSubTab === 'superadmins' ? 'Super Admin Access' : 'System Admin Officers & Module Clearance'}</h3>
              <span className="text-[11px] bg-[#F5C623]/20 text-[#F5C623] font-bold px-3 py-1 rounded-full border border-[#F5C623]/30">
                Super Admin: chavdaamit1011@gmail.com
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-12 theme-app-body text-xs gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading system admin roster...
              </div>
            ) : (
              <div className="space-y-4">
                {visibleAdminAccounts.map((a) => (
                  <div key={a._id || a.email} className="p-5 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F5C623] text-[#0B0D0F] font-black flex items-center justify-center text-sm shadow">
                          {a.name ? a.name.charAt(0) : 'A'}
                        </div>
                        <div>
                          <h5 className="font-bold theme-app-heading text-sm">{a.name}</h5>
                          <p className="text-xs theme-app-body">{a.email} • {a.designation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          a.role === 'superadmin' ? 'bg-[#F5C623]/20 text-[#F5C623]' : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {a.role}
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-500 font-bold px-2.5 py-0.5 rounded-full">
                          {a.isActive ? 'Active Session' : 'Disabled'}
                        </span>
                      </div>
                    </div>

                    {/* Assigned Module Permissions List */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Module Access Permissions ({a.role === 'superadmin' ? 'Full Access' : `${a.permissions?.length || 0} Modules`}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {a.role === 'superadmin' ? (
                          <span className="px-2.5 py-1 rounded-lg bg-[#F5C623]/15 text-[#F5C623] text-[10px] font-bold border border-[#F5C623]/30">
                            ⭐ All System Modules Authorized
                          </span>
                        ) : availableModules.map((m) => {
                          const hasAccess = a.permissions?.includes(m.key);
                          return (
                            <span
                              key={m.key}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border ${
                                hasAccess
                                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                  : 'bg-slate-200 dark:bg-slate-900 text-slate-400 border-slate-300 dark:border-slate-800 line-through opacity-50'
                              }`}
                            >
                              {hasAccess ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-slate-500" />}
                              {m.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. REGISTERED CLIENT USERS */}
        {(activeSubTab === 'clients' || activeSubTab === 'users') && (
          <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5C623]">{activeSubTab === 'clients' ? 'Registered Client Accounts' : 'Registered Normal Users'}</h3>
              <p className="text-xs theme-app-body mt-1">{activeSubTab === 'clients' ? 'Company/entity accounts are listed separately.' : 'Personal accounts created without a company are listed here.'}</p>
            </div>
            <div className="space-y-3">
              {(activeSubTab === 'clients' ? clientAccounts : normalUsers).map((u) => (
                <div key={u._id || u.email} className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold theme-app-heading text-sm">{u.name}</h5>
                    <p className="theme-app-body">{u.email} • Entity: {u.company || 'Personal Client'}</p>
                  </div>
                  <span className="text-emerald-500 font-bold text-xs">{activeSubTab === 'clients' ? 'Client' : 'User'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CREATE NEW ADMIN MODAL WITH GRANULAR PERMISSIONS */}
        {showAddAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="w-full max-w-lg theme-app-card border border-[#F5C623]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-[#F5C623] flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#F5C623]" /> Create New Sub-Admin Account
                  </h3>
                  <p className="text-xs theme-app-body mt-0.5">Set login credentials and assign granular module permissions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="text-slate-400 hover:text-[#F5C623]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAdmin} className="space-y-4 text-xs">
                
                {/* Admin Name */}
                <div>
                  <label className="font-bold theme-app-heading block mb-1">1. Admin Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kalpit Operations Manager"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl p-3 theme-app-heading outline-none"
                  />
                </div>

                {/* Admin Email */}
                <div>
                  <label className="font-bold theme-app-heading block mb-1">2. Official Admin Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="kalpit@suraksha.com"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl p-3 theme-app-heading outline-none"
                  />
                </div>

                {/* Admin Password */}
                <div>
                  <label className="font-bold theme-app-heading block mb-1">3. Set Secure Admin Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl p-3 theme-app-heading outline-none"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="font-bold theme-app-heading block mb-1">4. Role Designation</label>
                  <input
                    type="text"
                    placeholder="Guard Roster & Operations Officer"
                    value={newAdmin.designation}
                    onChange={(e) => setNewAdmin({ ...newAdmin, designation: e.target.value })}
                    className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl p-3 theme-app-heading outline-none"
                  />
                </div>

                {/* GRANULAR MODULE PERMISSION CHECKBOXES */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-bold text-[#F5C623] block text-xs">
                      5. Assign Module Access Permissions:
                    </label>
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="text-[11px] text-[#F5C623] hover:underline font-bold"
                    >
                      Select All 10 Modules
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    {availableModules.map((m) => {
                      const isChecked = newAdmin.permissions.includes(m.key);
                      return (
                        <label
                          key={m.key}
                          onClick={() => handleTogglePermission(m.key)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                            isChecked
                              ? 'bg-[#F5C623]/15 border-[#F5C623]/50 text-[#F5C623] font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-[11px]">{m.label}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 accent-[#F5C623] rounded"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 trust-yellow-btn py-3.5 rounded-xl shadow-lg uppercase tracking-wider text-xs"
                  >
                    {loading ? 'Creating Admin...' : 'Create Admin & Assign Access'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAdminModal(false)}
                    className="px-5 py-3.5 theme-app-bg border border-slate-300 dark:border-slate-800 theme-app-body font-bold rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
