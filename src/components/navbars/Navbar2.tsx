"use client"




            const data = {
              title: "saksham",
              buttonText: "saksham",
              avatarSrc: "/placeholder.svg",
              navItems: []
            };
          
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar2: React.FC = () => {
  // Embed your desired props directly here
  const data = {
    title: "My Portfolio",
    buttonText: "Contact Me",
    avatarSrc: "/my-avatar.png",
    navItems: [
      { title: "Home", href: "/" },
      { title: "Blog", href: "/blog" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ]
  }

  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={data.avatarSrc || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback>{data.title?.charAt(0) || "JD"}</AvatarFallback>
          </Avatar>
          <Link href="#" className="font-semibold">
            {data.title || "John Doe"}
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-6">
          {data.navItems.map((item) => (
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
          <Button>{data.buttonText || "Get in Touch"}</Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar2
