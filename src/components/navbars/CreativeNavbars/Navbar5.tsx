"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Twitter, Linkedin, Menu, X } from "lucide-react"

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Collections", href: "/collections" },
  { title: "Lookbook", href: "/lookbook" },
  { title: "Studio", href: "/studio" },
  { title: "Contact", href: "/contact" },
]

export default function SidebarNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest('[data-menu="true"]')) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header className=" top-0 left-0 z-40 w-full">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="text-xl font-serif tracking-wider">
            MAISON
          </Link>

          <button onClick={() => setIsOpen(true)} className="flex items-center space-x-2 group" aria-label="Open menu">
            <span className="text-sm font-medium group-hover:text-primary transition-colors">Menu</span>
            <Menu className="h-5 w-5 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              data-menu="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-20 items-center justify-between px-6">
                  <Link href="/" className="text-xl font-serif tracking-wider">
                    MAISON
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 hover:bg-muted transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 overflow-auto px-6 py-8">
                  <ul className="flex flex-col space-y-6">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="group flex items-center text-3xl font-light"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="inline-block w-8 font-mono text-sm text-muted-foreground">0{index + 1}</span>
                          <span className="relative overflow-hidden">
                            <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-full">
                              {item.title}
                            </span>
                            <span className="absolute left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary">
                              {item.title}
                            </span>
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-auto border-t p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <a href="#" className="hover:text-primary transition-colors">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </a>
                      <a href="#" className="hover:text-primary transition-colors">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </a>
                      <a href="#" className="hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </div>
                    <div className="text-sm text-muted-foreground">© {new Date().getFullYear()}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
