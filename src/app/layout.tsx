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
        baseTheme: undefined,
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
        variables: {
          colorPrimary: "#00f0ff",
          colorBackground: "#0a0a0a",
          colorInputBackground: "#1a1a1a",
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#a0a0a0",
          colorDanger: "#ff4444",
          colorSuccess: "#00ff88",
          borderRadius: "0.75rem",
        },
        elements: {
          // Modal and card styling
          modalContent: "bg-[#0a0a0a] border border-white/10",
          card: "bg-[#0a0a0a] shadow-2xl border border-white/10",
          headerTitle: "text-white",
          headerSubtitle: "text-white/60",
          // Form elements
          formButtonPrimary:
            "bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all",
          formFieldLabel: "text-white/80",
          formFieldInput:
            "bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/20",
          formFieldInputShowPasswordButton: "text-white/50 hover:text-white",
          // Footer and links
          footerActionLink: "text-cyan-400 hover:text-cyan-300",
          footerActionText: "text-white/50",
          // Social buttons
          socialButtonsBlockButton:
            "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20",
          socialButtonsBlockButtonText: "text-white",
          // Divider
          dividerLine: "bg-white/10",
          dividerText: "text-white/40",
          // Identity preview
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-cyan-400 hover:text-cyan-300",
          // Alert
          alert: "bg-red-500/10 border-red-500/20 text-red-400",
          alertText: "text-red-400",
          // User button
          userButtonPopoverCard: "bg-[#0a0a0a] border border-white/10",
          userButtonPopoverActionButton: "text-white hover:bg-white/10",
          userButtonPopoverActionButtonText: "text-white",
          userButtonPopoverFooter: "border-white/10",
          // Avatar
          avatarBox: "border-2 border-cyan-400/30",
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
              <main>
                {children}</main>
              <ToastProvider />
            </ClientWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
