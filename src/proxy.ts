import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get('host') || '';

  // Detect if incoming request is on the `ops` subdomain (e.g. ops.surakshaguards.in or ops.localhost:4545)
  const isOpsSubdomain = hostname.startsWith('ops.') || hostname.startsWith('ops-');

  if (isOpsSubdomain) {
    // 1. Clean URL enforcement: If user typed '/ops/...' or '/admin/...' or '/login' directly in browser bar, redirect to clean path
    if (pathname === '/login' || pathname.startsWith('/ops') || pathname.startsWith('/admin')) {
      const cleanPath = pathname.replace(/^\/(ops|admin|login)/, '') || '/';
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = cleanPath;
      return NextResponse.redirect(redirectUrl, 308); // Permanent clean redirect
    }

    // 2. Seamless Internal Rewrite: Map root & subpaths on ops subdomain to /ops folder routes
    // Example: ops.surakshaguards.in/ -> internal rewrite to /ops
    // Example: ops.surakshaguards.in/branches -> internal rewrite to /ops/branches
    if (
      !pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.')
    ) {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = `/ops${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets & favicons
     */
    '/((?!_next/static|_next/image|favicon.ico|suraksha-mark.png|logo.png).*)',
  ],
};
