'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Lock,
  ChevronRight,
  PhoneCall,
  Activity,
  Compass,
  Radio,
  Zap,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'corporate' | 'armed' | 'tenders' | 'events'>('corporate');

  const clientLogos = [
    { name: 'Global Tech Parks', logo: '🏢 TECHPARK CORP', status: '45 Officers On Duty', location: 'Noida Sec 62' },
    { name: 'Metro Logistics', logo: '🚛 METRO LOGISTICS', status: '20 Perimeter Guards', location: 'Delhi Hub' },
    { name: 'Apex Industrial Estate', logo: '🏭 APEX INDUSTRIES', status: '60 Shift Officers', location: 'Greater Noida' },
    { name: 'Sunrise Healthcare', logo: '🏥 SUNRISE HOSPITALS', status: '15 Gate Officers', location: 'Delhi NCR' },
    { name: 'Infinity Malls', logo: '🏬 INFINITY RETAIL', status: '30 Security Escorts', location: 'Gurgaon' },
  ];

  const servicesData = {
    corporate: {
      title: 'Corporate & Commercial Guarding',
      desc: 'Deploy certified uniform security officers for office towers, IT parks, and tech hubs. Equipped with biometric access monitoring and visitor logs.',
      features: ['100% Police Verified Personnel', 'Access Control & Badge Scan', '24/7 Shift Supervisor Cover', 'Daily Duty Attendance Reports'],
      price: '₹ 18,500 / Month per Guard',
    },
    armed: {
      title: 'Armed VIP Protection Officers (PSO)',
      desc: 'Elite licensed armed guards and personal security officers trained for VIP protection, high-value asset transport, and executive escort.',
      features: ['Valid State Arms License', 'Special Forces Defense Training', '4K Body Camera Equipped', 'Rapid Evacuation Response'],
      price: '₹ 38,000 / Month per Officer',
    },
    tenders: {
      title: 'B2B Multi-Year Guard Tenders',
      desc: 'Turnkey 1 to 2-year security contracts for commercial complexes, industrial plants, and government facilities with dedicated site managers.',
      features: ['Bulk Guard Units (10 to 500+)', 'Guaranteed SLA Replacements', 'Dedicated Site Supervisor', 'Monthly Audit Reporting'],
      price: 'Custom B2B Annual Quote',
    },
    events: {
      title: 'Event & Crowd Management Officers',
      desc: 'Short-term tactical crowd control officers for celebrity events, corporate AGMs, product launches, and high-footfall exhibitions.',
      features: ['Rapid 3-Hour Deployment', 'Crowd Control Barrier Ops', 'Emergency Medical Escort', 'Metal Detector Scan Posts'],
      price: 'Per Shift On-Demand Quote',
    },
  };

  const testimonials = [
    {
      id: 1,
      name: 'Rajiv Malhotra',
      role: 'Head of Facilities, Global Tech Park',
      content:
        'SURAKSHA transformed our campus security. Their guards are highly disciplined, verified, and equipped with body cams. The live command tracking gives us 100% peace of mind.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Priya Sundaram',
      role: 'Director of Operations, Metro Logistics',
      content:
        'We signed a 2-year B2B tender for 20 perimeter guards. Their incident response time is under 5 minutes. Outstanding professionalism and government certification compliance.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anil Kapoor',
      role: 'General Manager, Infinity Malls',
      content:
        'The quick guard booking feature allowed us to deploy 10 extra crowd-control officers within 3 hours for a major celebrity event. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen theme-app-bg font-sans selection:bg-[#F5C623] selection:text-[#0B0D0F] relative overflow-hidden transition-colors duration-300">
      <Navbar />

      {/* Hero Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F5C623]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Accreditation Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full theme-app-card text-[#F5C623] text-xs font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#F5C623]" />
                <span>ISO 9001:2015 & GOVT CERTIFIED GUARDING NETWORK</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] theme-app-heading">
                Book Verified{' '}
                <span className="text-[#F5C623]">
                  Security Personnel
                </span>
              </h1>

              <p className="text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed theme-app-body">
                SURAKSHA delivers background-verified armed & unarmed security officers, B2B tender management, and 24/7 telemetry command center monitoring across India.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/book-guard"
                  className="w-full sm:w-auto trust-yellow-btn px-8 py-4 rounded-2xl text-base shadow-md flex items-center justify-center gap-2.5 group uppercase tracking-wider"
                >
                  <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition" /> Deploy Verified Guards Now
                </Link>

                <Link
                  href="/why-choose-us"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl theme-app-card font-bold text-base transition flex items-center justify-center gap-2"
                >
                  Explore Technologies <ArrowRight className="w-4 h-4 text-[#F5C623]" />
                </Link>
              </div>

              {/* Trust Metrics Pill */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F5C623]">10,480+</h3>
                  <p className="text-xs theme-app-body font-medium mt-0.5">Certified Officers</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-500">&lt; 4.2 Mins</h3>
                  <p className="text-xs theme-app-body font-medium mt-0.5">QRT Response SLA</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F5C623]">24/7</h3>
                  <p className="text-xs theme-app-body font-medium mt-0.5">Telemetry Hub</p>
                </div>
              </div>
            </div>

            {/* Right Command Radar Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md theme-app-card rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                {/* Header Status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Radar Signal Active</span>
                  </div>
                  <span className="text-[10px] theme-app-bg border border-slate-300 dark:border-slate-700 px-3 py-1 rounded-full text-[#F5C623] font-mono font-bold">
                    HQ: SUR-2026
                  </span>
                </div>

                {/* Main Logo & Network Name */}
                <div className="py-2 flex flex-col items-center text-center space-y-3">
                  <Logo size="lg" />
                  <div>
                    <h3 className="text-lg font-bold text-[#F5C623]">SURAKSHA COMMAND NETWORK</h3>
                    <p className="text-xs theme-app-body mt-0.5">Real-time GPS telemetry & officer biometric clearance</p>
                  </div>
                </div>

                {/* Live Status Indicators */}
                <div className="space-y-2.5 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs theme-app-bg">
                  <div className="flex items-center justify-between">
                    <span className="theme-app-body flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#F5C623]" /> Security Permit Verification:
                    </span>
                    <span className="text-emerald-500 font-bold">100% ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="theme-app-body flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#F5C623]" /> QRT Emergency Dispatch:
                    </span>
                    <span className="text-[#F5C623] font-bold">&lt; 4.2 Mins SLA</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="theme-app-body flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#F5C623]" /> Police Clearance Audit:
                    </span>
                    <span className="text-emerald-500 font-bold">VERIFIED PASSED</span>
                  </div>
                </div>

                <Link
                  href="/book-guard"
                  className="w-full trust-yellow-btn py-3.5 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
                >
                  <Zap className="w-4 h-4" /> Trigger Immediate Guard Booking
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CLIENT MARQUEE - UNIFORM THEME BACKGROUND */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 theme-app-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C623] flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> TRUSTED BY LEADING ENTERPRISES, MALLS & INDUSTRIAL ESTATES
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {clientLogos.map((client, idx) => (
              <div
                key={idx}
                className="theme-app-bg border border-slate-200 dark:border-slate-800 hover:border-[#F5C623]/40 p-4 rounded-2xl text-center transition duration-200 space-y-1 shadow-sm"
              >
                <div className="font-bold text-sm theme-app-heading">{client.logo}</div>
                <div className="text-[10px] text-[#F5C623] font-bold">{client.status}</div>
                <div className="text-[9px] theme-app-body font-medium">{client.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SHOWCASE */}
      <section className="py-20 theme-app-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5C623]">Services Directory</span>
            <h2 className="text-3xl sm:text-4xl font-bold theme-app-heading">Comprehensive Security Solutions</h2>
            <p className="text-base theme-app-body">
              Deploy verified armed officers, corporate security personnel, or multi-year B2B guard tenders.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['corporate', 'armed', 'tenders', 'events'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === t
                    ? 'bg-[#F5C623] text-[#0B0D0F] shadow-md'
                    : 'theme-app-card hover:text-[#F5C623]'
                }`}
              >
                {t === 'corporate' && 'Corporate Guarding'}
                {t === 'armed' && 'Armed VIP Officers (PSO)'}
                {t === 'tenders' && 'B2B Multi-Year Tenders'}
                {t === 'events' && 'Event & Crowd Control'}
              </button>
            ))}
          </div>

          {/* Active Tab Service Display */}
          <div className="theme-app-card rounded-3xl p-8 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-[#F5C623] uppercase tracking-widest bg-[#F5C623]/10 px-3 py-1 rounded-full border border-[#F5C623]/30">
                  {servicesData[activeTab].price}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold theme-app-heading">{servicesData[activeTab].title}</h3>
                <p className="text-base leading-relaxed theme-app-body">{servicesData[activeTab].desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {servicesData[activeTab].features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold theme-app-heading">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 theme-app-bg p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-[#F5C623]">Deploy Security Solution</h4>
                <p className="text-xs theme-app-body">Book guard deployment or request official B2B tender quotation.</p>
                <Link
                  href="/book-guard"
                  className="w-full trust-yellow-btn py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-wider shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" /> Book {servicesData[activeTab].title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING PREVIEW & TESTIMONIALS */}
      <section className="py-20 theme-app-bg border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Pricing Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5C623]">Guarding Rates</span>
              <h3 className="text-3xl font-bold theme-app-heading mt-1">Verified Pricing Plans</h3>
            </div>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl theme-app-card text-[#F5C623] font-bold text-xs transition flex items-center gap-2"
            >
              Interactive Cost Calculator <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="theme-app-card p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-bold theme-app-body uppercase">Standard Corporate</span>
                <h4 className="text-2xl font-bold theme-app-heading mt-1">Unarmed Security Guard</h4>
                <div className="text-3xl font-bold text-[#F5C623] mt-2">
                  ₹ 18,500 <span className="text-xs font-normal theme-app-body">/ Month</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs theme-app-body">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Govt Verified Officer</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 12-Hour Shift Duty</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Access Control & Visitor Log</li>
              </ul>
              <Link href="/book-guard" className="block text-center py-3 theme-app-bg border border-slate-300 dark:border-slate-800 hover:border-[#F5C623] text-[#F5C623] font-bold text-xs rounded-xl transition">
                Select Standard Plan
              </Link>
            </div>

            <div className="theme-app-card border-2 border-[#F5C623] p-8 rounded-3xl space-y-6 relative shadow-xl">
              <span className="absolute -top-3.5 right-6 bg-[#F5C623] text-[#0B0D0F] font-bold text-[10px] px-3.5 py-1 rounded-full uppercase shadow-md">
                ★ Most Popular VIP Option
              </span>
              <div>
                <span className="text-xs font-bold text-[#F5C623] uppercase">Armed Protection</span>
                <h4 className="text-2xl font-bold theme-app-heading mt-1">Armed Officer (PSO)</h4>
                <div className="text-3xl font-bold text-[#F5C623] mt-2">
                  ₹ 38,000 <span className="text-xs font-normal theme-app-body">/ Month</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs theme-app-body">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5C623]" /> State Arms License Officer</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5C623]" /> 4K Body Camera Equipped</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5C623]" /> VIP Protection & Escort</li>
              </ul>
              <Link href="/book-guard" className="block text-center trust-yellow-btn py-3.5 rounded-xl text-xs font-bold transition shadow-md">
                Select Armed Officer
              </Link>
            </div>

            <div className="theme-app-card p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-bold text-[#F5C623] uppercase">Enterprise B2B</span>
                <h4 className="text-2xl font-bold theme-app-heading mt-1">1-2 Year Bulk Tender</h4>
                <div className="text-3xl font-bold text-[#F5C623] mt-2">Custom Quote</div>
              </div>
              <ul className="space-y-2.5 text-xs theme-app-body">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5C623]" /> 10 to 500+ Guards Unit</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5C623]" /> Dedicated Site Supervisor</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5C623]" /> SLA Guaranteed Replacements</li>
              </ul>
              <Link href="/collaboration" className="block text-center py-3 theme-app-bg border border-slate-300 dark:border-slate-800 hover:border-[#F5C623] text-[#F5C623] font-bold text-xs rounded-xl transition">
                Request B2B Tender Proposal
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <div className="pt-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5C623]">Client Reviews</span>
              <h3 className="text-3xl font-bold theme-app-heading">What Our Clients Say</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="theme-app-card p-8 rounded-3xl space-y-4 hover:border-[#F5C623]/30 transition">
                  <div className="flex items-center gap-1 text-[#F5C623]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5C623] text-[#F5C623]" />
                    ))}
                  </div>
                  <p className="theme-app-body text-xs italic leading-relaxed">&quot;{t.content}&quot;</p>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold theme-app-heading text-sm">{t.name}</h5>
                    <p className="text-[10px] text-[#F5C623] font-semibold">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
