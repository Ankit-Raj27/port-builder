"use client"

import ModernTemplate from "@/app/custom/ModernTemplate"
import CreativeTemplate from "@/app/custom/CreativeTemplate"
import BusinessTemplate from "@/app/custom/BusinessTemplate"
import { SidebarEditor } from "@/components/studio/SidebarEditor"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Palette, ChevronLeft, Download, Navigation, 
  Layout, Briefcase, Folder, LayoutTemplateIcon as LayoutFooter
} from "lucide-react"
import { useState } from "react"
import usePortfolioStore from "@/components/store/usePortfolioStore"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const templatesMap: Record<string, JSX.Element> = {
  Modern: <ModernTemplate />,
  Creative: <CreativeTemplate />,
  Business: <BusinessTemplate />,
}

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { 
    navbar, hero, project, footer, experience,
    setNavbar, setHero, setProject, setFooter, setExperience,
    heroContent, setActiveSection, lastUpdated
  } = usePortfolioStore()

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          navbar,
          navbarStyle: id,
          hero,
          heroStyle: id,
          project,
          projectStyle: id,
          footer,
          footerStyle: id,
          experience,
          experienceStyle: id,
          heroContent,
        }),
      })
      if (!response.ok) throw new Error("Failed")
      const blob = await response.blob()
      const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "portfolio.zip"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
    } catch { toast.error("Download failed.") } finally { setIsDownloading(false) }
  }

  const sections = [
    { 
      name: "Navbar", 
      id: "navbar", 
      options: ["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5", "Navbar6", "Navbar7", "EliteNavbar"], 
      setter: setNavbar, 
      selected: navbar, 
      icon: <Navigation size={14} /> 
    },
    { 
      name: "Hero", 
      id: "hero", 
      options: ["Hero1", "Hero2", "Hero3", "Hero4", "Hero5", "Hero6", "EliteHero"], 
      setter: setHero, 
      selected: hero, 
      icon: <Layout size={14} /> 
    },
    { 
      name: "Experience", 
      id: "experience", 
      options: ["Experience1", "Experience2", "Experience3", "EliteExperience"], 
      setter: setExperience, 
      selected: experience, 
      icon: <Briefcase size={14} /> 
    },
    { 
      name: "Project", 
      id: "project", 
      options: ["Project1", "Project2", "Project3", "Project4", "Project5", "Project6", "EliteProject"], 
      setter: setProject, 
      selected: project, 
      icon: <Folder size={14} /> 
    },
    { 
      name: "Footer", 
      id: "footer", 
      options: ["Footer1", "Footer2", "Footer3", "EliteFooter"], 
      setter: setFooter, 
      selected: footer, 
      icon: <LayoutFooter size={14} /> 
    },
  ]

  const SelectedTemplate = templatesMap[id]

  if (!SelectedTemplate) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center italic font-mono uppercase tracking-widest animate-pulse">Node Offline. Re-Calibrate Signal.</div>
  }

  return (
    <div className="bg-[#050505] min-h-screen flex selection:bg-purple-500/30 overflow-hidden">
      <ToastContainer theme="dark" position="top-right" autoClose={2000} />

      {/* 1. STUDIO EDITOR (FIXED LEFT) */}
      <SidebarEditor />

      {/* 2. PREVIEW CHAMBER (CENTERED) */}
      <div className="flex-1 ml-[400px] mr-[340px] h-screen overflow-y-auto bg-[#0a0a0a] relative scrollbar-hide">
         <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <main className="min-h-screen relative z-10 p-6 md:p-12">
          <button onClick={() => router.push('/')} className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 transition-colors border border-white/5"><ChevronLeft size={16}/></button>
          
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 mx-auto max-w-full" key={lastUpdated}>
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5 }}
              >
                {SelectedTemplate}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* 3. ARCHITECTURE SELECTOR (FIXED RIGHT) */}
      <aside className="fixed top-0 right-0 h-screen w-[340px] bg-[#0a0a0a] border-l border-white/5 z-50 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-center">
           <Palette className="text-purple-400 shrink-0" size={18} />
           <h2 className="ml-3 font-bold text-white uppercase tracking-tighter font-sans">Arsenal</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide">
            <section className="space-y-8">
              {sections.map(({ name, id: sectionId, options, setter, selected, icon }) => (
                <div key={name} className="space-y-4 group" onClick={() => setActiveSection(sectionId)}>
                   <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest ml-1 group-hover:text-purple-400 transition-colors cursor-pointer font-mono">
                      {icon} <span>{name}</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {options.map((opt) => (
                       <button 
                         key={opt} 
                         onClick={(e) => { e.stopPropagation(); setter(opt); }} 
                         className={`px-3 py-2 text-[8px] font-black uppercase tracking-tighter rounded-xl border transition-all ${selected === opt ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20 scale-105' : 'bg-transparent border-white/5 text-gray-600 hover:text-gray-300 hover:border-white/10'}`}
                       >
                         {opt.replace('Navbar', 'N').replace('Hero', 'H').replace('Project', 'P').replace('Experience', 'E').replace('Footer', 'F')}
                       </button>
                     ))}
                   </div>
                </div>
              ))}
            </section>
        </div>

        <div className="p-6 bg-black/40 border-t border-white/5">
           <button onClick={handleDownload} disabled={isDownloading} className="w-full bg-white text-black hover:bg-purple-600 hover:text-white font-black py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-2xl active:scale-95 text-[10px] uppercase tracking-widest">
              <Download size={14} /><span>{isDownloading ? "FORGING..." : "DOWNLOAD ZIP"}</span>
           </button>
           <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold font-mono text-center mt-4 tracking-widest">S-Rank Pillar [R]</p>
        </div>
      </aside>

    </div>
  )
}

export default Page
