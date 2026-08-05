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
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Box className="w-6 h-6 text-[#F5C623]" /> Security Assets & Inventory Control
        </h1>
        <p className="text-xs text-white/55 mt-1">Track equipment allocations, body cameras, radios, and gear inventory.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-white/55 font-bold">Total Inventory</span>
          <div className="text-2xl font-black text-white mt-1">45 Units</div>
        </div>
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-[#F5C623] font-bold">Allocated In-Use</span>
          <div className="text-2xl font-black text-[#F5C623] mt-1">32 Units</div>
        </div>
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-emerald-400 font-bold">Available in Depot</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">13 Units</div>
        </div>
        <div className="trinetra-card p-5 rounded-xl">
          <span className="text-white/55 font-bold">Upcoming Demand</span>
          <div className="text-2xl font-black text-white mt-1">+15 Body Cams</div>
        </div>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">Asset Allocation List</h3>
        <div className="space-y-3 text-xs">
          {assets.map((ast) => (
            <div key={ast.id} className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="font-mono text-[#F5C623] font-bold">{ast.id}</span>
                <h5 className="font-bold text-white text-sm">{ast.name}</h5>
                <p className="text-white/55">Category: {ast.category}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold">{ast.status}</span>
                <p className="text-white/40 text-[10px]">Assigned: {ast.assignedTo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
