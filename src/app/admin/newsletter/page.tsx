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
  return <div className="flex min-h-screen theme-app-bg font-sans"><AdminSidebar />
    <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div><h1 className="text-2xl font-bold theme-app-heading flex items-center gap-2"><Mail className="w-6 h-6 text-[#F5C623]" /> Newsletter Subscribers</h1><p className="text-xs theme-app-body mt-1">Emails submitted through the website footer are stored here.</p></div>
        <button onClick={loadSubscribers} className="trust-yellow-btn px-4 py-2 rounded-xl text-xs flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Refresh</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5"><p className="text-xs theme-app-body">Total subscribers</p><p className="text-3xl font-bold text-[#F5C623]">{subscribers.length}</p></div><div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5"><p className="text-xs theme-app-body">Active subscribers</p><p className="text-3xl font-bold text-emerald-500">{activeCount}</p></div></div>
      <div className="theme-app-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        {loading ? <div className="flex justify-center p-12 text-xs theme-app-body gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading subscribers...</div> : subscribers.length === 0 ? <p className="text-center py-10 text-xs theme-app-body">No newsletter subscriptions yet.</p> : <div className="space-y-3">{subscribers.map((subscriber) => <div key={subscriber._id} className="p-4 rounded-2xl theme-app-bg border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><p className="font-bold theme-app-heading text-sm">{subscriber.email}</p><p className="text-xs theme-app-body">{subscriber.name || 'Newsletter subscriber'} · Joined {new Date(subscriber.createdAt).toLocaleDateString()}</p></div><button disabled={updating === subscriber._id} onClick={() => updateStatus(subscriber._id, subscriber.status === 'subscribed' ? 'unsubscribed' : 'subscribed')} className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${subscriber.status === 'subscribed' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-slate-500/15 text-slate-400'}`}>{subscriber.status === 'subscribed' ? <UserRoundCheck className="w-4 h-4" /> : <UserRoundX className="w-4 h-4" />}{subscriber.status === 'subscribed' ? 'Subscribed' : 'Unsubscribed'}</button></div>)}</div>}
      </div>
    </main>
  </div>;
}
