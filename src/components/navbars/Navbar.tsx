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
import { Moon, Sun } from "lucide-react";
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
  { title: "Personal", href: "/template/template1?navbar=Navbar1&hero=Hero1" },
  { title: "Business", href: "/template/template2?navbar=Navbar2&hero=Hero1" },
  { title: "Creative", href: "/template/template2?navbar=Navbar2&hero=Hero1" },
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

  const handleProtectedRoute = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      router.push("/sign-in");
    }
  };

  return (
    <header className="border-b dark:bg-gradient-to-tr from-[#000000] to-[#434343]">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center">
          <Image
            src="/logo.png"
            alt="PortBuilder Logo"
            width={250}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        <NavigationMenu className="hidden md:flex items-center justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger><Link onClick={(e) => handleProtectedRoute(e)} href={"/template"}>Template</Link></NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-2">
                  {productItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => handleProtectedRoute(e)}
                          className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-2">
                  {resourceItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => handleProtectedRoute(e)}
                          className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
              <NavigationMenuLink asChild>
                <Link
                  href="/pricing"
                  onClick={(e) => handleProtectedRoute(e)}
                  className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto mr-5 flex items-center gap-4">
          <UserButton /> {!isSignedIn && <SignInButton />}
        </div>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
