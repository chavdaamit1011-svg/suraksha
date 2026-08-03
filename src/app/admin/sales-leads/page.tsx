'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { PhoneForwarded, Plus, Loader2, Search } from 'lucide-react';

export default function SalesLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [newLead, setNewLead] = useState({
    clientName: '',
    contactPerson: '',
    phone: '',
    email: '',
    source: 'Call',
    leadType: 'B2B Tender',
    notes: '',
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchLeads();
        setNewLead({ clientName: '', contactPerson: '', phone: '', email: '', source: 'Call', leadType: 'B2B Tender', notes: '' });
      }
    } catch (err) {
      alert('Error creating lead');
    }
  };

  const filteredLeads = leads.filter((lead) => `${lead.leadId} ${lead.clientName} ${lead.contactPerson} ${lead.phone} ${lead.email} ${lead.source} ${lead.leadType} ${lead.status}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex min-h-screen theme-app-bg font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold theme-app-heading flex items-center gap-2">
              <PhoneForwarded className="w-6 h-6 text-[#F5C623]" /> Sales & Field Leads Logger Desk
            </h1>
            <p className="text-xs theme-app-body">Live dynamic database of customer inquiries and website bookings.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="trust-yellow-btn px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Log New Lead
          </button>
        </div>

        <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between"><h3 className="text-sm font-bold text-[#F5C623]">Logged Leads Roster ({filteredLeads.length})</h3><div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sales leads..." className="pl-9 pr-3 py-2 rounded-xl text-xs theme-app-bg border border-slate-300 dark:border-slate-800 outline-none" /></div></div>
          
          {loading ? (
            <div className="flex items-center justify-center p-12 theme-app-body text-xs gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading dynamic leads from database...
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              {filteredLeads.map((l) => (
                <div key={l._id || l.leadId} className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[#F5C623] font-bold">{l.leadId}</span>
                    <h5 className="font-bold theme-app-heading text-sm">{l.clientName}</h5>
                    <p className="theme-app-body">Contact: {l.contactPerson} ({l.phone}) • Source: {l.source}</p>
                    {l.notes && <p className="text-[11px] text-slate-400 mt-1 italic">{l.notes}</p>}
                  </div>
                  <div className="text-right">
                    <span className="text-[#F5C623] font-bold">{l.leadType}</span>
                    <p className="text-emerald-500 text-[10px] uppercase font-bold">{l.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Lead Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md theme-app-card border border-[#F5C623]/30 rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-bold text-[#F5C623]">Log Sales Lead</h3>
              <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold theme-app-heading">Client / Company Name *</label>
                  <input type="text" required value={newLead.clientName} onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                </div>
                <div>
                  <label className="font-bold theme-app-heading">Contact Person *</label>
                  <input type="text" required value={newLead.contactPerson} onChange={(e) => setNewLead({ ...newLead, contactPerson: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                </div>
                <div>
                  <label className="font-bold theme-app-heading">Phone Number *</label>
                  <input type="tel" required value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold theme-app-heading">Lead Source</label>
                    <select value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none">
                      <option value="Call">Call Inquiry</option>
                      <option value="Face to Face">Face to Face Meeting</option>
                      <option value="Website Book Guard Form">Website Contact</option>
                      <option value="Referral">Referral</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold theme-app-heading">Lead Target</label>
                    <select value={newLead.leadType} onChange={(e) => setNewLead({ ...newLead, leadType: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none">
                      <option value="B2B Tender">B2B Tender Contract</option>
                      <option value="Individual Guard">Individual Guarding</option>
                      <option value="Agency Contract">Agency Partnership</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 trust-yellow-btn py-3 rounded-xl uppercase tracking-wider">Save Lead</button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-3 theme-app-bg border border-slate-300 dark:border-slate-800 theme-app-body font-bold rounded-xl">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
