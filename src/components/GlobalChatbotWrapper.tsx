'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SurakshaChatbot from '@/components/SurakshaChatbot';

export default function GlobalChatbotWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Do not show the website chatbot on admin or ops pages
  // since they have their own AdminChatbot.
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/ops'))) {
    return null;
  }

  return <SurakshaChatbot />;
}
