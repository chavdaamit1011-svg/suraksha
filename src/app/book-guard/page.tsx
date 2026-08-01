'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Calendar, MapPin, Phone, Mail, User, Shield, CheckCircle2, Calculator, Loader2 } from 'lucide-react';

export default function BookGuardPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseDetails, setResponseDetails] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    guardType: 'Unarmed Security Officer',
    guardCount: 2,
    shiftType: '24/7 Rotational Shift',
    startDate: '',
    specialRequirements: '',
  });

  const baseRate = 18500;
  const estimatedTotal = formData.guardCount * baseRate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/book-guard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setResponseDetails(data.lead);
        setSubmitted(true);
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      setLoading(false);
      alert('Connection error submitting guard request.');
    }
  };

  return (
    <div className="min-h-screen theme-app-bg font-sans selection:bg-[#F5C623] selection:text-[#0B0D0F]">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-36 pb-16 theme-app-card border-b border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5C623]/10 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Official Security Guard Deployment Portal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold theme-app-heading">Book Guard & Security Service</h1>
          <p className="text-sm theme-app-body max-w-2xl mx-auto">
            Deploy background-verified armed & unarmed security officers, site leads, or request bulk B2B tender guarding.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 theme-app-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {submitted ? (
            <div className="theme-app-card border border-[#F5C623]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold theme-app-heading">Guard Booking Request Received!</h2>
                <p className="text-xs theme-app-body max-w-md mx-auto">
                  Your deployment request has been dispatched to SURAKSHA Command Center. An Area Operations Lead will contact you within 15 minutes.
                </p>
              </div>

              {responseDetails && (
                <div className="p-4 rounded-2xl theme-app-bg border border-[#F5C623]/30 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="theme-app-body">Reference Order ID:</span>
                    <span className="text-[#F5C623] font-mono">{responseDetails.leadId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-app-body">Client Entity:</span>
                    <span className="theme-app-heading font-semibold">{responseDetails.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-app-body">Contact Person:</span>
                    <span className="theme-app-heading font-semibold">{responseDetails.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-app-body">Status:</span>
                    <span className="text-emerald-500 font-bold uppercase">{responseDetails.status}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSubmitted(false)}
                className="trust-yellow-btn px-6 py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold theme-app-heading flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#F5C623]" /> Security Requirement Specification
                </h3>
                <p className="text-xs theme-app-body mt-1">Specify site location, guard strength, and schedule requirements.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Vikramaditya Mehta"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="v.mehta@corporation.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Company / Facility Name</label>
                    <input
                      type="text"
                      placeholder="Apex Tech Towers Tower B"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    />
                  </div>
                </div>

                {/* Service Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Guard Designation</label>
                    <select
                      value={formData.guardType}
                      onChange={(e) => setFormData({ ...formData, guardType: e.target.value })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    >
                      <option value="Unarmed Security Officer">Unarmed Security Guard</option>
                      <option value="Armed VIP Escort">Armed Security Officer (Ex-Servicemen)</option>
                      <option value="Site Security Supervisor">Site Supervisor / Gate In-charge</option>
                      <option value="Crowd Control Bouncer">Crowd Control Bouncer</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Number of Guards Required</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.guardCount}
                      onChange={(e) => setFormData({ ...formData, guardCount: parseInt(e.target.value) || 1 })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Shift Type</label>
                    <select
                      value={formData.shiftType}
                      onChange={(e) => setFormData({ ...formData, shiftType: e.target.value })}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    >
                      <option value="24/7 Rotational Shift">24/7 Rotational Shift (8h x 3)</option>
                      <option value="Day Shift Only">Day Shift Only (8 AM - 8 PM)</option>
                      <option value="Night Patrol Only">Night Patrol Only (8 PM - 8 AM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold theme-app-heading block mb-1">Deployment Location Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Plot 42, Sector 62, Commercial Hub, Noida, NCR"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                  />
                </div>

                {/* Estimate Box */}
                <div className="p-4 rounded-2xl bg-[#F5C623]/10 border border-[#F5C623]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#F5C623]" />
                    <div>
                      <span className="text-xs font-bold text-[#F5C623]">Estimated Monthly Budget:</span>
                      <p className="text-[11px] theme-app-body">₹ {baseRate.toLocaleString()} / guard / month</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[#F5C623]">₹ {estimatedTotal.toLocaleString()} / Month</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full trust-yellow-btn py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting Request to Command...</>
                  ) : (
                    <><ShieldCheck className="w-4 h-4" /> Confirm & Dispatch Guard Request</>
                  )}
                </button>

              </form>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
