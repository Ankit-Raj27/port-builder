"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const productItems = [
  { title: "Modern", href: "/template/Modern" },
  { title: "Business", href: "/template/Business" },
  { title: "Creative", href: "/template/Creative" },
];

const resourceItems = [
  { title: "Documentation", href: "/documentation" },
  { title: "Community", href: "#" },
  { title: "Help Center", href: "#" },
  { title: "API Reference", href: "#" },
];

export function Navbar() {
  const { setTheme } = useTheme();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleProtectedRoute = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (!isSignedIn) {
      e.preventDefault();
      router.push("/sign-in");
    }
  };

  return (
    <header className="mb-0 sticky top-0 z-10 backdrop-blur-md  bg-gradient-to-tr from-[#101010] to-[#1a1a1a] dark:bg-black/70 border-b border-gray-900 dark:border-gray-800  dark:bg-gradient-to-tr dark:from-[#101010] dark:to-[#1a1a1a]">
      <div className=" max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="  flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PortBuilder Logo"
              width={200}
              height={48}
              className="h-10 w-auto transform transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden z-50 text-white md:flex items-center">
          <NavigationMenuList className="flex gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent rounded-full px-4 hover:text-white transition-colors hover:bg-[#2a2e3b] dark:hover:bg-gray-800 data-[state=open]:bg-[#2a2e3b] dark:data-[state=open]:bg-gray-800">
                <Link href="/template" onClick={handleProtectedRoute}>
                  Templates
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-3  rounded-xl">
                  {productItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          onClick={handleProtectedRoute}
                          className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f5f6fc] dark:hover:bg-gray-800"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-transparent rounded-full hover:text-white px-4 hover:bg-[#2a2e3b] dark:hover:bg-gray-800 
                        data-[state=open]:bg-[#292d38] dark:data-[state=open]:bg-gray-800"
              >

                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-3 rounded-xl">
                  {resourceItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          onClick={handleProtectedRoute}
                          className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem >
              <NavigationMenuLink asChild>
                <Link
                  href="/pricing"
                  onClick={handleProtectedRoute}
                  className="inline-flex text-white h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white hover:bg-[#2a2e3b] dark:hover:bg-gray-800"
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9"
                  }
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <Button variant="ghost" className="rounded-full text-white hover:bg-[#2a2e3b] hover:text-white px-4 font-medium">
                  Sign in
                </Button>
              </SignInButton>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-gray-200 dark:border-gray-800">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 border-t border-gray-100 hover:bg-[#f5f6fc] bg-white dark:bg-black">
          <div className="space-y-3">
            <div className="py-2">
              <Link
                href="/template"
                onClick={(e) => {
                  handleProtectedRoute(e);
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Templates
              </Link>
              <div className="ml-4 pl-2 border-l border-gray-200  dark:border-gray-700">
                {productItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => {
                      handleProtectedRoute(e);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mt-1"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2">
              <div className="block px-3 py-2 rounded-lg font-medium">
                Resources
              </div>
              <div className="ml-4 pl-2 border-l border-gray-200 hover:bg-[#f5f6fc] dark:border-gray-700">
                {resourceItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => {
                      handleProtectedRoute(e);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mt-1"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pricing"
              onClick={(e) => {
                handleProtectedRoute(e);
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}