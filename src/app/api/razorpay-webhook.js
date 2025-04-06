import crypto from 'crypto';

export default async function handler(req, res) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return res.status(500).json({ message: 'Webhook secret is not configured.' });
  }

  // Validate the Razorpay signature
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest !== req.headers['x-razorpay-signature']) {
    return res.status(400).json({ message: 'Invalid signature.' });
  }

  const event = req.body;

  // Handle the event
  if (event.event === 'subscription.activated') {
    const razorpaySubscriptionId = event.payload.subscription.entity.id;
    const userEmail = event.payload.subscription.entity.notes.email;

    // Update the user's subscription status in Clerk
    await updateClerkUserSubscription(userEmail, razorpaySubscriptionId);
  }

  res.status(200).json({ received: true });
}

async function updateClerkUserSubscription(email, subscriptionId) {
  // Fetch the user from Clerk using their email
  const users = await fetch(
    `https://api.clerk.dev/v1/users?email_address=${email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }
  ).then((res) => res.json());

  if (users.length === 0) {
    console.error('User not found in Clerk.');
    return;
  }

  const userId = users[0].id;

  // Update the user's metadata in Clerk
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
