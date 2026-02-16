"use client"
import { useState, useEffect, Suspense } from "react"
import type React from "react"
import dynamic from "next/dynamic"

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

import Hero1 from "@/components/heroes/ModernHeroes/Hero1"
import Hero2 from "@/components/heroes/ModernHeroes/Hero2"
import Hero3 from "@/components/heroes/ModernHeroes/Hero3"
import Hero4 from "@/components/heroes/ModernHeroes/Hero4"
import Hero5 from "@/components/heroes/ModernHeroes/Hero5"
import Hero6 from "@/components/heroes/ModernHeroes/Hero6"
import EliteHero from "@/components/heroes/ModernHeroes/EliteHero"

import Project1 from "@/components/projects/ModernProjects/Project1"
import Project2 from "@/components/projects/ModernProjects/Project2"
import Project3 from "@/components/projects/ModernProjects/Project3"
import Project4 from "@/components/projects/ModernProjects/Project4"
import Project5 from "@/components/projects/ModernProjects/Project5"
import Project6 from "@/components/projects/ModernProjects/Project6"
import EliteProject from "@/components/projects/ModernProjects/EliteProject"

import Footer1 from "@/components/footer/ModernFooters/Footer1"
import Footer2 from "@/components/footer/ModernFooters/Footer2"
import Footer3 from "@/components/footer/ModernFooters/Footer3"

import Experience1 from "@/components/experience/ModernExperiences/Experience1"
import Experience2 from "@/components/experience/ModernExperiences/Experience2"
import Experience3 from "@/components/experience/ModernExperiences/Experience3"
import EliteExperience from "@/components/experience/ModernExperiences/EliteExperience"

// Dynamic AI Component
const AIComponent = dynamic(() => import("@/components/generated/AIComponent"), { 
  ssr: false,
  loading: () => <div className="p-10 text-white/20 animate-pulse">Forging in AI fire...</div>
})

import usePortfolioStore from "@/components/store/usePortfolioStore"
import { Navbar } from "@/components/navbars/Navbar"
import DeployToGithubButton from "@/components/common/button/DeployWithGithub"
import {
  Download,
  Palette,
  Navigation,
  Layout,
  Briefcase,
  Folder,
  LayoutTemplateIcon as LayoutFooter,
  ChevronLeft,
  Wand2,
  Loader2
} from "lucide-react"
import EliteNavbar from "@/components/navbars/ModernNavbars/EliteNavbar"
import EliteFooter from "@/components/footer/ModernFooters/EliteFooter"

const templates = [
  { id: "template1", name: "Modern Portfolio", navbar: "Navbar1", hero: "Hero1", experience: "Experience1", project: "Project1", footer: "Footer1" },
  { id: "template2", name: "Elite S-Rank", navbar: "EliteNavbar", hero: "EliteHero", experience: "EliteExperience", project: "EliteProject", footer: "EliteFooter" },
]

