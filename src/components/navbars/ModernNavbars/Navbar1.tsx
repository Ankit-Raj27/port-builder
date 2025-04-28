"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavbarProps {
  data?: {
    title?: string
    buttonText?: string
    avatarSrc?: string
  }
}
const Navbar1: React.FC<NavbarProps> = ({ data }) => {
  const navItems = [
    { title: "Home", href: "#" },
    { title: "Projects", href: "#projects" },
    { title: "Experience", href: "#experience" },
    { title: "Contact", href: "#contact" },
  ]
  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={data?.avatarSrc || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback>{data?.title?.charAt(0) || "JD"}</AvatarFallback>
          </Avatar>
          <Link href="#" className="font-semibold">
            {data?.title || "John Doe"}
          </Link>
        </div>
        <nav className="hidden md:flex md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button>{data?.buttonText || "Get in Touch"}</Button>
        </div>
      </div>
    </header>
  )
}
export default Navbar1
