import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const host = req.headers.get('host')
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
    return Response.redirect(new URL('/login', req.nextUrl))
  }

  // Inject locale into a request header so RootLayout can read it via headers()
  // (cookies() crashes in RootLayout on Next.js 16 + Vercel serverless)
  const langCookie = req.cookies.get('lang')
  if (langCookie?.value) {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-locale', langCookie.value)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
