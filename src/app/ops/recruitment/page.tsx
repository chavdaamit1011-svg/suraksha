'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Plus,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
  Shield,
  Tag,
  Search,
  Filter,
  ChevronRight,
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  phone: string;
  city: string;
  experience: string;
  source: 'Walk-in' | 'Referral' | 'Online';
  tags: string[];
  stage: 'Sourced' | 'Screening' | 'Selected' | 'Onboarding' | 'Ready to deploy' | 'Joined' | 'Closed';
}

const initialCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Devendra Rathore',
    phone: '+91 98111 22233',
    city: 'Gurgaon',
    experience: '4 Yrs',
    source: 'Walk-in',
    tags: ['Ex-Army', 'CCTV'],
    stage: 'Sourced',
  },
  {
    id: 'c2',
    name: 'Amitabh Verma',
    phone: '+91 98222 33344',
    city: 'Delhi',
    experience: '2 Yrs',
    source: 'Referral',
    tags: ['Fire Safety'],
    stage: 'Screening',
  },
  {
    id: 'c3',
    name: 'Gurpreet Singh',
    phone: '+91 98333 44455',
    city: 'Noida',
    experience: '6 Yrs',
    source: 'Walk-in',
    tags: ['Ex-Police', 'Bouncer'],
    stage: 'Selected',
  },
  {
    id: 'c4',
    name: 'Manoj Kumar',
    phone: '+91 98444 55566',
    city: 'Gurgaon',
    experience: '3 Yrs',
    source: 'Online',
    tags: ['Gate Guard'],
    stage: 'Onboarding',
  },
  {
    id: 'c5',
    name: 'Satish Yadav',
    phone: '+91 98555 66677',
    city: 'Delhi',
    experience: '5 Yrs',
    source: 'Referral',
    tags: ['Ex-Army', 'VIP Escort'],
    stage: 'Ready to deploy',
  },
  {
    id: 'c6',
    name: 'Rakesh Sharma',
    phone: '+91 98666 77788',
    city: 'Noida',
    experience: '3 Yrs',
    source: 'Walk-in',
    tags: ['Patrol'],
    stage: 'Ready to deploy',
  },
];

const columns: Candidate['stage'][] = [
  'Sourced',
  'Screening',
  'Selected',
  'Onboarding',
  'Ready to deploy',
  'Joined',
  'Closed',
];

