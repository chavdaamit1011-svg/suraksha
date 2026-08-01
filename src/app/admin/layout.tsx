'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
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
      setAuthorized(false);
      setChecking(false);
      window.location.href = '/admin/login';
      return;
    }

    try {
      const user = JSON.parse(userStr);
      // Verify admin role access
      if (['superadmin', 'admin'].includes(user.role)) {
        setAuthorized(true);
      } else {
        // Non-admin user trying to access admin portal
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

  // Don't check auth for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Auth checking state
  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center space-y-4 font-sans">
        <Logo size="lg" />
        <div className="flex items-center gap-3 text-amber-400 font-bold text-xs bg-slate-900 border border-amber-500/30 px-5 py-2.5 rounded-2xl shadow-xl">
          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          <span>Verifying Security Clearance & Admin Token...</span>
        </div>
      </div>
    );
  }

  // Unauthorized state
  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans text-center">
        <div className="max-w-md bg-slate-900 border border-rose-500/40 p-8 rounded-3xl space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Admin Security Access Denied</h2>
          <p className="text-xs text-slate-400">
            You must be authenticated with valid Super Admin or Command Officer credentials to view this area.
          </p>
          <a
            href="/admin/login"
            className="inline-block w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition uppercase"
          >
            Authenticate via Admin Portal
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {/* Specialized Admin Command AI Chatbot */}
      <AdminChatbot />
    </>
  );
}
