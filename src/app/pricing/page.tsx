"use client"
import { CheckCheck, CircleOff } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import SubscriptionButton from "@/components/common/SubscriptionButton"
import LoadingPage from "@/components/common/Loading"
import { useState } from "react"


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

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const subheadingVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const descriptionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
}

const MotionCard = motion(Card)

export default function PricingPage() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Navbar />
      {loading ? (<LoadingPage />) : (<>

        <section className="py-24 px-4 md:px-6 lg:py-32 bg-background overflow-hidden">
          <div className=" mx-auto max-w-6xl">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 className="text-4xl md:text-5xl font-bold tracking-tight" variants={headingVariants}>
                Need custom portfolio websites?
              </motion.h2>
              <motion.h3
                className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-500"
                variants={subheadingVariants}
              >
                We have got you covered
              </motion.h3>
              <motion.p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-6" variants={descriptionVariants}>
                Choose from various custom components to complete website tailored to your needs. Simple pricing, no
                hidden fees.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Free Tier */}
              <MotionCard
                className="border-2 flex flex-col"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 },
                }}
              >
                <CardHeader>
                  <CardTitle className="text-emerald-500">Existing Components</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <motion.div
                    className="mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-5xl font-bold">Free</p>
                  </motion.div>
                  <p>For the curious minds who want to browse, play, and dream big.</p>
                  <motion.ul
                    className="mt-6 space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    transition={{ delayChildren: 0.8, staggerChildren: 0.1 }}
                  >
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span> Browse all component templates</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span>Preview complete portfolio themes</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CircleOff className="h-4 w-4" />
                      <span>No editing or downloading</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CircleOff className="h-4 w-4" />
                      <span> No hosting options</span>
                    </motion.li>
                  </motion.ul>
                </CardContent>
              </MotionCard>

              {/* Pages Tier - Featured */}
              <MotionCard
                className="border-2 border-primary bg-primary text-primary-foreground flex flex-col"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 },
                }}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.8,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 500,
                      }}
                    >
                      <Badge variant="secondary" className="bg-primary-foreground text-primary">
                        Popular
                      </Badge>
                    </motion.div>
                  </div>
                  <CardDescription className="text-primary-foreground/80">pause or cancel anytime</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <motion.div
                    className="mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-5xl font-bold">
                      Rs.99<span className="text-xl font-normal opacity-80">/mo</span>
                    </p>
                  </motion.div>
                  <p className="text-primary-foreground/80">
                    For makers who want to build, tweak, and launch their personal brand.
                  </p>
                  <motion.ul
                    className="mt-6 space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    transition={{ delayChildren: 0.8, staggerChildren: 0.1 }}
                  >
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span>Edit any component in real-time</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span> Download your complete custom portfolio</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CircleOff className="h-4 w-4" />
                      <span>Build with full creative control</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CircleOff className="h-4 w-4" />
                      <span> No hosting included</span>
                    </motion.li>
                  </motion.ul>
                </CardContent>
                <CardFooter>
                  <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <SubscriptionButton setLoading={setLoading} amount={1} />
                  </motion.div>
                </CardFooter>
              </MotionCard>

              <MotionCard
                className="border-2  text-black flex flex-col"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 },
                }}
              >
                <CardHeader>
                  <div className="flex justify-between text-emerald-500 items-center">
                    <CardTitle>Go Ultra</CardTitle>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.8,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 500,
                      }}
                    >
                    </motion.div>
                  </div>
                  <CardDescription className="text-black">pause or cancel anytime</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <motion.div
                    className="mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-5xl font-bold">
                      Rs.199<span className="text-xl font-normal opacity-80">/mo</span>
                    </p>
                  </motion.div>
                  <p className="text-black">
                    For the ones who want it all — build, edit, download, and go live.
                  </p>
                  <motion.ul
                    className="mt-6 space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    transition={{ delayChildren: 0.8, staggerChildren: 0.1 }}
                  >
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span>Host your portfolio right from the site</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span>Lightning-fast global CDN</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span> Free HTTPS and subdomain</span>
                    </motion.li>
                    <motion.li className="flex items-center gap-2" variants={listItemVariants}>
                      <CheckCheck className="h-4 w-4" />
                      <span>Priority support from the devs (yup, that’s us!)</span>
                    </motion.li>
                  </motion.ul>
                </CardContent>
                <CardFooter>
                  <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <SubscriptionButton setLoading={setLoading} amount={199} />
                  </motion.div>
                </CardFooter>
              </MotionCard>
            </motion.div>
          </div>
        </section>
        <Footer />
      </>)}
    </>
  )
}

