import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Detect if incoming request is on the `ops` subdomain (e.g. ops.suraksha.com or ops.localhost:4545)
  const isOpsSubdomain = hostname.startsWith('ops.') || hostname.startsWith('ops-');

  if (isOpsSubdomain) {
    // Rewrite requests on ops subdomain directly to /admin routes seamlessly
    if (
      !url.pathname.startsWith('/admin') &&
      !url.pathname.startsWith('/api') &&
      !url.pathname.startsWith('/_next') &&
      !url.pathname.includes('.')
    ) {
      url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
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
