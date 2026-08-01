'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Box, Plus, ShieldCheck } from 'lucide-react';

export default function AssetManagerPage() {
  const [assets, setAssets] = useState([
    { id: 'AST-BC-101', name: '4K Tactical Body Camera', category: 'Surveillance', status: 'In Use', assignedTo: 'Vikram Singh (SUR-G8841)' },
    { id: 'AST-WT-204', name: 'Long Range UHF Walkie Talkie', category: 'Communication', status: 'In Use', assignedTo: 'Vikram Singh (SUR-G8841)' },
    { id: 'AST-MD-309', name: 'Handheld Metal Detector Wand', category: 'Tactical Gear', status: 'In Use', assignedTo: 'Rajesh Kumar (SUR-G8842)' },
    { id: 'AST-VT-401', name: 'Kevlar Reinforced Tactical Vest', category: 'Armor & Uniform', status: 'Available', assignedTo: 'Unassigned' },
  ]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Box className="w-6 h-6 text-amber-400" /> Security Assets & Inventory Control
          </h1>
          <p className="text-xs text-slate-400">Track equipment allocations, body cameras, radios, and future gear demands.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-slate-400 font-bold">Total Inventory</span>
            <div className="text-2xl font-black text-white mt-1">45 Units</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-amber-400 font-bold">Allocated In-Use</span>
            <div className="text-2xl font-black text-amber-400 mt-1">32 Units</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-emerald-400 font-bold">Available in Depot</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">13 Units</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-purple-400 font-bold">Upcoming Demand</span>
            <div className="text-2xl font-black text-purple-400 mt-1">+15 Body Cams</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">Asset Allocation List</h3>
          <div className="space-y-3 text-xs">
            {assets.map((ast) => (
              <div key={ast.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-amber-400 font-bold">{ast.id}</span>
                  <h5 className="font-bold text-white text-sm">{ast.name}</h5>
                  <p className="text-slate-400">Category: {ast.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">{ast.status}</span>
                  <p className="text-slate-400 text-[10px]">Assigned: {ast.assignedTo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
