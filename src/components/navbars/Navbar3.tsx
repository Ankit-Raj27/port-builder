"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar3() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-bold text-2xl relative z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <motion.div
              className="h-8 w-8 rounded-full bg-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <span>Creative</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
                <motion.span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                  )}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:block"
        >
          <Button variant="default" size="sm" className="rounded-full px-6" asChild>
            <Link href="/contact">Let Talk</Link>
          </Button>
        </motion.div>

        {/* Mobile Navigation Toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </motion.button>

        {/* Mobile Navigation Menu */}
        <motion.div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8",
            isOpen ? "block" : "hidden",
          )}
          initial={{ opacity: 0, y: -100 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-xl font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
            className="mt-4"
          >
            <Button variant="default" size="lg" className="rounded-full px-8" asChild onClick={() => setIsOpen(false)}>
              <Link href="/contact">Let us Talk</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

