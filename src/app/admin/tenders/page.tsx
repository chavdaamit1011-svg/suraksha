'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { FileCheck, Plus, Building, Loader2 } from 'lucide-react';

export default function TendersManagerPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTender, setNewTender] = useState({
    title: '',
    clientCompany: '',
    durationYears: 1,
    guardsRequired: 20,
    annualValue: '₹ 60 Lakhs / Year',
  });

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tenders');
      const data = await res.json();
      if (data.tenders) setTenders(data.tenders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTender = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tenders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTender),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        fetchTenders();
        setNewTender({ title: '', clientCompany: '', durationYears: 1, guardsRequired: 20, annualValue: '₹ 60 Lakhs / Year' });
      }
    } catch (err) {
      alert('Error creating tender');
    }
  };

  return (
    <div className="flex min-h-screen theme-app-bg font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold theme-app-heading flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-[#F5C623]" /> B2B Tender Contract Management
            </h1>
            <p className="text-xs theme-app-body">Manage multi-year guard tenders dynamically connected to MongoDB.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="trust-yellow-btn px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Create B2B Tender
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 theme-app-body text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading dynamic tenders from MongoDB database...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenders.map((t) => (
              <div key={t._id || t.tenderId} className="theme-app-card border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#F5C623] font-bold bg-[#F5C623]/10 px-3 py-1 rounded-full border border-[#F5C623]/30">
                    ID: {t.tenderId}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    {t.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold theme-app-heading">{t.title}</h3>
                  <p className="text-xs theme-app-body mt-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#F5C623]" /> Client: {t.clientCompany}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 theme-app-bg p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs">
                  <div>
                    <span className="theme-app-body text-[10px]">Guards Unit</span>
                    <div className="font-bold text-[#F5C623] mt-0.5">{t.guardsRequired} Guards</div>
                  </div>
                  <div>
                    <span className="theme-app-body text-[10px]">Duration</span>
                    <div className="font-bold theme-app-heading mt-0.5">{t.durationYears} Year(s)</div>
                  </div>
                  <div>
                    <span className="theme-app-body text-[10px]">Annual Value</span>
                    <div className="font-bold text-emerald-500 mt-0.5">{t.annualValue}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Tender Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md theme-app-card border border-[#F5C623]/30 rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-bold text-[#F5C623]">Register B2B Guard Tender</h3>
              <form onSubmit={handleCreateTender} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold theme-app-heading">Tender Title *</label>
                  <input type="text" required value={newTender.title} onChange={(e) => setNewTender({ ...newTender, title: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                </div>
                <div>
                  <label className="font-bold theme-app-heading">Client Organization *</label>
                  <input type="text" required value={newTender.clientCompany} onChange={(e) => setNewTender({ ...newTender, clientCompany: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold theme-app-heading">Guards Needed</label>
                    <input type="number" value={newTender.guardsRequired} onChange={(e) => setNewTender({ ...newTender, guardsRequired: parseInt(e.target.value) })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                  </div>
                  <div>
                    <label className="font-bold theme-app-heading">Duration (Years)</label>
                    <select value={newTender.durationYears} onChange={(e) => setNewTender({ ...newTender, durationYears: parseInt(e.target.value) })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none">
                      <option value={1}>1 Year</option>
                      <option value={2}>2 Years</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold theme-app-heading">Annual Contract Value</label>
                  <input type="text" value={newTender.annualValue} onChange={(e) => setNewTender({ ...newTender, annualValue: e.target.value })} className="w-full mt-1 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl p-3 theme-app-heading outline-none" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 trust-yellow-btn py-3 rounded-xl uppercase tracking-wider">Save Tender</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-3 theme-app-bg border border-slate-300 dark:border-slate-800 theme-app-body font-bold rounded-xl">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
