"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
import Projects4 from "@/components/projects/Project4";
import Projects5 from "@/components/projects/Project5";
import Projects6 from "@/components/projects/Project6";

import Footer1 from "@/components/footer/Footer1";
import Footer2 from "@/components/footer/Footer2";
import Footer3 from "@/components/footer/Footer3";

import usePortfolioStore from "@/components/store/usePortfolioStore";
import Experience2 from "@/components/experience/Experience2";
import Experience3 from "@/components/experience/Experience3";






const TemplateEditor: React.FC = () => {
  const router = useRouter();
  const { navbar, hero, setNavbar, setHero, project, setProject, footer, setFooter, experience, setExperience } = usePortfolioStore();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [templateId] = useState<string>("my-template");
  const [isDownloading, setIsDownloading] = useState(false);

 


  // Load saved user preferences on mount
  useEffect(() => {
    const savedState = localStorage.getItem("portfolioState");
    if (savedState) {
      try {
        const { navbar, hero, project, footer } = JSON.parse(savedState);
        setNavbar(navbar);
        setHero(hero);
        setProject(project);
        setFooter(footer);
        setExperience(experience);
      } catch (error) {
        console.error("Error parsing saved state:", error);
      }
    }
  }, [setFooter, setHero, setNavbar, setProject, experience, setExperience]);

  // Save state changes to localStorage (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        "portfolioState",
        JSON.stringify({ navbar, hero, project, footer })
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [navbar, hero, project, footer]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const linkedPages: string[] = [];

      if (project) {linkedPages.push("/projects/[id]")};
      if (experience) {linkedPages.push("/experience")};
      if (navbar) {linkedPages.push("/contact", "/about")};

      const bodyData = { navbar, hero, project, footer,experience, linkedPages  };
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Failed to download ZIP");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "portfolio.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };


  const handleEdit = () => {
    const selectedComponents = { navbar, hero, project, footer, experience };
    
    // Save to localStorage or state management (Zustand)
    localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));

    // Navigate to the editor page
    router.push(`/template/${templateId}/editor`);
  };




  return (
    <div className="flex h-screen">
      {/* Left Preview Section */}
      <div className="flex-1 bg-gray-50 p-6 border-r overflow-y-scroll max-h-screen">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Editing Your Portfolio</h2>
        <div className="bg-white shadow-md z-10 ">
          {navbar === "Navbar1" && <Navbar1 />}
          {navbar === "Navbar2" && <Navbar2 />}
          {navbar === "Navbar3" && <Navbar3 />}
          {navbar === "Navbar4" && <Navbar4 />}
          {navbar === "Navbar5" && <Navbar5 />}
          {navbar === "Navbar6" && <Navbar6 />}
          

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
          {project === "Project4" && <Projects4 />}
          {project === "Project5" && <Projects5 />}
          {project === "Project6" && <Projects6 />}

          {footer === "Footer1" && <Footer1 />}
          {footer === "Footer2" && <Footer2 />}
          {footer === "Footer3" && <Footer3 />}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/3 p-6 bg-white overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Customize Your Portfolio</h2>

        {[
          { name: "Navbar", options: ["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5","Navbar6"], setter: setNavbar, selected: navbar },
          { name: "Hero", options: ["Hero1", "Hero2", "Hero3", "Hero4", "Hero5","Hero6","Hero7"], setter: setHero, selected: hero },
          { name: "Experience", options: ["Experience1","Experience2","Experience3"], setter: setExperience, selected: experience },
          { name: "Project", options: ["Project1", "Project2","Project3","Project4","Project5","Project6"], setter: setProject, selected: project },
          { name: "Footer", options: ["Footer1","Footer2","Footer3"], setter: setFooter, selected: footer },
        ].map(({ name, options, setter, selected }) => (
          <div key={name} className="mb-4">
            <button
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              onClick={() => toggleSection(name)}
            >
              {name} Section {expandedSections.includes(name) ? "▲" : "▼"}
            </button>
            {expandedSections.includes(name) && (
              <div className="mt-3 flex flex-wrap gap-3 animate-fade-in">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setter(selected === option ? "" : option)}
                    className={`px-4 py-2 rounded-lg shadow-sm transition-all duration-200 ${
                      selected === option
                        ? "bg-indigo-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isDownloading ? "Downloading..." : "Download ZIP"}
        </button>

        <button
        onClick={handleEdit}
        className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go to Editor
      </button>

      </div>
    </div>
  );
};

export default TemplateEditor;
