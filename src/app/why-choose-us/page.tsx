'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Cpu, Clock, CheckCircle2, Lock, Radio, Activity, Award } from 'lucide-react';

export default function WhyChooseUsPage() {
  const points = [
    {
      icon: ShieldCheck,
      title: '100% Background & Police Verified Guards',
      desc: 'Zero tolerance for unverified staff. Every officer undergoes biometric police clearance, Aadhaar background audits, and mental fitness tests.',
    },
    {
      icon: Cpu,
      title: 'Real-time GPS Patrol & Body-Cam Streams',
      desc: 'Our guards carry 4K body cameras and GPS telemetry tablets linked directly to our central command dashboard for live monitoring.',
    },
    {
      icon: Clock,
      title: 'Under 5-Minute Emergency Response',
      desc: 'Armed rapid response teams (QRT) stationed strategically across industrial corridors to intervene within minutes of an incident.',
    },
    {
      icon: Radio,
      title: '24/7 Command Center Operations',
      desc: 'Round-the-clock monitoring hub operating 365 days a year to track guard shift check-ins, patrol routes, and perimeter alerts.',
    },
    {
      icon: Lock,
      title: 'Full Statutory & License Compliance',
      desc: '100% adherence to Provident Fund (PF), ESI, Minimum Wages Act, and state security regulations with complete auditing documentation.',
    },
    {
      icon: Award,
      title: 'Transparent Multi-Year B2B Tenders',
      desc: 'Customized guarding contracts tailored for enterprise tech parks, commercial complexes, and industrial warehouses.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">The Suraksha Standard</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Why Choose SURAKSHA</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Discover how our combination of elite human discipline and real-time command technology protects your assets.
        </p>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-8 rounded-3xl space-y-4 transition group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">{pt.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
