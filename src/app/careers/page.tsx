'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, CheckCircle2, Shield, Send, MapPin, Award } from 'lucide-react';

export default function CareersPage() {
  const [applied, setApplied] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

  const jobs = [
    { id: 1, title: 'Govt Certified Unarmed Security Guard', location: 'Noida / Delhi NCR', exp: '1-3 Years', salary: '₹ 18,000 - ₹ 22,000 / month' },
    { id: 2, title: 'Armed VIP Escort Officer', location: 'Delhi / Gurgaon', exp: '3+ Years (Gun License Required)', salary: '₹ 35,000 - ₹ 42,000 / month' },
    { id: 3, title: 'Field Security Supervisor (B2B Tenders)', location: 'Greater Noida & Ghaziabad', exp: '4+ Years Military / Police background', salary: '₹ 30,000 - ₹ 38,000 / month' },
    { id: 4, title: 'Command Center Telemetry Operator', location: 'Sector 62 Noida Command HQ', exp: '2+ Years IT / CCTV Monitoring', salary: '₹ 25,000 - ₹ 30,000 / month' },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Join Suraksha Force</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Careers & Recruitment</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Become part of India&apos;s most disciplined security force. We offer top industry salaries, provident fund (PF), health insurance, and specialized tactical training.
        </p>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Job Listings */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-amber-400" /> Open Positions
              </h3>

              <div className="space-y-4">
                {jobs.map((j) => (
                  <div key={j.id} className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-3xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-white">{j.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {j.location}</span>
                          <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-blue-400" /> {j.exp}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">{j.salary}</span>
                    </div>

                    <button
                      onClick={() => setSelectedJob(j.title)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs rounded-xl transition"
                    >
                      Apply For This Position
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-amber-500/30 p-8 rounded-3xl space-y-6 sticky top-28">
                <h3 className="text-xl font-bold text-amber-400">Recruitment Application Form</h3>

                {applied ? (
                  <div className="py-8 text-center space-y-3 bg-slate-950 p-6 rounded-2xl border border-emerald-500/30">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-lg font-bold text-white">Application Registered!</h4>
                    <p className="text-xs text-slate-300">Our HR training cell will contact you within 24 hours for physical verification.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-300">Selected Role</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedJob || 'Select a job listing on left'}
                        className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-400 font-bold outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300">Full Name *</label>
                      <input type="text" required placeholder="Applicant Full Name" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300">Mobile Number *</label>
                      <input type="tel" required placeholder="+91 98765 43210" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500" />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300">Police Clearance Status</label>
                      <select className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 outline-none focus:border-amber-500">
                        <option>Yes, I have Police Clearance Certificate</option>
                        <option>Application Pending with Police</option>
                        <option>No, I need Suraksha Assistance</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Submit Guard Candidate Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
