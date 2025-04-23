// app/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@radix-ui/react-toast";
import ClientWrapper from "@/components/common/ClientWrapper";
import "./globals.css"; // Global styles

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
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Add your Google Fonts link here */}
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@300..800&family=Plus+Jakarta+Sans:wght@300..800&display=swap"
            rel="stylesheet"
          />
        </head>
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
