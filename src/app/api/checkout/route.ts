import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  const session = await auth();

  // Check if user is logged in
  if (!session?.user?.id) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.url);
    return NextResponse.redirect(loginUrl);
  }

  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('product') || searchParams.get('productId') || process.env.CREEM_PRODUCT_ID;

  if (!productId) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
  }

  // Health check logs before calling Creem
  console.log('[Checkout] Calling Creem with productId:', productId);
  console.log('[Checkout] CREEM_API_KEY set:', !!process.env.CREEM_API_KEY);
  console.log('[Checkout] CREEM_API_KEY prefix:', process.env.CREEM_API_KEY?.substring(0, 10));
  console.log('[Checkout] session user:', session?.user?.id, session?.user?.email);

  if (!process.env.CREEM_API_KEY) {
    return NextResponse.json(
      { error: 'Creem API key not configured', detail: 'CREEM_API_KEY environment variable is not set' },
      { status: 500 }
    );
  }

  try {
    // Call Creem API to create checkout session
    const response = await fetch('https://api.creem.io/v1/checkouts', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CREEM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        customer: {
          id: session.user.id,
          email: session.user.email,
        },
        metadata: {
          referenceId: session.user.id,
        },
        success_url: 'https://animaker.dev/dashboard?payment=success',
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('[Checkout] Creem API error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to create checkout', detail: data },
        { status: response.status }
      );
    }

    return NextResponse.redirect(data.checkout_url);
  } catch (error) {
    console.error('[Checkout] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: String(error) },
      { status: 500 }
    );
  }
}
