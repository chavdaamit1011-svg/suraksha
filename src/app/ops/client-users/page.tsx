'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Loader2, Users } from 'lucide-react';

type Account = { _id: string; name: string; email: string; phone?: string; company?: string; accountType?: 'individual' | 'client' | 'agency' | 'user'; role: string };

export default function ClientUsersPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [tab, setTab] = useState<'clients' | 'agencies' | 'users'>('clients');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = () => fetch('/api/users').then((response) => response.json()).then((data) => setAccounts(data.users || [])).finally(() => setLoading(false));
    refresh();
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') refresh(); }, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const agencies = accounts.filter((account) => account.role === 'user' && account.accountType === 'agency');
  const clients = accounts.filter((account) => account.role === 'user' && !agencies.some((agency) => agency._id === account._id) && (account.accountType === 'client' || (!account.accountType && account.company && account.company !== 'Personal Client Account')));
  const users = accounts.filter((account) => account.role === 'user' && !clients.some((client) => client._id === account._id) && !agencies.some((agency) => agency._id === account._id));
  const visible = tab === 'clients' ? clients : tab === 'agencies' ? agencies : users;

  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-[#F5C623]" /> Client & User Accounts
        </h1>
        <p className="text-xs text-white/55 mt-1">
          This is separate from Admin Management. Signup account type determines the list automatically.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTab('clients')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
            tab === 'clients'
              ? 'bg-[#F5C623] text-[#0B0D0F]'
              : 'trinetra-card text-white/70 hover:text-white'
          }`}
        >
          Registered Clients ({clients.length})
        </button>
        <button
          onClick={() => setTab('agencies')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
            tab === 'agencies'
              ? 'bg-[#F5C623] text-[#0B0D0F]'
              : 'trinetra-card text-white/70 hover:text-white'
          }`}
        >
          Agency Partners ({agencies.length})
        </button>
        <button
          onClick={() => setTab('users')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
            tab === 'users'
              ? 'bg-[#F5C623] text-[#0B0D0F]'
              : 'trinetra-card text-white/70 hover:text-white'
          }`}
        >
          Individual Users ({users.length})
        </button>
      </div>

      <div className="trinetra-card border border-white/[0.08] rounded-xl p-6">
        {loading ? (
          <div className="flex justify-center gap-2 p-10 text-xs text-white/55">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading accounts...
          </div>
        ) : visible.length === 0 ? (
          <p className="text-center py-10 text-xs text-white/40">No accounts in this category.</p>
        ) : (
          <div className="space-y-3">
            {visible.map((account) => (
              <div
                key={account._id}
                className="p-4 rounded-lg bg-[#111316] border border-white/[0.08]"
              >
                <p className="font-bold text-white text-sm">{account.name}</p>
                <p className="text-xs text-white/55">
                  {account.email}
                  {account.phone ? ` · ${account.phone}` : ''}
                  {tab !== 'users' ? ` · ${account.company || 'No company supplied'}` : ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
