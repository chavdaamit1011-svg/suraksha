'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import WebsiteAdminLayoutShell from '@/components/WebsiteAdminLayoutShell';
import AdminChatbot from '@/components/AdminChatbot';
import SurakshaLoader from '@/components/SurakshaLoader';
import LoginPage from './login/page';
import { getAuthSession, checkAndEnforce7DaySession } from '@/lib/session';

export default function WebsiteAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Ensure Website Admin uses dark class on html root
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');

    const verifySecurity = () => {
      // Exclude login routes from Auth Guard check
      if (['/ops/login', '/admin/login', '/login'].includes(pathname)) {
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // Security Check: Enforce 7-Day Mandatory Re-Login Policy (Checks Cookies & LocalStorage)
      const isExpired = checkAndEnforce7DaySession();
      const { token, user } = getAuthSession();

      if (isExpired || !token || !user || !['superadmin', 'admin'].includes(user?.role)) {
        setAuthorized(false);
        setChecking(false);
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.replace('/admin/login');
        }
        return;
      }

      setAuthorized(true);
      setChecking(false);
    };

    verifySecurity();

    // Prevent Back/Forward Navigation Security Bypass
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        verifySecurity();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', verifySecurity);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', verifySecurity);
    };
  }, [pathname]);

  if (['/ops/login', '/admin/login', '/login'].includes(pathname)) {
    return <>{children}</>;
  }

  if (checking) {
    return <SurakshaLoader fullScreen targetPercent={94} text="SURAKSHA" subtext="VERIFYING SECURITY CLEARANCE" />;
  }

  if (!authorized) {
    return <LoginPage />;
  }

  return (
    <WebsiteAdminLayoutShell>
      {children}
      <AdminChatbot />
    </WebsiteAdminLayoutShell>
  );
}
