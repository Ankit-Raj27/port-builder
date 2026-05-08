export const RAZORPAY_PLANS = {
  pro: {
    id: "pro",
    name: "Pro",
    amountInPaise: 49900,
    currency: "INR",
  },
} as const;

export type RazorpayPlanId = keyof typeof RAZORPAY_PLANS;

export function getRazorpayPlan(planId: unknown = "pro") {
  if (typeof planId !== "string" || !(planId in RAZORPAY_PLANS)) {
    return null;
  }

  return RAZORPAY_PLANS[planId as RazorpayPlanId];
}
