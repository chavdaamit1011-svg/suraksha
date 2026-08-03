'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuardBookingModal from '@/components/GuardBookingModal';
import { CheckCircle2, Star, Shield, Sliders, ChevronDown, Building2 } from 'lucide-react';

export default function PricingPage() {
  const [guardCount, setGuardCount] = useState(5);
  const [shiftHours, setShiftHours] = useState(12);
  const [durationMonths, setDurationMonths] = useState(1);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [customPlanType, setCustomPlanType] = useState('Business / Client');

  const subscriptionPlans = [
    { name: 'Essential Home', price: '₹18,500', period: '/ guard / month', detail: 'For homes, small shops, and short deployments.', features: ['Verified unarmed guard', 'Day or night shift', 'Daily attendance log'], accent: false },
    { name: 'Business Secure', price: '₹55,500', period: '/ 3 guards / month', detail: 'For offices, retail, clinics, and gated premises.', features: ['3 verified officers', 'Supervisor check-ins', 'Incident reporting'], accent: true },
    { name: 'Enterprise Command', price: 'Custom', period: 'annual contract', detail: 'For campuses, warehouses, estates, and multi-site operations.', features: ['24/7 deployment planning', 'Command-center coordination', 'SLA and compliance reporting'], accent: false },
  ];

  // Dynamic price calculation formula
  const baseRatePerGuardPerMonth = 18500;
  const calculatedCost = guardCount * baseRatePerGuardPerMonth * durationMonths * (shiftHours === 24 ? 1.8 : 1.0);

  const faqs = [
    {
      q: 'Are all SURAKSHA guards government certified?',
      a: 'Yes, 100% of our security personnel hold active government permits, police clearance verification, and undergo mandatory background biometric checks.',
    },
    {
      q: 'What happens if a guard is absent or takes leave?',
      a: 'Our 24/7 command center automatically dispatches a trained standby replacement officer to your site within 30 minutes, guaranteeing 100% attendance SLA.',
    },
    {
      q: 'Can we request multi-year B2B tenders for large estates?',
      a: 'Absolutely. We specialize in 1 to 2-year B2B tender contracts for commercial complexes, industrial plants, and tech parks with dedicated supervisors.',
    },
    {
      q: 'Do guards come equipped with body cams and radios?',
      a: 'Yes, armed officers and site leads are equipped with 4K body cameras, GPS tablets, and long-range walkie-talkies linked to our central command network.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Transparent Pricing</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Guarding Packages & Cost Estimator</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">
          Calculate your exact guard deployment budget in real-time or select from our verified security tiers.
        </p>
      </section>

      <section className="py-16 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Subscription plans</p><h2 className="text-3xl font-black text-white mt-2">Choose a security plan that fits</h2><p className="text-sm text-slate-400 mt-3">All plans can be tailored to your site, hours, and staffing requirements.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{subscriptionPlans.map((plan) => <article key={plan.name} className={`rounded-3xl p-7 border ${plan.accent ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10' : 'bg-slate-950 border-slate-800'}`}><div className="flex justify-between items-start gap-3"><div><h3 className="text-xl font-bold text-white">{plan.name}</h3><p className="text-xs text-slate-400 mt-2 min-h-10">{plan.detail}</p></div>{plan.accent && <Star className="w-5 h-5 text-amber-400 fill-amber-400" />}</div><div className="mt-6"><span className="text-3xl font-black text-amber-400">{plan.price}</span><span className="text-xs text-slate-400 ml-1">{plan.period}</span></div><ul className="mt-6 space-y-3 text-xs text-slate-300">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{feature}</li>)}</ul><button onClick={() => setBookingModalOpen(true)} className="w-full mt-7 py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white transition">Choose {plan.name}</button></article>)}</div>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="rounded-3xl p-7 sm:p-10 border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-900 flex flex-col lg:flex-row gap-8 lg:items-center"><div className="flex-1"><Building2 className="w-8 h-8 text-amber-400" /><h2 className="text-2xl font-black text-white mt-4">Need a custom Agency or Client plan?</h2><p className="text-sm text-slate-400 mt-3">For tender contracts, agencies, multi-location sites, or a specific staffing and billing structure, get a tailored proposal.</p></div><div className="w-full lg:w-80 space-y-3"><label className="text-xs font-bold text-slate-300">I need a plan for</label><select value={customPlanType} onChange={(e) => setCustomPlanType(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"><option>Business / Client</option><option>Security Agency Partner</option><option>B2B Tender / Enterprise</option><option>Event / Short-Term Deployment</option></select><button onClick={() => { window.location.href = `/contact?plan=${encodeURIComponent(customPlanType)}`; }} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold">Request Custom Plan</button></div></div></div>
      </section>

      {/* DYNAMIC COST CALCULATOR SLIDER */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-amber-500/40 p-8 sm:p-10 rounded-3xl space-y-8 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Sliders className="w-8 h-8 text-amber-400" />
              <div>
                <h3 className="text-xl font-bold text-amber-400">Interactive Guard Cost Calculator</h3>
                <p className="text-xs text-slate-400">Adjust sliders to calculate estimated deployment budget.</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Guard Count Slider */}
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-200">Guards Needed:</span>
                  <span className="text-amber-400 font-mono text-lg">{guardCount} Officers</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={guardCount}
                  onChange={(e) => setGuardCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Shift Hours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">Shift Pattern</label>
                  <select
                    value={shiftHours}
                    onChange={(e) => setShiftHours(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 outline-none focus:border-amber-500"
                  >
                    <option value={12}>12-Hour Single Shift</option>
                    <option value={24}>24-Hour Dual Shift (2 Guards Rotation)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">Contract Duration</label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 outline-none focus:border-amber-500"
                  >
                    <option value={1}>1 Month Trial</option>
                    <option value={6}>6 Months Contract</option>
                    <option value={12}>1 Year Annual Contract (Best Rate)</option>
                  </select>
                </div>
              </div>

              {/* Calculated Total Box */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400">Estimated Total Investment:</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                    ₹ {calculatedCost.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-slate-400 font-normal">({durationMonths} Month Contract)</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Book This Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-850">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase">Got Questions?</h2>
            <h3 className="text-3xl font-black text-white mt-1">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-100 hover:text-amber-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <GuardBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
