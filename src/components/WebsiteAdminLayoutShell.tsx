'use client';

import React, { useState } from 'react';
import WebsiteAdminSidebar from './WebsiteAdminSidebar';
import AdminTopBar from './AdminTopBar';
import { X } from 'lucide-react';

export default function WebsiteAdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="admin-shell flex h-screen w-full bg-[#0B0F17] text-slate-100 font-sans overflow-hidden">
      {/* Desktop Fixed Left Sidebar (276px) */}
      <div className="hidden lg:block h-full">
        <WebsiteAdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-[276px] max-w-[85vw] h-full bg-[#0F172A] shadow-2xl z-10">
            <WebsiteAdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <AdminTopBar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
