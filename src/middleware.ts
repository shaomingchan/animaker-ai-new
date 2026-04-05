import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host')

  // www → non-www redirect
  if (host?.startsWith('www.')) {
    const url = req.nextUrl.clone()
    url.host = host.replace('www.', '')
    return NextResponse.redirect(url, 301)
  }

  // Check auth from cookie (Edge Runtime compatible)
  const sessionCookie = req.cookies.get('authjs.session-token')
    || req.cookies.get('__Secure-authjs.session-token')

  const isLoggedIn = !!sessionCookie?.value
  const pathname = req.nextUrl.pathname

  const protectedPaths = ['/dashboard', '/create', '/task']
  if (protectedPaths.some(p => pathname.startsWith(p)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - api/auth (Auth.js routes - CRITICAL: don't intercept auth callbacks)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
