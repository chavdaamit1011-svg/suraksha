'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  Building2,
  Users,
  Shield,
  UserPlus,
  GraduationCap,
  Package,
  Briefcase,
  MapPin,
  FileCheck,
  TrendingUp,
  Calendar,
  Clock,
  Radio,
  Activity,
  Compass,
  Moon,
  AlertTriangle,
  UserCheck,
  FileText,
  DollarSign,
  Receipt,
  CreditCard,
  PieChart,
  ShieldCheck,
  Scale,
  Folder,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Globe,
  Star,
  Mail,
  BookOpen,
  Crown,
  Share2,
} from 'lucide-react';

import Logo from './Logo';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export default function AdminSidebar({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const groups: SidebarGroup[] = [
    {
      title: 'OVERVIEW',
      items: [{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
    },
    {
      title: 'ORGANIZATION',
      items: [
        { name: 'Organization', href: '/admin/organization', icon: Building },
        { name: 'Branches', href: '/admin/branches', icon: Building2 },
        { name: 'Team & Roles', href: '/admin/team', icon: Users },
      ],
    },
    {
      title: 'WORKFORCE',
      items: [
        { name: 'Guards', href: '/admin/guards', icon: Shield },
        { name: 'Recruitment', href: '/admin/recruitment', icon: UserPlus },
        { name: 'Training', href: '/admin/training', icon: GraduationCap },
        { name: 'Assets', href: '/admin/assets', icon: Package },
      ],
    },
    {
      title: 'CLIENTS & SALES',
      items: [
        { name: 'Clients', href: '/admin/clients', icon: Briefcase },
        { name: 'Sites', href: '/admin/sites', icon: MapPin },
        { name: 'Contracts', href: '/admin/contracts', icon: FileCheck },
        { name: 'Sales & Leads', href: '/admin/sales-leads', icon: TrendingUp },
        { name: 'B2B Tenders', href: '/admin/tenders', icon: FileText },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Scheduler', href: '/admin/scheduler', icon: Calendar },
        { name: 'Attendance', href: '/admin/attendance', icon: Clock },
        { name: 'Live Tracking', href: '/admin/live-tracking', icon: Radio },
        { name: 'Command Center', href: '/admin/command-center', icon: Activity },
        { name: 'Patrol', href: '/admin/patrol', icon: Compass },
        { name: 'Night Alertness', href: '/admin/night-alertness', icon: Moon },
        { name: 'Incidents', href: '/admin/incidents', icon: AlertTriangle },
        { name: 'Visitors', href: '/admin/visitors', icon: UserCheck },
        { name: 'Reports', href: '/admin/reports', icon: FileText },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { name: 'Payroll', href: '/admin/payroll', icon: DollarSign },
        { name: 'Invoicing', href: '/admin/invoicing', icon: Receipt },
        { name: 'Payments', href: '/admin/payments', icon: CreditCard },
        { name: 'Expenses', href: '/admin/expenses', icon: PieChart },
      ],
    },
    {
      title: 'GOVERNANCE',
      items: [
        { name: 'Compliance', href: '/admin/compliance', icon: ShieldCheck },
        { name: 'Legal', href: '/admin/legal', icon: Scale },
        { name: 'Documents', href: '/admin/documents', icon: Folder },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'SYSTEM & EXTENSIONS',
      items: [
        { name: 'Admin Users', href: '/admin/users', icon: Crown },
        { name: 'Client Accounts', href: '/admin/client-users', icon: Share2 },
        { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
        { name: 'Website CMS', href: '/admin/cms', icon: Globe },
        { name: 'GTM & Ads', href: '/admin/gtm', icon: Globe },
        { name: 'Proposal Vault', href: '/admin/knowledge', icon: BookOpen },
        { name: 'Reviews', href: '/admin/reviews', icon: Star },
        { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
        { name: 'Support', href: '/admin/support-desk', icon: HelpCircle },
      ],
    },
  ];

  return (
    <aside className="w-[276px] bg-[#111316] border-r border-white/[0.08] flex flex-col h-full shrink-0 select-none font-sans text-xs">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.08]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Logo size="sm" />
          <div>
            <span className="text-sm font-black tracking-wider text-white block leading-none">
              SURAKSHA
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#F5C623] block mt-0.5">
              AGENCY OS
            </span>
          </div>
        </Link>
        <span className="text-[10px] font-mono font-bold text-white/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
          v4.2
        </span>
      </div>

      {/* Scrollable Groups Navigation */}
      <div className="flex-1 px-3 py-3 space-y-4 overflow-y-auto custom-scrollbar">
        {groups.map((group, groupIdx) => {
          const isCollapsed = collapsedSections[group.title];
          return (
            <div key={groupIdx} className="space-y-1">
              {/* Group Heading */}
              <button
                onClick={() => toggleSection(group.title)}
                className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white/70 transition"
              >
                <span>{group.title}</span>
                {isCollapsed ? (
                  <ChevronRight className="w-3 h-3 text-white/30" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-white/30" />
                )}
              </button>

              {/* Items */}
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onCloseMobile}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition duration-150 relative ${
                          isActive
                            ? 'bg-white/[0.07] text-white font-semibold border-l-2 border-[#F5C623]'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <Icon
                          className={`w-[18px] h-[18px] shrink-0 ${
                            isActive ? 'text-[#F5C623]' : 'text-white/40'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Tenant Info Card */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0B0D0F]">
        <div className="p-3 rounded-lg bg-[#1E1F22] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-white truncate text-xs">Suraksha Security Agency</h5>
            <span className="text-[10px] font-bold text-[#F5C623] bg-[#F5C623]/10 border border-[#F5C623]/30 px-1.5 py-0.5 rounded">
              Professional
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Tenant online · synced</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
