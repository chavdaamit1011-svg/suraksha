'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import {
  ShieldCheck,
  Mail,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  LogIn,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  Building2,
} from 'lucide-react';

export default function AuthPortalPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [accountType, setAccountType] = useState('individual');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('suraksha_token', data.token);
        localStorage.setItem('suraksha_user', JSON.stringify(data.user));
        setAuthenticatedUser(data.user);

        // Send OTP
        await fetch('/api/auth/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'send', email }),
        });

        setLoading(false);
        setStep('otp');
      } else {
        setLoading(false);
        setErrorMessage(data.message || 'Invalid email or password credentials');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage('Server connection failure');
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setLoading(false);
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, company, accountType }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('suraksha_token', data.token);
        localStorage.setItem('suraksha_user', JSON.stringify(data.user));
        setAuthenticatedUser(data.user);

        // Send OTP
        await fetch('/api/auth/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'send', email }),
        });

        setLoading(false);
        setStep('otp');
      } else {
        setLoading(false);
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage('Server connection error');
    }
  };

  // Verify OTP & Role-based Redirection
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email, otp }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        const user = authenticatedUser || JSON.parse(localStorage.getItem('suraksha_user') || '{}');
        if (['superadmin', 'admin'].includes(user.role)) {
          window.location.href = '/admin'; // Redirect to Admin Console
        } else {
          window.location.href = '/profile'; // Redirect to Client Profile
        }
      } else {
        setErrorMessage(data.message || 'Invalid OTP security passkey');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('OTP Verification Error');
    }
  };

  return (
    <div className="min-h-screen theme-app-bg flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#F5C623] selection:text-[#0B0D0F]">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#F5C623]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Clean Centered Auth Container */}
      <div className="w-full max-w-lg theme-app-card rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 border border-[#F5C623]/30 space-y-7">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Link href="/" className="inline-block">
            <Logo size="lg" className="justify-center" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5C623]/10 border border-[#F5C623]/30 text-[#F5C623] text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#F5C623]" /> SURAKSHA Security Portal
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold rounded-2xl flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
          </div>
        )}

        {step === 'form' ? (
          <>
            {/* Tab Selector: Sign In vs Create Account */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => { setTab('login'); setErrorMessage(''); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  tab === 'login'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-body hover:text-[#F5C623]'
                }`}
              >
                <LogIn className="w-4 h-4" /> Sign In
              </button>
              <button
                type="button"
                onClick={() => { setTab('register'); setErrorMessage(''); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  tab === 'register'
                    ? 'trust-yellow-btn shadow-md'
                    : 'theme-app-body hover:text-[#F5C623]'
                }`}
              >
                <UserPlus className="w-4 h-4" /> Create Account
              </button>
            </div>

            {/* Form 1: SIGN IN */}
            {tab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-4 py-3 text-xs theme-app-heading outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-11 py-3 text-xs theme-app-heading outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-400 hover:text-[#F5C623]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-right -mt-1">
                  <Link href="/reset-password" className="text-[11px] font-bold text-[#F5C623] hover:underline">Forgot password?</Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full trust-yellow-btn py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider mt-2"
                >
                  {loading ? 'Authenticating...' : <><ShieldCheck className="w-4 h-4" /> Sign In to Account</>}
                </button>
              </form>
            )}

            {/* Form 2: REGISTER (LOGICAL FIELD SEQUENCE: Name -> Email -> Phone -> Company -> Password -> Confirm Password) */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                
                {/* 1. Full Name */}
                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1">1. Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Rajiv Malhotra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-4 py-3 text-xs theme-app-heading outline-none transition"
                    />
                  </div>
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1">2. Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="rajiv@techpark.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-4 py-3 text-xs theme-app-heading outline-none transition"
                    />
                  </div>
                </div>

                {/* 3. Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold theme-app-heading block mb-1">3. Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-4 py-3 text-xs theme-app-heading outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold theme-app-heading block mb-1">4. Company / Entity</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                      <input
                        type="text"
                        placeholder="Global Tech Park"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-4 py-3 text-xs theme-app-heading outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1">5. Account Type *</label>
                  <select value={accountType} onChange={(e) => setAccountType(e.target.value)} className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl px-4 py-3 text-xs theme-app-heading outline-none transition">
                    <option value="individual">Individual User</option>
                    <option value="client">Business / Client</option>
                    <option value="agency">Security Agency Partner</option>
                  </select>
                  <p className="text-[10px] theme-app-body mt-1">This helps SURAKSHA route your account to the correct admin list.</p>
                </div>

                {/* 5. Password */}
                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1">6. Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-11 py-3 text-xs theme-app-heading outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-400 hover:text-[#F5C623]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 6. Confirm Password */}
                <div>
                  <label className="text-xs font-bold theme-app-heading block mb-1">7. Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full theme-app-bg border border-slate-300 dark:border-slate-800 focus:border-[#F5C623] rounded-2xl pl-11 pr-4 py-3 text-xs theme-app-heading outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full trust-yellow-btn py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider mt-2"
                >
                  {loading ? 'Creating Account...' : <><UserPlus className="w-4 h-4" /> Register New Account</>}
                </button>
              </form>
            )}
          </>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleOtpVerify} className="space-y-5">
            <div className="p-4 rounded-2xl bg-[#F5C623]/10 border border-[#F5C623]/30 text-center space-y-1">
              <h4 className="text-sm font-bold text-[#F5C623] flex items-center justify-center gap-2">
                <KeyRound className="w-4 h-4" /> Enter 6-Digit OTP
              </h4>
              <p className="text-xs theme-app-body">A one-time passcode has been sent to {email}</p>
            </div>

            <div>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-[0.5em] text-xl font-mono font-bold theme-app-bg border border-[#F5C623] rounded-2xl py-4 text-[#F5C623] outline-none shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full trust-yellow-btn py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              {loading ? 'Verifying OTP...' : <><CheckCircle2 className="w-4 h-4" /> Confirm OTP & Enter Account</>}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
