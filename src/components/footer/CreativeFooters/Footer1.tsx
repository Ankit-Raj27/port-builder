"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface FormData {
    name: string
    email: string
    message: string
}

export default function Footer1() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Form submitted:", formData)

        toast("Message sent successfully!")

        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <footer className="relative w-full overflow-hidden bg-black py-16 text-white">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Let us Connect</h2>
                            <p className="text-white/70">I am always open to discussing new projects, creative ideas, or opportunities.</p>
                            <div className="space-y-4">
                                <ContactInfo Icon={Mail} label="Mail me at" value="hello@example.com" href="mailto:hello@example.com" />
                                <ContactInfo Icon={Phone} label="Call me at" value="+1 (123) 456-7890" href="tel:+11234567890" />
                                <ContactInfo Icon={MapPin} label="Find me at" value="San Francisco, CA" />
                            </div>
                            <SocialLinks />
                        </div>
                        <div className="space-y-6 lg:col-span-2">
                            <h2 className="text-2xl font-bold">Send Me a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
                                    <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" type="email" />
                                </div>
                                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required className="min-h-[120px] border-white/10 bg-white/5 text-white" />
                                <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

import { LucideIcon } from "lucide-react";

function ContactInfo({ Icon, label, value, href }: { Icon: LucideIcon; label: string; value: string; href?: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-sm text-white/50">{label}</p>
                {href ? (
                    <Link href={href} className="text-sm font-medium hover:text-primary">
                        {value}
                    </Link>
                ) : (
                    <p className="text-sm font-medium">{value}</p>
                )}
            </div>
        </div>
    )
}

function SocialLinks() {
    const socialLinks = [
        { href: "https://github.com", Icon: Github, label: "GitHub" },
        { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
        { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
        { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
    ]
    return (
        <div className="flex gap-4">
            {socialLinks.map(({ href, Icon, label }) => (
                <Link key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                </Link>
            ))}
        </div>
    )
}

function InputField({ name, value, onChange, placeholder, type = "text" }: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string }) {
    return <Input name={name} value={value} onChange={onChange} placeholder={placeholder} required type={type} className="border-white/10 bg-white/5 text-white" />
}
