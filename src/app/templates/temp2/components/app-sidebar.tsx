"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FileText, Home, Info, LayoutGrid, Mail, MessageSquare, Twitter, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/projects", label: "Projects", icon: LayoutGrid },
    { href: "/articles", label: "Articles", icon: MessageSquare },
    { href: "/contact", label: "Contact", icon: Mail },
  ]

  const socialNavItems = [
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
    { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">John Doe</span>
            <span className="text-sm text-muted-foreground">Developer</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="mt-8">
          <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">Socials</h3>
          <SidebarMenu>
            {socialNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button className="w-full" asChild>
          <Link href="/resume">
            <FileText className="mr-2 h-4 w-4" />
            Read Resume
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

