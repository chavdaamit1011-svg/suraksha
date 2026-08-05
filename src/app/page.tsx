'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  PhoneCall,
  Activity,
  Compass,
  Radio,
  Zap,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  Bell,
  User,
  FileText,
  CreditCard,
  Building,
  UserCheck,
  AlertTriangle,
  Flame,
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

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [review, setReview] = useState({ name: '', email: '', phone: '', role: '', company: '', content: '', rating: 5 });
  const [reviewMessage, setReviewMessage] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const testimonialScroller = useRef<HTMLDivElement>(null);
  const scrollTestimonials = (direction: number) => testimonialScroller.current?.scrollBy({ left: direction * 390, behavior: 'smooth' });

  useEffect(() => {
    fetch('/api/testimonials')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setTestimonials(data.testimonials);
      });
  }, []);

  const submitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    const data = await response.json();
    setReviewMessage(data.message || 'Unable to submit review.');
    if (data.success) setReview({ name: '', email: '', phone: '', role: '', company: '', content: '', rating: 5 });
  };

  return (
    <div className="min-h-screen theme-app-bg suraksha-grid-bg font-sans selection:bg-[#F5C623] selection:text-[#0B0D0F] relative overflow-hidden transition-colors duration-300">
      <Navbar />

      {/* Hero Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] suraksha-radial-glow pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION (REFERENCE SCREENSHOT 1 & 2)                       */}
      {/* ========================================================================= */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F5C623]/30 bg-[#F5C623]/10 text-xs font-semibold theme-app-heading shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F5C623] animate-ping shrink-0" />
            <span>For homes, societies, business & events · PSARA-licensed · 24×7 monitored</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] theme-app-heading max-w-4xl mx-auto">
            Guards you can trust, watching{' '}
            <span className="text-[#B8860B] dark:text-[#F5C623]">
              every post.
            </span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed theme-app-body">
            Close protection, events, gated communities, night patrols or commercial premises — whatever you need to protect, Suraksha supplies verified, PSARA-licensed guards with a 24×7 command center.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/book-guard"
              className="w-full sm:w-auto trust-yellow-btn px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 group uppercase tracking-wider shadow-lg"
            >
              Get a free quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/why-choose-us"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full theme-app-card border border-slate-300 dark:border-slate-800 font-bold text-sm hover:border-[#F5C623] transition flex items-center justify-center gap-2 shadow-xs"
            >
              Talk to our team <ArrowUpRight className="w-4 h-4 text-[#F5C623]" />
            </Link>
          </div>

          {/* Trust Bullet Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2 text-xs font-semibold theme-app-body">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5C623]" /> PSARA-compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5C623]" /> KYC-verified guards
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5C623]" /> Anti-sleep wake-checks
            </span>
          </div>

          {/* ========================================================================= */}
          {/* 2. LIVE COMMAND CENTER MOCKUP CARD (REFERENCE SCREENSHOT 2)               */}
          {/* ========================================================================= */}
          <div className="pt-8 max-w-5xl mx-auto">
            <div className="suraksha-card rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 text-left border border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden">
              
              {/* Animated Horizontal Radar Laser Scanning Beam (Reference Screenshot 6) */}
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C623] to-transparent shadow-[0_0_16px_#F5C623] animate-radarScanSweep pointer-events-none z-20" />
              <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-[#F5C623]/10 to-transparent animate-radarScanSweep pointer-events-none z-10" />

              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Logo size="sm" />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base theme-app-heading">Suraksha Command Center</h3>
                    <p className="text-xs theme-app-body">Watching 24 posts · 6 sites live</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/10 border border-[#F5C623]/30 text-xs font-bold text-[#F5C623] self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
                </div>
              </div>

              {/* 4 Stat Tiles */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold theme-app-heading pt-1">128</div>
                  <p className="text-[11px] theme-app-body">Guards on duty</p>
                </div>

                <div className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold theme-app-heading pt-1">96%</div>
                  <p className="text-[11px] theme-app-body">Attendance</p>
                </div>

                <div className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold theme-app-heading pt-1">24</div>
                  <p className="text-[11px] theme-app-body">Active sites</p>
                </div>

                <div className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold theme-app-heading pt-1">42</div>
                  <p className="text-[11px] theme-app-body">Patrols today</p>
                </div>
              </div>

              {/* Bottom Split: Live Activity Feed & Site Coverage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                
                {/* Live Activity Feed */}
                <div className="lg:col-span-7 p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F5C623]">
                    <Zap className="w-3.5 h-3.5" /> LIVE ACTIVITY
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 text-[#F5C623] flex items-center justify-center font-bold text-[10px]">PK</div>
                      <div className="flex-1">
                        <p className="font-bold theme-app-heading text-xs">Priya K.</p>
                        <p className="text-[10px] theme-app-body">marked present · Post 12</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10">
                      <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-[10px]">RS</div>
                      <div className="flex-1">
                        <p className="font-bold text-rose-600 dark:text-rose-400 text-xs">Gate 3 · Rohit S.</p>
                        <p className="text-[10px] text-rose-500/80">missed wake check · escalated</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-[10px]">ZB</div>
                      <div className="flex-1">
                        <p className="font-bold theme-app-heading text-xs">Patrol · Zone B</p>
                        <p className="text-[10px] theme-app-body">6/6 checkpoints scanned</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-[10px]">AM</div>
                      <div className="flex-1">
                        <p className="font-bold theme-app-heading text-xs">Arjun M.</p>
                        <p className="text-[10px] theme-app-body">checked out · shift complete</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Site Coverage Progress Bars */}
                <div className="lg:col-span-5 p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 space-y-4 text-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider theme-app-body">
                      <MapPin className="w-3.5 h-3.5 text-[#F5C623]" /> SITE COVERAGE
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold theme-app-heading mb-1">
                          <span>DLF Cyber Hub</span>
                          <span>100%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-[#F5C623] rounded-full w-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold theme-app-heading mb-1">
                          <span>Prestige Tech Park</span>
                          <span>92%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-[#F5C623] rounded-full w-[92%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold theme-app-heading mb-1">
                          <span>Brigade Gateway</span>
                          <span>78%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-slate-400 dark:bg-slate-600 rounded-full w-[78%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-full border border-[#F5C623]/30 bg-[#F5C623]/10 text-center text-[11px] font-bold text-[#F5C623]">
                    • All zones patrolled · on schedule
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICES SHOWCASE CARDS GRID (REFERENCE SCREENSHOT 3)                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 theme-app-bg border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5C623]">Tailored Guarding Solutions</span>
            <p className="text-base sm:text-lg theme-app-body leading-relaxed">
              Close protection, events, gated communities, night patrols or commercial premises — whatever you need to protect, Suraksha supplies verified, PSARA-licensed guards, with a 24×7 command center watching every post.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Main Featured Card */}
            <div className="lg:col-span-6 suraksha-card suraksha-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[380px] relative group">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-[#F5C623]/10 border border-[#F5C623]/30 text-[#F5C623] flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-6 h-6 theme-app-body group-hover:text-[#F5C623] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>

              <div className="space-y-4 pt-12">
                <span className="text-xs font-bold text-[#F5C623] uppercase tracking-wider bg-[#F5C623]/10 border border-[#F5C623]/30 px-3 py-1 rounded-full inline-block">
                  Close protection
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold theme-app-heading">
                  Bodyguards & Close Protection
                </h3>
                <p className="text-sm theme-app-body">
                  Premium, KYC-verified personal protection for HNIs and executives.
                </p>
              </div>
            </div>

            {/* Right Card Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Event Security */}
              <div className="sm:col-span-2 suraksha-card suraksha-card-hover rounded-3xl p-8 flex flex-col justify-between min-h-[190px] relative group">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 theme-app-body group-hover:text-[#F5C623] transition" />
                </div>

                <div className="space-y-2 pt-4">
                  <h4 className="text-xl font-bold theme-app-heading">Event Security & Bouncers</h4>
                  <p className="text-xs theme-app-body">Weddings, nightlife, concerts and private events.</p>
                  <span className="text-[10px] font-bold text-[#F5C623] bg-[#F5C623]/10 border border-[#F5C623]/30 px-2.5 py-0.5 rounded-full inline-block mt-1">
                    Events & venues
                  </span>
                </div>
              </div>

              {/* RWA Gate Guards */}
              <div className="suraksha-card suraksha-card-hover rounded-3xl p-6 flex flex-col justify-between min-h-[190px] relative group">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 theme-app-body group-hover:text-[#F5C623] transition" />
                </div>

                <div className="space-y-2 pt-4">
                  <h4 className="text-base font-bold theme-app-heading">RWA Gate Guards</h4>
                  <p className="text-xs theme-app-body">Guarding for gated communities and housing societies.</p>
                </div>
              </div>

              {/* Night Patrols */}
              <div className="suraksha-card suraksha-card-hover rounded-3xl p-6 flex flex-col justify-between min-h-[190px] relative group">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Radio className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 theme-app-body group-hover:text-[#F5C623] transition" />
                </div>

                <div className="space-y-2 pt-4">
                  <h4 className="text-base font-bold theme-app-heading">Night Patrols</h4>
                  <p className="text-xs theme-app-body">Checkpoint-based patrol routes with anti-sleep wake-checks.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "EVERY GUARD, BACKED BY REAL TECHNOLOGY" SECTION (REFERENCE 4 & 5)      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 theme-app-bg border-t border-slate-200 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F5C623]/30 bg-[#F5C623]/10 text-xs font-bold text-[#F5C623]">
                <span className="w-2 h-2 rounded-full bg-[#F5C623]" /> THE TECH BEHIND EVERY GUARD
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold theme-app-heading tracking-tight leading-tight">
                Every guard, backed by{' '}
                <span className="text-[#B8860B] dark:text-[#F5C623]">
                  real technology
                </span>
              </h2>

              <p className="text-sm sm:text-base theme-app-body leading-relaxed">
                Verified guards, GPS attendance, night anti-sleep wake-checks and a 24×7 command center — the systems that keep your posts covered and give you a live, transparent view. PSARA-compliant, built for India.
              </p>
            </div>

            <Link
              href="/admin/login"
              className="trust-yellow-btn px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 uppercase tracking-wider shadow-md shrink-0"
            >
              Client login <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Technology Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Card: Command Center Live Control Room */}
            <div className="lg:col-span-7 suraksha-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-[#F5C623]/30 text-[#F5C623] flex items-center justify-center">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base theme-app-heading">Command Center</h3>
                    <p className="text-xs theme-app-body">Live control room</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#F5C623] bg-[#F5C623]/10 px-3 py-1 rounded-full border border-[#F5C623]/30">
                  • Live
                </span>
              </div>

              <p className="text-xs sm:text-sm theme-app-body leading-relaxed">
                Real-time deployment map, a prioritized alert feed and an incident queue you resolve — SOS first, then missed check-ins and expiring documents.
              </p>

              {/* Priority Alert Items */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-rose-600 dark:text-rose-400 text-xs">SOS · Panic</h5>
                      <p className="text-[10px] text-rose-500/80">Priority 1 Alert</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-rose-500" />
                </div>

                <div className="p-4 rounded-2xl border border-[#F5C623]/30 bg-[#F5C623]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F5C623]/20 text-[#F5C623] flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-xs">Missed check-in</h5>
                      <p className="text-[10px] theme-app-body">Site B · Gate 2</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#F5C623]" />
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-xs">Licence expiring</h5>
                      <p className="text-[10px] theme-app-body">In 6 days</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 theme-app-body" />
                </div>
              </div>
            </div>

            {/* Right Stacked Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Trained & Verified */}
              <div className="suraksha-card rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg border border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-[11px] font-bold text-[#F5C623] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F5C623]" /> TRAINED & VERIFIED
                </span>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">Verified Guards</h5>
                      <p className="text-xs theme-app-body mt-0.5">Trained, KYC-checked, PSARA-cleared</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">Background Screening</h5>
                      <p className="text-xs theme-app-body mt-0.5">Every guard vetted before deployment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">GPS Attendance</h5>
                      <p className="text-xs theme-app-body mt-0.5">Biometric check-in — no proxy, no gaps</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">On-time Pay</h5>
                      <p className="text-xs theme-app-body mt-0.5">Fair wages, EPF + ESIC — reliable guards</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Transparent Billing */}
              <div className="suraksha-card rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg border border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-[11px] font-bold text-[#F5C623] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F5C623]" /> TRANSPARENT BILLING
                </span>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">Your Account</h5>
                      <p className="text-xs theme-app-body mt-0.5">Home, society, corporate or industrial</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">Clear Invoices</h5>
                      <p className="text-xs theme-app-body mt-0.5">GST-compliant, itemised, on time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold theme-app-heading text-sm">Easy Payments</h5>
                      <p className="text-xs theme-app-body mt-0.5">Simple statements, no surprises</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLIENT MARQUEE & SERVICES TAB (PRESERVED)                              */}
      {/* ========================================================================= */}
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
                className="theme-app-bg border border-slate-200 dark:border-slate-800 hover:border-[#F5C623]/40 p-4 rounded-2xl text-center transition duration-200 space-y-1 shadow-xs"
              >
                <div className="font-bold text-sm theme-app-heading">{client.logo}</div>
                <div className="text-[10px] text-[#F5C623] font-bold">{client.status}</div>
                <div className="text-[9px] theme-app-body font-medium">{client.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs Selector */}
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
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
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
          <div className="theme-app-card rounded-3xl p-8 sm:p-10 shadow-xl border border-black/[0.06] dark:border-white/[0.08]">
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
                  className="w-full trust-yellow-btn py-3.5 rounded-full text-xs flex items-center justify-center gap-2 uppercase tracking-wider shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" /> Book {servicesData[activeTab].title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRICING PREVIEW & TESTIMONIALS (PRESERVED)                              */}
      {/* ========================================================================= */}
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
              className="px-6 py-3 rounded-full theme-app-card text-[#F5C623] font-bold text-xs transition flex items-center gap-2 shadow-xs"
            >
              Interactive Cost Calculator <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="theme-app-card p-8 rounded-3xl space-y-6 border border-black/[0.06] dark:border-white/[0.08]">
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
              <Link href="/book-guard" className="block text-center py-3 theme-app-bg border border-slate-300 dark:border-slate-800 hover:border-[#F5C623] text-[#F5C623] font-bold text-xs rounded-full transition">
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
              <Link href="/book-guard" className="block text-center trust-yellow-btn py-3.5 rounded-full text-xs font-bold transition shadow-md">
                Select Armed Officer
              </Link>
            </div>

            <div className="theme-app-card p-8 rounded-3xl space-y-6 border border-black/[0.06] dark:border-white/[0.08]">
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
              <Link href="/collaboration" className="block text-center py-3 theme-app-bg border border-slate-300 dark:border-slate-800 hover:border-[#F5C623] text-[#F5C623] font-bold text-xs rounded-full transition">
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

            {testimonials.length > 3 && (
              <div className="flex justify-end gap-2 -mt-4">
                <button
                  aria-label="Previous reviews"
                  onClick={() => scrollTestimonials(-1)}
                  className="w-9 h-9 rounded-full theme-app-card border border-slate-300 dark:border-slate-800 hover:border-[#F5C623] text-[#F5C623] flex items-center justify-center shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  aria-label="Next reviews"
                  onClick={() => scrollTestimonials(1)}
                  className="w-9 h-9 rounded-full theme-app-card border border-slate-300 dark:border-slate-800 hover:border-[#F5C623] text-[#F5C623] flex items-center justify-center shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div ref={testimonialScroller} className="no-scrollbar flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
              {testimonials.map((t) => (
                <div key={t._id} className="min-w-[300px] sm:min-w-[360px] max-w-[420px] min-h-[230px] snap-start suraksha-card suraksha-card-hover p-8 rounded-3xl space-y-4 flex flex-col">
                  <div className="flex items-center gap-1 text-[#F5C623]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5C623] text-[#F5C623]" />
                    ))}
                  </div>
                  <p className="theme-app-body text-xs italic leading-relaxed">&quot;{t.content}&quot;</p>
                  <div className="pt-4 mt-auto border-t border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold theme-app-heading text-sm">{t.name}</h5>
                    <p className="text-[10px] text-[#F5C623] font-semibold">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length === 0 && <p className="text-center text-xs theme-app-body">Approved client reviews will appear here.</p>}

            <div className="text-center">
              <button
                onClick={() => { setShowReviewForm(true); setReviewMessage(''); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#F5C623]/50 text-[#F5C623] hover:bg-[#F5C623] hover:text-[#0B0D0F] text-xs font-bold transition shadow-xs"
              >
                <Star className="w-4 h-4" /> Add Your Review
              </button>
              <p className="text-[11px] theme-app-body mt-2">Reviews are published after admin approval.</p>
            </div>

            {showReviewForm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form onSubmit={submitReview} className="w-full max-w-xl theme-app-card border border-[#F5C623]/40 rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs shadow-2xl">
                  <div className="sm:col-span-2 flex justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold theme-app-heading">Share your experience</h4>
                      <p className="theme-app-body mt-1">Your review is published after admin approval.</p>
                    </div>
                    <button type="button" onClick={() => setShowReviewForm(false)} className="text-xl theme-app-body hover:text-rose-400">×</button>
                  </div>
                  <input required placeholder="Your name" value={review.name} onChange={(e) => setReview({ ...review, name: e.target.value })} className="theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 outline-none" />
                  <input placeholder="Role / designation" value={review.role} onChange={(e) => setReview({ ...review, role: e.target.value })} className="theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 outline-none" />
                  <input placeholder="Company / agency (optional)" value={review.company} onChange={(e) => setReview({ ...review, company: e.target.value })} className="sm:col-span-2 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 outline-none" />
                  <div className="sm:col-span-2">
                    <p className="theme-app-heading font-bold mb-2">Your rating</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button type="button" key={rating} onClick={() => setReview({ ...review, rating })} aria-label={`${rating} star rating`} className="p-1">
                          <Star className={`w-7 h-7 transition ${rating <= review.rating ? 'fill-[#F5C623] text-[#F5C623]' : 'text-slate-500 hover:text-[#F5C623]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea required rows={4} placeholder="Write your review..." value={review.content} onChange={(e) => setReview({ ...review, content: e.target.value })} className="sm:col-span-2 theme-app-bg border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 outline-none" />
                  <button className="sm:col-span-2 trust-yellow-btn py-3 rounded-full text-xs font-bold">Submit Review for Approval</button>
                  {reviewMessage && <p className="sm:col-span-2 text-center text-xs text-emerald-500">{reviewMessage}</p>}
                </form>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
