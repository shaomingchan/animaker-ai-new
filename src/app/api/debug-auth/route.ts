import { NextResponse } from 'next/server';

function getErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
    stack: undefined,
  };
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const checks = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? `set (${process.env.GOOGLE_CLIENT_ID.substring(0, 10)}...)` : 'MISSING',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? `set (${process.env.GOOGLE_CLIENT_SECRET.substring(0, 8)}...)` : 'MISSING',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'set' : 'MISSING',
    AUTH_SECRET: process.env.AUTH_SECRET ? 'set' : 'MISSING',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
    DATABASE_URL: process.env.DATABASE_URL ? `set (${process.env.DATABASE_URL.substring(0, 30)}...)` : 'MISSING',
  };

  // Test DB
  let dbStatus = 'unknown';
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
    dbStatus = `OK - tables: ${result.map((r) => r.tablename).join(', ')}`;
  } catch (error: unknown) {
    dbStatus = `ERROR: ${getErrorDetails(error).message}`;
  }

  // Test NextAuth initialization
  let authStatus = 'unknown';
  try {
    const authModule = await import('@/auth');
    authStatus = typeof authModule.auth === 'function' ? 'auth module loaded OK' : 'auth module missing';
  } catch (error: unknown) {
    const details = getErrorDetails(error);
    authStatus = `AUTH INIT ERROR: ${details.message}\n${details.stack?.substring(0, 500) ?? ''}`;
  }

  // Test Google OIDC discovery
  let oidcStatus = 'unknown';
  try {
    const res = await fetch('https://accounts.google.com/.well-known/openid-configuration');
    if (res.ok) {
      const data = (await res.json()) as { issuer?: string };
      oidcStatus = `OK - issuer: ${data.issuer}`;
    } else {
      oidcStatus = `HTTP ${res.status}`;
    }
  } catch (error: unknown) {
    oidcStatus = `OIDC ERROR: ${getErrorDetails(error).message}`;
  }

  return NextResponse.json({ checks, dbStatus, authStatus, oidcStatus }, { status: 200 });
}
