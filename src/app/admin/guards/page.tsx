'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Phone,
  MapPin,
  FileCheck,
  UserCheck,
  Star,
  Sparkles,
  Loader2,
} from 'lucide-react';

export default function WebsiteAdminGuardsPage() {
  const [guards, setGuards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/guards');
      const data = await res.json();
      if (data.guards && data.guards.length > 0) {
        setGuards(data.guards);
      } else {
        setGuards([
          {
            _id: '1',
            guardId: 'SUR-G8841',
            name: 'Vikram Singh',
            phone: '+91 98112 00112',
            type: 'Senior Armed Officer',
            status: 'On Duty',
            assignedSite: 'TechPark Alpha - Gate 1',
            city: 'Gurgaon',
            verified: true,
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
          },
          {
            _id: '2',
            guardId: 'SUR-G8842',
            name: 'Ramesh Kumar',
            phone: '+91 98112 00113',
            type: 'Unarmed Security Guard',
            status: 'On Duty',
            assignedSite: 'DLF Cyber City - Tower B',
            city: 'Noida',
            verified: true,
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
          },
          {
            _id: '3',
            guardId: 'SUR-G8843',
            name: 'Sunil Verma',
            phone: '+91 98112 00114',
            type: 'Event Security Command',
            status: 'Active',
            assignedSite: 'Main Convention Hub',
            city: 'New Delhi',
            verified: true,
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuards = guards.filter((g) =>
    `${g.name} ${g.guardId} ${g.type} ${g.assignedSite} ${g.city}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" /> PUBLIC WEBSITE GUARDS CATALOG
          </div>
          <h1 className="text-2xl font-extrabold text-white">Featured Security Personnel Showcase</h1>
          <p className="text-xs text-slate-400">
            Manage personnel profiles, police verification status, and on-duty deployment catalog shown on surakshaguards.in
          </p>
        </div>
      </div>

      {/* Guards Roster Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <h3 className="text-sm font-bold text-[#F5C623]">Active Guard Roster ({filteredGuards.length})</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guards by name, ID or site..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 text-white border border-slate-800 outline-none focus:border-[#F5C623] transition w-full sm:w-72"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading guard roster...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuards.map((g) => (
              <div
                key={g._id || g.guardId}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={g.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'}
                    alt={g.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-[#F5C623] font-bold">{g.guardId}</span>
                    <h4 className="text-sm font-bold text-white">{g.name}</h4>
                    <p className="text-[11px] text-slate-400">{g.type || 'Security Guard'}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-300 border-t border-b border-slate-800/80 py-2">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F5C623]" /> {g.assignedSite || 'Main Facility'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#F5C623]" /> {g.phone || '+91 98765 43210'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/30 text-[10px]">
                    ● {g.status || 'Active'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Police Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
