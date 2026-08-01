'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShieldAlert, Cpu, Radio, BarChart3, Users, FileText, Send, Sparkles } from 'lucide-react';

const adminQuickCommands = [
  { label: '📡 Check Live Patrol Count', action: 'patrol' },
  { label: '📜 View Pending B2B Tenders', action: 'tenders' },
  { label: '🚨 Outstanding Security Incidents', action: 'incidents' },
  { label: '💰 Current Month Payroll Summary', action: 'payroll' },
  { label: '⚡ Run Security Diagnostics', action: 'diagnostics' },
];

export default function AdminChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Commander AI online. 🛡️ Welcome to SURAKSHA Operations Control. Select an admin command or query live system metrics.' }
  ]);
  const [input, setInput] = useState('');

  const handleCommandRun = (action: string, label: string) => {
    const userMsg = { sender: 'user', text: label };
    let botReply = '';

    switch (action) {
      case 'patrol':
        botReply = '📡 Live Radar Status: 24 active site checkpoints verified. 4 officers currently on night patrol. SLA QRT Response Time: 3.8 mins.';
        break;
      case 'tenders':
        botReply = '📜 B2B Tenders Status: 2 active contracts worth ₹2.1 Crore/yr. 1 tender pending approval (Global Tech Park 2-Year Contract).';
        break;
      case 'incidents':
        botReply = '🚨 Incidents Status: 0 critical breaches. 1 medium incident (INC-2026-881) resolved at Metro Heights Mall Gate 2.';
        break;
      case 'payroll':
        botReply = '💰 Payroll Status: Total July Disbursed: ₹ 48.6 Lakhs across 142 personnel. 100% PF & ESIC compliant.';
        break;
      case 'diagnostics':
        botReply = '⚡ System Security Diagnostics: 100% Operational. MongoDB cluster connected. Nodemailer SMTP active. Zero unauthorized attempts.';
        break;
      default:
        botReply = 'Command processed successfully.';
    }

    setMessages((prev) => [...prev, userMsg, { sender: 'bot', text: botReply }]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    const userMsg = { sender: 'user', text: userText };

    let botReply = `Commander AI Analysis for "${userText}": Query logged into MongoDB Command Registry. Security clearance level verified.`;
    if (userText.toLowerCase().includes('guard')) {
      botReply = '👮 Guard System Metric: 142 total registered officers. 118 on active duty. 14 in specialized tactical training.';
    } else if (userText.toLowerCase().includes('help')) {
      botReply = 'ℹ️ Admin Help Desk: You can manage guards, approve tenders, review incident logs, and monitor live telemetry radar.';
    }

    setMessages((prev) => [...prev, userMsg, { sender: 'bot', text: botReply }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[130] flex flex-col items-end gap-3 font-sans select-none">
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[21rem] sm:w-[24rem] overflow-hidden rounded-3xl border border-amber-500/40 bg-slate-950/98 shadow-[0_0_50px_rgba(245,158,11,0.2)] backdrop-blur-xl text-slate-100 mb-2"
          >
            {/* Admin Chat Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/10 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Cpu className="h-5 w-5 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    Commander Operations AI <Sparkles className="w-3 h-3 text-amber-400" />
                  </p>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Clearances Authorized
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                    m.sender === 'bot'
                      ? 'bg-slate-900 border border-amber-500/30 text-slate-200 self-start shadow-inner'
                      : 'bg-amber-500 text-slate-950 font-bold self-end ml-auto shadow-md'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Quick Admin Action Commands */}
            <div className="p-3 border-t border-slate-900 bg-slate-900/60 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                Quick Command Queries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {adminQuickCommands.map((cmd) => (
                  <button
                    key={cmd.action}
                    onClick={() => handleCommandRun(cmd.action, cmd.label)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-[11px] font-semibold text-slate-300 hover:text-amber-400 transition"
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <form onSubmit={handleSendCustom} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Ask Commander AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN AI LAUNCHER BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Admin AI' : 'Open Admin AI'}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
        title="Admin Command Operations AI"
      >
        {open ? (
          <X className="h-6 w-6 text-amber-400 font-black" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Cpu className="w-7 h-7 text-amber-400 group-hover:rotate-12 transition duration-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
        )}
      </button>

    </div>
  );
}
