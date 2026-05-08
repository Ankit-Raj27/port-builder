"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import usePortfolioStore from "@/components/store/usePortfolioStore"

type Hero1Props = Record<string, never>;

const Hero1: React.FC<Hero1Props> = () => {
  const { heroContent } = usePortfolioStore()
  
  const {
    title = "Hi, I am",
    name = "John Doe",
    subtitle = "Frontend Developer & UI/UX Designer",
    description = "I create beautiful, responsive websites with modern technologies that help businesses grow and users smile.",
    primaryButton = "View My Work",
    primaryLink = "#projects",
    secondaryButton = "Contact Me",
    secondaryLink = "#contact",
  } = heroContent || {}

  return (
    <section className="relative overflow-hidden bg-[#fff] py-24 md:py-32 font-sans selection:bg-purple-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-black">
                {title} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {name}
                </span>
              </h1>
              
              <div className="text-xl text-gray-500 md:text-2xl font-medium tracking-tight">
                {subtitle}
              </div>
            </div>
            
            <div className="max-w-[600px] text-gray-400 md:text-lg leading-relaxed font-medium">
               {description}
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row pt-4">
              <Button size="lg" className="bg-black text-white rounded-2xl font-bold h-14 px-10 hover:bg-zinc-800 shadow-2xl shadow-zinc-200 transition-all hover:scale-105 active:scale-95" asChild>
                <a href={primaryLink} target="_blank" rel="noopener noreferrer">
                  {primaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-100 rounded-2xl font-bold h-14 px-10 text-black hover:bg-gray-50 transition-all hover:scale-105 active:scale-95" asChild>
                <a href={secondaryLink} target="_blank" rel="noopener noreferrer">
                   {secondaryButton}
                </a>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <div className="relative h-[450px] w-[450px] overflow-hidden rounded-[4rem] border-[16px] border-gray-50 shadow-2xl shadow-zinc-200 rotate-3 hover:rotate-0 transition-transform duration-700">
              <Image
                src="/images/component/hero1.jpg"
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/5 blur-[80px] rounded-full" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero1