const ModernTemplate: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoaded } = useUser()

  const { 
    navbar, hero, setNavbar, setHero, 
    project, setProject, footer, setFooter, 
    experience, setExperience,
    navbarContent, heroContent, projectContent, experienceContent, footerContent
  } = usePortfolioStore()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  
  // AI Forge State
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiType, setAiType] = useState("Hero")
  const [isForging, setIsForging] = useState(false)

  const templateId = pathname.split('/')[2]

  useEffect(() => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setNavbar(template.navbar)
      setHero(template.hero)
      setProject(template.project)
      setFooter(template.footer)
      setExperience(template.experience)
    }
  }, [templateId, setNavbar, setHero, setProject, setFooter, setExperience])

  const handleDownload = async () => {
    if (!isLoaded) return
    setIsDownloading(true)
    try {
      const linkedPages: string[] = []
      const bodyData = { 
        navbar, hero, project, footer, experience, linkedPages,
        navbarContent, heroContent, projectContent, experienceContent, footerContent
      }
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      })
      if (!response.ok) throw new Error("Failed to download ZIP")
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "portfolio.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error(error)
      toast.error("Download failed.")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleForge = async () => {
    if (!aiPrompt) return;
    setIsForging(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, type: aiType })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Component forged! Switch to 'AI Version' to see it.");
        // We set the current section to the AI version
        if (aiType === "Hero") setHero("AIComponent");
        if (aiType === "Navbar") setNavbar("AIComponent");
        if (aiType === "Project") setProject("AIComponent");
        if (aiType === "Experience") setExperience("AIComponent");
        if (aiType === "Footer") setFooter("AIComponent");
      } else {
        toast.error(data.error || "Forging failed.");
      }
    } catch (e) {
      toast.error("An error occurred during forging.");
    } finally {
      setIsForging(false);
    }
  }

  const sections = [
    { name: "Navbar", options: ["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5", "Navbar6","Navbar7", "EliteNavbar", "AIComponent"], setter: setNavbar, selected: navbar, icon: <Navigation size={16} /> },
    { name: "Hero", options: ["Hero1", "Hero2", "Hero3", "Hero4", "Hero5", "Hero6", "EliteHero", "AIComponent"], setter: setHero, selected: hero, icon: <Layout size={16} /> },
    { name: "Experience", options: ["Experience1", "Experience2", "Experience3", "EliteExperience", "AIComponent"], setter: setExperience, selected: experience, icon: <Briefcase size={16} /> },
    { name: "Project", options: ["Project1", "Project2", "Project3", "Project4", "Project5", "Project6", "EliteProject", "AIComponent"], setter: setProject, selected: project, icon: <Folder size={16} /> },
    { name: "Footer", options: ["Footer1", "Footer2", "Footer3", "EliteFooter", "AIComponent"], setter: setFooter, selected: footer, icon: <LayoutFooter size={16} /> },
  ]

  return (
    <>
      <Navbar />
      <div className=" fixed overflow-hidden flex h-screen">
        <div className="flex-1 bg-[#050505] p-6 border-r border-white/5 overflow-y-scroll max-h-screen">
          <h2 className="text-2xl font-semibold mb-6 text-white/20 uppercase tracking-widest text-center">Neural Interface Editor</h2>
          <div className="bg-[#050505] shadow-2xl relative min-h-screen">
            {navbar === "Navbar1" && <Navbar1 isEditable={true} />}
            {navbar === "Navbar2" && <Navbar2 />}
            {navbar === "Navbar3" && <Navbar3 />}
            {navbar === "Navbar4" && <Navbar4 />}
            {navbar === "Navbar5" && <Navbar5 />}
            {navbar === "Navbar6" && <Navbar6 />}
            {navbar === "Navbar7" && <Navbar7/>}
            {navbar === "EliteNavbar" && <EliteNavbar isEditable={true} />}
            {navbar === "AIComponent" && <AIComponent />}

            {hero === "Hero1" && <Hero1 isEditable={true} />} 
            {hero === "Hero2" && <Hero2 />}
            {hero === "Hero3" && <Hero3 />}
            {hero === "Hero4" && <Hero4 />}
            {hero === "Hero5" && <Hero5 />}
            {hero === "Hero6" && <Hero6 />}
            {hero === "EliteHero" && <EliteHero />}
            {hero === "AIComponent" && <AIComponent />}

            {experience === "Experience1" && <Experience1 isEditable={true} />}
            {experience === "Experience2" && <Experience2 />}
            {experience === "Experience3" && <Experience3 />}
            {experience === "EliteExperience" && <EliteExperience isEditable={true} />}
            {experience === "AIComponent" && <AIComponent />}

            {project === "Project1" && <Project1 isEditable={true} />}
            {project === "Project2" && <Project2 />}
            {project === "Project3" && <Project3 />}
            {project === "Project4" && <Project4 />}
            {project === "Project5" && <Project5 />}
            {project === "Project6" && <Project6 />}
            {project === "EliteProject" && <EliteProject isEditable={true} />}
            {project === "AIComponent" && <AIComponent />}

            {footer === "Footer1" && <Footer1 isEditable={true} />}
            {footer === "Footer2" && <Footer2 />}
            {footer === "Footer3" && <Footer3 />}
            {footer === "EliteFooter" && <EliteFooter isEditable={true} />}
            {footer === "AIComponent" && <AIComponent />}
          </div>
        </div>

        <motion.div className="relative h-screen border-l border-white/10" initial={false} animate={{ width: isSidebarExpanded ? "370px" : "90px" }} transition={{ duration: .5, ease: "easeInOut" }} onMouseEnter={() => !isSidebarExpanded && setIsSidebarExpanded(true)}>
          <motion.div className="h-full bg-[#050505] text-white overflow-y-auto overflow-x-hidden" animate={{ width: isSidebarExpanded ? "370px" : "90px" }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <div className="p-4 border-b border-white/10 flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-indigo-400"><Palette size={16} /></div>
              <motion.h2 className="ml-3 font-bold whitespace-nowrap" animate={{ opacity: isSidebarExpanded ? 1 : 0, display: isSidebarExpanded ? "block" : "none" }}>S-Rank Customizer</motion.h2>
              <motion.div className="ml-auto justify-center cursor-pointer" animate={{ opacity: isSidebarExpanded ? 1 : 0, display: isSidebarExpanded ? "flex" : "none" }} onClick={(e) => { e.stopPropagation(); setIsSidebarExpanded(!isSidebarExpanded); }}><div className="p-1 hover:bg-white/5 rounded-full text-white/40"><ChevronLeft size={16} /></div></motion.div>
            </div>

            {/* THE FORGE (AI SECTION) */}
            <AnimatePresence>
               {isSidebarExpanded && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 border-b border-indigo-500/20 bg-indigo-500/5 space-y-4"
                 >
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-tighter">
                       <Wand2 size={12} />
                       <span>The Neural Forge</span>
                    </div>
                    <div className="space-y-2">
                       <textarea 
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="Describe your component... (e.g. Neon Cyberpunk Hero)"
                          className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none min-h-[60px]"
                       />
                       <div className="flex gap-2">
                          <select 
                             value={aiType}
                             onChange={(e) => setAiType(e.target.value)}
                             className="flex-1 bg-black border border-white/10 rounded-lg p-1 text-[10px] outline-none"
                          >
                             <option>Hero</option>
                             <option>Navbar</option>
                             <option>Project</option>
                             <option>Experience</option>
                             <option>Footer</option>
                          </select>
                          <button 
                             onClick={handleForge}
                             disabled={isForging}
                             className="px-4 py-1 bg-indigo-600 rounded-lg text-[10px] font-bold uppercase hover:bg-indigo-500 transition-colors disabled:opacity-50"
                          >
                             {isForging ? <Loader2 className="w-3 h-3 animate-spin" /> : "Summon"}
                          </button>
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="py-2">
              {sections.map(({ name, options, setter, selected, icon }) => (
                <div key={name} className="relative" onMouseEnter={() => setHoveredSection(name)} onMouseLeave={() => setHoveredSection(null)}>
                  <div className={`px-4 py-3 flex items-center cursor-pointer hover:bg-white/5 transition-colors duration-200 ${hoveredSection === name ? "bg-white/5" : ""}`}>
                    <div className="flex items-center justify-center w-10 text-white/40">{icon}</div>
                    <motion.span className="ml-3 whitespace-nowrap font-medium text-sm tracking-wide uppercase" animate={{ opacity: isSidebarExpanded ? 1 : 0, display: isSidebarExpanded ? "block" : "none" }}>{name}</motion.span>
                  </div>
                  <AnimatePresence>
                    {isSidebarExpanded && hoveredSection === name && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="bg-black overflow-hidden border-y border-white/5">
                        <div className="p-3 grid grid-cols-2 gap-2">
                          {options.map((option) => (<button key={option} onClick={() => setter(selected === option ? "" : option)} className={`px-3 py-2 text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all duration-200 ${selected === option ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]" : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"}`}>{option}</button>))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="absolute left-0 right-0 p-4 bg-black border-t border-white/10">
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <button onClick={handleDownload} disabled={isDownloading} className="w-full bg-white text-black hover:bg-indigo-500 hover:text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest">
                      <Download size={14} />
                      <span>{isDownloading ? "Extracting ZIP..." : "Download S-Rank"}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
    </>
  )
}

export default ModernTemplate
