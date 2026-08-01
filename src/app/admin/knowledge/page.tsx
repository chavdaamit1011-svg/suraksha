'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { BookOpen, Download, FileText, CheckCircle2, Sparkles } from 'lucide-react';

export default function KnowledgeBasePage() {
  const [reqType, setReqType] = useState('B2B Tender Proposal');
  const [clientName, setClientName] = useState('Global Logistics Hub');
  const [generated, setGenerated] = useState(false);

  const handleGeneratePdfReport = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" /> Knowledge Base & Custom PDF Proposal Generator
          </h1>
          <p className="text-xs text-slate-400">Generate custom onboarding PDFs and security proposals based on user interest (B2B / B2C).</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-amber-400">PDF Report Generator Tool</h3>

            <form onSubmit={handleGeneratePdfReport} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300">Target Requirement Category</label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value)}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500"
                >
                  <option>B2B Tender Proposal & Guard Deployment SLA</option>
                  <option>B2C Residential Guarding & Patrol Manual</option>
                  <option>VIP Armed Officer Escort Guidelines</option>
                  <option>Agency Subscription & Guard Training Guide</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300">Client / Applicant Name</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Generate Custom PDF Report Document
              </button>
            </form>
          </div>

          {/* Report Preview */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> Generated Document Preview
            </h3>

            {generated ? (
              <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-amber-400">SURAKSHA OFFICIAL REPORT</span>
                  <span className="font-mono text-[10px] text-emerald-400">REF-PDF-2026</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white">{reqType}</h4>
                  <p className="text-slate-400">Prepared Exclusively For: <span className="text-amber-300 font-bold">{clientName}</span></p>
                  <p className="text-slate-400 leading-relaxed">
                    This official document outlines statutory security compliance standards, guard biometric verification protocols, incident SLA response times (&lt;4.2 mins), and telemetry tracking setup.
                  </p>
                </div>

                <button
                  onClick={() => alert('Downloading SURAKSHA Proposal PDF...')}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF Report File
                </button>
              </div>
            ) : (
              <div className="h-64 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-center text-xs text-slate-500">
                Click Generate above to build the custom PDF proposal.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
