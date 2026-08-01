'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Calendar, Users, Building, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuardBookingModal({ isOpen, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'Corporate Security Guards',
    guardCount: 2,
    duration: '1 Month',
    location: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-slate-100 font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-amber-400 p-2 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-amber-400">Booking Request Received!</h3>
            <p className="text-slate-300">
              Our Security Dispatch Command will review your deployment requirements and call you at{' '}
              <span className="text-amber-400 font-semibold">{formData.phone || 'your number'}</span> within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              <div>
                <h3 className="text-xl font-bold text-amber-400">Book Verified Guards & Services</h3>
                <p className="text-xs text-slate-400">Deploy Govt & ISO certified armed or unarmed officers instantly.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Deployment Location</label>
                <input
                  type="text"
                  required
                  placeholder="City / Site address"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Service Category</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none"
                >
                  <option>Corporate Security Guards</option>
                  <option>Industrial Patrol Officers</option>
                  <option>B2B Multi-Year Tender Guarding</option>
                  <option>Event & Crowd Management</option>
                  <option>Armed VIP Protection Officer</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Guards Needed ({formData.guardCount})</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={formData.guardCount}
                  onChange={(e) => setFormData({ ...formData, guardCount: parseInt(e.target.value) })}
                  className="w-full mt-3 accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 rounded-lg shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> Confirm Guard Deployment Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
