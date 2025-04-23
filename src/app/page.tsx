"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import LoadingPage from "@/components/common/Loading"
import HeroSection from "@/components/home/HeroSection"
import TemplatesSection from "@/components/home/TemplatesSection"
import CTASection from "@/components/home/CTASection"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/template")
    }
  }, [isSignedIn, router])

  return (
    <div>
      <Navbar />
      {isLoading && <LoadingPage />}
      <main className="font-Space Grotesk bg-gray-100 shadow-lg ">
        <HeroSection setIsLoading={setIsLoading} />
        <div className="shadow-md shadow-gray-300"></div>
        <TemplatesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  )
}