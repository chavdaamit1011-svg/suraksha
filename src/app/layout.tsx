import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SurakshaChatbot from '@/components/SurakshaChatbot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SURAKSHA | Enterprise Security Guarding & Command Platform',
  description: 'ISO 9001:2015 & Govt certified armed and unarmed security guard deployment platform with 24/7 command center live tracking.',
  icons: {
    icon: '/suraksha-mark.png',
    shortcut: '/suraksha-mark.png',
    apple: '/suraksha-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = sessionStorage.getItem('suraksha_theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans theme-app-bg theme-app-heading antialiased selection:bg-amber-500 selection:text-slate-950 min-h-screen flex flex-col`}>
        {children}
        {/* Global AI Security Assistant Chatbot */}
        <SurakshaChatbot />
      </body>
    </html>
  );
}
