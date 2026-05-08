import crypto from "crypto";
import { NextResponse } from "next/server";

type RazorpayEntity = {
  id?: string;
  notes?: Record<string, unknown>;
};

type RazorpayWebhookEvent = {
  event?: string;
  payload?: {
    payment?: {
      entity?: RazorpayEntity;
    };
    subscription?: {
      entity?: RazorpayEntity;
    };
  };
};

function signaturesMatch(expected: string, received: string | null): boolean {
  if (!received) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

function getNote(entity: RazorpayEntity | undefined, key: string): string | null {
  const value = entity?.notes?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

async function findClerkUserIdByEmail(email: string): Promise<string | null> {
  const clerkSecret = process.env.CLERK_SECRET_KEY;

  if (!clerkSecret) {
    return null;
  }

  const params = new URLSearchParams({ email_address: email });
  const response = await fetch(`https://api.clerk.dev/v1/users?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${clerkSecret}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const users = await response.json();
  return Array.isArray(users) && users[0]?.id ? users[0].id : null;
}

async function updateClerkUserSubscription({
  clerkUserId,
  email,
  subscriptionId,
}: {
  clerkUserId?: string | null;
  email?: string | null;
  subscriptionId: string;
}) {
  const clerkSecret = process.env.CLERK_SECRET_KEY;

  if (!clerkSecret) {
    throw new Error("CLERK_SECRET_KEY is not configured");
  }

  const userId = clerkUserId || (email ? await findClerkUserIdByEmail(email) : null);

  if (!userId) {
    return;
  }

  const response = await fetch(`https://api.clerk.dev/v1/users/${userId}/metadata`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${clerkSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      private_metadata: {
        subscriptionId,
        subscriptionProvider: "razorpay",
        isSubscribed: true,
      },
      public_metadata: {
        isSubscribed: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Clerk metadata");
  }
}

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Webhook secret is not configured." },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  const razorpaySignature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (!signaturesMatch(expectedSignature, razorpaySignature)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 400 });
  }

  let event: RazorpayWebhookEvent;

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    const paymentId = payment?.id;

    if (paymentId) {
      await updateClerkUserSubscription({
        clerkUserId: getNote(payment, "clerkUserId"),
        email: getNote(payment, "email"),
        subscriptionId: paymentId,
      });
    }
  }

  if (event.event === "subscription.activated") {
    const subscription = event.payload?.subscription?.entity;
    const subscriptionId = subscription?.id;

    if (subscriptionId) {
      await updateClerkUserSubscription({
        clerkUserId: getNote(subscription, "clerkUserId"),
        email: getNote(subscription, "email"),
        subscriptionId,
      });
    }
  }

  return NextResponse.json({ received: true });
}
