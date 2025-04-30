"use client"

import { Download, Code, Globe, Wand2 } from "lucide-react"
import { motion } from "framer-motion"
import { Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import VideoSection from "./VideoSection"

interface HeroSectionProps {
  setIsLoading: (isLoading: boolean) => void;
}

export default function HeroSection({ setIsLoading }: HeroSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  interface Feature {
    icon: JSX.Element;
    title: string;
  }


  const features: Feature[] = [
    {
      icon: <Download className="w-8 h-8 text-gray-200" />,
      title: "No Downloads",
    },
    {
      icon: <Code className="w-8 h-8 text-gray-200" />,
      title: "No Coding",
    },
    {
      icon: <Globe className="w-8 h-8 text-gray-200" />,
      title: "All in Browser",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-gray-200" />,
      title: "User-Friendly",
    },
  ];

  const featureVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  }
  return (
    <>
      <section className="min-h-screen relative shadow-lg">
        <BackgroundBeamsWithCollision>
          <div className="shadow-lg shadow-gray-300"></div>
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1200px] mx-auto px-4 py-20 md:py-22 "
          >
            <div className="space-y-8">
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight">
                Welcome to the Port-Builder!
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 text-muted-foreground max-w-[600px]">
                Our enterprise solution offers advanced site management, highly-efficient portfolio site creation, and the
                customization options you require.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link href="/sign-up">
                  <motion.button
                    onClick={() => { setIsLoading(true) }}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                  >
                    Create an account!
                  </motion.button>
                </Link>
                <Link href="/sign-in">
                  <motion.button
                    onClick={() => { setIsLoading(true) }}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-flex ml-4 h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                  >
                    Already have an account?
                  </motion.button>
                </Link>
              </motion.div>
     
              
              <motion.div variants={itemVariants} className="w-full max-w-4xl  mx-auto text-center ">
                <div className="flex justify-center gap-16 mb-12 mt-20 ">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={featureVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.8 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        className="mb-4"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                      >
                        {feature.icon}
                      </motion.div>
                      <p className="text-gray-400 text-sm">{feature.title}</p>
                    </motion.div>
                    
                  ))}
                  
                </div>
                
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Link href={"/sign-up"}>
                    <Button className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-700 transition-colors ">
                      Create Your Portfolio
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </BackgroundBeamsWithCollision>
          <VideoSection src="/demo.mp4" />
      </section>
      <div className="shadow-md shadow-gray-300"></div>
    </>
  )
}