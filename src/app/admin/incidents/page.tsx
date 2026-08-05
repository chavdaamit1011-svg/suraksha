'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { AlertTriangle, Loader2 } from 'lucide-react';

type Incident = { _id: string; incidentId: string; title: string; site: string; severity: string; status: string; reportedBy: string; description: string; createdAt: string };

export default function IncidentDeskPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => fetch('/api/incidents').then((response) => response.json()).then((data) => { if (data.success) setIncidents(data.incidents); }).finally(() => setLoading(false));
  useEffect(() => { load(); const timer = window.setInterval(() => { if (document.visibilityState === 'visible') load(); }, 5000); return () => window.clearInterval(timer); }, []);
  const updateStatus = async (id: string, status: string) => { const response = await fetch('/api/incidents', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) }); const data = await response.json(); if (data.success) setIncidents((current) => current.map((item) => item._id === id ? data.incident : item)); };
  const severityColor: Record<string, string> = { Low: 'text-blue-400 bg-blue-500/10', Medium: 'text-amber-400 bg-amber-500/10', High: 'text-orange-400 bg-orange-500/10', Critical: 'text-rose-400 bg-rose-500/10' };
  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-[#F5C623]" /> Incident Management Desk
        </h1>
        <p className="text-xs text-white/55 mt-1">
          Live incident reports from the Support page. Auto-syncs live.
        </p>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5C623]">
          Reported Site Incidents ({incidents.length})
        </h3>
        {loading ? (
          <div className="p-10 flex justify-center gap-2 text-xs text-white/55">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading incidents...
          </div>
        ) : incidents.length === 0 ? (
          <p className="p-10 text-center text-xs text-white/40">No incident reports received yet.</p>
        ) : (
          <div className="space-y-3 text-xs">
            {incidents.map((incident) => (
              <div
                key={incident._id}
                className="p-5 rounded-lg bg-[#111316] border border-white/[0.08]"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <span className="font-mono text-[#F5C623] font-bold">
                      {incident.incidentId}
                    </span>
                    <h5 className="font-bold text-white text-sm mt-1">{incident.title}</h5>
                    <p className="text-white/55 mt-1">
                      {incident.site} · Reported by: {incident.reportedBy}
                    </p>
                    <p className="mt-3 p-3 rounded-md bg-[#1E1F22] text-white/80 border border-white/[0.04]">
                      {incident.description}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${
                        severityColor[incident.severity] || severityColor.Medium
                      }`}
                    >
                      {incident.severity}
                    </span>
                    <select
                      value={incident.status}
                      onChange={(e) => updateStatus(incident._id, e.target.value)}
                      className="bg-[#1E1F22] border border-white/[0.08] rounded-md px-2 py-1 text-xs text-white outline-none"
                    >
                      <option>Open</option>
                      <option>Investigating</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                    <span className="text-white/40 text-[10px]">
                      {new Date(incident.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
