'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  MapPin,
  FileCheck,
  Building2,
  MoreVertical,
  X,
  Phone,
  Mail,
  Shield,
} from 'lucide-react';

interface ClientItem {
  id: string;
  name: string;
  type: string;
  city: string;
  contactPerson: string;
  phone: string;
  sites: number;
  contracts: number;
  status: 'Active' | 'Paused' | 'Pending';
  gstin: string;
}

const initialClients: ClientItem[] = [
  {
    id: 'cl1',
    name: 'DLF Cyber City Tech Park',
    type: 'Corporate',
    city: 'Gurgaon',
    contactPerson: 'Vikram Mehta',
    phone: '+91 98100 11223',
    sites: 4,
    contracts: 3,
    status: 'Active',
    gstin: '07AAAAA0000A1Z5',
  },
  {
    id: 'cl2',
    name: 'Max Super Speciality Hospital',
    type: 'Healthcare',
    city: 'Delhi',
    contactPerson: 'Dr. Ananya Sharma',
    phone: '+91 98200 22334',
    sites: 2,
    contracts: 2,
    status: 'Active',
    gstin: '07BBBBB1111B2Z4',
  },
  {
    id: 'cl3',
    name: 'Ambience Mall Gurgaon',
    type: 'Commercial',
    city: 'Gurgaon',
    contactPerson: 'Sanjay Kapoor',
    phone: '+91 98300 33445',
    sites: 1,
    contracts: 1,
    status: 'Active',
    gstin: '06CCCCC2222C3Z3',
  },
  {
    id: 'cl4',
    name: 'Hero MotoCorp Plant 2',
    type: 'Industrial',
    city: 'Dharuhera',
    contactPerson: 'Rajesh Singhania',
    phone: '+91 98400 44556',
    sites: 3,
    contracts: 2,
    status: 'Active',
    gstin: '06DDDDD3333D4Z2',
  },
  {
    id: 'cl5',
    name: 'The Palm Springs Gated Estate',
    type: 'Residential',
    city: 'Gurgaon',
    contactPerson: 'Col. Jasbir Singh',
    phone: '+91 98500 55667',
    sites: 1,
    contracts: 1,
    status: 'Active',
    gstin: '06EEEEE4444E5Z1',
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(initialClients);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Corporate',
    city: 'Gurgaon',
    contactPerson: '',
    phone: '',
    email: '',
    gstin: '',
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newClient: ClientItem = {
      id: `cl_${Date.now()}`,
      name: formData.name,
      type: formData.type,
      city: formData.city,
      contactPerson: formData.contactPerson || 'Operations Head',
      phone: formData.phone || '+91 98000 11111',
      sites: 1,
      contracts: 1,
      status: 'Active',
      gstin: formData.gstin || '06AAACC1234A1Z9',
    };

    setClients([newClient, ...clients]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      type: 'Corporate',
      city: 'Gurgaon',
      contactPerson: '',
      phone: '',
      email: '',
      gstin: '',
    });
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Clients
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Client account directory, active sites, security service contracts and billing contacts.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold text-xs transition shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add client</span>
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Total clients</span>
          <div className="text-2xl font-black text-white font-mono">{clients.length}</div>
          <div className="text-[11px] text-white/40">100% verified GSTIN</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Active clients</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">18</div>
          <div className="text-[11px] text-emerald-400">Retainer contracts live</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Sites</span>
          <div className="text-2xl font-black text-[#F5C623] font-mono">32</div>
          <div className="text-[11px] text-[#F5C623]">Guarded locations</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Contracts</span>
          <div className="text-2xl font-black text-white font-mono">14</div>
          <div className="text-[11px] text-white/40">₹18.42L monthly MRR</div>
        </div>
      </div>

      {/* Main Client Table */}
      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h3 className="font-bold text-white text-sm">Client directory</h3>
            <p className="text-xs text-white/40 mt-0.5">
              {clients.length} enterprise accounts
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client name, city, contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623]/60 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/32 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Client Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">City</th>
                <th className="py-3 px-3">Contact Person</th>
                <th className="py-3 px-3">Sites</th>
                <th className="py-3 px-3">Contracts</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredClients.map((cl) => (
                <tr key={cl.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white text-sm">{cl.name}</div>
                    <div className="text-[11px] text-white/40 font-mono">GSTIN: {cl.gstin}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] text-white/80 font-medium">
                      {cl.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-white/70">{cl.city}</td>
                  <td className="py-3 px-3">
                    <div className="text-white font-medium">{cl.contactPerson}</div>
                    <div className="text-[11px] font-mono text-white/40">{cl.phone}</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{cl.sites}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#F5C623]">
                    {cl.contracts}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {cl.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="p-1.5 rounded hover:bg-white/[0.06] text-white/50 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="trinetra-card w-full max-w-lg rounded-xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">Add New Client Account</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-white/70 font-medium">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DLF Cyber City Ltd"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Industry Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Vikram Mehta"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98100 11223"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-medium">GSTIN</label>
                <input
                  type="text"
                  placeholder="07AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white font-mono focus:outline-none"
                />
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
                  Save Client Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
