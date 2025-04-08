"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ArrowRight, Copy, Check, Menu, X, Moon, Sun, SearchIcon } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { DialogTitle } from "@/components/ui/dialog"
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

// Data for documentation sections
const sections = [
    {
        id: "getting-started",
        title: "Getting Started",
        emoji: "🚀",
        content: [
            {
                type: "text",
                value: "Create an Account / Log In",
            },
            {
                type: "text",
                value: "Start by creating an account or logging in using your email.",
            },
            {
                type: "text",
                value: "We use Clerk for secure and easy authentication.",
            },
            {
                type: "code",
                language: "bash",
                value: "# Install dependencies\nnpm install\n\n# Run the development server\nnpm run dev",
            },
        ],
    },
    {
        id: "dashboard-overview",
        title: "Dashboard Overview",
        emoji: "🏠",
        content: [
            {
                type: "text",
                value: "After logging in, you'll land on your Portfolio Builder Dashboard.",
            },
            {
                type: "heading",
                value: "Here's what you can do:",
            },
            {
                type: "heading",
                value: "🧩 1. Choose a Template",
            },
            {
                type: "text",
                value: "You'll be shown different template types to pick from.",
            },
            {
                type: "text",
                value: "These define the overall look and layout of your portfolio.",
            },
            {
                type: "heading",
                value: "🛠️ 2. Customize Your Portfolio",
            },
            {
                type: "text",
                value: "Once a template is selected, you can start customizing components like:",
            },
            {
                type: "list",
                items: ["Hero Section", "About Section", "Projects Gallery", "Contact Form", "Skills & Experience"],
            },
            {
                type: "text",
                value: "Real-time preview helps you visualize the changes instantly.",
            },
            {
                type: "code",
                language: "jsx",
                value:
                    '// Example of customizing a component\n<HeroSection\n  title="Your Name"\n  subtitle="Your Role"\n  backgroundImage="/path/to/image.jpg"\n/>',
            },
        ],
    },
    {
        id: "download-portfolio",
        title: "Download Your Portfolio",
        emoji: "💾",
        content: [
            {
                type: "text",
                value: "Click the Download button",
            },
            {
                type: "text",
                value: "✅ If you have an active subscription: .zip file will download with your selected layout.",
            },
            {
                type: "text",
                value: "🚫 If you don't have a subscription: You'll be redirected to the Pricing Page to pay via Razorpay.",
            },
            {
                type: "code",
                language: "jsx",
                value:
                    '// Download button component\n<Button onClick={handleDownload}>\n  Download Portfolio\n  <DownloadIcon className="ml-2" />\n</Button>',
            },
        ],
    },
    {
        id: "payments-subscription",
        title: "Payments & Subscription",
        emoji: "💳",
        content: [
            {
                type: "text",
                value: "We use Razorpay to handle secure one-time payments.",
            },
            {
                type: "text",
                value: "Your subscription is tied to your Clerk-authenticated account.",
            },
            {
                type: "text",
                value: "Once paid, you get lifetime access to download your customized portfolios.",
            },
            {
                type: "code",
                language: "jsx",
                value:
                    '// Payment integration example\nimport { useRazorpay } from \'react-razorpay\';\n\nconst handlePayment = async () => {\n  const order = await createOrder();\n  const options = {\n    key: process.env.RAZORPAY_KEY,\n    amount: order.amount,\n    currency: "INR",\n    name: "Portfolio Builder",\n    order_id: order.id,\n  };\n  \n  const razorpay = new Razorpay(options);\n  razorpay.open();\n};',
            },
        ],
    },
    {
        id: "download-contents",
        title: "What's Inside the Download?",
        emoji: "📁",
        content: [
            {
                type: "list",
                items: [
                    "A full working Next.js + Tailwind CSS project",
                    "Your custom-selected sections and components",
                    "Easy-to-edit code so you can tweak it further if needed",
                ],
            },
            {
                type: "code",
                language: "bash",
                value:
                    "portfolio-download/\n├── public/\n│   └── assets/\n├── src/\n│   ├── components/\n│   ├── pages/\n│   └── styles/\n├── package.json\n├── tailwind.config.js\n└── README.md",
            },
        ],
    },
    {
        id: "faq",
        title: "FAQ",
        emoji: "🙋",
        content: [
            {
                type: "heading",
                value: "Q: Can I edit the downloaded code?",
            },
            {
                type: "text",
                value: "A: Absolutely! The downloaded code is yours to modify and extend as needed.",
            },
            {
                type: "heading",
                value: "Q: Can I generate multiple portfolios?",
            },
            {
                type: "text",
                value: "A: Yes, any time during your subscription you can create and download as many portfolios as you want.",
            },
            {
                type: "heading",
                value: "Q: How do I get support?",
            },
            {
                type: "text",
                value: "A: Reach out via our Support page or dashboard contact option.",
            },
            {
                type: "code",
                language: "jsx",
                value:
                    "// Contact form component\n<ContactForm\n  onSubmit={handleSupportRequest}\n  fields={[\n    { name: 'email', type: 'email', required: true },\n    { name: 'subject', type: 'text', required: true },\n    { name: 'message', type: 'textarea', required: true }\n  ]}\n/>",
            },
        ],
    },
]

// Mode Toggle Component
function ModeToggle() {
    const { setTheme } = useTheme()

    return (
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
    )
}

