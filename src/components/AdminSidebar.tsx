'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import {
  LayoutDashboard,
  Shield,
  FileCheck,
  Radio,
  MapPin,
  AlertTriangle,
  Boxes,
  Briefcase,
  BookOpen,
  GraduationCap,
  Building2,
  HelpCircle,
  DollarSign,
  FileText,
  Globe,
  Settings,
  Users,
  Compass,
  Download,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Crown,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const menuSections = [
    {
      title: '👑 SUPER ADMIN ACCESS CONTROL',
      items: [
        { name: 'Create Admins & RBAC', href: '/admin/users', icon: UserCheck, highlight: true },
        { name: 'Command Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'COMMAND & TELEMETRY',
      items: [
        { name: 'Live GPS Guard Tracking', href: '/admin/live-tracking', icon: Radio },
        { name: 'Patrol Checkpoints', href: '/admin/patrol', icon: MapPin },
        { name: 'Incidents Desk', href: '/admin/incidents', icon: AlertTriangle },
      ],
    },
    {
      title: 'FORCE & ROSTER',
      items: [
        { name: 'Guards Roster & Hiring', href: '/admin/guards', icon: Shield },
        { name: 'Skill Training & Tests', href: '/admin/training', icon: GraduationCap },
        { name: 'Workspace Breakdown', href: '/admin/workspace', icon: Compass },
        { name: 'Agency Console', href: '/admin/console', icon: Boxes },
        { name: 'Asset Inventory', href: '/admin/assets', icon: Boxes },
      ],
    },
    {
      title: 'B2B CONTRACTS & SALES',
      items: [
        { name: 'B2B Bulk Tenders', href: '/admin/tenders', icon: FileCheck },
        { name: 'Sales & Field Leads', href: '/admin/sales-leads', icon: Briefcase },
        { name: 'PDF Proposal Generator', href: '/admin/knowledge', icon: BookOpen },
      ],
    },
    {
      title: 'FINANCE & PAYROLL',
      items: [
        { name: 'Guard Payroll & Invoicing', href: '/admin/payroll', icon: DollarSign },
        { name: 'Statutory Compliance', href: '/admin/compliance', icon: FileText },
      ],
    },
    {
      title: 'ADMINISTRATION & CMS',
      items: [
        { name: 'Website CMS Manager', href: '/admin/cms', icon: Globe },
        { name: 'Branch Offices', href: '/admin/branches', icon: Building2 },
        { name: 'Support Desk Queries', href: '/admin/support-desk', icon: HelpCircle },
        { name: 'GTM & Campaign Ads', href: '/admin/gtm', icon: Globe },
        { name: 'Operations Analytics', href: '/admin/analytics', icon: Globe },
        { name: 'Exportable Reports', href: '/admin/reports', icon: Download },
        { name: 'System Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 min-h-screen flex flex-col shrink-0 font-sans">
      {/* Header Logo */}
      <div className="p-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
          v2.5
        </span>
      </div>

      {/* Clean Menu Sections */}
      <div className="flex-1 px-3 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {menuSections.map((sec, idx) => {
          const isCollapsed = collapsedSections[sec.title];
          return (
            <div key={idx} className="space-y-1">
              {/* Category Label */}
              <button
                onClick={() => toggleSection(sec.title)}
                className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400/90 hover:text-amber-300 transition"
              >
                <span>{sec.title}</span>
                {isCollapsed ? <ChevronRight className="w-3 h-3 text-slate-500" /> : <ChevronDown className="w-3 h-3 text-slate-500" />}
              </button>

              {/* Items List */}
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition duration-150 ${
                          isActive
                            ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30 shadow-sm'
                            : item.highlight
                            ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20'
                            : 'text-slate-300 hover:text-amber-400 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive || item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.highlight && (
                          <span className="text-[9px] font-bold uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-md border border-amber-500/30">
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Super Admin Profile */}
      <div className="p-3 bg-slate-950 border-t border-slate-900">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-850">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
            <Crown className="w-4 h-4 text-slate-950" />
          </div>
          <div className="truncate">
            <h5 className="text-xs font-bold text-amber-400 truncate">Amit Chavda</h5>
            <p className="text-[10px] text-slate-400 truncate">Super Admin Command</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
