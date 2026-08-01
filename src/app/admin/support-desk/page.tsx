'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { HelpCircle, Mail, Loader2 } from 'lucide-react';

export default function SupportDeskAdminPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.tickets) setTickets(data.tickets);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen theme-app-bg font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold theme-app-heading flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#F5C623]" /> Website Help & Support Queries Desk
          </h1>
          <p className="text-xs theme-app-body">All customer inquiries submitted from the website contact form route dynamically to MongoDB here.</p>
        </div>

        <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F5C623]">Incoming Support Inquiries ({tickets.length})</h3>
          
          {loading ? (
            <div className="flex items-center justify-center p-12 theme-app-body text-xs gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading dynamic tickets from MongoDB database...
            </div>
          ) : tickets.length === 0 ? (
            <p className="text-xs theme-app-body text-center py-8">No tickets received yet. New submissions will appear here live.</p>
          ) : (
            <div className="space-y-4 text-xs">
              {tickets.map((t) => (
                <div key={t._id || t.ticketId} className="p-5 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#F5C623] font-bold">{t.ticketId}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Open' ? 'bg-[#F5C623]/20 text-[#F5C623]' : 'bg-emerald-500/20 text-emerald-500'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h5 className="font-bold theme-app-heading text-sm">{t.subject}</h5>
                  <p className="theme-app-body theme-app-card p-3 rounded-xl border border-slate-200 dark:border-slate-800">&quot;{t.message}&quot;</p>
                  <div className="flex items-center justify-between text-[11px] theme-app-body pt-1">
                    <span>From: <strong className="theme-app-heading">{t.fullName}</strong> ({t.email} {t.phone ? `| ${t.phone}` : ''})</span>
                    <span>Received: {new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
