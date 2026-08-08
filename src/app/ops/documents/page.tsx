'use client';

import React from 'react';
import { Folder, FileText, Download, Shield } from 'lucide-react';

const docsList = [
  { name: 'PSARA License Copy 2024-2028.pdf', category: 'Government License', size: '2.4 MB', date: '12 Jan 2024' },
  { name: 'EPF Registration & Certificate.pdf', category: 'Statutory', size: '1.1 MB', date: '05 Feb 2024' },
  { name: 'ESIC Agency Certificate.pdf', category: 'Statutory', size: '980 KB', date: '18 Feb 2024' },
  { name: 'Standard Client SLA Template 2026.docx', category: 'Contracts', size: '450 KB', date: '01 Jan 2026' },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Document Vault
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Central repository for PSARA licenses, statutory registrations, agreement templates, compliance audit PDFs.
          </p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Document Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">File Size</th>
                <th className="py-3 px-3">Last Updated</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {docsList.map((doc, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F5C623]" /> {doc.name}
                  </td>
                  <td className="py-3 px-3 text-white/70">{doc.category}</td>
                  <td className="py-3 px-3 font-mono text-white/60">{doc.size}</td>
                  <td className="py-3 px-3 text-white/60">{doc.date}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="p-1.5 rounded hover:bg-white/[0.06] text-white/60 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
