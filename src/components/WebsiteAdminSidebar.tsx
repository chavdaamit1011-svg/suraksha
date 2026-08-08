'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Shield,
  Star,
  Mail,
  Globe,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo';

export default function WebsiteAdminSidebar({
  onCloseMobile,
}: {
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Form Queries & Leads', href: '/admin/leads', icon: MessageSquare },
    { name: 'Website User Accounts', href: '/admin/users', icon: Users },
    { name: 'Public Guards Catalog', href: '/admin/guards', icon: Shield },
    { name: 'Testimonials & Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Newsletter Subscribers', href: '/admin/newsletter', icon: Mail },
    { name: 'Website CMS & Content', href: '/admin/cms', icon: Globe },
    { name: 'Admin Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-[276px] bg-[#0F172A] border-r border-slate-800 flex flex-col h-full shrink-0 select-none font-sans text-xs">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 bg-slate-950/50">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Logo size="sm" showText={false} />
          <div>
            <span className="text-sm font-black tracking-wider text-white block leading-none">
              SURAKSHA
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#F5C623] block mt-0.5">
              WEBSITE ADMIN
            </span>
          </div>
        </Link>
        <span className="text-[10px] font-mono font-bold text-[#F5C623] bg-[#F5C623]/10 px-2 py-0.5 rounded border border-[#F5C623]/30">
          Public Site
        </span>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="px-2.5 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Website Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition duration-150 relative ${
                isActive
                  ? 'bg-[#F5C623] text-slate-950 font-bold shadow-md shadow-[#F5C623]/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  isActive ? 'text-slate-950' : 'text-slate-400'
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Website Info Card */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-white truncate text-xs">surakshaguards.in</h5>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-1.5 py-0.5 rounded">
              Live Website
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Sparkles className="w-3 h-3 text-[#F5C623]" />
            <span>Public Admin Panel</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
