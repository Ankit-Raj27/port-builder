"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditableText } from "@/components/common/EditableText"
import usePortfolioStore from "@/components/store/usePortfolioStore"

interface NavbarProps {
  isEditable?: boolean
}

const Navbar1: React.FC<NavbarProps> = ({ isEditable = true }) => {
  const { navbarContent, updateNavbarContent } = usePortfolioStore()
  
  // Defensive destructuring
  const { brandName = "PORTFOLIO", links = [] } = navbarContent || {}

  const handleUpdate = (val: string) => {
    updateNavbarContent({ brandName: val })
  }

  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 px-4 md:px-6">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>{brandName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-semibold">
             {isEditable ? (
               <EditableText 
                 value={brandName} 
                 onChange={handleUpdate} 
                 tag="span"
               />
             ) : (
               <span>{brandName}</span>
             )}
          </div>
        </div>
        <nav className="hidden md:flex md:gap-6">
          {links.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block px-4 md:px-6">
          <Button size="sm">Get in Touch</Button>
        </div>
      </div>
    </header>
  )
}
export default Navbar1
