"use client"

import usePortfolioStore from "@/components/store/usePortfolioStore"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Layout, Type, Palette, ArrowLeft, Eye, Save } from "lucide-react"
import { GradientText } from "@/components/ui/GradientText"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { } from "react"
import Link from "next/link"

export default function StudioPage() {
  const { heroContent, updateHeroContent } = usePortfolioStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateHeroContent({ [name]: value })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className="relative z-10 max-w-[1400px] mx-auto pt-24 pb-12 px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: THE INTERFACE */}
          <motion.div 
            className="flex-1 space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="flex items-center justify-between">
               <motion.div variants={itemVariants}>
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2 text-sm group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </Link>
                <h1 className="text-5xl font-bold tracking-tight">
                  Creative <GradientText colors={["#a855f7", "#6366f1"]}>Studio</GradientText>
                </h1>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-xl backdrop-blur-md"
              >
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-semibold transition-all shadow-lg shadow-purple-500/20">
                  <Save className="w-4 h-4" />
                  Auto-Saving
                </button>
              </motion.div>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-xl mb-8">
                <TabsTrigger value="content" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-purple-400 transition-all">
                  <Type className="w-4 h-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-blue-400 transition-all">
                  <Layout className="w-4 h-4" />
                  Architecture
                </TabsTrigger>
                <TabsTrigger value="style" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-emerald-400 transition-all">
                  <Palette className="w-4 h-4" />
                  Atmosphere
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="content">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid gap-6"
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden text-white">
                      <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3 group">
                            <Label htmlFor="title" className="text-gray-400 group-focus-within:text-purple-400 transition-colors uppercase text-[10px] font-bold tracking-widest">Greeting Hook</Label>
                            <Input 
                              id="title"
                              name="title"
                              value={heroContent.title}
                              onChange={handleChange}
                              className="h-14 bg-black/40 border-white/5 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all text-lg text-white"
                              placeholder="e.g. Hi, I am"
                            />
                          </div>
                          <div className="space-y-3 group">
                            <Label htmlFor="name" className="text-gray-400 group-focus-within:text-purple-400 transition-colors uppercase text-[10px] font-bold tracking-widest">Digital Identity</Label>
                            <Input 
                              id="name"
                              name="name"
                              value={heroContent.name}
                              onChange={handleChange}
                              className="h-14 bg-black/40 border-white/5 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all text-lg font-bold text-white"
                              placeholder="Full Name"
                            />
                          </div>
                        </div>

                        <div className="space-y-3 group">
                          <Label htmlFor="subtitle" className="text-gray-400 group-focus-within:text-purple-400 transition-colors uppercase text-[10px] font-bold tracking-widest">Strategic Mission</Label>
                          <Input 
                            id="subtitle"
                            name="subtitle"
                            value={heroContent.subtitle}
                            onChange={handleChange}
                            className="h-14 bg-black/40 border-white/5 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all text-lg font-medium text-white"
                            placeholder="e.g. Architecting Scalable Futures"
                          />
                        </div>

                        <div className="space-y-3 group">
                          <Label htmlFor="description" className="text-gray-400 group-focus-within:text-purple-400 transition-colors uppercase text-[10px] font-bold tracking-widest">The Narrative</Label>
                          <Textarea 
                            id="description"
                            name="description"
                            value={heroContent.description}
                            onChange={handleChange}
                            rows={5}
                            className="bg-black/40 border-white/5 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all text-lg resize-none leading-relaxed text-white"
                            placeholder="Draft your story here..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                          <div className="space-y-3 group">
                            <Label htmlFor="primaryButton" className="text-gray-400 group-focus-within:text-purple-400 transition-colors uppercase text-[10px] font-bold tracking-widest">Primary Action</Label>
                            <Input 
                              id="primaryButton"
                              name="primaryButton"
                              value={heroContent.primaryButton}
                              onChange={handleChange}
                              className="h-14 bg-black/40 border-white/5 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all text-white"
                            />
                          </div>
                          <div className="space-y-3 group">
                            <Label htmlFor="secondaryButton" className="text-gray-400 group-focus-within:text-purple-400 transition-colors uppercase text-[10px] font-bold tracking-widest">Secondary Anchor</Label>
                            <Input 
                              id="secondaryButton"
                              name="secondaryButton"
                              value={heroContent.secondaryButton}
                              onChange={handleChange}
                              className="h-14 bg-black/40 border-white/5 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all text-white"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="layout">
                  <motion.div className="h-64 flex flex-col items-center justify-center text-gray-500 bg-white/5 border border-dashed border-white/10 rounded-3xl backdrop-blur-sm">
                    <Layout className="w-12 h-12 mb-4 opacity-20" />
                    <p className="font-medium italic">Section Reordering Engine coming in next update.</p>
                  </motion.div>
                </TabsContent>

                 <TabsContent value="style">
                  <motion.div className="h-64 flex flex-col items-center justify-center text-gray-500 bg-white/5 border border-dashed border-white/10 rounded-3xl backdrop-blur-sm">
                    <Palette className="w-12 h-12 mb-4 opacity-20" />
                    <p className="font-medium italic">Global Atmosphere (Themes) module initializing.</p>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* RIGHT: THE PREVIEW */}
          <motion.aside 
            className="lg:w-[400px] space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-24">
              <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    Neural Preview
                  </span>
                </div>
                
                <div className="p-8 aspect-[3/4] flex flex-col justify-center bg-gradient-to-br from-gray-900 to-black relative text-white">
                  <div className="space-y-4 relative z-10 text-center">
                    <div className="w-20 h-1 bg-purple-500/40 rounded-full mb-6 mx-auto" />
                    <h3 className="text-2xl font-bold leading-tight text-white">
                      {heroContent.title} <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        {heroContent.name}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1 italic">{heroContent.subtitle}</p>
                    <p className="text-[10px] text-gray-500 line-clamp-4 leading-relaxed">
                      {heroContent.description}
                    </p>
                    <div className="flex justify-center gap-2 pt-4">
                      <div className="px-4 py-2 bg-purple-600 rounded-lg text-[10px] font-bold text-white">
                        {heroContent.primaryButton}
                      </div>
                      <div className="px-4 py-2 border border-white/10 rounded-lg text-[10px] font-bold text-white">
                        {heroContent.secondaryButton}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/10 blur-[60px] rounded-full pointer-events-none" />
                </div>
              </div>

              <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-sm">System Tip</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your changes are automatically synchronized with the **Central Neural Store**. Navigate to the main site to see the full-scale deployment.
                </p>
              </div>
            </div>
          </motion.aside>

        </div>
      </main>

    </div>
  )
}
