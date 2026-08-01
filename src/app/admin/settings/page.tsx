'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Settings, Save, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [sessionExpiryDays, setSessionExpiryDays] = useState(2);
  const [autoDeactivateInactive, setAutoDeactivateInactive] = useState(true);
  const [otpMandatory, setOtpMandatory] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-amber-400" /> Global System Settings & Session Expiry Rules
            </h1>
            <p className="text-xs text-slate-400">Configure 2-day session timeout rules, auto-deactivation toggles, and feature controls.</p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Settings Saved! Session limit policy enforced.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs max-w-3xl">
          {/* Session Limit Setting */}
          <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Session Timeout & Inactive User Policy
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Enforce auto-logout and deactivate user sessions if inactive for more than 2 days.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-300">Session Timeout (Days)</label>
                <select
                  value={sessionExpiryDays}
                  onChange={(e) => setSessionExpiryDays(parseInt(e.target.value))}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-400 font-bold outline-none"
                >
                  <option value={2}>2 Days (Default Strict Policy)</option>
                  <option value={5}>5 Days</option>
                  <option value={7}>7 Days</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300">Action on Expiry</label>
                <select
                  value={autoDeactivateInactive ? 'deactivate' : 'logout'}
                  onChange={(e) => setAutoDeactivateInactive(e.target.value === 'deactivate')}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none"
                >
                  <option value="deactivate">Auto-Deactivate User & Require Admin Re-approval</option>
                  <option value="logout">Force Logout Session Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* OTP Mandatory */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" /> Mandatory Nodemailer OTP for Admin Login
                </h3>
                <p className="text-slate-400 mt-0.5">Dispatches 6-digit OTP code to email during login.</p>
              </div>
              <input
                type="checkbox"
                checked={otpMandatory}
                onChange={(e) => setOtpMandatory(e.target.checked)}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
