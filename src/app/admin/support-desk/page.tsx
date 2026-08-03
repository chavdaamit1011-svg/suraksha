'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { HelpCircle, Loader2, CheckCircle2, Search } from 'lucide-react';

export default function SupportDeskAdminPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchTickets();
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') fetchTickets();
    }, 5000);
    return () => window.clearInterval(timer);
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

  const updateTicket = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (data.success) setTickets((current) => current.map((ticket) => ticket._id === id ? data.ticket : ticket));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const text = `${ticket.ticketId} ${ticket.fullName} ${ticket.companyName || ''} ${ticket.email} ${ticket.subject} ${ticket.message}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (statusFilter === 'All' || ticket.status === statusFilter);
  });

  return (
    <div className="flex min-h-screen theme-app-bg font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold theme-app-heading flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#F5C623]" /> Website Contact Leads & Support Desk
          </h1>
          <p className="text-xs theme-app-body">All website contact inquiries are saved here and auto-sync every 5 seconds. Mark each lead as in progress or resolved after follow-up.</p>
        </div>

        <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between"><h3 className="text-sm font-bold text-[#F5C623]">Incoming Support Inquiries ({filteredTickets.length})</h3><div className="flex gap-2"><div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search contact leads..." className="pl-9 pr-3 py-2 rounded-xl text-xs theme-app-bg border border-slate-300 dark:border-slate-800 outline-none" /></div><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl text-xs theme-app-bg border border-slate-300 dark:border-slate-800 px-2 outline-none"><option>All</option><option>Open</option><option>In Progress</option><option>Resolved</option></select></div></div>
          
          {loading ? (
            <div className="flex items-center justify-center p-12 theme-app-body text-xs gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading dynamic tickets from MongoDB database...
            </div>
          ) : filteredTickets.length === 0 ? (
            <p className="text-xs theme-app-body text-center py-8">No matching contact leads found.</p>
          ) : (
            <div className="space-y-4 text-xs">
              {filteredTickets.map((t) => (
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] theme-app-body pt-1">
                    <span>From: <strong className="theme-app-heading">{t.fullName}</strong>{t.companyName ? ` · ${t.companyName}` : ''} ({t.email} {t.phone ? `| ${t.phone}` : ''})</span>
                    <div className="flex items-center gap-3"><span>Received: {new Date(t.createdAt).toLocaleDateString()}</span>
                      {t.status !== 'Resolved' && <button onClick={() => updateTicket(t._id, t.status === 'Open' ? 'In Progress' : 'Resolved')} className="text-emerald-500 font-bold flex items-center gap-1 hover:underline"><CheckCircle2 className="w-4 h-4" /> {t.status === 'Open' ? 'Start follow-up' : 'Mark resolved'}</button>}
                    </div>
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
