import Razorpay from "razorpay";
import { createClerkClient } from "@clerk/backend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isGuardFailure, requireAuthenticatedUser } from "@/lib/server/auth";
import { getRazorpayPlan } from "@/lib/server/plans";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const createOrderSchema = z.object({
  planId: z.string().optional().default("pro"),
});

export async function POST(req: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Server misconfiguration: Missing Razorpay keys" },
        { status: 500 }
      );
    }

    const guard = await requireAuthenticatedUser();
    if (isGuardFailure(guard)) {
      return guard.response;
    }

    const parsed = createOrderSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payment request" }, { status: 400 });
    }

    const plan = getRazorpayPlan(parsed.data.planId);
    if (!plan) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const user = await clerkClient.users.getUser(guard.userId);
    const email = user.emailAddresses[0]?.emailAddress;

    const order = await razorpay.orders.create({
      amount: plan.amountInPaise,
      currency: plan.currency,
      payment_capture: true,
      notes: {
        planId: plan.id,
        clerkUserId: guard.userId,
        email: email || "no-email-found",
      },
    });

    return NextResponse.json(order);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
