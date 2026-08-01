import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SurakshaChatbot from '@/components/SurakshaChatbot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SURAKSHA | Enterprise Security Guarding & Command Platform',
  description: 'ISO 9001:2015 & Govt certified armed and unarmed security guard deployment platform with 24/7 command center live tracking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 min-h-screen flex flex-col`}>
        {children}
        {/* Global AI Security Assistant Chatbot */}
        <SurakshaChatbot />
      </body>
    </html>
  );
}
