import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import { auth  } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/backend'
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await clerkClient.users.getUser(userId)
    const email = user.emailAddresses[0]?.emailAddress


    const { amount } = await req.json()
    if (!amount) {
      return NextResponse.json({ error: 'Missing amount' }, { status: 400 })
    }
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      payment_capture: true,
      notes: {
        email: email || 'no-email-found',
      },
    })

    return NextResponse.json(order)
  } catch (err: unknown) {
    console.error('❌ Razorpay error:', err)
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'Unknown error';
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    )
  }
}
