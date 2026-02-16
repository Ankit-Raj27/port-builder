"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditableText } from "@/components/common/EditableText"
import usePortfolioStore from "@/components/store/usePortfolioStore"

interface Hero1Props {
  isEditable?: boolean
}

const Hero1: React.FC<Hero1Props> = ({ isEditable = true }) => {
  const { heroContent, updateHeroContent } = usePortfolioStore()
  
  const {
    title = "Hi, I am",
    name = "John Doe",
    subtitle = "Frontend Developer & UI/UX Designer",
    description = "I create beautiful, responsive websites...",
    primaryButton = "View My Work",
    secondaryButton = "Contact Me",
  } = heroContent || {}

  const handleUpdate = (key: string, value: string) => {
    updateHeroContent({ [key]: value })
  }

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none flex flex-wrap gap-2">
                {isEditable ? (
                  <EditableText 
                    value={title} 
                    onChange={(val) => handleUpdate('title', val)} 
                    tag="span"
                  />
                ) : (
                  <span>{title}</span>
                )}
                
                <span className="text-primary">
                  {isEditable ? (
                    <EditableText 
                      value={name} 
                      onChange={(val) => handleUpdate('name', val)} 
                      tag="span"
                      className="text-primary"
                    />
                  ) : (
                    name
                  )}
                </span>
              </h1>
              
              <div className="text-xl text-muted-foreground md:text-2xl">
                {isEditable ? (
                  <EditableText 
                    value={subtitle} 
                    onChange={(val) => handleUpdate('subtitle', val)} 
                    tag="p"
                  />
                ) : (
                  <p>{subtitle}</p>
                )}
              </div>
            </div>
            
            <div className="max-w-[600px] text-muted-foreground md:text-xl">
               {isEditable ? (
                  <EditableText 
                    value={description} 
                    onChange={(val) => handleUpdate('description', val)} 
                    tag="p"
                  />
                ) : (
                  <p>{description}</p>
                )}
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="#projects">
                  {isEditable ? (
                    <EditableText 
                      value={primaryButton} 
                      onChange={(val) => handleUpdate('primaryButton', val)} 
                      tag="span"
                      className="text-white hover:text-white"
                    />
                  ) : primaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">
                   {isEditable ? (
                    <EditableText 
                      value={secondaryButton} 
                      onChange={(val) => handleUpdate('secondaryButton', val)} 
                      tag="span"
                    />
                  ) : secondaryButton}
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-full border-8 border-muted">
              <Image
                src="/images/component/hero1.jpg"
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero1
