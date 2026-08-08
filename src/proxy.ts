import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get('host') || '';

  // Detect if incoming request is on the `ops` subdomain (e.g. ops.surakshaguards.in or ops.localhost:4545)
  const isOpsSubdomain = hostname.startsWith('ops.') || hostname.startsWith('ops-');

  let res: NextResponse;

  if (isOpsSubdomain) {
    // On ops subdomain, URL mapping:
    //   Browser: ops.localhost/          → Next.js: /ops        (dashboard)
    //   Browser: ops.localhost/login     → Next.js: /ops/login
    //   Browser: ops.localhost/guards    → Next.js: /ops/guards
    //
    // CLEAN URL GUARD: Prevent user manually typing ops.localhost/ops/... which would double-nest.
    // Rewrite happens AFTER this check, so /ops/* here means a raw browser request - redirect to clean path.
    if (pathname.startsWith('/ops/') || pathname === '/ops' || pathname.startsWith('/admin/')) {
      const cleanPath = pathname.replace(/^\/(ops|admin)/, '') || '/';
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = cleanPath;
      return NextResponse.redirect(redirectUrl, 308);
    }

    const isStaticOrApi =
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.includes('.');

    // --- Server-side Auth Guard for ops routes ---
    const isOpsLoginPage = pathname === '/login';

    if (!isOpsLoginPage && !isStaticOrApi) {
      // Protected route - require valid token cookie
      const token = req.cookies.get('suraksha_token')?.value;
      const loginTimeStr = req.cookies.get('suraksha_login_time')?.value;

      let isExpired = false;
      if (loginTimeStr) {
        const loginTime = parseInt(loginTimeStr, 10);
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        if (!isNaN(loginTime) && Date.now() - loginTime > SEVEN_DAYS_MS) {
          isExpired = true;
        }
      }

      if (!token || isExpired) {
        const loginUrl = new URL('/login', req.url);
        if (isExpired) loginUrl.searchParams.set('expired', '1');
        const response = NextResponse.redirect(loginUrl);
        if (isExpired) {
          response.cookies.delete('suraksha_token');
          response.cookies.delete('suraksha_user');
          response.cookies.delete('suraksha_login_time');
        }
        return response;
      }
    }

    // If already logged in and visiting login page, redirect to dashboard
    if (isOpsLoginPage) {
      const token = req.cookies.get('suraksha_token')?.value;
      const loginTimeStr = req.cookies.get('suraksha_login_time')?.value;
      let isExpired = false;
      if (loginTimeStr) {
        const loginTime = parseInt(loginTimeStr, 10);
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        if (!isNaN(loginTime) && Date.now() - loginTime > SEVEN_DAYS_MS) isExpired = true;
      }
      if (token && !isExpired) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Seamless Internal Rewrite: Map ops subdomain paths → /ops/* Next.js routes
    if (!isStaticOrApi) {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = `/ops${pathname === '/' ? '' : pathname}`;
      res = NextResponse.rewrite(rewriteUrl);
    } else {
      res = NextResponse.next();
    }
  } else {
    // --- Main domain (localhost:4545 / surakshaguards.in) ---

    // Server-side Auth Guard for /admin routes
    const isProtectedAdminPath =
      pathname.startsWith('/admin') && pathname !== '/admin/login';

    if (isProtectedAdminPath) {
      const token = req.cookies.get('suraksha_token')?.value;
      const loginTimeStr = req.cookies.get('suraksha_login_time')?.value;
      let isExpired = false;
      if (loginTimeStr) {
        const loginTime = parseInt(loginTimeStr, 10);
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        if (!isNaN(loginTime) && Date.now() - loginTime > SEVEN_DAYS_MS) isExpired = true;
      }
      if (!token || isExpired) {
        const loginUrl = new URL('/admin/login', req.url);
        if (isExpired) loginUrl.searchParams.set('expired', '1');
        const response = NextResponse.redirect(loginUrl);
        if (isExpired) {
          response.cookies.delete('suraksha_token');
          response.cookies.delete('suraksha_user');
          response.cookies.delete('suraksha_login_time');
        }
        return response;
      }
    }

    // If already logged in, redirect away from /admin/login to /admin
    if (pathname === '/admin/login') {
      const token = req.cookies.get('suraksha_token')?.value;
      const loginTimeStr = req.cookies.get('suraksha_login_time')?.value;
      let isExpired = false;
      if (loginTimeStr) {
        const loginTime = parseInt(loginTimeStr, 10);
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        if (!isNaN(loginTime) && Date.now() - loginTime > SEVEN_DAYS_MS) isExpired = true;
      }
      if (token && !isExpired) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

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
