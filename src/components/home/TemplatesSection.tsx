"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Sparkles, Eye } from "lucide-react"
import Link from "next/link"
import {
  BentoGrid,
  BentoCard,
  CyberButton,
  GlowText,
} from "@/components/ui/AntigravityComponents"

// Templates for Bento Grid showcase
const templates = [
  {
    id: 1,
    title: "Modern Developer",
    category: "Tech",
    image: "/images/template/Modern Portfolio.png",
    span: "large" as const,
    gradient: "bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10",
  },
  {
    id: 2,
    title: "Creative Designer",
    category: "Design",
    image: "/images/template/Creative Portfolio.png",
    span: "default" as const,
    gradient: "bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10",
  },
  {
    id: 3,
    title: "Business Pro",
    category: "Business",
    image: "/images/template/Business Portfolio.png",
    span: "default" as const,
    gradient: "bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10",
  },
]

export default function TemplatesSection() {
  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {/* SECTION 1: Bento Grid Template Showcase (NEW Antigravity Design) */}
      <section className="relative py-32 bg-[#000] overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[180px]"
            style={{ top: "20%", right: "10%" }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -40, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]"
            style={{ bottom: "10%", left: "10%" }}
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 30, -30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Grid pattern */}
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Premium Templates</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-white/90">Explore our </span>
              <GlowText color="gradient" glow={false} className="text-4xl md:text-5xl lg:text-6xl font-bold">
                curated collection
              </GlowText>
            </motion.h2>

            <motion.p
              className="text-lg text-white/50 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hand-crafted templates designed to make your portfolio stand out.
              Each one is fully customizable to match your unique style.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <BentoGrid className="mb-16">
            {templates.map((template, index) => (
              <BentoCard
                key={template.id}
                span={template.span}
                gradient={template.gradient}
                className="min-h-[300px] md:min-h-[400px]"
              >
                <div className="h-full flex flex-col">
                  {/* Image */}
                  <div className="relative flex-1 rounded-2xl overflow-hidden mb-4 group">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-center pb-8"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/template/${template.title.split(' ')[0]}`}>
                        <motion.button
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4" />
                          View Template
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 mb-1 block">
                      {template.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                  </div>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/template">
              <CyberButton variant="secondary" size="lg">
                View All Templates
                <ArrowRight className="w-5 h-5" />
              </CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Original Feature Sections (RESTORED) */}
      <section className="w-full py-16 shadow-lg bg-gradient-to-tr from-[#0a0a0a] via-[#000] to-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center px-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Choose the best templates for your portfolio website
          </h2>
          <p className="text-lg text-white/50">
            PortBuilder offers a wide variety of templates for creatives looking to make their portfolio. You can
            easily mix templates to create a digital portfolio that perfectly fits your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-y-24 min-h-screen max-w-7xl mx-auto px-4">
          {/* First image section with grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2 p-4 object-cover"
          >
            {/* Top-left image (normal position) */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/portfolio1.png"
                width={240}
                height={240}
                alt="portfolio2"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </motion.div>

            {/* Top-right image (shifted down on md and up) */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/portfolio2.jpg"
                width={240}
                height={240}
                alt="portfolio1"
                className="rounded-lg shadow-lg object-cover mt-12"
              />
            </motion.div>

            {/* Bottom image (centered below, slight overlap on md+) */}
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={imageHoverVariants}
              className="md:col-span-2 flex justify-center -mt-8"
            >
              <Image
                src="/images/portfolio3.png"
                width={240}
                height={240}
                alt="portfolio3"
                className="rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-3xl md:text-4xl">Choose from Stunning Templates</h2>
            <h3 className="text font-medium sm:text-2xl mt-2 text-cyan-400">Create web pages easily</h3>
            <p className="mt-2 max-w-[600px] text-white/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              PortBuilder gives you the freedom to mix and match beautifully designed sections—from navbars and hero sections to project showcases, experience timelines, and footers. Whether you are a designer, developer, or creative, you'll find the perfect fit.
            </p>
          </motion.div>


          {/* 2nd block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white">Fully Customizable Layouts</h2>
            <h3 className="text font-medium sm:text-2xl mt-2 text-purple-400">Craft your unique digital presence with ease.</h3>
            <p className="mt-2 max-w-[600px] text-white/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Select from a variety of layout options for every section of your portfolio—no code required. Want a minimal navbar and a bold hero? Go for it. Prefer a dark footer with animated project cards? You're in control.
            </p>
          </motion.div>

          {/* Second image section with grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2 p-4"
          >
            {/* Top-left - slightly lowered */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/editor1.png"
                width={240}
                height={240}
                alt="df"
                className="rounded-lg shadow-lg mt-6 object-cover"
              />
            </motion.div>

            {/* Top-right - slightly higher and overlaps left */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/editor2.jpg"
                width={240}
                height={240}
                alt="df"
                className="rounded-lg shadow-lg -mt-2 -ml-4 object-cover"
              />
            </motion.div>

            {/* Bottom - centered and overlapping top images slightly */}
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={imageHoverVariants}
              className="col-span-2 flex justify-center object-cover -mt-6"
            >
              <Image
                src="/images/editor3.jpg"
                width={260}
                height={260}
                alt="df"
                className="rounded-lg shadow-xl object-cover"
              />
            </motion.div>
          </motion.div>


          {/* Third image section with grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2 p-4 relative"
          >
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/hosting1.png"
                width={250}
                height={250}
                alt="img1"
                className="rounded-lg shadow-lg mt-4 object-cover"
              />
            </motion.div>
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/hosting2.png"
                width={250}
                height={250}
                alt="img2"
                className="rounded-lg shadow-xl -mt-6 -ml-6 object-cover relative"
              />
            </motion.div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white">Built-in Web Hosting</h2>
            <h3 className="text font-medium sm:text-2xl mt-2 text-cyan-400">Host your portfolio easily</h3>
            <p className="mt-2 max-w-[600px] text-white/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              No more wrestling with hosting providers or DNS settings. Your portfolio lives on the web the moment you publish it—secure, fast, and hassle-free.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}