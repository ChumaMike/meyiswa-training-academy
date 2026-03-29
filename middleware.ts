import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get('mta_session');
  const staffSession = request.cookies.get('mta_staff_session');

  // Admin portal protection
  if (pathname.startsWith('/dashboard') && !adminSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && adminSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Staff portal protection
  if (pathname.startsWith('/staff/dashboard') && !staffSession) {
    return NextResponse.redirect(new URL('/staff/login', request.url));
  }

  if (pathname.startsWith('/staff') && !pathname.includes('/login') && !staffSession) {
    return NextResponse.redirect(new URL('/staff/login', request.url));
  }

  if (pathname === '/staff/login' && staffSession) {
    return NextResponse.redirect(new URL('/staff/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/staff/:path*'],
};
