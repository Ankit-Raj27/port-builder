import crypto from "crypto";
import { createClerkClient } from "@clerk/backend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isGuardFailure, requireAuthenticatedUser } from "@/lib/server/auth";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const verifyPaymentSchema = z.object({
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

function signaturesMatch(expected: string, received: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(req: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json(
      { error: "Server misconfiguration: Missing Razorpay secret" },
      { status: 500 }
    );
  }

  const guard = await requireAuthenticatedUser();
  if (isGuardFailure(guard)) {
    return guard.response;
  }

  const parsed = verifyPaymentSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payment verification request" }, { status: 400 });
  }

  const {
    razorpay_payment_id: paymentId,
    razorpay_order_id: orderId,
    razorpay_signature: signature,
  } = parsed.data;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (!signaturesMatch(expectedSignature, signature)) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  await clerkClient.users.updateUserMetadata(guard.userId, {
    privateMetadata: {
      isSubscribed: true,
      subscriptionProvider: "razorpay",
      subscriptionId: paymentId,
      razorpayOrderId: orderId,
    },
    publicMetadata: {
      isSubscribed: true,
    },
  });

  return NextResponse.json({ success: true });
}
