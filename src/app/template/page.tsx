"use client"
import type React from "react"
import { Navbar } from "@/components/navbars/Navbar"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Edit, Eye } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import Footer from "@/components/common/Footer"
import LoadingPage from "@/components/common/Loading"
import { useUser } from "@clerk/nextjs"

type Template = {
  id: string
  name: string
  description: string
  category: string
  navbar: string
  hero: string
  experience: string
  project: string
  footer: string
}

const templates: Template[] = [
  {
    id: "template1",
    name: "Modern Portfolio",
    description: "A sleek, minimal portfolio.",
    category: "Personal",
    navbar: "Navbar1",
    hero: "Hero1",
    experience: "Experience1",
    project: "Project1",
    footer: "Footer1",
  },
  {
    id: "template2",
    name: "Creative Portfolio",
    description: "A stylish and colorful template.",
    category: "Creative",
    navbar: "Navbar2",
    hero: "Hero2",
    experience: "Experience2",
    project: "Project2",
    footer: "Footer2",
  },
  {
    id: "template3",
    name: "Business Portfolio",
    description: "A professional portfolio.",
    category: "Business",
    navbar: "Navbar3",
    hero: "Hero3",
    experience: "Experience3",
    project: "Project3",
    footer: "Footer3",
  },
]

const categories = ["All", "Personal", "Business", "Creative"]

const Templates: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || (!isSignedIn && !isLoading)) {
    return <LoadingPage />
  }

  const handleSelectTemplate = (
    id: string,
    navbar: string,
    hero: string,
    experience: string,
    project: string,
    footer: string
  ) => {
    setIsLoading(true)
    router.push(
      `/template/${id}?navbar=${navbar}&hero=${hero}&experience=${experience}&project=${project}&footer=${footer}`
    )
  }

  const handleEditTemplate = (template: Template, e: React.MouseEvent) => {
    setIsLoading(true)
    e.stopPropagation()
    router.push(`/template/my-template/editor`)
  }

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory)

  return (
    <>
      <Navbar />
      <div className="dark:bg-gradient-to-tr from-[#000000] to-[#2D3436]">
        {isLoading && <LoadingPage />}
        <div className="p-6 md:p-10 max-w-7xl mx-auto ">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
            Choose a Template
          </h2>

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
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
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
                      src={`/images/template/${template.name}.png`}
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
                        onClick={() =>
                          handleSelectTemplate(
                            template.id,
                            template.navbar,
                            template.hero,
                            template.experience,
                            template.project,
                            template.footer
                          )
                        }
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
                  <p className="text-sm text-gray-600">
                    {template.category} Store
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Templates
