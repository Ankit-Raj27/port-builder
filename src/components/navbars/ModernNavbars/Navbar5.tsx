"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Navbar9() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
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
  ]

  return (
    <div className=" top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`transition-all duration-300 ${
          scrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <motion.div
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-full"
                  />
                  <div className="absolute inset-1 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold bg-gradient-to-tr from-rose-500 to-orange-500 bg-clip-text text-transparent">
                      D
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xl font-bold ${
                    scrolled ? "text-slate-900 dark:text-white" : "text-white dark:text-white"
                  }`}
                >
                  DevFolio
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative text-sm font-medium ${
                    scrolled ? "text-slate-700 dark:text-slate-200" : "text-white dark:text-slate-200"
                  } hover:text-rose-500 dark:hover:text-rose-400 transition-colors`}
                >
                  <span>{item.name}</span>
                  {pathname === item.path && (
                    <motion.span
                      layoutId="navbar-9-underline"
                      className="absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-rose-500 to-orange-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link href="/hire">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2 font-medium text-white rounded-full overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500" />
                  <span className="absolute inset-0 flex items-center justify-center">Hire Me</span>
                </motion.button>
              </Link>
            </div>

            <div className="md:hidden">
              <button className={`p-2 rounded-md ${scrolled ? "text-slate-900 dark:text-white" : "text-white"}`}>
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
      </motion.nav>
    </div>
  )
}
