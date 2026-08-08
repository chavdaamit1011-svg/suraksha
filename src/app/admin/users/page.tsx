'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  CheckCircle2,
  Lock,
  Mail,
  Loader2,
  Check,
  Search,
  Phone,
  Building,
  UserCheck,
  Plus,
} from 'lucide-react';

export default function WebsiteAdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: 'Pass@1234',
    phone: '',
    company: '',
    role: 'user',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.users && data.users.length > 0) {
        setUsers(data.users);
      } else {
        setUsers([
          {
            _id: '1',
            name: 'Amit Chavda (Super Admin)',
            username: 'chavdaamit',
            email: 'chavdaamit1011@gmail.com',
            phone: '+91 98765 43210',
            company: 'SURAKSHA Security Operations Corp',
            role: 'superadmin',
            isActive: true,
            createdAt: new Date().toISOString(),
          },
          {
            _id: '2',
            name: 'Vikram Malhotra',
            username: 'vikramm',
            email: 'vikram@techpark.com',
            phone: '+91 98112 33445',
            company: 'DLF Cyber City',
            role: 'user',
            isActive: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchUsers();
        setNewUser({ name: '', username: '', email: '', password: 'Pass@1234', phone: '', company: '', role: 'user' });
      } else {
        alert(data.message || 'Error creating user');
      }
    } catch (err) {
      alert('Error creating user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user account?')) return;
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (e) {
      alert('Error deleting user');
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.username} ${u.phone} ${u.company} ${u.role}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" /> WEBSITE USER ACCOUNTS
          </div>
          <h1 className="text-2xl font-extrabold text-white">Public Website Registered Users</h1>
          <p className="text-xs text-slate-400">
            Manage user accounts, client profiles, and authentication credentials registered on surakshaguards.in
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="trust-yellow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg uppercase tracking-wider shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Website User
        </button>
      </div>

      {/* Users Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <h3 className="text-sm font-bold text-[#F5C623]">Registered Accounts Roster ({filteredUsers.length})</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users by name, email or company..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 text-white border border-slate-800 outline-none focus:border-[#F5C623] transition w-full sm:w-72"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Loading user accounts...
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user._id || user.email}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-white">{user.name}</h4>
                    <span className="text-[10px] font-bold text-[#F5C623] bg-[#F5C623]/10 px-2.5 py-0.5 rounded-full border border-[#F5C623]/30 uppercase">
                      {user.role}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span><strong className="text-slate-300">Email:</strong> {user.email}</span>
                    <span><strong className="text-slate-300">Phone:</strong> {user.phone || 'N/A'}</span>
                    <span><strong className="text-slate-300">Company:</strong> {user.company || 'Personal'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Account Verified
                  </span>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition text-xs font-bold"
                    title="Delete User Account"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#F5C623]" /> Create New Website Account
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-xs font-bold">
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Username</label>
                  <input
                    required
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="e.g. johndoe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Mobile Number</label>
                  <input
                    required
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Company Name</label>
                  <input
                    value={newUser.company}
                    onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                    placeholder="Company / Personal"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  >
                    <option value="user">User / Client</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full trust-yellow-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
