"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ArrowRight, Copy, Check, Menu, X, SearchIcon, BookOpen } from "lucide-react"
import Link from "next/link"
import { DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import { GradientText } from "@/components/ui/GradientText"

// Data for documentation sections
const sections = [
    {
        id: "getting-started",
        title: "Getting Started",
        emoji: "🚀",
        content: [
            { type: "text", value: "Create an Account / Log In" },
            { type: "text", value: "Start by creating an account or logging in using your email." },
            { type: "text", value: "We use Clerk for secure and easy authentication." },
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
            { type: "text", value: "After logging in, you'll land on your Portfolio Builder Dashboard." },
            { type: "heading", value: "Here's what you can do:" },
            { type: "heading", value: "🧩 1. Choose a Template" },
            { type: "text", value: "You'll be shown different template types to pick from." },
            { type: "text", value: "These define the overall look and layout of your portfolio." },
            { type: "heading", value: "🛠️ 2. Customize Your Portfolio" },
            { type: "text", value: "Once a template is selected, you can start customizing components like:" },
            { type: "list", items: ["Hero Section", "About Section", "Projects Gallery", "Contact Form", "Skills & Experience"] },
            { type: "text", value: "Real-time preview helps you visualize the changes instantly." },
            {
                type: "code",
                language: "jsx",
                value: '// Example of customizing a component\n<HeroSection\n  title="Your Name"\n  subtitle="Your Role"\n  backgroundImage="/path/to/image.jpg"\n/>',
            },
        ],
    },
    {
        id: "download-portfolio",
        title: "Download Your Portfolio",
        emoji: "💾",
        content: [
            { type: "text", value: "Click the Download button" },
            { type: "text", value: "✅ If you have an active subscription: .zip file will download with your selected layout." },
            { type: "text", value: "🚫 If you don't have a subscription: You'll be redirected to the Pricing Page to pay via Razorpay." },
            {
                type: "code",
                language: "jsx",
                value: '// Download button component\n<Button onClick={handleDownload}>\n  Download Portfolio\n  <DownloadIcon className="ml-2" />\n</Button>',
            },
        ],
    },
    {
        id: "payments-subscription",
        title: "Payments & Subscription",
        emoji: "💳",
        content: [
            { type: "text", value: "We use Razorpay to handle secure one-time payments." },
            { type: "text", value: "Your subscription is tied to your Clerk-authenticated account." },
            { type: "text", value: "Once paid, you get lifetime access to download your customized portfolios." },
            {
                type: "code",
                language: "jsx",
                value: '// Payment integration example\nimport { useRazorpay } from \'react-razorpay\';\n\nconst handlePayment = async () => {\n  const order = await createOrder();\n  const options = {\n    key: process.env.RAZORPAY_KEY,\n    amount: order.amount,\n    currency: "INR",\n    name: "Portfolio Builder",\n    order_id: order.id,\n  };\n  \n  const razorpay = new Razorpay(options);\n  razorpay.open();\n};',
            },
        ],
    },
    {
        id: "download-contents",
        title: "What's Inside the Download?",
        emoji: "📁",
        content: [
            { type: "list", items: ["A full working Next.js + Tailwind CSS project", "Your custom-selected sections and components", "Easy-to-edit code so you can tweak it further if needed"] },
            {
                type: "code",
                language: "bash",
                value: "portfolio-download/\n├── public/\n│   └── assets/\n├── src/\n│   ├── components/\n│   ├── pages/\n│   └── styles/\n├── package.json\n├── tailwind.config.js\n└── README.md",
            },
        ],
    },
    {
        id: "faq",
        title: "FAQ",
        emoji: "🙋",
        content: [
            { type: "heading", value: "Q: Can I edit the downloaded code?" },
            { type: "text", value: "A: Absolutely! The downloaded code is yours to modify and extend as needed." },
            { type: "heading", value: "Q: Can I generate multiple portfolios?" },
            { type: "text", value: "A: Yes, any time during your subscription you can create and download as many portfolios as you want." },
            { type: "heading", value: "Q: How do I get support?" },
            { type: "text", value: "A: Reach out via our Support page or dashboard contact option." },
            {
                type: "code",
                language: "jsx",
                value: "// Contact form component\n<ContactForm\n  onSubmit={handleSupportRequest}\n  fields={[\n    { name: 'email', type: 'email', required: true },\n    { name: 'subject', type: 'text', required: true },\n    { name: 'message', type: 'textarea', required: true }\n  ]}\n/>",
            },
        ],
    },
]

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                    variant="outline"
                    className="relative h-10 w-10 p-0 xl:h-11 xl:w-72 xl:justify-start xl:px-4 xl:py-2 bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                    onClick={() => setOpen(true)}
                >
                    <SearchIcon className="h-4 w-4 xl:mr-3 text-gray-400" />
                    <span className="hidden xl:inline-flex text-gray-400">Search documentation...</span>
                    <span className="sr-only">Search documentation</span>
                    <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-6 select-none items-center gap-1 rounded-md bg-white/10 px-2 font-mono text-xs font-medium text-gray-400 xl:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </motion.div>

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
            className="relative my-6 rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
        >
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-medium text-purple-400">{language}</span>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                    )}
                </motion.button>
            </div>
            <pre className="overflow-x-auto p-4 text-sm text-gray-300">
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

    useEffect(() => {
        setMounted(true)
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
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Animated background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[150px]"
                    animate={{
                        x: [0, 30, -30, 0],
                        y: [0, -20, 20, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ top: "20%", left: "10%" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]"
                    animate={{
                        x: [0, -30, 30, 0],
                        y: [0, 30, -30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ bottom: "20%", right: "10%" }}
                />
            </div>

            {/* Header */}
            <motion.header
                className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20"
                            whileHover={{ scale: 1.02 }}
                        >
                            <BookOpen className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-300 font-medium">Documentation</span>
                        </motion.div>
                    </div>
                    <div className="hidden md:flex">
                        <Search />
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 relative z-10">
                {/* Sidebar - Desktop */}
                <motion.aside
                    className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <ScrollArea className="h-full py-8 pr-6">
                        <motion.div
                            className="flex flex-col gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {sections.map((section) => (
                                <motion.div key={section.id} variants={itemVariants}>
                                    <Button
                                        variant={activeSection === section.id ? "secondary" : "ghost"}
                                        className={`w-full justify-start transition-all duration-300 ${activeSection === section.id
                                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        onClick={() => handleNavItemClick(section.id)}
                                    >
                                        <span className="mr-3">{section.emoji}</span>
                                        {section.title}
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </ScrollArea>
                </motion.aside>

                {/* Mobile Sidebar Trigger */}
                <div className="fixed bottom-6 right-6 z-40 md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="icon"
                                    className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 shadow-lg shadow-purple-500/25"
                                >
                                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </Button>
                            </motion.div>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] bg-[#0a0a0a] border-white/10">
                            <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
                                <div className="flex flex-col gap-2 pt-6">
                                    {sections.map((section) => (
                                        <Button
                                            key={section.id}
                                            variant={activeSection === section.id ? "secondary" : "ghost"}
                                            className={`justify-start ${activeSection === section.id
                                                ? "bg-purple-500/20 text-purple-300"
                                                : "text-gray-400"
                                                }`}
                                            onClick={() => handleNavItemClick(section.id)}
                                        >
                                            <span className="mr-3">{section.emoji}</span>
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
                    className="relative py-8 lg:py-10"
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
                            {/* Breadcrumb */}
                            <motion.div
                                className="mb-6 flex items-center space-x-2 text-sm text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="hover:text-purple-400 cursor-pointer transition-colors">Docs</span>
                                <span>/</span>
                                <span className="text-purple-400 font-medium">{currentSection.title}</span>
                            </motion.div>

                            {/* Title */}
                            <div className="space-y-4 mb-10">
                                <motion.h1
                                    className="text-4xl md:text-5xl font-bold text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <span className="mr-3">{currentSection.emoji}</span>
                                    <GradientText
                                        colors={["#a855f7", "#6366f1", "#3b82f6", "#a855f7"]}
                                        animationSpeed={4}
                                    >
                                        {currentSection.title}
                                    </GradientText>
                                </motion.h1>
                                {currentSection.id === "getting-started" && (
                                    <motion.p
                                        className="text-lg text-gray-400"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        Build and download personalized developer portfolios in minutes.
                                    </motion.p>
                                )}
                            </div>

                            {/* Content */}
                            <motion.div
                                className="space-y-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {currentSection.content.map((item, index) => {
                                    if (item.type === "text") {
                                        return (
                                            <motion.p
                                                key={index}
                                                className="text-gray-300 leading-8"
                                                variants={itemVariants}
                                            >
                                                {item.value}
                                            </motion.p>
                                        )
                                    } else if (item.type === "heading") {
                                        return (
                                            <motion.h3
                                                key={index}
                                                className="mt-10 text-xl font-semibold text-white"
                                                variants={itemVariants}
                                            >
                                                {item.value}
                                            </motion.h3>
                                        )
                                    } else if (item.type === "list") {
                                        return (
                                            <motion.ul
                                                key={index}
                                                className="my-6 ml-6 space-y-3"
                                                variants={itemVariants}
                                            >
                                                {item.items?.map((listItem, i) => (
                                                    <motion.li
                                                        key={i}
                                                        className="flex items-start gap-3 text-gray-300"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * i }}
                                                    >
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
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
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-4 pt-12 mt-12 border-t border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Link href="/template">
                                    <motion.button
                                        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-purple-500/25"
                                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                                <Link href="/pricing">
                                    <motion.button
                                        className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View Pricing
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </motion.main>
            </div>
            <Footer />
        </div>
    )
}
