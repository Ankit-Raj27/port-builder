import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@radix-ui/react-toast";
import ClientWrapper from "@/components/common/ClientWrapper";
import "./globals.css";

import { Nunito, Plus_Jakarta_Sans } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plusjakarta",
  display: "swap",
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
      }}
    >
      <html
        lang="en"
        className={`${nunito.variable} ${plusJakartaSans.variable}`}
        suppressHydrationWarning
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ClientWrapper>
              <main>{children}</main>
              <ToastProvider />
            </ClientWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
