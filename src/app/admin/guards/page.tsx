'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Shield, Plus, Search, CheckCircle2, UserCheck, UserX } from 'lucide-react';

export default function GuardsManagerPage() {
  const [guards, setGuards] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuard, setNewGuard] = useState({
    name: '',
    phone: '',
    assignedSite: 'TechPark Sector 62',
    agency: 'Suraksha Direct Agency',
    status: 'Active',
  });

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    const res = await fetch(`/api/guards?search=${search}`);
    const data = await res.json();
    if (data.guards) setGuards(data.guards);
  };

  const handleAddGuard = async (e: React.FormEvent) => {
    e.preventDefault();
    const guardId = `SUR-G${Math.floor(8000 + Math.random() * 1000)}`;
    const res = await fetch('/api/guards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newGuard, guardId }),
    });
    const data = await res.json();
    if (data.success) {
      setShowAddModal(false);
      fetchGuards();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-400" /> Guard Roster & Status Management
            </h1>
            <p className="text-xs text-slate-400">Register new personnel, modify status, and assign sites.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" /> Register New Guard
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search guard by ID, name, or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 outline-none focus:border-amber-500"
          />
        </div>

        {/* Guards Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-amber-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-4">Guard ID</th>
                <th className="p-4">Officer Name</th>
                <th className="p-4">Assigned Site</th>
                <th className="p-4">Agency</th>
                <th className="p-4">Duty Status</th>
                <th className="p-4">Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {guards.map((g) => (
                <tr key={g._id || g.guardId} className="hover:bg-slate-850/50 transition">
                  <td className="p-4 font-mono font-bold text-amber-400">{g.guardId}</td>
                  <td className="p-4 font-bold text-white">{g.name}</td>
                  <td className="p-4 text-slate-300">{g.assignedSite}</td>
                  <td className="p-4 text-slate-400">{g.agency}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      g.status === 'On Duty' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">{g.onlineStatus || 'Online'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Guard Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-amber-400">Register Guard Candidate</h3>
              <form onSubmit={handleAddGuard} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300">Guard Name *</label>
                  <input type="text" required value={newGuard.name} onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-300">Phone Number *</label>
                  <input type="tel" required value={newGuard.phone} onChange={(e) => setNewGuard({ ...newGuard, phone: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-300">Assigned Site</label>
                  <input type="text" value={newGuard.assignedSite} onChange={(e) => setNewGuard({ ...newGuard, assignedSite: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl">Register Guard</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
