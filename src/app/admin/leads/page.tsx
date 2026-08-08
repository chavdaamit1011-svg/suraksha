'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Plus,
  Loader2,
  Search,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  User,
  Building,
  FileText,
  AlertCircle,
} from 'lucide-react';

export default function WebsiteAdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [newLead, setNewLead] = useState({
    clientName: '',
    contactPerson: '',
    phone: '',
    email: '',
    source: 'Website Contact Form',
    leadType: 'Unarmed Security Guards',
    notes: '',
  });

  useEffect(() => {
    fetchLeads();
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') fetchLeads();
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.leads && data.leads.length > 0) {
        setLeads(data.leads);
      } else {
        // Mock default website form submissions if DB is empty
        setLeads([
          {
            _id: '1',
            leadId: 'QRY-2026-104',
            clientName: 'DLF Cyber City Ltd',
            contactPerson: 'Rajesh Sharma',
            phone: '+91 98101 22334',
            email: 'rajesh.sharma@dlf.in',
            source: 'Guard Booking Form',
            leadType: 'Armed Escort & VIP Protection',
            notes: 'Requirement for 2 Armed Officers for Night Shift escalation.',
            status: 'Under Review',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '2',
            leadId: 'QRY-2026-103',
            clientName: 'TechPark Alpha',
            contactPerson: 'Priya Malhotra',
            phone: '+91 98711 55443',
            email: 'priya@techpark.com',
            source: 'Website Contact Form',
            leadType: 'Unarmed Security Guards',
            notes: 'Need 10 24x7 security personnel for corporate IT park deployment.',
            status: 'Contacted',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          },
          {
            _id: '3',
            leadId: 'QRY-2026-102',
            clientName: 'Gupta Enterprises',
            contactPerson: 'Anil Gupta',
            phone: '+91 99100 88776',
            email: 'anil@guptagroup.org',
            source: 'Quote Request Form',
            leadType: 'Event Security Command',
            notes: 'Single-day event security cover for 500+ guests in New Delhi.',
            status: 'Closed / Won',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      }
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
        setNewLead({
          clientName: '',
          contactPerson: '',
          phone: '',
          email: '',
          source: 'Website Contact Form',
          leadType: 'Unarmed Security Guards',
          notes: '',
        });
      }
    } catch (err) {
      alert('Error logging lead');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (e) {
      alert('Error updating lead status');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry lead?')) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (e) {
      alert('Error deleting lead');
    }
  };

  const filteredLeads = leads.filter((lead) =>
    `${lead.leadId} ${lead.clientName} ${lead.contactPerson} ${lead.phone} ${lead.email} ${lead.source} ${lead.leadType} ${lead.status}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" /> SURAKSHA WEBSITE FORM INQUIRIES
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Public Website Form Queries & Leads
          </h1>
          <p className="text-xs text-slate-400">
            Real-time inquiries submitted via contact, booking, and quote forms on surakshaguards.in
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="trust-yellow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg uppercase tracking-wider shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Manual Form Query
        </button>
      </div>

      {/* Leads Table / Card Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <h3 className="text-sm font-bold text-[#F5C623] flex items-center gap-2">
            Recorded Form Leads ({filteredLeads.length})
          </h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID, name, email or service..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 text-white border border-slate-800 outline-none focus:border-[#F5C623] transition w-full sm:w-72"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Syncing website inquiries from DB...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center p-12 text-slate-400 text-xs space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <p>No form queries found matching your search term.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((l) => (
              <div
                key={l._id || l.leadId}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#F5C623] font-bold bg-[#F5C623]/10 px-2.5 py-1 rounded border border-[#F5C623]/30">
                      {l.leadId || 'QRY-2026'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{l.clientName || l.contactPerson}</h4>
                      <p className="text-[11px] text-slate-400">Contact: {l.contactPerson}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#F5C623] bg-[#F5C623]/10 px-3 py-1 rounded-full border border-[#F5C623]/30 self-start sm:self-auto">
                    {l.status || 'Received'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#F5C623]" />
                    <span>{l.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#F5C623]" />
                    <span>{l.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#F5C623]" />
                    <span>{l.leadType || 'Guard Request'}</span>
                  </div>
                </div>

                {l.notes && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                    "{l.notes}"
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Source: {l.source || 'Website Form'}</span>

                  <div className="flex items-center gap-3">
                    <select
                      value={l.status || 'Under Review'}
                      onChange={(e) => handleUpdateStatus(l._id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold outline-none text-xs"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed / Won">Closed / Won</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <a
                      href={`mailto:${l.email}`}
                      className="text-[#F5C623] hover:underline font-bold flex items-center gap-1"
                    >
                      Reply <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handleDeleteLead(l._id)}
                      className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                      title="Delete Lead"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F5C623]" /> Log Website Form Inquiries
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-xs font-bold">
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Company / Organization Name</label>
                <input
                  required
                  value={newLead.clientName}
                  onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })}
                  placeholder="Enter Organization Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Contact Person</label>
                  <input
                    required
                    value={newLead.contactPerson}
                    onChange={(e) => setNewLead({ ...newLead, contactPerson: e.target.value })}
                    placeholder="Enter Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Mobile Number</label>
                  <input
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Inquiry Details / Message</label>
                <textarea
                  rows={3}
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Enter details about guard requirement..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <button
                type="submit"
                className="w-full trust-yellow-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Save Website Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
