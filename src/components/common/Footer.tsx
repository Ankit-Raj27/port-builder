"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Sparkles } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Templates", href: "/template" },
    { name: "Pricing", href: "/pricing" },
    { name: "Documentation", href: "/documentation" },
    { name: "Changelog", href: "#" },
  ],
  templates: [
    { name: "Modern", href: "/template/Modern" },
    { name: "Business", href: "/template/Business" },
    { name: "Creative", href: "/template/Creative" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:hello@portbuilder.com", label: "Email" },
]

const Footer = () => {
  return (
    <footer className="relative bg-[#000] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[180px]"
          style={{ bottom: "-200px", left: "20%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[150px]"
          style={{ bottom: "-150px", right: "20%" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Top border line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <Image
                  src="/logo.png"
                  alt="PortBuilder Logo"
                  width={160}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>

              <p className="mt-6 text-white/40 max-w-sm leading-relaxed">
                Build stunning developer portfolios in minutes. No coding required.
                Just pure creativity.
              </p>

              {/* Social links */}
              <div className="flex gap-3 mt-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <p className="text-sm text-white/60 mb-3">Stay updated</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                  />
                  <motion.button
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Links columns */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Product
                </h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Templates */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Templates
                </h4>
                <ul className="space-y-3">
                  {footerLinks.templates.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/30">
              © {new Date().getFullYear()} PortBuilder. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-sm text-white/30">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </motion.span>
              <span>by</span>
              <Link
                href="https://github.com"
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Switchengeek
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