// Search Component
function Search() {
    const [open, setOpen] = useState(false)

    const handleSelect = (id: string) => {
        setOpen(false)
        window.location.hash = id
    }

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                onClick={() => setOpen(true)}
            >
                <SearchIcon className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">Search documentation...</span>
                <span className="sr-only">Search documentation</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
           

            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle>
                    <VisuallyHidden>Search Documentation</VisuallyHidden>
                </DialogTitle>

                <CommandInput placeholder="Search documentation..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Documentation">
                        {sections.map((section) => (
                            <CommandItem
                                key={section.id}
                                value={section.title}
                                onSelect={() => handleSelect(section.id)}
                            >
                                <span className="mr-2">{section.emoji}</span>
                                {section.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

        </>
    )
}

// Code Block Component
function CodeBlock({ language, value }: { language: string; value: string }) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            className="relative my-4 rounded-lg bg-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between px-4 py-2 text-xs font-medium text-muted-foreground">
                <span>{language}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
                <code>{value}</code>
            </pre>
        </motion.div>
    )
}

// Main Documentation Page Component
export default function DocumentationPage() {
    const [mounted, setMounted] = useState(false)
    const [activeSection, setActiveSection] = useState("getting-started")
    const [isOpen, setIsOpen] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)

        // Handle hash changes
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "")
            if (hash && sections.some((section) => section.id === hash)) {
                setActiveSection(hash)
            }
        }

        handleHashChange()
        window.addEventListener("hashchange", handleHashChange)
        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [])

    if (!mounted) {
        return null
    }

    const currentSection = sections.find((section) => section.id === activeSection) || sections[0]

    const handleNavItemClick = (id: string) => {
        setActiveSection(id)
        setIsOpen(false)
        window.location.hash = id
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
                {/* Header */}
                <motion.header
                    className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container flex h-14 items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link href="/" className="mr-6 flex items-center">

                                <Image
                                    src="/logo.png"
                                    alt="PortBuilder Logo"
                                    width={250}
                                    height={60}
                                    className=" h-12 w-auto"
                                />
                            </Link>
                            <div className="hidden md:flex">
                                <Search />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ModeToggle />
                        </div>
                    </div>
                </motion.header>

                {/* Main Content */}
                <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                    {/* Sidebar - Desktop */}
                    <motion.aside
                        className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
                            <div className="flex flex-col gap-2">
                                {sections.map((section) => (
                                    <Button
                                        key={section.id}
                                        variant={activeSection === section.id ? "secondary" : "ghost"}
                                        className={`justify-start ${activeSection === section.id ? "bg-muted font-medium" : ""}`}
                                        onClick={() => handleNavItemClick(section.id)}
                                    >
                                        <span className="mr-2">{section.emoji}</span>
                                        {section.title}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </motion.aside>

                    {/* Mobile Sidebar Trigger */}
                    <div className="fixed bottom-4 right-4 z-40 md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline">
                                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <ScrollArea className="h-[calc(100vh-3.5rem)] pb-10">
                                    <div className="flex flex-col gap-2 pt-6">
                                        {sections.map((section) => (
                                            <Button
                                                key={section.id}
                                                variant={activeSection === section.id ? "secondary" : "ghost"}
                                                className={`justify-start ${activeSection === section.id ? "bg-muted font-medium" : ""}`}
                                                onClick={() => handleNavItemClick(section.id)}
                                            >
                                                <span className="mr-2">{section.emoji}</span>
                                                {section.title}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Main Content Area */}
                    <motion.main
                        className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mx-auto w-full min-w-0"
                            >
                                <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
                                    <span>/</span>
                                    <div className="font-medium text-foreground">{currentSection.title.replace(/^[^ ]+ /, "")}</div>
                                </div>
                                <div className="space-y-2">
                                    <motion.h1
                                        className="scroll-m-20 text-4xl font-bold tracking-tight"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {currentSection.emoji} {currentSection.title}
                                    </motion.h1>
                                    <motion.p
                                        className="text-lg text-muted-foreground"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        {currentSection.id === "getting-started"
                                            ? "Build and download personalized developer portfolios in minutes."
                                            : ""}
                                    </motion.p>
                                </div>
                                <div className="pb-12 pt-8">
                                    <div className="space-y-6">
                                        {currentSection.content.map((item, index) => {
                                            if (item.type === "text") {
                                                return (
                                                    <motion.p
                                                        key={index}
                                                        className="leading-7"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    >
                                                        {item.value}
                                                    </motion.p>
                                                )
                                            } else if (item.type === "heading") {
                                                return (
                                                    <motion.h3
                                                        key={index}
                                                        className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    >
                                                        {item.value}
                                                    </motion.h3>
                                                )
                                            } else if (item.type === "list") {
                                                return (
                                                    <motion.ul
                                                        key={index}
                                                        className="my-6 ml-6 list-disc [&>li]:mt-2"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    >
                                                        {item.items?.map((listItem, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -5 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.2, delay: index * 0.05 + i * 0.03 }}
                                                            >
                                                                {listItem}
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                )
                                            } else if (item.type === "code") {
                                                return <CodeBlock key={index} language={item.language || ""} value={item.value || ""} />
                                            }
                                            return null
                                        })}
                                    </div>
                                    <motion.div
                                        className="flex justify-center gap-4 pt-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <Button variant="default" className="text-lg px-6 py-2">
                                            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" className="text-lg px-6 py-2">
                                            View Pricing
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.main>
                </div>
            </div>
        </ThemeProvider>
    )
}
