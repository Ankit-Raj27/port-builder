"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Navbar3() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Hire Me", path: "/hire", isButton: true },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={` top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-white via-slate-500 to-black rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold">JS</span>
            </motion.div>
            <span
              className={`font-bold text-xl ${
                scrolled ? "text-gray-800 dark:text-white" : "text-  dark:text-white"
              }`}
            >
              John Smith
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              !item.isButton ? (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative  font-medium text-sm ${
                    scrolled ? "text-gray-800 dark:text-gray-200" : " dark:text-gray-200"
                  } hover:text-gray-600 transition-colors`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      layoutId="navbar-3-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ) : (
                <Link key={item.name} href={item.path}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-white via-slate-500 to-black text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    {item.name}
                  </motion.button>
                </Link>
              ),
            )}
          </div>

          <div className="md:hidden">
            <button className={`p-2 rounded-md ${scrolled ? "text-gray-800 dark:text-white" : "text-white"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
