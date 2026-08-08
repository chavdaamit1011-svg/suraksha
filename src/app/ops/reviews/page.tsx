'use client';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { CheckCircle2, Star, Trash2 } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const load = () => fetch('/api/testimonials?all=true').then((r) => r.json()).then((data) => { if (data.success) setReviews(data.testimonials); });
  useEffect(() => { load(); const timer = setInterval(load, 10000); return () => clearInterval(timer); }, []);
  const approve = async (id: string) => { const r = await fetch('/api/testimonials', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'Approved' }) }); const data = await r.json(); if (data.success) setReviews((all) => all.map((item) => item._id === id ? data.testimonial : item)); };
  const remove = async (id: string) => { if (!confirm('Delete this review permanently?')) return; await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' }); setReviews((all) => all.filter((item) => item._id !== id)); };
  return (
    <div className="space-y-6 font-sans">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white flex gap-2 items-center">
          <Star className="w-6 h-6 text-[#F5C623]" /> Review Moderation
        </h1>
        <p className="text-xs text-white/55 mt-1">
          Approve reviews to publish them on the Home page, or delete unwanted submissions.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center py-10 text-xs text-white/40">No submitted reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <article
              key={review._id}
              className="trinetra-card rounded-xl p-5 border border-white/[0.08]"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="flex text-[#F5C623]">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h2 className="font-bold text-white mt-2 text-sm">{review.name}</h2>
                  <p className="text-xs text-white/40">
                    {review.role}
                    {review.company ? ` · ${review.company}` : ''}
                  </p>
                  <p className="text-xs text-white/80 mt-3 font-serif italic">
                    “{review.content}”
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span
                    className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                      review.status === 'Approved'
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-[#F5C623] bg-[#F5C623]/10 border border-[#F5C623]/20'
                    }`}
                  >
                    {review.status}
                  </span>
                  {review.status !== 'Approved' && (
                    <button
                      onClick={() => approve(review._id)}
                      className="p-1.5 rounded-md text-emerald-400 hover:bg-emerald-500/10"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => remove(review._id)}
                    className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#EF4444]/10"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
