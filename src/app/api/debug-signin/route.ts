import { NextResponse } from 'next/server';

type RedirectLikeError = Error & {
  digest?: string;
  url?: string;
  cause?: unknown;
};

function getErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return error as RedirectLikeError;
  }

  return {
    message: String(error),
  } as RedirectLikeError;
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    // Try importing auth
    const authModule = await import('@/auth');
    
    // Try calling signIn manually to see what happens
    try {
      // This will throw a redirect, which is expected
      await authModule.signIn("google", { redirect: false });
      return NextResponse.json({ status: 'signIn returned without error (unexpected)' });
    } catch (signInError: unknown) {
      const details = getErrorDetails(signInError);
      // Check if it's a redirect (expected)
      if (details.digest?.includes('NEXT_REDIRECT')) {
        return NextResponse.json({ 
          status: 'signIn threw redirect (expected/normal)',
          url: details.url || details.message
        });
      }
      
      // Real error
      return NextResponse.json({ 
        status: 'signIn error',
        name: details.name,
        message: details.message,
        digest: details.digest,
        cause: details.cause instanceof Error ? details.cause.message : String(details.cause),
        stack: details.stack?.substring(0, 800)
      }, { status: 500 });
    }
  } catch (importError: unknown) {
    const details = getErrorDetails(importError);
    return NextResponse.json({ 
      status: 'auth import error',
      message: details.message,
      stack: details.stack?.substring(0, 500)
    }, { status: 500 });
  }
}
