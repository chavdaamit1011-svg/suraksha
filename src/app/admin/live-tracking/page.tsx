'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { MapPin, Search, Shield, Box, Activity, Battery, Radio } from 'lucide-react';

export default function LiveTrackingPage() {
  const [searchId, setSearchId] = useState('SUR-G8841');
  const [selectedGuard, setSelectedGuard] = useState<any>({
    guardId: 'SUR-G8841',
    name: 'Vikram Singh',
    phone: '+91 98112 00112',
    status: 'On Duty',
    assignedSite: 'TechPark Alpha - Tower B',
    location: 'TechPark Sector 62, Noida (Lat: 28.6139, Lng: 77.2090)',
    assets: ['Body Cam 4K #88', 'Long-Range Radio #12', 'Bulletproof Vest V2'],
    battery: '94%',
    lastCheckIn: '2 Mins Ago',
  });

  const sampleGuards: Record<string, any> = {
    'SUR-G8841': {
      guardId: 'SUR-G8841',
      name: 'Vikram Singh',
      phone: '+91 98112 00112',
      status: 'On Duty',
      assignedSite: 'TechPark Alpha - Tower B',
      location: 'TechPark Sector 62, Noida (Lat: 28.6139, Lng: 77.2090)',
      assets: ['Body Cam 4K #88', 'Long-Range Radio #12', 'Bulletproof Vest V2'],
      battery: '94%',
      lastCheckIn: '2 Mins Ago',
    },
    'SUR-G8842': {
      guardId: 'SUR-G8842',
      name: 'Rajesh Kumar',
      phone: '+91 98112 00113',
      status: 'Active Patrol',
      assignedSite: 'Metro Heights Mall',
      location: 'Metro Station Plaza, Gate 3 (Lat: 28.5355, Lng: 77.3910)',
      assets: ['Metal Detector Wand', 'Heavy Tactical Flashlight'],
      battery: '88%',
      lastCheckIn: '5 Mins Ago',
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (sampleGuards[query]) {
      setSelectedGuard(sampleGuards[query]);
    } else {
      setSelectedGuard({
        guardId: query,
        name: 'Officer Found via GPS Search',
        phone: '+91 98000 11111',
        status: 'Active Duty',
        assignedSite: 'Apex Industrial Checkpoint 4',
        location: 'Industrial Corridor Sector 12 (Lat: 28.7041, Lng: 77.1025)',
        assets: ['Standard Radio #09', 'Guard Baton'],
        battery: '90%',
        lastCheckIn: 'Just Now',
      });
    }
  };

  return (
    <div className="space-y-6 font-sans">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-400" /> Live Guard GPS Tracking & Inspection Desk
          </h1>
          <p className="text-xs text-slate-400">Search guard by unique ID to inspect real-time location, site deployment, and allocated assets.</p>
        </div>

        {/* Unique Guard ID Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search Guard Unique ID (e.g. SUR-G8841)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-slate-900 border border-amber-500/40 rounded-xl pl-10 pr-4 py-3 text-xs text-amber-300 font-mono font-bold outline-none"
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg">
            Track Officer
          </button>
        </form>

        {/* Detailed Guard Inspection Card */}
        {selectedGuard && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-lg">
                    {selectedGuard.guardId.slice(-3)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedGuard.name}</h3>
                    <p className="text-xs font-mono text-amber-400">ID: {selectedGuard.guardId}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                  {selectedGuard.status}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-850">
                  <span className="text-slate-400">Assigned Site:</span>
                  <span className="font-bold text-white">{selectedGuard.assignedSite}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-850">
                  <span className="text-slate-400">Live GPS Address:</span>
                  <span className="font-bold text-amber-300 text-right">{selectedGuard.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-850">
                  <span className="text-slate-400">Telemetry Check-In:</span>
                  <span className="font-bold text-emerald-400">{selectedGuard.lastCheckIn}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-850">
                  <span className="text-slate-400">GPS Device Battery:</span>
                  <span className="font-mono font-bold text-blue-400">{selectedGuard.battery}</span>
                </div>
              </div>

              {/* Allocated Assets Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
                  <Box className="w-4 h-4" /> Allocated Equipment & Assets
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedGuard.assets.map((ast: string, i: number) => (
                    <span key={i} className="text-[11px] bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-slate-200">
                      {ast}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock GPS Map Display */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> Live Telemetry Map Window
                </h3>

                <div className="h-64 w-full rounded-2xl bg-slate-950 border border-slate-850 relative flex items-center justify-center text-center p-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto animate-ping">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-amber-400">{selectedGuard.name} - Signal Active</div>
                    <p className="text-[10px] text-slate-400">{selectedGuard.assignedSite}</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mt-4 text-center">
                * Live 3D map telemetry feed connected via SURAKSHA Command Network.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
