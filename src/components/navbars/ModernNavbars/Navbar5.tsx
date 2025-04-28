"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  data?: {
    title?: string
    navItems?: { name: string; href: string }[]
  }
}

const Navbar5: React.FC<NavbarProps> = ({ data }) => {
  const pathname = usePathname()

  const [title, setTitle] = useState(data?.title || "Portfolio")
  const [navItems, setNavItems] = useState(data?.navItems || [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ])

  return (
    <header className="pr-10 pl-10 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Editable Title */}
        <Link href="/" className="font-bold text-xl">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl bg-transparent border-none outline-none"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  const updatedNavItems = [...navItems]
                  updatedNavItems[index].name = e.target.value
                  setNavItems(updatedNavItems)
                }}
                className="bg-transparent border-none outline-none"
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updatedNavItems = [...navItems]
                      updatedNavItems[index].name = e.target.value
                      setNavItems(updatedNavItems)
                    }}
                    className="bg-transparent border-none outline-none"
                  />
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar5
