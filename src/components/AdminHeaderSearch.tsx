'use client';

import React, { useState } from 'react';
import { Search, Filter, Shield, FileCheck, Users, AlertTriangle, X, Boxes, Briefcase, Building2, HelpCircle, DollarSign, Globe, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeaderSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);

  // Global Search Index covering ALL modules in the application
  const globalIndex = [
    // Guards
    { type: 'Guard', id: 'SUR-G8841', name: 'Vikram Singh (On Duty Guard)', site: 'TechPark Alpha Tower B', status: 'On Duty', link: '/admin/guards' },
    { type: 'Guard', id: 'SUR-G8842', name: 'Rajesh Kumar (Active Guard)', site: 'Metro Heights Mall', status: 'Active', link: '/admin/guards' },
    { type: 'Guard', id: 'SUR-G8843', name: 'Sunil Sharma (On Patrol)', site: 'Apex Industrial Estate', status: 'On Patrol', link: '/admin/guards' },

    // B2B Tenders
    { type: 'Tender', id: 'TND-2026-001', name: 'Global Tech Park 2-Yr Guard Tender', site: 'Global Tech Park Ltd (45 Guards)', status: 'Active', link: '/admin/tenders' },
    { type: 'Tender', id: 'TND-2026-002', name: 'Express Logistics 1-Yr Perimeter Guard Tender', site: 'Express Logistics Corp (20 Guards)', status: 'Active', link: '/admin/tenders' },

    // Users & Subscribers
    { type: 'User', id: 'USR-001', name: 'Amit Chavda (Super Admin)', site: 'chavdaamit1011@gmail.com', status: 'Superadmin', link: '/admin/users' },
    { type: 'User', id: 'USR-002', name: 'Kalpit Sharma (Operations Director)', site: 'kalpit@suraksha.com', status: 'Admin', link: '/admin/users' },

    // Emergency Incidents
    { type: 'Incident', id: 'INC-2026-881', name: 'Unauthorized Parking Access Attempt', site: 'Metro Heights Mall Gate 2', status: 'Resolved', link: '/admin/incidents' },

    // Asset Inventory
    { type: 'Asset', id: 'AST-BC-101', name: '4K Tactical Body Camera #88', site: 'Assigned to Vikram Singh', status: 'In Use', link: '/admin/assets' },
    { type: 'Asset', id: 'AST-WT-204', name: 'Long Range UHF Walkie Talkie #12', site: 'Assigned to Vikram Singh', status: 'In Use', link: '/admin/assets' },

    // Sales Leads
    { type: 'Lead', id: 'LED-2026-101', name: 'Sunrise Hospitals 15-Guard Lead', site: 'Dr. R. K. Mehta (B2B Tender)', status: 'Proposal Sent', link: '/admin/sales-leads' },

    // Branch Offices
    { type: 'Branch', id: 'BRN-DL-01', name: 'Delhi NCR Headquarters Branch', site: 'Sector 62, Noida', status: 'Active HQ', link: '/admin/branches' },

    // Support Queries
    { type: 'Support', id: 'TCK-881901', name: 'Requirement for 10 Guards Query', site: 'Rajiv Malhotra (Global Tech)', status: 'Open', link: '/admin/support-desk' },

    // Finance & Payroll Invoices
    { type: 'Invoice', id: 'INV-2026-091', name: 'Global Tech Park Monthly B2B Invoice', site: '₹ 12,33,333 / Month', status: 'Paid', link: '/admin/payroll' },

    // CMS & System Settings
    { type: 'CMS', id: 'CMS-SEC-01', name: 'Website Hero Text & Logo Path CMS', site: 'Website CMS Manager', status: 'Live Published', link: '/admin/cms' },
  ];

  const results = globalIndex.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase()) ||
      item.site.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category === 'All' || item.type === category;
    const matchesStatus = statusFilter === 'All' || item.status.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesQuery && matchesCategory && matchesStatus;
  });

  return (
    <div className="relative w-full max-w-2xl font-sans">
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 focus-within:border-amber-500/60 rounded-2xl px-3.5 py-2 shadow-inner">
        <Search className="w-4 h-4 text-amber-400 shrink-0" />
        <input
          type="text"
          placeholder="Global System Search (Guards, Tenders, Users, Assets, Leads, Invoices, CMS)..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-amber-400 font-bold outline-none cursor-pointer"
        >
          <option value="All">All System Modules</option>
          <option value="Guard">Guards</option>
          <option value="Tender">Tenders</option>
          <option value="User">Users</option>
          <option value="Incident">Incidents</option>
          <option value="Asset">Assets</option>
          <option value="Lead">Sales Leads</option>
          <option value="Invoice">Invoices</option>
          <option value="Support">Support Desk</option>
        </select>

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 font-semibold outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active / On Duty</option>
          <option value="Paid">Paid Invoices</option>
          <option value="Resolved">Resolved</option>
        </select>

        {query && (
          <button onClick={() => setQuery('')} className="text-slate-400 hover:text-rose-400 p-0.5">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Real-time Global Search Dropdown */}
      {isOpen && query && (
        <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-amber-500/40 rounded-2xl p-3 shadow-2xl z-50 max-h-88 overflow-y-auto animate-fadeIn text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase">
            <span>Global Matching Records ({results.length})</span>
            <button onClick={() => setIsOpen(false)} className="text-amber-400 hover:underline">Close</button>
          </div>

          {results.length > 0 ? (
            results.map((res, i) => (
              <Link
                key={i}
                href={res.link}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-amber-500/40 hover:bg-slate-850 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-400 font-bold text-[11px]">{res.id}</span>
                    <span className="text-white font-bold">{res.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{res.site}</span>
                </div>

                <span className="text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {res.type}: {res.status}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-slate-400 text-xs">No matching system record found for &quot;{query}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
}
