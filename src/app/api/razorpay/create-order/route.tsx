import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { amount } = await req.json()
    if (!amount) {
      return NextResponse.json({ error: 'Missing amount' }, { status: 400 })
    }

    const order = await razorpay.orders.create({
      amount, // in paise
      currency: 'INR',
      payment_capture: true,
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
