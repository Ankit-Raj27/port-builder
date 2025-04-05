'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  planId: string
  email: string
}

export default function SubscriptionButton({ planId, email }: Props) {
  const router = useRouter()
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setIsRazorpayLoaded(true)
    document.body.appendChild(script)
  }, [])

  const handleSubscribe = async () => {
    if (!isRazorpayLoaded) {
      alert('Razorpay not loaded. Please try again.')
      return
    }

    try {
      const { data } = await axios.post('/api/razorpay/create-subscription', {
        planId,
        customerEmail: email,
      })

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: data.subscriptionId,
        name: 'PortBuilder',
        description: 'Monthly Subscription',
        handler(response) {
          alert('✅ Subscription started successfully!')
          console.log('Subscription response:', response)
          router.push('/template')
        },
        prefill: {
          name: '',
          email,
          contact: '',
        },
        method: {
          upi: true,        
          card: true,
          netbanking: true,
          wallet: true,
        },
        upi: {
          flow: 'collect', 
        },
        theme: { color: '#000' },
      }

      const razorpay = new ((window as unknown) as WindowWithRazorpay).Razorpay(options)
      razorpay.open()
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        console.error('❌ Subscription error:', error.response.data)
      } else if (error instanceof Error) {
        console.error('❌ Subscription error:', error.message)
      } else {
        console.error('❌ Subscription error:', error)
      }
      alert('Something went wrong while subscribing. Please try again.')
    }
  }

  return (
    <Button variant="outline" className="w-full dark:text-white" onClick={handleSubscribe}>
      Get Started
    </Button>
  )
}

interface WindowWithRazorpay extends Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayOptions {
  key: string
  subscription_id: string
  name: string
  description: string
  handler: (response: {
    razorpay_payment_id: string
    razorpay_subscription_id: string
    razorpay_signature: string
  }) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  method?: {
    card?: boolean
    netbanking?: boolean
    upi?: boolean
    wallet?: boolean
  }
  upi?: {
    flow?: 'collect' | 'intent'
    vpa?: string
  }
  theme: {
    color: string
  }
}
