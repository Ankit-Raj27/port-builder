"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Footer1() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the form data to your backend
        console.log("Form submitted:", formData)

        // Show success toast
        toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        })

        // Reset form
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <footer className="relative w-full overflow-hidden bg-black py-16 text-white">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                {/* Animated dots */}
                <div className="absolute inset-0">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-1 w-1 rounded-full bg-white"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                opacity: Math.random() * 0.5 + 0.3,
                                scale: Math.random() * 0.5 + 0.5,
                            }}
                            animate={{
                                y: [null, Math.random() * -30, null],
                                opacity: [null, Math.random() * 0.8 + 0.2, null],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold">Let's Connect</h2>
                                <div className="mt-2 h-1 w-12 bg-primary"></div>
                            </div>

                            <p className="text-white/70">
                                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Mail me at</p>
                                        <Link href="mailto:hello@example.com" className="text-sm font-medium hover:text-primary">
                                            hello@example.com
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Call me at</p>
                                        <Link href="tel:+11234567890" className="text-sm font-medium hover:text-primary">
                                            +1 (123) 456-7890
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Find me at</p>
                                        <p className="text-sm font-medium">San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Link
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                                >
                                    <Github className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                                >
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                                >
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                                >
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-6 lg:col-span-2">
                            <div>
                                <h2 className="text-2xl font-bold">Send Me a Message</h2>
                                <div className="mt-2 h-1 w-12 bg-primary"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                            className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            required
                                            className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your Message"
                                        required
                                        className="min-h-[120px] border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary"
                                    />
                                </div>
                                <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
                        <div className="text-sm text-white/50">© {new Date().getFullYear()} Your Name. All rights reserved.</div>
                        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
                            <Link href="/privacy" className="text-sm text-white/50 transition-colors hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-white/50 transition-colors hover:text-white">
                                Terms of Service
                            </Link>
                            <Link href="/sitemap" className="text-sm text-white/50 transition-colors hover:text-white">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

