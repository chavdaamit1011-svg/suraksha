'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import OpsLayoutShell from '@/components/OpsLayoutShell';
import AdminChatbot from '@/components/AdminChatbot';
import SurakshaLoader from '@/components/SurakshaLoader';
import LoginPage from './login/page';

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Ensure OPS Console always uses dark class on html root
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');

    // Exclude login routes from Auth Guard check
    if (['/ops/login', '/admin/login', '/login'].includes(pathname)) {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const token = localStorage.getItem('suraksha_token');
    const userStr = localStorage.getItem('suraksha_user');
    const loginTimeStr = localStorage.getItem('suraksha_login_time');

    if (!token || !userStr) {
      setAuthorized(false);
      setChecking(false);
      return;
    }

    // Security Check: Enforce 7-Day Mandatory Re-Login Policy
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    if (loginTimeStr) {
      const sessionAge = Date.now() - parseInt(loginTimeStr, 10);
      if (sessionAge > SEVEN_DAYS_MS) {
        localStorage.removeItem('suraksha_token');
        localStorage.removeItem('suraksha_user');
        localStorage.removeItem('suraksha_login_time');
        setAuthorized(false);
        setChecking(false);
        return;
      }
    }

    try {
      const user = JSON.parse(userStr);
      if (['superadmin', 'admin'].includes(user?.role)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (e) {
      setAuthorized(false);
    } finally {
      setChecking(false);
    }
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
    <OpsLayoutShell>
      {children}
      <AdminChatbot />
    </OpsLayoutShell>
  );
}
