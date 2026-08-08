'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Phone,
  Shield,
  Menu,
  X,
} from 'lucide-react';

import Logo from './Logo';

import { clearAuthSession } from '@/lib/session';

export default function AdminTopBar({
  onToggleMobileSidebar,
}: {
  onToggleMobileSidebar?: () => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSignOut = () => {
    clearAuthSession();
    const isOps = typeof window !== 'undefined' && (window.location.hostname.startsWith('ops.') || window.location.pathname.startsWith('/ops'));
    const loginTarget = isOps ? '/ops/login' : '/admin/login';
    window.location.replace(loginTarget);
  };

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#111316]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4 font-sans text-xs">
      {/* Left Area: Mobile Hamburger + Tenant Identity Pill */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#1E1F22] border border-white/[0.08]">
          <Logo size="sm" showText={false} />
          <span className="font-bold text-white text-xs">Suraksha Security Agency</span>
          <span className="text-[10px] font-bold text-[#F5C623] border border-[#F5C623]/40 px-1.5 py-0.5 rounded uppercase tracking-wider">
            Professional
          </span>
        </div>
      </div>

      {/* Right Area: Search + Notifications + Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guards, clients, sites…"
            className="w-full bg-[#1E1F22] border border-white/[0.08] focus:border-[#F5C623]/60 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/32 focus:outline-none transition"
          />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg bg-[#1E1F22] border border-white/[0.08] text-white/70 hover:text-white transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#F5C623] absolute top-1.5 right-1.5 ring-2 ring-[#111316]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#1E1F22] border border-white/[0.08] rounded-lg shadow-2xl p-3 space-y-2 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <span className="font-bold text-white text-xs">Notifications</span>
                <span className="text-[10px] text-[#F5C623] font-mono">3 unread</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04] space-y-0.5">
                  <div className="text-white font-medium">Police verification uploaded</div>
                  <div className="text-white/40 text-[10px]">Guard Imran Khan • 24m ago</div>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04] space-y-0.5">
                  <div className="text-white font-medium">Contract Renewed</div>
                  <div className="text-white/40 text-[10px]">DLF Cyber City • 1h ago</div>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04] space-y-0.5">
                  <div className="text-white font-medium">Invoice Generated</div>
                  <div className="text-white/40 text-[10px]">INV-2025-048 • 2h ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-lg bg-[#1E1F22] border border-white/[0.08] hover:border-white/20 transition"
          >
            <div className="w-7 h-7 rounded-md bg-[#F5C623] text-[#0B0D0F] font-extrabold flex items-center justify-center text-xs shrink-0">
              AC
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-bold text-white text-xs leading-none">Amit Chavda</div>
              <div className="text-[10px] text-white/50 leading-none mt-0.5">Super Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/40 ml-1" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1E1F22] border border-white/[0.08] rounded-lg shadow-2xl p-2 space-y-1 z-50 animate-fadeIn">
              <div className="p-2.5 bg-white/[0.03] rounded-md border border-white/[0.04] space-y-1">
                <div className="font-bold text-white text-xs">Amit Chavda</div>
                <div className="text-[10px] text-[#F5C623] font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Super Admin Command
                </div>
                <div className="text-[10px] text-white/50 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-white/40" /> +91 98765 43210
                </div>
              </div>

              <a
                href="/admin/settings"
                className="flex items-center gap-2 px-2.5 py-2 rounded text-xs text-white/70 hover:text-white hover:bg-white/[0.05] transition"
              >
                <User className="w-3.5 h-3.5" /> Profile & Account
              </a>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs text-[#EF4444] hover:bg-[#EF4444]/10 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
