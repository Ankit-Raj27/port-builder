import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ message: 'Webhook secret is not configured.' }, { status: 500 });
  }

  const rawBody = await req.text();
  const razorpaySignature = req.headers.get('x-razorpay-signature');

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    console.error('❌ Invalid Razorpay webhook signature');
    return NextResponse.json({ message: 'Invalid signature.' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  // ✅ Handle payment.captured
  if (event.event === 'payment.captured') {
    const userEmail = event.payload.payment.entity.notes.email;
    const razorpayPaymentId = event.payload.payment.entity.id;

    console.log('✅ Webhook received: payment.captured');
    console.log('📧 User email from notes:', userEmail);

    if (userEmail) {
      await updateClerkUserSubscription(userEmail, razorpayPaymentId);
    } else {
      console.warn('⚠️ No user email in payment notes');
    }
  }

  // ✅ (Optional) Handle subscription.activated if needed
  if (event.event === 'subscription.activated') {
    const razorpaySubscriptionId = event.payload.subscription.entity.id;
    const userEmail = event.payload.subscription.entity.notes?.email;

    console.log("✅ Webhook received: subscription.activated");
    console.log("📧 User Email:", userEmail);
    console.log("🆔 Razorpay Subscription ID:", razorpaySubscriptionId);

    if (userEmail) {
      await updateClerkUserSubscription(userEmail, razorpaySubscriptionId);
    } else {
      console.warn('⚠️ No user email in subscription notes');
    }
  }

  return NextResponse.json({ received: true });
}

async function updateClerkUserSubscription(email: string, subscriptionId: string) {
  try {
    const response = await fetch(`https://api.clerk.dev/v1/users?email_address=${email}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const users = await response.json();

    if (!users || users.length === 0) {
      console.error('❌ User not found in Clerk for email:', email);
      return;
    }

    const userId = users[0].id;

    await fetch(`https://api.clerk.dev/v1/users/${userId}/metadata`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: {
          subscriptionId,
          isSubscribed: true,
        },
      }),
    });

    console.log(`🔄 Clerk metadata updated for ${email}`);
  } catch (error) {
    console.error('❌ Failed to update Clerk user metadata:', error);
  }
}
