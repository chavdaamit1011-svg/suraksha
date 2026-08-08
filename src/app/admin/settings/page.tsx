'use client';

import React, { useState } from 'react';
import { Settings, Shield, Lock, Bell, CheckCircle2, Save } from 'lucide-react';

export default function WebsiteAdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'SURAKSHA Security Operations',
    contactEmail: 'chavdaamit1011@gmail.com',
    sessionPolicy: '7 Days Mandatory Re-Login Enabled',
    smtpEnabled: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" /> WEBSITE ADMIN SETTINGS
          </div>
          <h1 className="text-2xl font-extrabold text-white">Public Website Configuration</h1>
          <p className="text-xs text-slate-400">
            Configure website name, admin contact notification emails, and security policy rules
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-[#F5C623]">General Settings</h3>
          {saved && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-xl border border-emerald-400/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settings Saved
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Website Name</label>
            <input
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-300 mb-1">Admin Notification Email</label>
            <input
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Security Session Policy</label>
          <input
            readOnly
            value={settings.sessionPolicy}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 outline-none cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="trust-yellow-btn px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 uppercase tracking-wider shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </form>
    </div>
  );
}
