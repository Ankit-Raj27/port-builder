"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Sparkles, Search, Filter, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import { useUser } from "@clerk/nextjs"
import {
  MeshGradientBackground,
  GlowText,
  CyberButton,
  BentoCard,
  FloatingCard,
} from "@/components/ui/AntigravityComponents"

type Template = {
  id: string
  name: string
  category: string
  description: string
  image: string
  gradient: string
  features: string[]
}

const templates: Template[] = [
  {
    id: "Modern",
    name: "Modern Portfolio",
    category: "Tech",
    description: "Clean, minimal design perfect for developers and engineers",
    image: "/images/template/Modern Portfolio.png",
    gradient: "from-cyan-400 to-blue-500",
    features: ["Dark Mode", "Responsive", "Animations"],
  },
  {
    id: "Creative",
    name: "Creative Portfolio",
    category: "Design",
    description: "Bold, artistic layout for designers and creatives",
    image: "/images/template/Creative Portfolio.png",
    gradient: "from-purple-400 to-pink-500",
    features: ["Vibrant Colors", "Unique Layout", "Interactive"],
  },
  {
    id: "Business",
    name: "Business Portfolio",
    category: "Professional",
    description: "Professional look for entrepreneurs and consultants",
    image: "/images/template/Business Portfolio.png",
    gradient: "from-orange-400 to-amber-500",
    features: ["Corporate Style", "SEO Ready", "Fast Loading"],
  },
]

const categories = ["All", "Tech", "Design", "Professional"]

export default function TemplatePage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleTemplateClick = (templateId: string) => {
    if (!isSignedIn) {
      router.push("/sign-in")
    } else {
      router.push(`/template/${templateId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <p className="text-white/40 text-sm">Loading templates...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#000] text-white">
      <Navbar />

      {/* Background */}
      <MeshGradientBackground intensity="subtle" />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Handcrafted with care</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-white/90">Browse our </span>
            <GlowText color="gradient" glow={false} className="text-4xl md:text-5xl lg:text-6xl font-bold">
              template gallery
            </GlowText>
          </motion.h1>

          <motion.p
            className="text-lg text-white/50 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose from our collection of professionally designed templates.
            Each one is fully customizable to match your unique style.
          </motion.p>

          {/* Search and Filter */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
              />
            </div>

            {/* Category filters */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  onClick={() => handleTemplateClick(template.id)}
                  className="cursor-pointer group"
                >
                  <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={template.image}
                        alt={template.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* View button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredTemplate === template.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.button
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium shadow-xl"
                          initial={{ y: 20 }}
                          animate={{ y: hoveredTemplate === template.id ? 0 : 20 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4" />
                          View Template
                        </motion.button>
                      </motion.div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${template.gradient} text-white`}>
                          {template.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-white/50 text-sm mb-4">{template.description}</p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 rounded-md bg-white/5 text-white/40 text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover glow */}
                    <AnimatePresence>
                      {hoveredTemplate === template.id && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${template.gradient}`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredTemplates.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/40 mb-4">No templates found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}