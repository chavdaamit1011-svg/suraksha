'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Building,
  User,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function WebsiteAdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    name: '',
    company: '',
    role: 'Corporate Client',
    email: '',
    phone: '',
    rating: 5,
    content: '',
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials?all=true');
      const data = await res.json();
      if (data.testimonials) {
        setReviews(data.testimonials);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEditing = !!editingReviewId;
      const url = '/api/testimonials';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...newReview, id: editingReviewId } : newReview;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setEditingReviewId(null);
        fetchReviews();
        setNewReview({ name: '', company: '', role: 'Corporate Client', email: '', phone: '', rating: 5, content: '' });
      } else {
        alert(data.message || 'Error saving testimonial');
      }
    } catch (err) {
      alert('Error saving testimonial');
    }
  };

  const openEditModal = (review: any) => {
    setEditingReviewId(review._id);
    setNewReview({
      name: review.name,
      company: review.company,
      role: review.role,
      email: review.email,
      phone: review.phone,
      rating: review.rating,
      content: review.content,
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Approved' ? 'Pending' : 'Approved';
    try {
      const res = await fetch('/api/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (e) {
      alert('Error deleting testimonial');
    }
  };

  const filteredReviews = reviews.filter((r) =>
    `${r.name} ${r.company} ${r.role} ${r.content} ${r.status}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C623]/15 border border-[#F5C623]/30 text-[#F5C623] text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5" /> WEBSITE REVIEWS & PERMISSION CONTROL
          </div>
          <h1 className="text-2xl font-extrabold text-white">Client Testimonials & Public Visibility</h1>
          <p className="text-xs text-slate-400">
            Approve, edit, or hide client reviews shown on surakshaguards.in. Only approved reviews appear on live website.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="trust-yellow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg uppercase tracking-wider shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Testimonial
        </button>
      </div>

      {/* Reviews Table / Cards Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <h3 className="text-sm font-bold text-[#F5C623]">Testimonials Roster ({filteredReviews.length})</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by client name, company or status..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 text-white border border-slate-800 outline-none focus:border-[#F5C623] transition w-full sm:w-72"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F5C623]" /> Syncing testimonials from database...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center p-12 text-slate-400 text-xs space-y-2">
            <Star className="w-8 h-8 text-slate-600 mx-auto" />
            <p>No testimonials found in database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((r) => {
              const isApproved = r.status === 'Approved';
              return (
                <div
                  key={r._id}
                  className={`p-5 rounded-2xl bg-slate-950 border transition space-y-4 ${
                    isApproved ? 'border-emerald-500/40' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{r.name}</h4>
                      <p className="text-xs text-slate-400">{r.role || 'Client'} · {r.company || 'Corporate'}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[#F5C623]">
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F5C623]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic">"{r.content}"</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    {/* Status Badge */}
                    {isApproved ? (
                      <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/30 text-[10px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Shown on Website
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30 text-[10px] flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Hidden (Pending Approval)
                      </span>
                    )}

                    {/* Action Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(r._id, r.status)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          isApproved
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                        }`}
                      >
                        {isApproved ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Hide from Site
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Approve for Site
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => openEditModal(r)}
                        className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition"
                        title="Edit Testimonial"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteReview(r._id)}
                        className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Testimonial Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F5C623]" /> {editingReviewId ? 'Edit Client Testimonial' : 'Add Client Testimonial'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingReviewId(null);
                  setNewReview({ name: '', company: '', role: 'Corporate Client', email: '', phone: '', rating: 5, content: '' });
                }}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Client Full Name</label>
                <input
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Enter Client Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Company / Organization</label>
                  <input
                    required
                    value={newReview.company}
                    onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                    placeholder="DLF / TechPark / Event"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Star Rating (1 - 5)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Client Email</label>
                  <input
                    type="email"
                    required
                    value={newReview.email}
                    onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Client Mobile</label>
                  <input
                    required
                    value={newReview.phone}
                    onChange={(e) => setNewReview({ ...newReview, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Testimonial Comment</label>
                <textarea
                  rows={3}
                  required
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Enter client review feedback..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#F5C623]"
                />
              </div>

              <button
                type="submit"
                className="w-full trust-yellow-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Save & Publish Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
