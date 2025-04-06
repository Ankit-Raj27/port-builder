import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
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
    return NextResponse.json({ message: 'Invalid signature.' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'subscription.activated') {
    const razorpaySubscriptionId = event.payload.subscription.entity.id;
    const userEmail = event.payload.subscription.entity.notes.email;

    await updateClerkUserSubscription(userEmail, razorpaySubscriptionId);
  }

  return NextResponse.json({ received: true });
}

async function updateClerkUserSubscription(email, subscriptionId) {
  const users = await fetch(
    `https://api.clerk.dev/v1/users?email_address=${email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }
  ).then((res) => res.json());

  if (!users || users.length === 0) {
    console.error('User not found in Clerk.');
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
      public_metadata: { subscriptionId, isSubscribed: true },
    }),
  });
}
