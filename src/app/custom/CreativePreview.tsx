"use client"
import { useState } from "react"
import type React from "react"

// Import all components that can be displayed in the preview
import Navbar1 from "@/components/navbars/CreativeNavbars/Navbar1"
import Navbar2 from "@/components/navbars/CreativeNavbars/Navbar2"
import Navbar3 from "@/components/navbars/CreativeNavbars/Navbar3"
import Navbar4 from "@/components/navbars/CreativeNavbars/Navbar4"
import Navbar5 from "@/components/navbars/CreativeNavbars/Navbar5"
import Navbar6 from "@/components/navbars/CreativeNavbars/Navbar6"

import Hero1 from "@/components/heroes/CreativeHero/Hero1"
import Hero2 from "@/components/heroes/CreativeHero/Hero2"
import Hero3 from "@/components/heroes/CreativeHero/Hero3"
import Hero4 from "@/components/heroes/CreativeHero/Hero4"
import Hero5 from "@/components/heroes/CreativeHero/Hero5"
import Hero6 from "@/components/heroes/CreativeHero/Hero6"

import Project1 from "@/components/projects/CreativeProjects/Project1"
import Project2 from "@/components/projects/CreativeProjects/Project2"
import Project3 from "@/components/projects/CreativeProjects/Project3"
import Project4 from "@/components/projects/CreativeProjects/Project4"
import Project5 from "@/components/projects/CreativeProjects/Project5"

import Footer1 from "@/components/footer/CreativeFooter/Footer1"
import Footer2 from "@/components/footer/CreativeFooter/Footer2"
import Footer3 from "@/components/footer/CreativeFooter/Footer3"
import Footer4 from "@/components/footer/CreativeFooter/Footer4"
import Footer5 from "@/components/footer/CreativeFooter/Footer5"

import Experience1 from "@/components/experience/CreativeExperience/Experience1"
import Experience2 from "@/components/experience/CreativeExperience/Experience2"
import Experience3 from "@/components/experience/CreativeExperience/Experience3"
import Experience4 from "@/components/experience/CreativeExperience/Experience4"
import Experience5 from "@/components/experience/CreativeExperience/Experience5"

import { ArrowLeft, ArrowRight, RotateCw, Home } from "lucide-react"

interface PortfolioPreviewProps {
  components: {
    navbar: string
    hero: string
    project: string
    footer: string
    experience: string
  }
}

const CreativePreview: React.FC<PortfolioPreviewProps> = ({ components }) => {
  const { navbar, hero, project, footer, experience } = components
  
  // Browser history simulation
  const [history, setHistory] = useState<string[]>(["home"])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState("home")
  
  // Navigation functions
  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setCurrentPage(history[currentIndex - 1])
    }
  }
  
  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentPage(history[currentIndex + 1])
    }
  }
  
  const goHome = () => {
    const newHistory = [...history.slice(0, currentIndex + 1), "home"]
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)
    setCurrentPage("home")
  }
  
  const refresh = () => {
    // Just simulate a refresh by triggering a re-render
    setCurrentPage(currentPage)
  }
  
  const navigateTo = (page: string) => {
    const newHistory = [...history.slice(0, currentIndex + 1), page]
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)
    setCurrentPage(page)
  }

  // Determine which components to render based on the current page
  const renderContent = () => {
    switch (currentPage) {
      case "about":
        return (
          <div className="min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-center py-8">About Page</h1>
            <p className="text-center text-gray-600">This would be your about page content.</p>
          </div>
        )
      case "contact":
        return (
          <div className="min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-center py-8">Contact Page</h1>
            <p className="text-center text-gray-600">This would be your contact page content.</p>
          </div>
        )
      case "projects":
        return (
          <div className="min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-center py-8">Projects Page</h1>
            <p className="text-center text-gray-600">This would display all your projects.</p>
          </div>
        )
      case "experience":
        return (
          <div className="min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-center py-8">Experience Page</h1>
            <p className="text-center text-gray-600">This would display your professional experience.</p>
          </div>
        )
      case "home":
      default:
        return (
          <>
            {/* Render selected navbar component */}
            {navbar === "Navbar1" && <Navbar1 onNavigate={navigateTo} />}
            {navbar === "Navbar2" && <Navbar2 onNavigate={navigateTo} />}
            {navbar === "Navbar3" && <Navbar3 onNavigate={navigateTo} />}
            {navbar === "Navbar4" && <Navbar4 onNavigate={navigateTo} />}
            {navbar === "Navbar5" && <Navbar5 onNavigate={navigateTo} />}
            {navbar === "Navbar6" && <Navbar6 onNavigate={navigateTo} />}

            {/* Render selected hero component */}
            {hero === "Hero1" && <Hero1 />}
            {hero === "Hero2" && <Hero2 />}
            {hero === "Hero3" && <Hero3 />}
            {hero === "Hero4" && <Hero4 />}
            {hero === "Hero5" && <Hero5 />}
            {hero === "Hero6" && <Hero6 />}

            {/* Render selected experience component */}
            {experience === "Experience1" && <Experience1 />}
            {experience === "Experience2" && <Experience2 />}
            {experience === "Experience3" && <Experience3 />}
            {experience === "Experience4" && <Experience4 />}
            {experience === "Experience5" && <Experience5 />}

            {/* Render selected project component */}
            {project === "Project1" && <Project1 />}
            {project === "Project2" && <Project2 />}
            {project === "Project3" && <Project3 />}
            {project === "Project4" && <Project4 />}
            {project === "Project5" && <Project5 />}

            {/* Render selected footer component */}
            {footer === "Footer1" && <Footer1 onNavigate={navigateTo} />}
            {footer === "Footer2" && <Footer2 onNavigate={navigateTo} />}
            {footer === "Footer3" && <Footer3 onNavigate={navigateTo} />}
            {footer === "Footer4" && <Footer4 onNavigate={navigateTo} />}
            {footer === "Footer5" && <Footer5 onNavigate={navigateTo} />}
          </>
        )
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100 border-r">
      {/* Browser-like navigation bar */}
      <div className="bg-gray-200 p-2 flex items-center space-x-2 border-b border-gray-300">
        <button 
          onClick={goBack} 
          disabled={currentIndex === 0}
          className={`p-1 rounded ${currentIndex === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-300'}`}
        >
          <ArrowLeft size={16} />
        </button>
        
        <button 
          onClick={goForward} 
          disabled={currentIndex === history.length - 1}
          className={`p-1 rounded ${currentIndex === history.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-300'}`}
        >
          <ArrowRight size={16} />
        </button>
        
        <button 
          onClick={refresh}
          className="p-1 rounded text-gray-700 hover:bg-gray-300"
        >
          <RotateCw size={16} />
        </button>
        
        <button 
          onClick={goHome}
          className="p-1 rounded text-gray-700 hover:bg-gray-300"
        >
          <Home size={16} />
        </button>
        
        {/* URL bar */}
        <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
          portfolio-preview.com/{currentPage === "home" ? "" : currentPage}
        </div>
      </div>
      
      {/* Content area with browser-like scrolling */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default CreativePreview