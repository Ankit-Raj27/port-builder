'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'

interface Props {
  amount: number // Amount in INR
  setLoading: (value: boolean) => void
}

export default function PaymentButton({ setLoading, amount }: Props) {
  const router = useRouter()
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setIsRazorpayLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    setLoading(true)

    if (!user) {
      alert('Please log in to proceed with payment.')
      setLoading(false)
      return
    }

    if (!isRazorpayLoaded) {
      alert('Razorpay not loaded. Please try again.')
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.post('/api/razorpay/create-order', {
        amount: amount * 100, // Convert to paise
        email: user?.emailAddresses[0]?.emailAddress,
      })

      const razorpay = new (window as unknown as WindowWithRazorpay).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: 'PortBuilder',
        description: 'One-Time Payment',
        order_id: data.id,
        handler: () => {
          toast.success('Payment successful!')
          setLoading(false)
          router.push('/template')
        },
        prefill: {
          name: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
          email: user?.emailAddresses[0]?.emailAddress ?? '',
          contact: '',
        },
        theme: {
          color: '#000',
        },
        method: {
          card: true,
          netbanking: true,
          upi: true,
          wallet: true,
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment popup closed without completing the payment')
            setLoading(false)
          },
        },
      })

      razorpay.open()
    } catch (error: unknown) {
      const msg =
        axios.isAxiosError(error) && error.response?.data?.error !== undefined
          ? error.response.data.error
          : error instanceof Error
            ? error.message
            : 'Unknown error occurred'
      console.error('❌ Error:', msg)
      alert(`❌ ${msg}`)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      className="w-full py-3 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
    >
      Get Started
    </button>
  )
}

interface WindowWithRazorpay extends Window {
  Razorpay: new (options: RazorpayOrderOptions) => RazorpayInstance
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayOrderOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }) => void
  prefill: {
    name?: string
    email: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  method?: {
    card?: boolean
    netbanking?: boolean
    upi?: boolean
    wallet?: boolean
  }
  modal?: {
    ondismiss?: () => void
  }
}
