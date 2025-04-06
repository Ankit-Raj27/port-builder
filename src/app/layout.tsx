/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
//import ThemeProvider from "@/components/ThemeProvider"; // ✅ Import ThemeProvider
import "./globals.css";
import {
  ClerkProvider,
  // SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@radix-ui/react-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Port Builder",
  description: "Create a portfolio site with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToastProvider />
          </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  )
}



