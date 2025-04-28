"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Navbar1 from "@/components/navbars/ModernNavbars/Navbar1"
import Navbar2 from "@/components/navbars/ModernNavbars/Navbar2"
import Navbar3 from "@/components/navbars/ModernNavbars/Navbar3"
import Navbar4 from "@/components/navbars/ModernNavbars/Navbar4"
import Navbar5 from "@/components/navbars/ModernNavbars/Navbar5"
import Navbar6 from "@/components/navbars/ModernNavbars/Navbar6"
import Navbar7 from "@/components/navbars/ModernNavbars/Navbar7"

import Hero1 from "@/components/heroes/ModernHero/Hero1"
import Hero2 from "@/components/heroes/ModernHero/Hero2"
import Hero3 from "@/components/heroes/ModernHero/Hero3"
import Hero4 from "@/components/heroes/ModernHero/Hero4"
import Hero5 from "@/components/heroes/ModernHero/Hero5"
import { Hero6 } from "@/components/heroes/ModernHero/Hero6"
import Hero7 from "@/components/heroes/CreativeHero/Hero1"

import Project1 from "@/components/projects/ModernProjects/Project1"
import Project2 from "@/components/projects/ModernProjects/Project2"
import Project3 from "@/components/projects/ModernProjects/Project3"
import Project4 from "@/components/projects/ModernProjects/Project4"
import Project5 from "@/components/projects/ModernProjects/Project5"
import Project6 from "@/components/projects/ModernProjects/Project6"

import Footer1 from "@/components/footer/ModernFooter/Footer1"
import Footer2 from "@/components/footer/ModernFooter/Footer2"
import Footer3 from "@/components/footer/ModernFooter/Footer3"

import Experience1 from "@/components/experience/ModernExperience/Experience1"
import Experience2 from "@/components/experience/ModernExperience/Experience2"
import Experience3 from "@/components/experience/ModernExperience/Experience3"

import usePortfolioStore from "@/components/store/usePortfolioStore"
import { Navbar } from "@/components/navbars/Navbar"
import DeployToGithubButton from "@/components/common/button/DeployWithGithub"
import {
  Download,
  Edit,
  Github,
  Palette,
  Navigation,
  Layout,
  Briefcase,
  Folder,
  LayoutTemplateIcon as LayoutFooter,
  ChevronLeft,
} from "lucide-react"


