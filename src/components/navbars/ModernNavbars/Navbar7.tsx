"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "About", href: "/about" },
  { title: "Journal", href: "/journal" },
  { title: "Contact", href: "/contact" },
]

export default function Navbar7() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "items-center justify-center  z-50 w-full transition-all duration-500",
        isScrolled ? "h-16 bg-white/90 backdrop-blur-md shadow-sm" : "h-24 bg-transparent",
      )}
    >
      <div className="container h-full flex flex-col justify-center">
        <nav className="flex justify-center items-center">
          <ul className="flex space-x-1 sm:space-x-2 md:space-x-8">
            {navigationItems.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    index === 2 ? "mx-4 sm:mx-8 md:mx-12" : "",
                  )}
                >
                  {index === 2 && (
                    <span className=" m-10 justify-center -translate-x-1/2 -top-1 text-xl font-serif font-bold tracking-wider">
                      ATELIER
                    </span>
                  )}
                  <span className="relative z-10 hover:text-primary transition-colors">{item.title}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
