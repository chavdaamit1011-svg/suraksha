'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Map } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || 'Error submitting form');
      }
    } catch (err) {
      setLoading(false);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">24/7 Security Command Desk</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Contact SURAKSHA</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Connect with our security operations team for guard deployments, B2B tender inquiries, or emergency support.
        </p>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info & Interactive Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900 border border-amber-500/30 p-8 rounded-3xl space-y-6">
                <h3 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" /> Headquarter Details
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Suraksha Command Center</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Plot 45, Cyber Security Block, Sector 62, Noida, Uttar Pradesh - 201309</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Direct Phone Lines</h5>
                      <p className="text-xs text-slate-400 mt-0.5">+91 1800-SURAKSHA (+91 1800-7872574)</p>
                      <p className="text-xs text-amber-400 font-semibold">+91 98765 43210 (B2B Tenders Desk)</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Official Email Address</h5>
                      <p className="text-xs text-slate-400 mt-0.5">support@suraksha.com</p>
                      <p className="text-xs text-slate-400">chavdaamit1011@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Operational Hours</h5>
                      <p className="text-xs text-emerald-400 font-bold mt-0.5">24 Hours / 365 Days Uninterrupted Command</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Location Map Box */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Map className="w-4 h-4 text-amber-400" /> Command Hub Location Pin
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">LIVE PIN</span>
                </div>

                <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center text-center p-4">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto animate-bounce">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-white text-sm">SURAKSHA HQ - Sector 62</h5>
                    <p className="text-xs text-slate-400">Coordinates: 28.6139° N, 77.2090° E</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Send Us A Direct Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-1">Fill out the form below to receive a response from our security desk within 15 minutes.</p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 bg-slate-950 p-8 rounded-2xl border border-emerald-500/30">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-2xl font-bold text-amber-400">Message Transmitted!</h4>
                    <p className="text-slate-300 text-sm">
                      Thank you <span className="text-amber-400 font-bold">{formData.fullName}</span>. An email notification has been dispatched to our admin team ({formData.email}).
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300">Company / Organization</label>
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300">Contact Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300">Email ID *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300">Subject Message *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Requirement for 10 Guards in TechPark"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300">Detailed Message *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Specify your site requirements, shift timing, or tender details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? 'Submitting...' : <><Send className="w-4 h-4" /> Transmit Support Inquiry</>}
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
