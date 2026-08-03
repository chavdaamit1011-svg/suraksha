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
    guardCount: 2 as number | '',
    shiftType: 'Day Shift',
    startDate: '',
    endDate: '',
    durationPreset: 'custom',
    shiftStart: '08:00',
    shiftEnd: '20:00',
    specialRequirements: '',
  });

  const baseRate = 18500;
  const getPresetEndDate = (startDate: string, preset: string) => {
    if (!startDate || preset === 'custom') return '';
    const date = new Date(`${startDate}T00:00:00`);
    if (preset === 'month') date.setMonth(date.getMonth() + 1);
    if (preset === 'year') date.setFullYear(date.getFullYear() + 1);
    if (preset !== 'day') date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const deploymentDays = formData.startDate && formData.endDate ? Math.max(1, Math.round((new Date(`${formData.endDate}T00:00:00`).getTime() - new Date(`${formData.startDate}T00:00:00`).getTime()) / 86400000) + 1) : 0;
  const shiftMultiplier = formData.shiftType === '24/7 Rotational' ? 3 : 1;
  const totalOfficers = (Number(formData.guardCount) || 0) * shiftMultiplier;
  const estimatedTotal = deploymentDays ? Math.round((baseRate / 30) * totalOfficers * deploymentDays) : 0;

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
                    <label className="font-bold theme-app-heading block mb-1">Guards Required Per Shift *</label>
                    <input type="number" required min={1} max={500} inputMode="numeric" value={formData.guardCount} onChange={(e) => { const value = e.target.value; setFormData({ ...formData, guardCount: value === '' ? '' : Math.min(500, Number(value)) }); }} placeholder="e.g. 5" className="guard-count-input w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none" />
                  </div>

                  <div>
                    <label className="font-bold theme-app-heading block mb-1">Shift Type</label>
                    <select
                      value={formData.shiftType}
                      onChange={(e) => {
                        const shiftType = e.target.value;
                        const timing = shiftType === 'Night Shift' ? { shiftStart: '20:00', shiftEnd: '08:00' } : shiftType === '24/7 Rotational' ? { shiftStart: '00:00', shiftEnd: '23:59' } : shiftType === 'Day Shift' ? { shiftStart: '08:00', shiftEnd: '20:00' } : {};
                        setFormData({ ...formData, shiftType, ...timing });
                      }}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-xl px-4 py-3 text-xs theme-app-heading outline-none"
                    >
                      <option value="Day Shift">Day Shift (8 AM – 8 PM)</option>
                      <option value="Night Shift">Night Shift (8 PM – 8 AM)</option>
                      <option value="24/7 Rotational">24/7 Rotational (3 × 8-hour shifts)</option>
                      <option value="Custom Timing">Custom shift timing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs p-4 rounded-2xl border border-slate-200 dark:border-slate-800 theme-app-bg">
                  <div><label className="font-bold theme-app-heading block mb-1">Deployment Starts *</label><input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value, endDate: getPresetEndDate(e.target.value, formData.durationPreset) || formData.endDate })} className="w-full theme-app-card border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs theme-app-heading outline-none" /></div>
                  <div><label className="font-bold theme-app-heading block mb-1">Duration *</label><select value={formData.durationPreset} onChange={(e) => setFormData({ ...formData, durationPreset: e.target.value, endDate: getPresetEndDate(formData.startDate, e.target.value) || formData.endDate })} className="w-full theme-app-card border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs theme-app-heading outline-none"><option value="day">1 Day</option><option value="month">1 Month</option><option value="year">1 Year</option><option value="custom">Custom dates</option></select></div>
                  <div><label className="font-bold theme-app-heading block mb-1">Deployment Ends *</label><input type="date" required min={formData.startDate} value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value, durationPreset: 'custom' })} className="w-full theme-app-card border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs theme-app-heading outline-none" /></div>
                  <div><label className="font-bold theme-app-heading block mb-1">Shift Starts</label><input type="time" value={formData.shiftStart} onChange={(e) => setFormData({ ...formData, shiftStart: e.target.value })} className="w-full theme-app-card border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs theme-app-heading outline-none" /></div>
                  <div><label className="font-bold theme-app-heading block mb-1">Shift Ends</label><input type="time" value={formData.shiftEnd} onChange={(e) => setFormData({ ...formData, shiftEnd: e.target.value })} className="w-full theme-app-card border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs theme-app-heading outline-none" /></div>
                  <div className="flex items-end"><p className="w-full rounded-xl bg-[#F5C623]/10 border border-[#F5C623]/30 px-3 py-3 text-xs text-[#F5C623] font-bold">{deploymentDays ? `${deploymentDays} deployment day${deploymentDays > 1 ? 's' : ''}` : 'Choose start and end dates'}</p></div>
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
                      <span className="text-xs font-bold text-[#F5C623]">Estimated Deployment Budget:</span>
                      <p className="text-[11px] theme-app-body">₹ {Math.round(baseRate / 30).toLocaleString()} / guard / day · {totalOfficers} officer{totalOfficers > 1 ? 's' : ''} required</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[#F5C623]">₹ {estimatedTotal.toLocaleString()}</span>
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
