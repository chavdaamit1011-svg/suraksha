'use client';

import React, { useState } from 'react';
import OpsSidebar from './OpsSidebar';
import AdminTopBar from './AdminTopBar';
import { X } from 'lucide-react';

export default function OpsLayoutShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="admin-shell flex h-screen w-full bg-[#0B0D0F] text-white font-sans overflow-hidden trinetra-grid-bg">
      {/* Desktop Fixed Left Sidebar (276px) */}
      <div className="hidden lg:block h-full">
        <OpsSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-[276px] max-w-[85vw] h-full bg-[#111316] shadow-2xl z-10">
            <OpsSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md bg-white/[0.08] text-white/70 hover:text-white"
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
