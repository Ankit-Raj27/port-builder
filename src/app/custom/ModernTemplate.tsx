"use client"
import type React from "react"
import usePortfolioStore from "@/components/store/usePortfolioStore"

// --- NAV ---
import Navbar1 from "@/components/navbars/ModernNavbars/Navbar1"
import Navbar2 from "@/components/navbars/ModernNavbars/Navbar2"
import Navbar3 from "@/components/navbars/ModernNavbars/Navbar3"
import Navbar4 from "@/components/navbars/ModernNavbars/Navbar4"
import Navbar5 from "@/components/navbars/ModernNavbars/Navbar5"
import Navbar6 from "@/components/navbars/ModernNavbars/Navbar6"
import Navbar7 from "@/components/navbars/ModernNavbars/Navbar7"
import EliteNavbar from "@/components/navbars/ModernNavbars/EliteNavbar"

// --- HERO ---
import Hero1 from "@/components/heroes/ModernHeroes/Hero1"
import Hero2 from "@/components/heroes/ModernHeroes/Hero2"
import Hero3 from "@/components/heroes/ModernHeroes/Hero3"
import Hero4 from "@/components/heroes/ModernHeroes/Hero4"
import Hero5 from "@/components/heroes/ModernHeroes/Hero5"
import Hero6 from "@/components/heroes/ModernHeroes/Hero6"
import EliteHero from "@/components/heroes/ModernHeroes/EliteHero"

// --- EXPERIENCE ---
import Experience1 from "@/components/experience/ModernExperiences/Experience1"
import Experience2 from "@/components/experience/ModernExperiences/Experience2"
import Experience3 from "@/components/experience/ModernExperiences/Experience3"
import EliteExperience from "@/components/experience/ModernExperiences/EliteExperience"

// --- PROJECT ---
import Project1 from "@/components/projects/ModernProjects/Project1"
import Project2 from "@/components/projects/ModernProjects/Project2"
import Project3 from "@/components/projects/ModernProjects/Project3"
import Project4 from "@/components/projects/ModernProjects/Project4"
import Project5 from "@/components/projects/ModernProjects/Project5"
import Project6 from "@/components/projects/ModernProjects/Project6"
import EliteProject from "@/components/projects/ModernProjects/EliteProject"

// --- FOOTER ---
import Footer1 from "@/components/footer/ModernFooters/Footer1"
import Footer2 from "@/components/footer/ModernFooters/Footer2"
import Footer3 from "@/components/footer/ModernFooters/Footer3"
import EliteFooter from "@/components/footer/ModernFooters/EliteFooter"

const ModernTemplate: React.FC = () => {
  const {
    navbar, hero, project, footer, experience,
    setActiveSection, lastUpdated
  } = usePortfolioStore()

  return (
    <div className="bg-white min-h-screen relative" key={lastUpdated}>

      {/* NAVBAR LAYER */}
      <div onClick={(e) => { e.stopPropagation(); setActiveSection("navbar"); }} className="cursor-pointer hover:ring-2 hover:ring-emerald-500/20 transition-all">
        {navbar === "Navbar1" && <Navbar1 isEditable={false} />}
        {navbar === "Navbar2" && <Navbar2 />}
        {navbar === "Navbar3" && <Navbar3 />}
        {navbar === "Navbar4" && <Navbar4 />}
        {navbar === "Navbar5" && <Navbar5 />}
        {navbar === "Navbar6" && <Navbar6 />}
        {navbar === "Navbar7" && <Navbar7 />}
        {navbar === "EliteNavbar" && <EliteNavbar isEditable={false} />}
      </div>

      {/* HERO LAYER */}
      <div onClick={(e) => { e.stopPropagation(); setActiveSection("hero"); }} className="cursor-pointer hover:ring-2 hover:ring-purple-500/20 transition-all">
        {hero === "Hero1" && <Hero1 />}
        {hero === "Hero2" && <Hero2 />}
        {hero === "Hero3" && <Hero3 />}
        {hero === "Hero4" && <Hero4 />}
        {hero === "Hero5" && <Hero5 />}
        {hero === "Hero6" && <Hero6 />}
        {hero === "EliteHero" && <EliteHero isEditable={false} />}
      </div>

      {/* EXPERIENCE LAYER */}
      <div onClick={(e) => { e.stopPropagation(); setActiveSection("experience"); }} className="cursor-pointer hover:ring-2 hover:ring-orange-500/20 transition-all">
        {experience === "Experience1" && <Experience1 isEditable={false} />}
        {experience === "Experience2" && <Experience2 />}
        {experience === "Experience3" && <Experience3 />}
        {experience === "EliteExperience" && <EliteExperience isEditable={false} />}
      </div>

      {/* PROJECT LAYER */}
      <div onClick={(e) => { e.stopPropagation(); setActiveSection("project"); }} className="cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all">
        {project === "Project1" && <Project1 />}
        {project === "Project2" && <Project2 />}
        {project === "Project3" && <Project3 />}
        {project === "Project4" && <Project4 />}
        {project === "Project5" && <Project5 />}
        {project === "Project6" && <Project6 />}
        {project === "EliteProject" && <EliteProject isEditable={false} />}
      </div>

      {/* FOOTER LAYER */}
      <div onClick={(e) => { e.stopPropagation(); setActiveSection("footer"); }} className="cursor-pointer hover:ring-2 hover:ring-gray-500/20 transition-all">
        {footer === "Footer1" && <Footer1 isEditable={false} />}
        {footer === "Footer2" && <Footer2 />}
        {footer === "Footer3" && <Footer3 />}
        {footer === "EliteFooter" && <EliteFooter isEditable={false} />}
      </div>

    </div>
  )
}

export default ModernTemplate