export default function RecruitmentPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Gurgaon',
    experience: '2 Yrs',
    source: 'Walk-in' as Candidate['source'],
    exArmy: false,
    exPolice: false,
    cctv: false,
    fireSafety: false,
  });

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const tags: string[] = [];
    if (formData.exArmy) tags.push('Ex-Army');
    if (formData.exPolice) tags.push('Ex-Police');
    if (formData.cctv) tags.push('CCTV');
    if (formData.fireSafety) tags.push('Fire Safety');
    if (tags.length === 0) tags.push('Gate Guard');

    const newCandidate: Candidate = {
      id: `c_${Date.now()}`,
      name: formData.name,
      phone: formData.phone || '+91 98000 00000',
      city: formData.city,
      experience: formData.experience,
      source: formData.source,
      tags,
      stage: 'Sourced',
    };

    setCandidates([newCandidate, ...candidates]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      phone: '',
      city: 'Gurgaon',
      experience: '2 Yrs',
      source: 'Walk-in',
      exArmy: false,
      exPolice: false,
      cctv: false,
      fireSafety: false,
    });
  };

  const updateStage = (candidateId: string, newStage: Candidate['stage']) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recruitment
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Sourcing-to-deployment candidate pipeline. Advance stages and onboard ready candidates as guards.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold text-xs transition shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add candidate</span>
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">In pipeline</span>
          <div className="text-2xl font-black text-white font-mono">34</div>
          <div className="text-[11px] text-amber-400">12 docs · 8 PV pending</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Ready to deploy</span>
          <div className="text-2xl font-black text-[#F5C623] font-mono">8</div>
          <div className="text-[11px] text-[#F5C623]">Cleared screening & PV</div>
        </div>
        <div className="trinetra-card rounded-xl p-4 space-y-1">
          <span className="text-xs text-white/55 font-medium">Joined</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">231</div>
          <div className="text-[11px] text-emerald-400">Active roster guards</div>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-[1300px]">
          {columns.map((col) => {
            const colCandidates = candidates.filter((c) => c.stage === col);
            return (
              <div
                key={col}
                className="w-72 bg-[#111316] border border-white/[0.08] rounded-xl p-3 space-y-3 shrink-0 flex flex-col"
              >
                {/* Column Title Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5C623]" />
                    <h4 className="font-bold text-white text-xs tracking-wide">{col}</h4>
                  </div>
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white/70">
                    {colCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards in Column */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[620px] custom-scrollbar pr-1">
                  {colCandidates.map((c) => (
                    <div
                      key={c.id}
                      className="trinetra-card rounded-lg p-3 space-y-2 hover:border-[#F5C623]/40 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#F5C623]/10 text-[#F5C623] font-bold text-xs flex items-center justify-center shrink-0">
                          {c.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="truncate">
                          <h5 className="font-bold text-white text-xs truncate">{c.name}</h5>
                          <div className="text-[10px] text-white/40">
                            {c.city} · {c.experience}
                          </div>
                        </div>
                      </div>

                      {/* Source Pill & Tags */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-white/60 text-[10px]">
                          {c.source}
                        </span>
                        {c.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-[#F5C623]/10 border border-[#F5C623]/20 text-[#F5C623] text-[10px] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Controls */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                        <select
                          value={c.stage}
                          onChange={(e) => updateStage(c.id, e.target.value as Candidate['stage'])}
                          className="bg-[#111316] border border-white/[0.08] text-[10px] text-white/70 rounded px-2 py-1 focus:outline-none"
                        >
                          {columns.map((stg) => (
                            <option key={stg} value={stg}>
                              {stg}
                            </option>
                          ))}
                        </select>

                        {(c.stage === 'Ready to deploy' || c.stage === 'Selected') && (
                          <button
                            onClick={() => updateStage(c.id, 'Joined')}
                            className="text-[10px] text-[#F5C623] hover:underline font-bold flex items-center gap-0.5"
                          >
                            Onboard →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {colCandidates.length === 0 && (
                    <div className="py-8 text-center text-[11px] text-white/32 border border-dashed border-white/[0.06] rounded-lg">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="trinetra-card w-full max-w-lg rounded-xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">Add New Candidate</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-white/70 font-medium">Candidate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Mobile Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 font-medium">Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as Candidate['source'] })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Walk-in">Walk-in</option>
                    <option value="Referral">Referral</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  <label className="text-white/70 font-medium">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.08] focus:border-[#F5C623] rounded-md px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <label className="text-white/70 font-medium block">Background Badges & Skills</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-white/80">
                    <input
                      type="checkbox"
                      checked={formData.exArmy}
                      onChange={(e) => setFormData({ ...formData, exArmy: e.target.checked })}
                      className="accent-[#F5C623]"
                    />
                    <span>Ex-Army Veteran</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white/80">
                    <input
                      type="checkbox"
                      checked={formData.exPolice}
                      onChange={(e) => setFormData({ ...formData, exPolice: e.target.checked })}
                      className="accent-[#F5C623]"
                    />
                    <span>Ex-Police Personnel</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white/80">
                    <input
                      type="checkbox"
                      checked={formData.cctv}
                      onChange={(e) => setFormData({ ...formData, cctv: e.target.checked })}
                      className="accent-[#F5C623]"
                    />
                    <span>CCTV Operator</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white/80">
                    <input
                      type="checkbox"
                      checked={formData.fireSafety}
                      onChange={(e) => setFormData({ ...formData, fireSafety: e.target.checked })}
                      className="accent-[#F5C623]"
                    />
                    <span>Fire Safety Certified</span>
                  </label>
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
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
