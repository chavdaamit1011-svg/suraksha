'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Legal Standard</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Privacy Policy</h1>
        <p className="text-slate-400 text-xs mt-2">Last Updated: July 2026</p>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-xs leading-relaxed bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-2">1. Data Collection & Biometric Security</h3>
            <p>
              SURAKSHA collects personal information required for security guard deployment, police clearance verification, and site access telemetry. Biometric logs are encrypted under ISO 27001 standards and never sold to third parties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-2">2. Live Location & Telemetry Tracking</h3>
            <p>
              GPS patrol tracking is active only during guard shift hours to ensure site perimeter coverage. Telemetry data is retained for 90 days for audit and incident resolution purposes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-2">3. Data Protection Rights</h3>
            <p>
              Clients and security personnel have full rights to request access to their saved logs, update profile details, or request account deactivation by emailing privacy@suraksha.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
