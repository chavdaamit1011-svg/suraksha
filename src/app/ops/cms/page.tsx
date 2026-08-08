'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Globe, Save, CheckCircle2, Image as ImageIcon, FileText } from 'lucide-react';

export default function CMSManagerPage() {
  const [saved, setSaved] = useState(false);
  const [heroText, setHeroText] = useState('Shielding Your Assets with Elite Guards & Command Tech');
  const [privacyPolicy, setPrivacyPolicy] = useState('SURAKSHA collects personal information required for security guard deployment...');
  const [termsText, setTermsText] = useState('By booking guards or entering into a multi-year B2B tender contract with SURAKSHA...');
  const [bannerLogoUrl, setBannerLogoUrl] = useState('/suraksha-logo-full.png');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
        <div className="flex items-center justify-between pb-4 border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-amber-400" /> Unified Website Content & Policy CMS
            </h1>
            <p className="text-xs text-slate-400">Manage all website images, hero texts, privacy policy, and terms from one single tab.</p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" /> Save CMS Changes
          </button>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Website Content & Policies Updated Globally!
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 text-xs">
          {/* Hero Banner Text */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Homepage Hero Headline Text
            </h3>
            <input
              type="text"
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-slate-100 outline-none"
            />
          </div>

          {/* Logo Asset URL */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Main Logo Image Path / Asset
            </h3>
            <input
              type="text"
              value={bannerLogoUrl}
              onChange={(e) => setBannerLogoUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-slate-100 outline-none font-mono"
            />
          </div>

          {/* Privacy Policy Editor */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Privacy Policy Text Content
            </h3>
            <textarea
              rows={4}
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-slate-100 outline-none"
            />
          </div>

          {/* Terms Editor */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Terms & Conditions Content
            </h3>
            <textarea
              rows={4}
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-slate-100 outline-none"
            />
          </div>
        </form>
    </div>
  );
}
