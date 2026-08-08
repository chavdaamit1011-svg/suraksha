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
      const isExpired = checkAndEnforce7DaySession();
      const { token, user } = getAuthSession();
      const isValidSession = !isExpired && token && user && ['superadmin', 'admin'].includes(user?.role);

      // Exclude login routes from Auth Guard check, BUT redirect away if already logged in
      if (['/ops/login', '/admin/login', '/login'].includes(pathname)) {
        if (isValidSession && typeof window !== 'undefined') {
          window.location.replace('/admin');
          return;
        }
        setAuthorized(true);
        setChecking(false);
        return;
      }

      if (!isValidSession) {
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
    const handlePageShow = () => {
      verifySecurity();
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
