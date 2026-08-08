'use client';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { CreditCard, Loader2 } from 'lucide-react';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => fetch('/api/subscriptions').then((r) => r.json()).then((data) => { if (data.success) setSubscriptions(data.subscriptions); }).finally(() => setLoading(false));
  useEffect(() => { load(); const timer = window.setInterval(() => { if (document.visibilityState === 'visible') load(); }, 5000); return () => window.clearInterval(timer); }, []);
  const changeStatus = async (id: string, status: string) => { const r = await fetch('/api/subscriptions', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) }); const data = await r.json(); if (data.success) setSubscriptions((all) => all.map((item) => item._id === id ? data.subscription : item)); };
  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex gap-2 items-center">
          <CreditCard className="w-6 h-6 text-[#F5C623]" /> Subscription Plans
        </h1>
        <p className="text-xs text-white/55 mt-1">
          Plan requests from the Pricing page. Auto-syncs live.
        </p>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6">
        {loading ? (
          <div className="p-10 flex justify-center gap-2 text-xs text-white/55">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading subscriptions...
          </div>
        ) : subscriptions.length === 0 ? (
          <p className="p-10 text-center text-xs text-white/40">No subscription plan requests yet.</p>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((item) => (
              <article
                key={item._id}
                className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div>
                  <p className="font-bold text-[#F5C623]">{item.planName}</p>
                  <h2 className="font-bold text-white mt-1 text-sm">
                    {item.fullName}
                    {item.company ? ` · ${item.company}` : ''}
                  </h2>
                  <p className="text-xs text-white/55">
                    {item.email} · {item.phone}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {item.location || 'Location not provided'} · {item.guardCount} guards ·{' '}
                    {item.duration}
                  </p>
                </div>
                <select
                  value={item.status}
                  onChange={(e) => changeStatus(item._id, e.target.value)}
                  className="self-start bg-[#1E1F22] border border-white/[0.08] rounded-md px-3 py-1.5 text-xs text-white outline-none"
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Active</option>
                  <option>Cancelled</option>
                </select>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
