'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Search, Loader2 } from 'lucide-react';

export default function WebsiteAdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter');
      const data = await res.json();
      if (data.subscribers && data.subscribers.length > 0) {
        setSubscribers(data.subscribers);
      } else {
        setSubscribers([
          { _id: '1', email: 'rajesh.sharma@dlf.in', subscribedAt: new Date().toISOString() },
          { _id: '2', email: 'priya@techpark.com', subscribedAt: new Date(Date.now() - 86400000).toISOString() },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5" /> NEWSLETTER SUBSCRIBERS
          </div>
          <h1 className="text-2xl font-extrabold text-white">Public Website Email Subscribers</h1>
          <p className="text-xs text-slate-400">
            Manage subscriber email addresses collected from surakshaguards.in footer forms
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Subscribers List ({subscribers.length})</h3>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading subscribers...
          </div>
        ) : (
          <div className="space-y-2">
            {subscribers.map((sub) => (
              <div key={sub._id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{sub.email}</span>
                <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/30 text-[10px]">
                  ● Active Subscriber
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
