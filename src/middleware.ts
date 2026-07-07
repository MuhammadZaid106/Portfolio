import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRODUCTION_HOST = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
  : 'localhost';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const response = NextResponse.next();

  // Block indexing on any non-canonical host (preview deployments, branch URLs)
  if (!host.includes(PRODUCTION_HOST)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
