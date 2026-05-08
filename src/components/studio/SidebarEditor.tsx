"use client"

import usePortfolioStore from "@/components/store/usePortfolioStore"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { 
  Globe, Settings, ChevronLeft, Plus, Trash2 
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SidebarEditor() {
  const { 
    heroContent, updateHeroContent, 
    activeSection, setActiveSection, 
    navbarContent, updateNavbarContent,
    experienceContent, updateExperienceContent,
    projectContent, updateProjectContent,
    footerContent, updateFooterContent
  } = usePortfolioStore()

  const [isOpen, setIsOpen] = useState(true)

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateHeroContent({ [name]: value })
  }

  const handleNavbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateNavbarContent({ [name]: value })
  }

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFooterContent({ [name]: value })
  }

  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectContent({ title: e.target.value })
  }

  const handleExperienceTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateExperienceContent({ title: e.target.value })
  }

  return (
    <>
      <Button 
        variant="outline"
        size="icon"
        className={`fixed top-1/2 -translate-y-1/2 z-[60] bg-zinc-900 border-white/10 text-white rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'left-[380px]' : 'left-4'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <Settings className="w-4 h-4 animate-spin-slow" />}
      </Button>

      <motion.aside 
        initial={false}
        animate={{ x: isOpen ? 0 : -420 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-screen w-[400px] bg-[#0a0a0a] border-r border-white/5 z-50 shadow-2xl flex flex-col font-sans"
      >
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between min-w-[400px]">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Studio <span className="text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded tracking-widest uppercase font-mono text-[9px]">Elite v3.5</span>
            </h2>
            <p className="text-[10px] text-purple-400 mt-1 font-mono uppercase tracking-tighter">Neural Sync: Active</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-tighter">Live</span>
          </div>
        </div>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-4 shrink-0">
            <TabsList className="w-full bg-white/5 border border-white/5 p-1 rounded-xl h-auto flex flex-wrap gap-1">
              <TabsTrigger value="navbar" className="flex-1 gap-1 rounded-lg text-[8px] py-2 data-[state=active]:bg-white/10 data-[state=active]:text-emerald-400 text-gray-500 transition-all font-bold uppercase">Nav</TabsTrigger>
              <TabsTrigger value="hero" className="flex-1 gap-1 rounded-lg text-[8px] py-2 data-[state=active]:bg-white/10 data-[state=active]:text-purple-400 text-gray-500 transition-all font-bold uppercase">Hero</TabsTrigger>
              <TabsTrigger value="experience" className="flex-1 gap-1 rounded-lg text-[8px] py-2 data-[state=active]:bg-white/10 data-[state=active]:text-orange-400 text-gray-500 transition-all font-bold uppercase">Exp</TabsTrigger>
              <TabsTrigger value="project" className="flex-1 gap-1 rounded-lg text-[8px] py-2 data-[state=active]:bg-white/10 data-[state=active]:text-blue-400 text-gray-500 transition-all font-bold uppercase">Work</TabsTrigger>
              <TabsTrigger value="footer" className="flex-1 gap-1 rounded-lg text-[8px] py-2 data-[state=active]:bg-white/10 data-[state=active]:text-pink-400 text-gray-500 transition-all font-bold uppercase">End</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            
            {/* --- NAVBAR --- */}
            <TabsContent value="navbar" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase font-black tracking-widest text-emerald-400/40">Brand Identity</Label>
                    <Input name="brandName" value={navbarContent.brandName} onChange={handleNavbarChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-white focus:border-emerald-500" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 border-dashed">
                    <p className="text-[9px] text-gray-500 italic text-center uppercase tracking-tighter">Menu nodes are auto-linked.</p>
                  </div>
                </div>
            </TabsContent>

            {/* --- HERO --- */}
            <TabsContent value="hero" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1"><Label className="text-[9px] uppercase font-black tracking-widest text-purple-400/40 ml-1">Hook</Label><Input name="title" value={heroContent.title} onChange={handleHeroChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-white focus:border-purple-500" /></div>
                  <div className="space-y-1"><Label className="text-[9px] uppercase font-black tracking-widest text-purple-400/40 ml-1">Identity</Label><Input name="name" value={heroContent.name} onChange={handleHeroChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-white focus:border-purple-500 font-bold" /></div>
                  <div className="space-y-1"><Label className="text-[9px] uppercase font-black tracking-widest text-purple-400/40 ml-1">Class</Label><Input name="subtitle" value={heroContent.subtitle} onChange={handleHeroChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-gray-300 focus:border-purple-500" /></div>
                  <div className="space-y-1"><Label className="text-[9px] uppercase font-black tracking-widest text-purple-400/40 ml-1">Bio</Label><Textarea name="description" value={heroContent.description} onChange={handleHeroChange} rows={5} className="bg-white/5 border-white/5 rounded-2xl text-gray-400 focus:border-purple-500 resize-none text-xs leading-relaxed" /></div>
                  
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <Label className="text-[9px] uppercase font-black tracking-widest text-blue-400/40 ml-1">Action Nodes</Label>
                    <div className="grid gap-4">
                       <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/5">
                          <Label className="text-[8px] text-gray-600 uppercase">Primary Trigger</Label>
                          <Input name="primaryButton" value={heroContent.primaryButton} onChange={handleHeroChange} className="bg-white/5 border-white/5 rounded-lg h-9 text-xs" />
                          <div className="flex items-center gap-2 bg-black px-2 rounded-lg border border-white/5 h-8">
                            <Globe size={10} className="text-blue-500" />
                            <input name="primaryLink" value={heroContent.primaryLink} onChange={handleHeroChange} className="bg-transparent border-none outline-none text-[9px] text-blue-400 font-mono w-full" />
                          </div>
                       </div>
                       <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/5">
                          <Label className="text-[8px] text-gray-600 uppercase">Secondary Trigger</Label>
                          <Input name="secondaryButton" value={heroContent.secondaryButton} onChange={handleHeroChange} className="bg-white/5 border-white/5 rounded-lg h-9 text-xs" />
                          <div className="flex items-center gap-2 bg-black px-2 rounded-lg border border-white/5 h-8">
                            <Globe size={10} className="text-blue-500" />
                            <input name="secondaryLink" value={heroContent.secondaryLink} onChange={handleHeroChange} className="bg-transparent border-none outline-none text-[9px] text-blue-400 font-mono w-full" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
            </TabsContent>

            {/* --- EXPERIENCE --- */}
            <TabsContent value="experience" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase font-black tracking-widest text-orange-400/40">Chronicle Title</Label>
                    <Input value={experienceContent.title} onChange={handleExperienceTitleChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-white focus:border-orange-500" />
                  </div>
                  
                  {experienceContent.items.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 relative group">
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Rank {idx + 1}</span>
                          <Trash2 size={12} className="text-red-500/40 cursor-pointer hover:text-red-500" />
                       </div>
                       <Input value={item.role} className="bg-white/5 border-none h-8 text-xs font-bold" placeholder="Role" />
                       <Input value={item.company} className="bg-transparent border-none h-6 text-[10px] text-gray-500" placeholder="Organization" />
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full rounded-xl border-white/5 bg-white/5 text-[9px] font-bold uppercase tracking-widest h-10 gap-2">
                    <Plus size={12} /> Add Experience
                  </Button>
                </div>
            </TabsContent>

            {/* --- PROJECTS --- */}
            <TabsContent value="project" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase font-black tracking-widest text-blue-400/40">Work Collection</Label>
                    <Input value={projectContent.title} onChange={handleProjectTitleChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-white focus:border-blue-500" />
                  </div>

                  {projectContent.items.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 relative group">
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Project {idx + 1}</span>
                          <Trash2 size={12} className="text-red-500/40 cursor-pointer hover:text-red-500" />
                       </div>
                       <Input value={item.title} className="bg-white/5 border-none h-8 text-xs font-bold" />
                       <Textarea value={item.description} className="bg-transparent border-none text-[10px] text-gray-500 resize-none" rows={3} />
                    </div>
                  ))}

                  <Button variant="outline" className="w-full rounded-xl border-white/5 bg-white/5 text-[9px] font-bold uppercase tracking-widest h-10 gap-2">
                    <Plus size={12} /> New Project
                  </Button>
                </div>
            </TabsContent>

            {/* --- FOOTER --- */}
            <TabsContent value="footer" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase font-black tracking-widest text-pink-400/40">Anchor Text</Label>
                    <Input name="text" value={footerContent.text} onChange={handleFooterChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-white focus:border-pink-500" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase font-black tracking-widest text-pink-400/40">Copyright Node</Label>
                    <Input name="copyright" value={footerContent.copyright} onChange={handleFooterChange} className="bg-white/5 border-white/5 rounded-xl h-11 text-gray-500 focus:border-pink-500" />
                  </div>
                </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-4 bg-black/60 text-center border-t border-white/5 shrink-0">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black font-mono">End of Buffer</p>
        </div>
      </motion.aside>
    </>
  )
}
