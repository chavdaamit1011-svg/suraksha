'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Loader2, Mail, RefreshCw, UserRoundCheck, UserRoundX } from 'lucide-react';

type Subscriber = { _id: string; email: string; name?: string; status: 'subscribed' | 'unsubscribed'; createdAt: string };

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/newsletter');
      const data = await response.json();
      if (data.success) setSubscribers(data.subscribers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const refresh = () => fetch('/api/newsletter')
      .then((response) => response.json())
      .then((data) => { if (data.success) setSubscribers(data.subscribers); })
      .catch(() => undefined)
      .finally(() => setLoading(false));
    refresh();
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') refresh(); }, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const updateStatus = async (id: string, status: Subscriber['status']) => {
    setUpdating(id);
    try {
      const response = await fetch('/api/newsletter', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
      const data = await response.json();
      if (data.success) setSubscribers((current) => current.map((s) => s._id === id ? data.subscriber : s));
    } finally {
      setUpdating(null);
    }
  };

  const activeCount = subscribers.filter((s) => s.status === 'subscribed').length;
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#F5C623]" /> Newsletter Subscribers
          </h1>
          <p className="text-xs text-white/55 mt-1">
            Emails submitted through the website footer are stored here.
          </p>
        </div>
        <button
          onClick={loadSubscribers}
          className="trinetra-btn-primary px-4 py-2 rounded-lg bg-[#F5C623] hover:bg-[#E5B612] text-[#0B0D0F] font-bold text-xs flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="trinetra-card rounded-xl p-5">
          <p className="text-xs text-white/55">Total subscribers</p>
          <p className="text-3xl font-bold text-[#F5C623]">{subscribers.length}</p>
        </div>
        <div className="trinetra-card rounded-xl p-5">
          <p className="text-xs text-white/55">Active subscribers</p>
          <p className="text-3xl font-bold text-emerald-400">{activeCount}</p>
        </div>
      </div>

      <div className="trinetra-card rounded-xl p-6">
        {loading ? (
          <div className="flex justify-center p-12 text-xs text-white/55 gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <p className="text-center py-10 text-xs text-white/40">No newsletter subscriptions yet.</p>
        ) : (
          <div className="space-y-3">
            {subscribers.map((subscriber) => (
              <div
                key={subscriber._id}
                className="p-4 rounded-lg bg-[#111316] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <p className="font-bold text-white text-sm">{subscriber.email}</p>
                  <p className="text-xs text-white/40">
                    {subscriber.name || 'Newsletter subscriber'} · Joined{' '}
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  disabled={updating === subscriber._id}
                  onClick={() =>
                    updateStatus(
                      subscriber._id,
                      subscriber.status === 'subscribed' ? 'unsubscribed' : 'subscribed'
                    )
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 ${
                    subscriber.status === 'subscribed'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/[0.04] text-white/40'
                  }`}
                >
                  {subscriber.status === 'subscribed' ? (
                    <UserRoundCheck className="w-4 h-4" />
                  ) : (
                    <UserRoundX className="w-4 h-4" />
                  )}
                  {subscriber.status === 'subscribed' ? 'Subscribed' : 'Unsubscribed'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
