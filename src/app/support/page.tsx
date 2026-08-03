'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { PhoneCall, Mail, MessageSquare, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SupportPage() {
  const [incident, setIncident] = useState({ title: '', site: '', severity: 'Medium', reportedBy: '', phone: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitIncident = async (event: React.FormEvent) => { event.preventDefault(); setSubmitting(true); const response = await fetch('/api/incidents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(incident) }); const data = await response.json(); setSubmitting(false); if (data.success) { setSubmitted(true); setIncident({ title: '', site: '', severity: 'Medium', reportedBy: '', phone: '', description: '' }); } else alert(data.message || 'Unable to report incident.'); };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Help & Support Desk</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">How Can We Help You Today?</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Access 24/7 command center support, view FAQs, or submit an instant ticket to our operations team.
        </p>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <PhoneCall className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Emergency Hotline</h3>
              <p className="text-xs text-slate-400">Immediate guard replacement & incident response dispatch.</p>
              <div className="pt-2 font-mono font-bold text-amber-400 text-sm">+91 1800-7872574</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Email Ticket Desk</h3>
              <p className="text-xs text-slate-400">Submit queries for SLA audits, invoices, and tender specs.</p>
              <div className="pt-2 font-mono font-bold text-amber-400 text-sm">support@suraksha.com</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Contact Form</h3>
              <p className="text-xs text-slate-400">Direct query submission connected to Nodemailer dispatch.</p>
              <Link href="/contact" className="inline-flex items-center gap-1 text-xs text-amber-400 font-bold hover:underline pt-2">
                Open Contact Form <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-900 border border-rose-500/40 rounded-3xl p-7 sm:p-10">
            <div className="flex items-start gap-3 pb-5 border-b border-slate-800"><AlertTriangle className="w-7 h-7 text-rose-400 shrink-0" /><div><h2 className="text-xl font-bold text-white">Report a Security Incident</h2><p className="text-xs text-slate-400 mt-1">For immediate danger, call the emergency hotline first. This report goes directly to the SURAKSHA Incident Desk.</p></div></div>
            {submitted ? <div className="py-10 text-center"><CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" /><h3 className="font-bold text-white mt-4">Incident Reported</h3><p className="text-xs text-slate-400 mt-2">Our command desk will review and contact you shortly.</p><button onClick={() => setSubmitted(false)} className="mt-5 text-xs font-bold text-amber-400">Report another incident</button></div> : <form onSubmit={submitIncident} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"><input required placeholder="Your full name" value={incident.reportedBy} onChange={(e) => setIncident({ ...incident, reportedBy: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" /><input required type="tel" placeholder="Contact number" value={incident.phone} onChange={(e) => setIncident({ ...incident, phone: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" /><input required placeholder="Incident title" value={incident.title} onChange={(e) => setIncident({ ...incident, title: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" /><select value={incident.severity} onChange={(e) => setIncident({ ...incident, severity: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select><input required placeholder="Site / incident location" value={incident.site} onChange={(e) => setIncident({ ...incident, site: e.target.value })} className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" /><textarea required rows={4} placeholder="Describe what happened, people involved, and any immediate risk..." value={incident.description} onChange={(e) => setIncident({ ...incident, description: e.target.value })} className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" /><button disabled={submitting} className="sm:col-span-2 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold">{submitting ? 'Reporting...' : 'Submit Incident Report'}</button></form>}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
