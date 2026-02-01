"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { UserButton, useUser, SignInButton } from "@clerk/nextjs"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const productItems = [
  { title: "Modern", href: "/template/Modern", description: "Clean & minimal" },
  { title: "Business", href: "/template/Business", description: "Professional look" },
  { title: "Creative", href: "/template/Creative", description: "Bold & artistic" },
]

const resourceItems = [
  { title: "Documentation", href: "/documentation" },
  { title: "Community", href: "#" },
  { title: "Help Center", href: "#" },
  { title: "API Reference", href: "#" },
]

export function Navbar() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  )

  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  )

  const handleProtectedRoute = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (!isSignedIn) {
      e.preventDefault()
      router.push("/sign-in")
    }
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: headerBackground,
          borderBottom: `1px solid`,
          borderColor: headerBorder,
        }}
      >
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/logo.png"
                  alt="PortBuilder Logo"
                  width={160}
                  height={40}
                  className="h-8 w-auto"
                />
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,240,255,0.5), rgba(139,92,246,0.5))",
                  }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex items-center">
            <NavigationMenuList className="flex gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent text-white/70 hover:text-white hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-white rounded-full px-4 transition-all duration-300"
                >
                  Templates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.ul
                    className="grid w-64 gap-1 p-3 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {productItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            onClick={handleProtectedRoute}
                            className="block select-none rounded-xl p-3 text-white leading-none no-underline outline-none transition-all duration-200 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </span>
                              <span className="text-xs text-white/40">{item.description}</span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="mt-2 pt-2 border-t border-white/10">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/template"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          View all templates
                          <span className="text-xs">→</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent text-white/70 hover:text-white hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-white rounded-full px-4 transition-all duration-300"
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.ul
                    className="grid w-48 gap-1 p-3 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {resourceItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-xl p-3 text-white/70 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 hover:text-white"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/pricing"
                    className="inline-flex text-white/70 hover:text-white h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/5"
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Actions */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 ring-2 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/25"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(0,240,255,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
            )}

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl overflow-y-auto z-50 md:hidden"
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <motion.button
                  className="p-2 rounded-full hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5 text-white" />
                </motion.button>
              </div>

              <div className="px-6 pb-8 space-y-6">
                {/* Templates */}
                <div>
                  <Link
                    href="/template"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg font-semibold text-white mb-3"
                  >
                    Templates
                  </Link>
                  <div className="space-y-1 pl-4 border-l border-white/10">
                    {productItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => {
                          handleProtectedRoute(e)
                          setMobileMenuOpen(false)
                        }}
                        className="block px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <p className="text-lg font-semibold text-white mb-3">Resources</p>
                  <div className="space-y-1 pl-4 border-l border-white/10">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-white py-2"
                >
                  Pricing
                </Link>

                {/* CTA */}
                {!isSignedIn && (
                  <motion.div className="pt-4 border-t border-white/10">
                    <SignInButton mode="modal">
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.button>
                    </SignInButton>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}