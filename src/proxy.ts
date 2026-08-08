import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get('host') || '';

  // Detect if incoming request is on the `ops` subdomain (e.g. ops.surakshaguards.in or ops.localhost:4545)
  const isOpsSubdomain = hostname.startsWith('ops.') || hostname.startsWith('ops-');

  let res: NextResponse;

  if (isOpsSubdomain) {
    // 1. Clean URL enforcement: If user typed '/ops/...' or '/admin/...' or '/login' directly in browser bar, redirect to clean path
    if (pathname === '/login' || pathname.startsWith('/ops') || pathname.startsWith('/admin')) {
      const cleanPath = pathname.replace(/^\/(ops|admin|login)/, '') || '/';
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = cleanPath;
      return NextResponse.redirect(redirectUrl, 308); // Permanent clean redirect
    }

    // 2. Seamless Internal Rewrite: Map root & subpaths on ops subdomain to /ops folder routes
    if (
      !pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.')
    ) {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = `/ops${pathname === '/' ? '' : pathname}`;
      res = NextResponse.rewrite(rewriteUrl);
    } else {
      res = NextResponse.next();
    }
  } else {
    res = NextResponse.next();
  }

  // Anti-Caching Security Headers for all Admin, OPS, and Auth routes
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/ops') ||
    pathname.startsWith('/login') ||
    isOpsSubdomain
  ) {
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    res.headers.set('Surrogate-Control', 'no-store');
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets & favicons
     */
    '/((?!_next/static|_next/image|favicon.ico|suraksha-mark.png|logo.png).*)',
  ],
};
