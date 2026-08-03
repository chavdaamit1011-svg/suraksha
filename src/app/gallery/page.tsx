import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Camera, ShieldCheck } from 'lucide-react';

const galleryItems = [
  ['Corporate Security', 'Verified officers deployed across commercial sites'],
  ['Event Protection', 'Crowd-control and access-management operations'],
  ['Patrol Operations', '24/7 monitored site patrols and checkpoints'],
  ['Command Center', 'Live coordination for rapid incident response'],
  ['Guard Training', 'Scenario-based training and compliance checks'],
  ['Community Safety', 'Residential and township protection teams'],
];

export default function GalleryPage() {
  return <div className="min-h-screen bg-slate-950 text-slate-100 font-sans"><Navbar />
    <section className="pt-36 pb-16 bg-slate-900 border-b border-amber-500/20 text-center"><span className="text-xs font-bold uppercase tracking-widest text-amber-400">SURAKSHA in action</span><h1 className="text-4xl sm:text-5xl font-black text-white mt-2">Operations Gallery</h1><p className="text-slate-300 text-sm max-w-xl mx-auto mt-4">A look at our people, training, command operations, and client-site deployments.</p></section>
    <section className="py-16"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{galleryItems.map(([title, detail], index) => <article key={title} className="overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition"><div className={`h-52 bg-gradient-to-br ${index % 2 ? 'from-slate-800 via-amber-950/40 to-slate-950' : 'from-amber-950/50 via-slate-800 to-slate-950'} flex items-center justify-center`}><Camera className="w-12 h-12 text-amber-400/80" /></div><div className="p-6"><h2 className="font-bold text-white flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-amber-400" />{title}</h2><p className="text-xs text-slate-400 mt-2">{detail}</p></div></article>)}</div></section>
    <Footer />
  </div>;
}