// Template definitions
const templates = [
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

const BusinessTemplate: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoaded } = useUser()

  const { navbar, hero, setNavbar, setHero, project, setProject, footer, setFooter, experience, setExperience } =
    usePortfolioStore()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  
  // Get template ID from URL pathname
  const templateId = pathname.split('/')[2]

  useEffect(() => {
    // Find the template by ID
    const template = templates.find(t => t.id === templateId)
    
    if (template) {
      // Apply template components
      setNavbar(template.navbar)
      setHero(template.hero)
      setProject(template.project)
      setFooter(template.footer)
      setExperience(template.experience)
    } else {
      // Set defaults if template not found
      setNavbar("Navbar1")
      setHero("Hero1")
      setProject("Project1")
      setFooter("Footer1")
      setExperience("Experience1")
    }
  }, [templateId, setNavbar, setHero, setProject, setFooter, setExperience])

  useEffect(() => {
    const savedState = localStorage.getItem("portfolioState")
    if (savedState) {
      try {
        const { navbar, hero, project, footer, experience } = JSON.parse(savedState)
        setNavbar(navbar)
        setHero(hero)
        setProject(project)
        setFooter(footer)
        setExperience(experience)
      } catch (error) {
        console.error("Error parsing saved state:", error)
      }
    }
  }, [setFooter, setHero, setNavbar, setProject, setExperience])

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("portfolioState", JSON.stringify({ navbar, hero, project, footer, experience }))
    }, 300)
    return () => clearTimeout(timeout)
  }, [navbar, hero, project, footer, experience])

  const handleDownload = async () => {
    if (!isLoaded) {
      return
    }
    const userEmail = user?.publicMetadata?.email
    const isSubscribed = user?.publicMetadata?.isSubscribed
    console.log("Webhook received:")
    console.log("User email from Razorpay notes:", userEmail)
    console.log("Clerk user lookup result:", user)

    if (!isSubscribed) {
      router.push("/pricing")
      toast.info("Redirecting to pricing page...")
      return
    }

    setIsDownloading(true)
    try {
      const linkedPages: string[] = []

      if (project) {
        linkedPages.push("/projects/[id]")
      }
      if (experience) {
        linkedPages.push("/experience")
      }
      if (navbar) {
        linkedPages.push("/contact", "/about")
      }

      const bodyData = { navbar, hero, project, footer, experience, linkedPages }
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      })

      if (!response.ok) {
        throw new Error("Failed to download ZIP")
      }

      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "portfolio.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEdit = () => {
    const selectedComponents = { navbar, hero, project, footer, experience }
    localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents))
    router.push(`/template/${templateId}/editor`)
  }

  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  const sections = [
    {
      name: "Navbar",
      options: ["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5", "Navbar6","Navbar7"],
      setter: setNavbar,
      selected: navbar,
      icon: <Navigation size={16} />,
    },
    {
      name: "Hero",
      options: ["Hero1", "Hero2", "Hero3", "Hero4", "Hero5", "Hero6", "Hero7"],
      setter: setHero,
      selected: hero,
      icon: <Layout size={16} />,
    },
    {
      name: "Experience",
      options: ["Experience1", "Experience2", "Experience3"],
      setter: setExperience,
      selected: experience,
      icon: <Briefcase size={16} />,
    },
    {
      name: "Project",
      options: ["Project1", "Project2", "Project3", "Project4", "Project5", "Project6"],
      setter: setProject,
      selected: project,
      icon: <Folder size={16} />,
    },
    {
      name: "Footer",
      options: ["Footer1", "Footer2", "Footer3"],
      setter: setFooter,
      selected: footer,
      icon: <LayoutFooter size={16} />,
    },
  ]

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        {/* Left Preview Section */}
        <div className="flex-1 bg-gray-100 p-6 border-r overflow-y-scroll max-h-screen">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Editing Your Portfolio</h2>
          <div className="bg-white shadow-md z-10 ">
            {navbar === "Navbar1" && <Navbar1 />}
            {navbar === "Navbar2" && <Navbar2 />}
            {navbar === "Navbar3" && <Navbar3 />}
            {navbar === "Navbar4" && <Navbar4 />}
            {navbar === "Navbar5" && <Navbar5 />}
            {navbar === "Navbar6" && <Navbar6 />}
            {navbar === "Navbar7" && <Navbar7/>}

            {hero === "Hero1" && <Hero1 />}
            {hero === "Hero2" && <Hero2 />}
            {hero === "Hero3" && <Hero3 />}
            {hero === "Hero4" && <Hero4 />}
            {hero === "Hero5" && <Hero5 />}
            {hero === "Hero6" && <Hero6 />}
            {hero === "Hero7" && <Hero7 />}

            {experience === "Experience1" && <Experience1 />}
            {experience === "Experience2" && <Experience2 />}
            {experience === "Experience3" && <Experience3 />}

            {project === "Project1" && <Project1 />}
            {project === "Project2" && <Project2 />}
            {project === "Project3" && <Project3 />}
            {project === "Project4" && <Project4 />}
            {project === "Project5" && <Project5 />}
            {project === "Project6" && <Project6 />}

            {footer === "Footer1" && <Footer1 />}
            {footer === "Footer2" && <Footer2 />}
            {footer === "Footer3" && <Footer3 />}
          </div>
        </div>

        {/* Right Sidebar - Expands on hover and stays expanded until chevron clicked */}
        <motion.div
          className="relative h-screen border rounded-full"
          initial={false}
          animate={{
            width: isSidebarExpanded ? "370px" : "90px",
          }}
          transition={{ duration: .5, ease: "easeInOut" }}
          onMouseEnter={() => !isSidebarExpanded && setIsSidebarExpanded(true)}
        >
          {/* Sidebar Background */}
          <motion.div
            className="h-full bg-gradient-to-b from-black via-slate-800 to-slate-700 text-white overflow-y-auto overflow-x-hidden"
            animate={{
              width: isSidebarExpanded ? "370px" : "90px",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-700 flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 text-white">
                <Palette size={16} />
              </div>
              <motion.h2
                className="ml-3 font-bold whitespace-nowrap"
                animate={{
                  opacity: isSidebarExpanded ? 1 : 0,
                  display: isSidebarExpanded ? "block" : "none",
                }}
              >
                Customize Portfolio
              </motion.h2>
              <motion.div
                className="ml-auto justify-center cursor-pointer"
                animate={{
                  opacity: isSidebarExpanded ? 1 : 0,
                  display: isSidebarExpanded ? "flex" : "none",
                }}
                onClick={toggleSidebar}
              >
                <div className="p-1 hover:bg-gray-700 rounded-full">
                  <ChevronLeft size={16} />
                </div>
              </motion.div>
            </div>
            {/* Sections */}
            <div className="py-2">
              {sections.map(({ name, options, setter, selected, icon }) => (
                <div
                  key={name}
                  className="relative"
                  onMouseEnter={() => setHoveredSection(name)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {/* Section Header */}
                  <div
                    className={`px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${hoveredSection === name ? "bg-gray-700" : ""}`}
                  >
                    <div className="flex items-center justify-center w-10">{icon}</div>
                    <motion.span
                      className="ml-3 whitespace-nowrap"
                      animate={{
                        opacity: isSidebarExpanded ? 1 : 0,
                        display: isSidebarExpanded ? "block" : "none",
                      }}
                    >
                      {name}
                    </motion.span>
                  </div>

                  {/* Options (shown on hover) */}
                  <AnimatePresence>
                    {isSidebarExpanded && hoveredSection === name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-800 overflow-hidden"
                      >
                        <div className="p-2 grid grid-cols-2 gap-2">
                          {options.map((option) => (
                            <button
                              key={option}
                              onClick={() => setter(selected === option ? "" : option)}
                              className={`px-3 py-2 text-sm rounded transition-all duration-200 ${
                                selected === option
                                  ? "bg-gray-600 text-white"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="absolute left-0 right-0 p-3 bg-gray-900 border-t border-gray-700">
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Download size={16} />
                      <span>{isDownloading ? "Downloading..." : "Download ZIP"}</span>
                    </button>

                    <button
                      onClick={handleEdit}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Edit size={16} />
                      <span>Go to Editor</span>
                    </button>

                    <DeployToGithubButton />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSidebarExpanded && (
                <div className="flex flex-col items-center space-y-4">
                  <button 
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    <Download size={18} />
                  </button>
                  <button 
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    onClick={handleEdit}
                  >
                    <Edit size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                    <Github size={18} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default BusinessTemplate