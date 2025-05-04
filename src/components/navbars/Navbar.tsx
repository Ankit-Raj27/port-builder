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
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    <>
      <header className="mb-0 sticky top-0 z-20 backdrop-blur-md bg-gradient-to-tr from-[#101010] to-[#1a1a1a] dark:bg-black/70 border-b border-gray-900 dark:border-gray-800 dark:bg-gradient-to-tr dark:from-[#101010] dark:to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
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
          <NavigationMenu className="hidden text-white z-50 text md:flex items-center">
            <NavigationMenuList className="flex  gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent rounded-full px-4 hover:text-white  hover:bg-[#2a2e3b]  data-[state=open]:bg-[#2a2e3b]">
                  <Link href="/template" >
                    Templates
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid bg-gradient-to-tr  from-[#101010] to-[#1a1a1a] w-48 gap-1 p-3 ">
                    {productItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            onClick={handleProtectedRoute}
                            className="block select-none  rounded-lg p-3 text-white leading-none no-underline outline-none transition-colors hover:bg-[#2a2e3b] dark:hover:bg-gray-800"
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
                  className="bg-transparent rounded-full hover:text-white px-4 hover:bg-[#2a2e3b] data-[state=open]:bg-[#292d38] "
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 gap-1 text-white bg-gradient-to-tr  from-[#101010] to-[#1a1a1a] p-3 ">
                    {resourceItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2a2e3b]"
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
                    className="inline-flex text-white h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white hover:bg-[#2a2e3b] "
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

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden hover:bg-[#2a2e3b]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5  text-white" />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-25 z-10 md:hidden "
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 text-white right-0 h-[calc(100vh-4rem)] w-1/3 max-w-xs bg-gradient-to-tr from-[#101010] to-[#1a1a1a] shadow-xl overflow-y-auto z-10 md:hidden"
            >
              <div className="space-y-3 px-4 py-4">
                <div className="py-2">
                  <Link
                    href="/template"
                    onClick={(e) => {
                      handleProtectedRoute(e);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-lg font-medium hover:bg-[#2a2e3b] "
                  >
                    Templates
                  </Link>
                  <div className="ml-4 pl-2 border-l border-gray-200 dark:border-gray-700">
                    {productItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => {
                          handleProtectedRoute(e);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-3 py-2 text-sm hover:bg-[#2a2e3b]  rounded-lg mt-1"
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
                  <div className="ml-4 pl-2 border-l border-gray-200 dark:border-gray-700">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={(e) => {
                          handleProtectedRoute(e);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-3 py-2 text-sm hover:bg-[#2a2e3b]  rounded-lg mt-1"
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
                  className="block px-3 py-2 rounded-lg font-medium hover:bg-[#2a2e3b] "
                >
                  Pricing
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}