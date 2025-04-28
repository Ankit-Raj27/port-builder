"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

// ✅ Editable data object
const data = {
  title: "Portfolio",
  navItems: [
    { title: "Home", href: "#" },
    { title: "Projects", href: "#projects" },
    { title: "Experience", href: "#experience" },
    { title: "Contact", href: "#contact" },
  ],
}

export default function Navbar6() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  return (
    <header className="bg-background/80 backdrop-blur-md top-0 z-50 border-b">
      <div className="container flex h-16 items-center">
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-primary" />
          <span className="font-bold">{data.title}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:justify-center md:gap-10">
          {data.navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Theme toggle & Mobile Nav */}
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setTheme("light")
                  document.documentElement.classList.remove("dark")
                }}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme("dark")
                  document.documentElement.classList.add("dark")
                }}
              >
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-6">
                  <nav className="flex flex-col gap-4">
                    {data.navItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
}
