'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import AdminLayoutShell from '@/components/AdminLayoutShell';
import AdminChatbot from '@/components/AdminChatbot';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Exclude /admin/login from Auth Guard check
    if (pathname === '/admin/login') {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const token = localStorage.getItem('suraksha_token');
    const userStr = localStorage.getItem('suraksha_user');

    if (!token || !userStr) {
      // For demo / development convenience, fallback to auto-auth if local token not set
      const demoUser = {
        name: 'Amit Chavda',
        role: 'superadmin',
        email: 'chavdaamit1011@gmail.com',
      };
      localStorage.setItem('suraksha_token', 'demo_trinetra_token_2026');
      localStorage.setItem('suraksha_user', JSON.stringify(demoUser));
      setAuthorized(true);
      setChecking(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (['superadmin', 'admin'].includes(user.role)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        window.location.href = '/profile';
      }
    } catch (e) {
      setAuthorized(false);
      window.location.href = '/admin/login';
    } finally {
      setChecking(false);
    }
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0B0D0F] text-white flex flex-col items-center justify-center space-y-4 font-sans trinetra-grid-bg">
        <Logo size="lg" />
        <div className="flex items-center gap-3 text-[#F5C623] font-bold text-xs bg-[#1E1F22] border border-[#F5C623]/30 px-5 py-2.5 rounded-xl shadow-2xl">
          <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" />
          <span>Verifying SURAKSHA Security Clearance & Admin Token...</span>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0B0D0F] text-white flex flex-col items-center justify-center p-4 font-sans text-center trinetra-grid-bg">
        <div className="max-w-md bg-[#1E1F22] border border-[#EF4444]/40 p-8 rounded-2xl space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-xl bg-[#EF4444]/20 text-[#EF4444] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">SURAKSHA AGENCY OS — Access Denied</h2>
          <p className="text-xs text-white/55">
            You must be authenticated with valid Super Admin credentials to view Apex Shield Security operations.
          </p>
          <a
            href="/admin/login"
            className="inline-block w-full py-3 bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold text-xs rounded-lg shadow transition uppercase"
          >
            Authenticate via Admin Portal
          </a>
        </div>
      </div>
    );
  }

  return (
    <AdminLayoutShell>
      {children}
      <AdminChatbot />
    </AdminLayoutShell>
  );
}
