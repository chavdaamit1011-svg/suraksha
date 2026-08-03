import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen } from 'lucide-react';

const posts = [
  ['How to choose the right security plan for your site', 'A practical checklist for homes, offices, warehouses, and events.'],
  ['Five controls that improve commercial-site security', 'Simple operations practices that reduce access and patrol gaps.'],
  ['Why trained guards need a live command center', 'How real-time coordination improves emergency response.'],
];

export default function BlogPage() {
  return <div className="min-h-screen bg-slate-950 text-slate-100 font-sans"><Navbar />
    <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center"><span className="text-xs font-bold uppercase tracking-widest text-amber-400">Security insights</span><h1 className="text-4xl sm:text-5xl font-black text-white mt-2">SURAKSHA Blog</h1><p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">Practical guidance on guarding, surveillance, safety planning, and compliance.</p></section>
    <section className="py-16"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">{posts.map(([title, excerpt], index) => <article key={title} className="bg-slate-900 border border-slate-800 rounded-3xl p-7 space-y-4 hover:border-amber-500/50 transition"><BookOpen className="w-8 h-8 text-amber-400" /><p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Security guide · {index + 1}</p><h2 className="font-bold text-white leading-snug">{title}</h2><p className="text-xs text-slate-400 leading-relaxed">{excerpt}</p><Link href="/contact" className="text-xs font-bold text-amber-400 inline-flex items-center gap-1">Talk to our team <ArrowRight className="w-4 h-4" /></Link></article>)}</div></section>
    <Footer />
  </div>;
}
