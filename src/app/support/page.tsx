'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { HelpCircle, PhoneCall, Mail, MessageSquare, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export default function SupportPage() {
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
