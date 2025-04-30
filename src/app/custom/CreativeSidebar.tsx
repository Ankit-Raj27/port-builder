"use client"
import { useState } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  ChevronLeft 
} from "lucide-react"

import DeployToGithubButton from "@/components/common/button/DeployWithGithub"

interface CustomizationSidebarProps {
  portfolioComponents: {
    navbar: string
    hero: string
    project: string
    footer: string
    experience: string
  }
  setters: {
    setNavbar: (value: string) => void
    setHero: (value: string) => void
    setExperience: (value: string) => void
    setProject: (value: string) => void
    setFooter: (value: string) => void
  }
  actions: {
    handleDownload: () => Promise<void>
    handleEdit: () => void
  }
}

const CreativeSidebar: React.FC<CustomizationSidebarProps> = ({ 
  portfolioComponents, 
  setters,
  actions
}) => {
  const { navbar, hero, project, footer, experience } = portfolioComponents
  const { setNavbar, setHero, setExperience, setProject, setFooter } = setters
  const { handleDownload, handleEdit } = actions

  const [isDownloading, setIsDownloading] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  const handleDownloadWithState = async () => {
    setIsDownloading(true)
    await handleDownload()
    setIsDownloading(false)
  }

  const sections = [
    {
      name: "Navbar",
      options: ["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5", "Navbar6"],
      setter: setNavbar,
      selected: navbar,
      icon: <Navigation size={16} />,
    },
    {
      name: "Hero",
      options: ["Hero1", "Hero2", "Hero3", "Hero4", "Hero5", "Hero6"],
      setter: setHero,
      selected: hero,
      icon: <Layout size={16} />,
    },
    {
      name: "Experience",
      options: ["Experience1", "Experience2", "Experience3", "Experience4", "Experience5"],
      setter: setExperience,
      selected: experience,
      icon: <Briefcase size={16} />,
    },
    {
      name: "Project",
      options: ["Project1", "Project2", "Project3", "Project4", "Project5"],
      setter: setProject,
      selected: project,
      icon: <Folder size={16} />,
    },
    {
      name: "Footer",
      options: ["Footer1", "Footer2", "Footer3", "Footer4", "Footer5"],
      setter: setFooter,
      selected: footer,
      icon: <LayoutFooter size={16} />,
    },
  ]

  return (
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
                  onClick={handleDownloadWithState}
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
                onClick={handleDownloadWithState}
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
  )
}

export default CreativeSidebar