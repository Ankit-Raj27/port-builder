"use client"

import type React from "react"

import { Navbar } from "@/components/navbars/Navbar"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Edit, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type Template = {
  id: string
  name: string
  description: string
  category: string
  navbar: string
  hero: string
}

const templates: Template[] = [
  {
    id: "template1",
    name: "Modern Portfolio",
    description: "A sleek, minimal portfolio.",
    category: "Personal",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template2",
    name: "Creative Portfolio",
    description: "A stylish and colorful template.",
    category: "Creative",
    navbar: "Navbar2",
    hero: "Hero1",
  },
  {
    id: "template3",
    name: "Business Portfolio",
    description: "A professional portfolio.",
    category: "Business",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template4",
    name: "Photography Portfolio",
    description: "Showcase your visual work.",
    category: "Creative",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template5",
    name: "Developer Portfolio",
    description: "Highlight your coding projects.",
    category: "Personal",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template6",
    name: "Minimalist CV",
    description: "Clean and straightforward resume.",
    category: "Personal",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template7",
    name: "Graphic Design",
    description: "Bold and creative showcase.",
    category: "Creative",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template8",
    name: "Freelancer Portfolio",
    description: "Perfect for independent professionals.",
    category: "Business",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template9",
    name: "Agency Template",
    description: "Ideal for small teams and agencies.",
    category: "Business",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template10",
    name: "Artist Portfolio",
    description: "Showcase your artistic creations.",
    category: "Creative",
    navbar: "Navbar1",
    hero: "Hero1",
  },
  {
    id: "template11",
    name: "Writer Portfolio",
    description: "Highlight your written work.",
    category: "Personal",
    navbar: "Navbar1",
    hero: "Hero1",
  },
]

const categories = ["All", "Personal", "Business", "Creative"]

const Templates: React.FC = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleSelectTemplate = (template: Template) => {
    router.push(`/template/${template.id}?navbar=${template.navbar}&hero=${template.hero}`)
  }

  const handleEditTemplate = (template: Template, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/template/edit/${template.id}?navbar=${template.navbar}&hero=${template.hero}`)
  }

  const filteredTemplates =
    selectedCategory === "All" ? templates : templates.filter((template) => template.category === selectedCategory)

  return (
    <div className="dark:bg-gradient-to-tr from-[#000000] to-[#2D3436]">
      <Navbar />
      <div className="p-6 md:p-10 max-w-7xl mx-auto ">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-lef  ">Choose a Template</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors  ${
                selectedCategory === category
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 " >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              className="group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Browser Frame */}
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
                {/* Browser Top Bar */}
                <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>

                {/* Template Preview */}
                <div className="relative h-[220px] overflow-hidden ">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${template.name}`}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />

                  {/* Hover Overlay with Buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <motion.button
                      className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleEditTemplate(template, e)}
                    >
                      <Edit size={16} />
                      Edit
                    </motion.button>

                    <motion.button
                      className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <Eye size={16} />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.category} Store</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Templates

