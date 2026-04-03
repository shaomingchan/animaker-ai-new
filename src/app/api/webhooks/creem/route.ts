import { Webhook } from '@creem_io/nextjs';
import { db } from '@/lib/db';
import { users, orders } from '@/lib/db/schema';
import { and, eq, sql } from 'drizzle-orm';

const CREEM_SINGLE_PRODUCT_ID =
  process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_SINGLE ||
  process.env.CREEM_PRODUCT_ID_SINGLE ||
  'prod_28agLy2oWWjgUOe6hHnHKD';

const CREEM_10PACK_PRODUCT_ID =
  process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_10PACK ||
  process.env.CREEM_PRODUCT_ID_10PACK ||
  'prod_2g1c2h6Qn4x8b2XHQX3E4F';

function getCreditsForProduct(productId?: string) {
  if (productId === CREEM_10PACK_PRODUCT_ID) return 10;
  if (productId === CREEM_SINGLE_PRODUCT_ID) return 1;
  return 1;
}

export const POST = Webhook({
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,

  onCheckoutCompleted: async (data) => {
    const userId = data.metadata?.referenceId as string | undefined;

    if (!userId) {
      console.error('[Creem Webhook] No referenceId in metadata', {
        checkoutId: data.id,
        customerEmail: data.customer?.email,
      });
      return;
    }

    // Verify user exists before crediting
    const [user] = await db.select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      console.error(`[Creem Webhook] User not found: ${userId}`);
      return;
    }

    // Determine credits based on product
    const productId = data.product?.id;
    const providerOrderId = data.order?.id || data.id;
    const credits = getCreditsForProduct(productId);

    // Use transaction for atomicity
    await db.transaction(async (tx) => {
      const [existingOrder] = await tx.select({ id: orders.id })
        .from(orders)
        .where(
          and(
            eq(orders.provider, 'creem'),
            eq(orders.providerOrderId, providerOrderId),
          )
        )
        .limit(1);

      if (existingOrder) {
        console.log(`[Creem Webhook] duplicate checkout.completed ignored: order=${providerOrderId}`);
        return;
      }

      // Add credits to user
      await tx.update(users)
        .set({ credits: sql`${users.credits} + ${credits}` })
        .where(sql`${users.id} = ${userId}`);

      // Record the order
      await tx.insert(orders).values({
        userId,
        provider: 'creem',
        providerOrderId,
        credits,
        amount: data.order?.amount || (credits === 10 ? 999 : 199),
        currency: (data.order?.currency?.toUpperCase() === 'CNY' ? 'CNY' : 'USD') as 'CNY' | 'USD',
        status: 'paid',
        paidAt: new Date(),
      });
    });

    console.log(`[Creem Webhook] checkout.completed: user=${userId}, email=${data.customer?.email}, +${credits} credits`);
  },

  onSubscriptionActive: async (data) => {
    const userId = data.metadata?.referenceId as string | undefined;
    if (userId) {
      console.log(`[Creem Webhook] subscription.active: user=${userId}, email=${data.customer?.email}`);
    }
  },

  onSubscriptionCanceled: async (data) => {
    const userId = data.metadata?.referenceId as string | undefined;
    if (userId) {
      console.log(`[Creem Webhook] subscription.canceled: user=${userId}, email=${data.customer?.email}`);
    }
  },
});
