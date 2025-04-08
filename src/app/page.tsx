"use client"

import { Download, Code, Globe, Wand2 } from "lucide-react"
import { Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/common/Footer"
import { Navbar } from "@/components/navbars/Navbar"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import LoadingPage from "@/components/common/Loading"
import { useState } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/template")
    }
  }, [isSignedIn, router])



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
      icon: <Download className="w-8 h-8 text-black-400" />,
      title: "No Downloads",
    },
    {
      icon: <Code className="w-8 h-8 text-black-400" />,
      title: "No Coding",
    },
    {
      icon: <Globe className="w-8 h-8 text-black-400" />,
      title: "All in Browser",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-black-400" />,
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

  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div >
      <Navbar />
      {isLoading && <LoadingPage />}
      <main className=" font-Space Grotesk bg-gray-100 shadow-lg dark:bg-gradient-to-tr from-[#434343] to-[#000] " >
        {/* Welcome section */}
        <section className="shadow-lg ">

          <div className="shadow-lg shadow-gray-300"></div>
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1200px] mx-auto px-4 py-20 md:py-22 "
          >
            <div className="space-y-8">
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
                Welcome to the Port-Builder!
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-[600px]">
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

              <motion.div variants={itemVariants} className="w-full max-w-4xl mx-auto text-center ">
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
                      <p className="text-gray-600 text-sm">{feature.title}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Button className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-700 transition-colors ">
                    Create Your Portfolio
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

        </section>
        <div className="shadow-md shadow-gray-300"></div>

        {/* Template Section */}
        <section className="w-full py-16 shadow-lg  dark:bg-gradient-to-tr from-[#434343] to-[#000]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center px-4 mb-"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-6">
              Choose the best templates for your portfolio website
            </h2>
            <p className="text-lg text-slate-600">
              PortBuilder offers a wide variety of templates for creatives looking to make their portfolio. You can
              easily mix templates to create a digital portfolio that perfectly fits your needs.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-y-24 min-h-screen max-w-7xl mx-auto px-4">
            {/* First image section with grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
            >
              {/* Top-left image (normal position) */}
              <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
                <Image
                  src="/images/portfolio1.png"
                  width={240}
                  height={240}
                  alt="portfolio2"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </motion.div>

              {/* Top-right image (shifted down on md and up) */}
              <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
                <Image
                  src="/images/portfolio2.jpg"
                  width={240}
                  height={240}
                  alt="portfolio1"
                  className="rounded-lg shadow-lg object-cover md:mt-12"
                />
              </motion.div>

              {/* Bottom image (centered below, slight overlap on md+) */}
              <motion.div
                whileHover="hover"
                initial="initial"
                variants={imageHoverVariants}
                className="md:col-span-2 flex justify-center md:-mt-8"
              >
                <Image
                  src="/images/portfolio3.png"
                  width={240}
                  height={240}
                  alt="portfolio3"
                  className="rounded-lg shadow-lg object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Choose from Stunning Templates</h2>
              <h3 className="text font-medium sm:text-2xl mt-2">Create web pages easily</h3>
              <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
                PortBuilder gives you the freedom to mix and match beautifully designed sections—from navbars and hero sections to project showcases, experience timelines, and footers. Whether you are a designer, developer, or creative, you’ll find the perfect fit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl"> Fully Customizable Layouts</h2>
              <h3 className="text font-medium sm:text-2xl mt-2">Craft your unique digital presence with ease.</h3>
              <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
                Select from a variety of layout options for every section of your portfolio—no code required. Want a minimal navbar and a bold hero? Go for it. Prefer a dark footer with animated project cards? You’re in control.
              </p>
            </motion.div>

            {/* Second image section with grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2 p-4"
            >
              {/* Top-left - slightly lowered */}
              <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
                <Image
                  src="/images/editor1.png"
                  width={240}
                  height={240}
                  alt="df"
                  className="rounded-lg shadow-lg mt-6 object-cover"
                />
              </motion.div>

              {/* Top-right - slightly higher and overlaps left */}
              <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
                <Image
                  src="/images/editor2.jpg"
                  width={240}
                  height={240}
                  alt="df"
                  className="rounded-lg shadow-lg -mt-2 -ml-4 object-cover"
                />
              </motion.div>

              {/* Bottom - centered and overlapping top images slightly */}
              <motion.div
                whileHover="hover"
                initial="initial"
                variants={imageHoverVariants}
                className="col-span-2 flex justify-center -mt-8"
              >
                <Image
                  src="/images/editor3.jpg"
                  width={260}
                  height={260}
                  alt="df"
                  className="rounded-lg shadow-xl object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Third image section with grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2 p-4 relative"
            >
              <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
                <Image
                  src="/images/hosting1.png"
                  width={250}
                  height={250}
                  alt="img1"
                  className="rounded-lg shadow-lg mt-4 object-cover "
                />
              </motion.div>
              <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
                <Image
                  src="/images/hosting2.png"
                  width={250}
                  height={250}
                  alt="img2"
                  className="rounded-lg shadow-xl -mt-6 -ml-6 object-cover z-20 relative"
                />
              </motion.div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl"> Built-in Web Hosting</h2>
              <h3 className="text font-medium sm:text-2xl mt-2">Host your portfolio easily</h3>
              <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
                No more wrestling with hosting providers or DNS settings. Your portfolio lives on the web the moment you publish it—secure, fast, and hassle-free.
              </p>
            </motion.div>
          </div>
        </section>



        {/* CAT Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-auto shadow-lg  p-16 w-full dark:bg-gradient-to-b from-[#434343] to-[#181818] flex flex-col items-center justify-center px-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-4xl mx-auto text-center space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl  font-medium tracking-tight text-navy-900">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="block dark:text-white"
              >
                Your vision. Your goals.
              </motion.span>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="block dark:text-gray-400"
              >
                Your website.
              </motion.span>
            </h1>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
            >
              <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg bg-gray font-medium dark:bg-[#1A1A1A] text-navy-900  dark:hover:"
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
        <Footer />
      </main>
    </div>
  )
}

