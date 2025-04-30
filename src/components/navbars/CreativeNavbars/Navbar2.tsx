"use client"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React, { useEffect } from "react"

const collections = [
  {
    title: "Spring/Summer 2023",
    href: "/collections/spring-summer-2023",
    description: "Ethereal fabrics and bold silhouettes inspired by coastal landscapes.",
  },
  {
    title: "Fall/Winter 2022",
    href: "/collections/fall-winter-2022",
    description: "Structured pieces with architectural influences and rich textures.",
  },
  {
    title: "Capsule Collection",
    href: "/collections/capsule",
    description: "Limited edition pieces designed for versatility and timeless appeal.",
  },
  {
    title: "Accessories",
    href: "/collections/accessories",
    description: "Handcrafted accessories that complement and elevate every outfit.",
  },
]

interface Navbar2Props {
  onNavigate?: (page: string) => void
}
const navigationItems = [
  { title: "Home", href: "/", page: "home" },
  { title: "Portfolio", href: "/portfolio", page: "portfolio" },
  { title: "About", href: "/about", page: "about" },
  { title: "Journal", href: "/journal", page: "journal" },
  { title: "Contact", href: "/contact", page: "contact" },
]

export default function Navbar2({ onNavigate }: Navbar2Props = {}) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  useEffect(() => {
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
    <div>

      <header className="  border-b bg-background">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">ATELIER</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {collections.map((collection) => (
                      <li key={collection.title} className="row-span-1">
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href={collection.href}
                          >
                            <div className="text-sm font-medium leading-none">{collection.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {collection.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/lookbook" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Lookbook</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/atelier" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Atelier</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/journal" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Journal</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/appointment" className="text-sm font-medium underline-offset-4 hover:underline">
              Book Appointment
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
