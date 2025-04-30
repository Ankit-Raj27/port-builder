"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Navbar1Props {
  onNavigate?: (page: string) => void
}

const navigationItems = [
  { title: "Home", href: "/", page: "home" },
  { title: "Portfolio", href: "/portfolio", page: "portfolio" },
  { title: "About", href: "/about", page: "about" },
  { title: "Journal", href: "/journal", page: "journal" },
  { title: "Contact", href: "/contact", page: "contact" },
]

export default function Navbar1({ onNavigate }: Navbar1Props = {}) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    // If we have a navigation handler, use it
    if (onNavigate) {
      e.preventDefault()
      onNavigate(page)
    }
  }

  return (
    <header
      className={cn(
        " top-0 z-50 w-full transition-all duration-500",
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
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.page)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    index === 2 ? "mx-4 sm:mx-8 md:mx-12" : "",
                  )}
                >
                  {index === 2 && (
                    <span className="absolute left-1/2 -translate-x-1/2 -top-1 text-xl font-serif font-bold tracking-wider">
                      ATELIER
                    </span>
                  )}
                  <span className="relative z-10 hover:text-primary transition-colors">{item.title}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}