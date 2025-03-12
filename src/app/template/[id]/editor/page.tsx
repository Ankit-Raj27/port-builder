"use client";

import { useEffect, useState } from "react";
import usePortfolioStore from "@/store/usePortfolioStore";

// Import possible components
import Navbar1 from "@/components/navbars/Navbar1";
import Navbar2 from "@/components/navbars/Navbar2";
import Navbar3 from "@/components/navbars/Navbar3";
import Navbar4 from "@/components/navbars/Navbar4";
import Navbar5 from "@/components/navbars/Navbar5";
import Navbar6 from "@/components/navbars/Navbar6";

import Hero1 from "@/components/hero/Hero1";
import Hero2 from "@/components/hero/Hero2";
import Hero3 from "@/components/hero/Hero3";
import Hero4 from "@/components/hero/Hero4";
import Hero5 from "@/components/hero/Hero5";
import { Hero6 } from "@/components/hero/Hero6";
import Hero7 from "@/components/hero/Hero7";

import Experience1 from "@/components/experience/Experience1";

import Project1 from "@/components/projects/Project1";
import Project2 from "@/components/projects/Project2";
import Project3 from "@/components/projects/Project3";
import Project4 from "@/components/projects/Project4";
import Project5 from "@/components/projects/Project5";
import Project6 from "@/components/projects/Project6";

import Footer1 from "@/components/footer/Footer1";
import Footer2 from "@/components/footer/Footer2";
import Footer3 from "@/components/footer/Footer3";

// Define TypeScript interface for selected components
interface SelectedComponents {
  navbar?: string;
  hero?: string;
  project?: string;
  footer?: string;
  experience?: string;
}

const EditorPage = () => {
  const { setNavbar, setHero, setProject, setFooter, setExperience } = usePortfolioStore();
  
  // Initialize state with a proper type
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({});

  useEffect(() => {
    const storedComponents = localStorage.getItem("selectedComponents");
  
    if (storedComponents) {
      try {
        const parsedComponents: SelectedComponents = JSON.parse(storedComponents);
        console.log("Loaded components from storage:", parsedComponents); // Debugging log
        setSelectedComponents(parsedComponents);
  
        // Delay Zustand store update to avoid stale state
        setTimeout(() => {
          setNavbar(parsedComponents.navbar || "");
          setHero(parsedComponents.hero || "");
          setProject(parsedComponents.project || "");
          setFooter(parsedComponents.footer || "");
          setExperience(parsedComponents.experience || "");
        }, 100);
      } catch (error) {
        console.error("Error parsing selected components:", error);
      }
    }
  }, [setNavbar, setHero, setProject, setFooter, setExperience]);
  
  return (
    <div className="editor-container">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      <div className="border bg-white p-5 shadow-lg rounded-md">
        {/* Navbar */}
        {selectedComponents.navbar && (
          <>
            {selectedComponents.navbar === "Navbar1" && <Navbar1 />}
            {selectedComponents.navbar === "Navbar2" && <Navbar2 />}
            {selectedComponents.navbar === "Navbar3" && <Navbar3 />}
            {selectedComponents.navbar === "Navbar4" && <Navbar4 />}
            {selectedComponents.navbar === "Navbar5" && <Navbar5 />}
            {selectedComponents.navbar === "Navbar6" && <Navbar6 />}
          </>
        )}
  
        {/* Hero */}
        {selectedComponents.hero && (
          <>
            {selectedComponents.hero === "Hero1" && <Hero1 />}
            {selectedComponents.hero === "Hero2" && <Hero2 />}
            {selectedComponents.hero === "Hero3" && <Hero3 />}
            {selectedComponents.hero === "Hero4" && <Hero4 />}
            {selectedComponents.hero === "Hero5" && <Hero5 />}
            {selectedComponents.hero === "Hero6" && <Hero6 />}
            {selectedComponents.hero === "Hero7" && <Hero7 />}
          </>
        )}
  
        {/* Project */}
        {selectedComponents.project && (
          <>
            {selectedComponents.project === "Project1" && <Project1 />}
            {selectedComponents.project === "Project2" && <Project2 />}
            {selectedComponents.project === "Project3" && <Project3 />}
            {selectedComponents.project === "Project4" && <Project4 />}
            {selectedComponents.project === "Project5" && <Project5 />}
            {selectedComponents.project === "Project6" && <Project6 />}
          </>
        )}
  
        {/* Experience */}
        {selectedComponents.experience && selectedComponents.experience === "Experience1" && <Experience1 />}
  
        {/* Footer */}
        {selectedComponents.footer && (
          <>
            {selectedComponents.footer === "Footer1" && <Footer1 />}
            {selectedComponents.footer === "Footer2" && <Footer2 />}
            {selectedComponents.footer === "Footer3" && <Footer3 />}
          </>
        )}
      </div>
    </div>
  );
  
}
export default EditorPage;
