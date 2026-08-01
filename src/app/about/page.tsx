'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Target, Eye, Compass, Award, CheckCircle2, Calendar, FileText } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Amit Chavda',
      designation: 'Founder & Chief Executive Officer',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      bio: 'Ex-Defense Security Consultant with 15+ years experience building security command protocols across Asia.',
    },
    {
      name: 'Kalpit Sharma',
      designation: 'Chief Technology & Operations Officer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Pioneer in real-time GPS telemetry, body-cam stream synthesis, and command center dashboard architecture.',
    },
    {
      name: 'Vikramaditya Rathore',
      designation: 'Head of Guard Training & Compliance Audit',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      bio: 'Retired Special Forces Instructor training 1,000+ security officers monthly in tactical defense and emergency response.',
    },
    {
      name: 'Sunita Menon',
      designation: 'Director of B2B Tenders & Client Relations',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
      bio: 'Managing 100+ commercial enterprise tenders across tech parks, logistics hubs, and retail malls.',
    },
  ];

  const licenses = [
    {
      name: 'State Security Agency Permit (Reg: GOVT-DL-2026-9817)',
      badgeId: 'GOVT-DL-2026-9817',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
      expiryDate: '31 Dec 2030 (ACTIVE VERIFIED)',
      authority: 'Ministry of Home Affairs & State Police Dept',
    },
    {
      name: 'ISO 9001:2015 Quality Management System',
      badgeId: 'ISO-9001-SUR-8842',
      img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200',
      expiryDate: '15 Aug 2028 (ACTIVE VERIFIED)',
      authority: 'International Accreditation Forum',
    },
    {
      name: 'ISO 27001 Security Command & Data Privacy',
      badgeId: 'ISO-27001-COMMAND',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200',
      expiryDate: '10 Nov 2029 (ACTIVE VERIFIED)',
      authority: 'Global Standard Audit Certification',
    },
    {
      name: 'Central Arms & VIP Escort Compliance Permit',
      badgeId: 'ARM-PERMIT-2026-09',
      img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=200',
      expiryDate: '30 Jun 2027 (ACTIVE VERIFIED)',
      authority: 'Department of Firearms & Public Safety',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">About SURAKSHA</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">
            Who We Are & What Drives Us
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto mt-4">
            India&apos;s most reliable security organization providing elite guarding, B2B tender execution, and AI-enabled command center tracking.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Company Profile</span>
              <h2 className="text-3xl font-black text-white">
                Uncompromising Protection. Absolute Discipline.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Founded with a mission to elevate safety standards across commercial, industrial, and residential sectors, SURAKSHA integrates rigorous physical combat & vigilance training with cutting-edge digital tracking.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether deploying a single VIP bodyguard or managing a 500-guard multi-year tender contract for an industrial estate, our commitment remains standard: Zero Incidents, 100% Police Clearance, and 24/7 Command Dispatch.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="text-2xl font-black text-amber-400">100%</h4>
                  <p className="text-xs text-slate-400">Biometric & Police Verified</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="text-2xl font-black text-amber-400">500+</h4>
                  <p className="text-xs text-slate-400">Active B2B Tenders</p>
                </div>
              </div>
            </div>

            {/* Mission, Vision, Aim Cards */}
            <div className="space-y-4">
              <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-3xl flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-400">Our Mission</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    To safeguard human lives, intellectual property, and enterprise assets through disciplined personnel and rapid emergency response technology.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Our Vision</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    To be India&apos;s benchmark security agency recognized for zero-defect officer training, transparent tender execution, and gold-standard reliability.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Our Core Aim</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Ensure complete client peace of mind through 24/7 command center visibility, zero guard absenteeism, and proactive risk mitigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & TEAMS */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase">Command Leadership</h2>
            <h3 className="text-3xl font-black text-white mt-1">Our Leadership & Officers Team</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((m, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition group">
                <div className="h-56 bg-slate-800 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition">{m.name}</h4>
                  <p className="text-xs text-amber-400 font-semibold">{m.designation}</p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-900">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSES & CERTIFICATIONS */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase">Legal Credentials</h2>
            <h3 className="text-3xl font-black text-white mt-1">Official Badges & Statutory Licenses</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {licenses.map((lic, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 p-2">
                  {/* Badge Icon */}
                  <Award className="w-12 h-12 text-amber-400" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full">
                    Badge ID: {lic.badgeId}
                  </span>
                  <h4 className="text-lg font-bold text-white leading-snug">{lic.name}</h4>
                  <p className="text-xs text-slate-400">Issuing Body: {lic.authority}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-400 font-bold pt-1">
                    <Calendar className="w-4 h-4" /> Expiry Status: {lic.expiryDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
