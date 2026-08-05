'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Building2,
  Phone,
  MapPin,
  Shield,
  FileCheck,
  UserCheck,
} from 'lucide-react';

interface GuardItem {
  id: string;
  name: string;
  empId: string;
  city: string;
  type: string;
  branch: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  wage: string;
  pvStatus: 'PV Done' | 'PV Pending';
  trained: boolean;
  phone?: string;
}

const initialGuards: GuardItem[] = [
  {
    id: '1',
    name: 'Rohit Singh',
    empId: 'GRD-2041',
    city: 'Gurgaon',
    type: 'Gate Guard',
    branch: 'Gurgaon Central',
    status: 'Active',
    wage: '₹22,500',
    pvStatus: 'PV Done',
    trained: true,
    phone: '+91 98112 34567',
  },
  {
    id: '2',
    name: 'Imran Khan',
    empId: 'GRD-2042',
    city: 'Noida',
    type: 'Patrol Guard',
    branch: 'Noida Ops',
    status: 'Active',
    wage: '₹24,000',
    pvStatus: 'PV Pending',
    trained: true,
    phone: '+91 98223 45678',
  },
  {
    id: '3',
    name: 'Vikramaditya Sharma',
    empId: 'GRD-1090',
    city: 'Delhi',
    type: 'Bodyguard',
    branch: 'Delhi North',
    status: 'Active',
    wage: '₹45,000',
    pvStatus: 'PV Done',
    trained: true,
    phone: '+91 98334 56789',
  },
  {
    id: '4',
    name: 'Suresh Kumar',
    empId: 'GRD-1823',
    city: 'Gurgaon',
    type: 'SME Guard',
    branch: 'Gurgaon Central',
    status: 'Active',
    wage: '₹21,000',
    pvStatus: 'PV Done',
    trained: false,
    phone: '+91 98445 67890',
  },
  {
    id: '5',
    name: 'Balwant Singh',
    empId: 'GRD-1502',
    city: 'Delhi',
    type: 'Bouncer',
    branch: 'Delhi North',
    status: 'Active',
    wage: '₹35,000',
    pvStatus: 'PV Done',
    trained: true,
    phone: '+91 98556 78901',
  },
  {
    id: '6',
    name: 'Dinesh Prasad',
    empId: 'GRD-2104',
    city: 'Noida',
    type: 'Gate Guard',
    branch: 'Noida Ops',
    status: 'On Leave',
    wage: '₹22,000',
    pvStatus: 'PV Pending',
    trained: true,
    phone: '+91 98667 89012',
  },
];

export default function GuardsPage() {
  const [guards, setGuards] = useState<GuardItem[]>(initialGuards);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState<GuardItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Gate Guard',
    city: 'Gurgaon',
    experience: '2',
    wage: '22500',
  });

  const handleCreateGuard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newGuard: GuardItem = {
      id: String(Date.now()),
      name: formData.name,
      empId: `GRD-${Math.floor(2000 + Math.random() * 900)}`,
      city: formData.city,
      type: formData.type,
      branch: `${formData.city} Ops`,
      status: 'Active',
      wage: `₹${Number(formData.wage).toLocaleString('en-IN')}`,
      pvStatus: 'PV Pending',
      trained: true,
      phone: formData.phone || '+91 99999 00000',
    };

    setGuards([newGuard, ...guards]);
    setIsAddModalOpen(false);
    setFormData({ name: '', phone: '', type: 'Gate Guard', city: 'Gurgaon', experience: '2', wage: '22500' });
  };

  const filteredGuards = guards.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.empId.toLowerCase().includes(search.toLowerCase()) ||
      g.city.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || g.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guards
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Your deployed workforce — employment status, wages, verification and training.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="trinetra-btn-primary flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold text-xs transition shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add guard</span>
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Active guards</span>
          <div className="text-2xl font-black text-white font-mono">{guards.length}</div>
          <div className="text-[11px] text-[#F5C623]">231 currently deployed</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">On duty now</span>
          <div className="text-2xl font-black text-[#10B981] font-mono">186</div>
          <div className="text-[11px] text-emerald-400">Live active posts</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Police verified</span>
          <div className="text-2xl font-black text-white font-mono">218</div>
          <div className="text-[11px] text-white/40">88.7% clearance rate</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Trained</span>
          <div className="text-2xl font-black text-white font-mono">242</div>
          <div className="text-[11px] text-white/40">PSARA certified</div>
        </div>
      </div>

      {/* Main Roster Card */}
      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h3 className="font-bold text-white text-sm">Guard roster</h3>
            <p className="text-xs text-white/40 mt-0.5">
              {guards.length} guards on the books
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, ID, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623]/60 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/32 focus:outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#111316] border border-white/[0.08] text-xs text-white/80 rounded-md px-3 py-1.5 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Gate Guard">Gate Guard</option>
              <option value="Bouncer">Bouncer</option>
              <option value="Bodyguard">Bodyguard</option>
              <option value="Patrol Guard">Patrol Guard</option>
              <option value="SME Guard">SME Guard</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Guard</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Branch</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Monthly Wage</th>
                <th className="py-3 px-3">Verification</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredGuards.map((g) => (
                <tr key={g.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F5C623]/10 border border-[#F5C623]/30 text-[#F5C623] font-bold text-xs flex items-center justify-center shrink-0">
                        {g.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-white">{g.name}</div>
                        <div className="text-[11px] text-white/40">
                          {g.empId} · {g.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-white/80 font-medium">
                      {g.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-white/70">{g.branch}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        g.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{g.wage}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          g.pvStatus === 'PV Done'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {g.pvStatus}
                      </span>
                      {g.trained ? (
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-white/60 text-[10px]">
                          Trained
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-white/40 text-[10px]">
                          Untrained
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedGuard(g)}
                      className="p-1.5 rounded hover:bg-white/[0.06] text-white/50 hover:text-white"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guard Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="trinetra-card w-full max-w-lg rounded-xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">Add New Guard</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGuard} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-white/70 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Guard Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Gate Guard">Gate Guard</option>
                    <option value="Bouncer">Bouncer</option>
                    <option value="Bodyguard">Bodyguard</option>
                    <option value="Patrol Guard">Patrol Guard</option>
                    <option value="SME Guard">SME Guard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Experience (Yrs)</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Monthly Wage (₹)</label>
                  <input
                    type="number"
                    value={formData.wage}
                    onChange={(e) => setFormData({ ...formData, wage: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/70 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold"
                >
                  Save Guard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Guard Detail Drawer */}
      {selectedGuard && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111316] border-l border-white/[0.08] p-6 space-y-6 overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">Guard Profile</h3>
              <button onClick={() => setSelectedGuard(null)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5C623]/20 text-[#F5C623] font-bold text-lg flex items-center justify-center">
                  {selectedGuard.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{selectedGuard.name}</h4>
                  <div className="text-white/40">{selectedGuard.empId} · {selectedGuard.type}</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#1E1F22] border border-white/[0.08] space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/55">Status:</span>
                  <span className="text-emerald-400 font-bold">{selectedGuard.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Branch:</span>
                  <span className="text-white">{selectedGuard.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Monthly Wage:</span>
                  <span className="text-white font-mono font-bold">{selectedGuard.wage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Police Verification:</span>
                  <span className="text-[#F5C623]">{selectedGuard.pvStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Phone:</span>
                  <span className="text-white font-mono">{selectedGuard.phone}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedGuard(null)}
                className="w-full py-2 rounded-md bg-[#F5C623] text-[#0B0D0F] font-bold text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
