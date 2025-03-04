"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar1 from "@/components/navbars/Navbar1";
import Navbar2 from "@/components/navbars/Navbar2";
import Navbar3 from "@/components/navbars/Navbar3";
import Navbar4 from "@/components/navbars/Navbar4";
import Navbar5 from "@/components/navbars/Navbar5";

import Hero1 from "@/components/hero/Hero1";
import Hero2 from "@/components/hero/Hero2";
import Hero3 from "@/components/hero/Hero3";
import Hero4 from "@/components/hero/Hero4";
import Hero5 from "@/components/hero/Hero5";

import Project1 from "@/components/projects/Project1";
import Project2 from "@/components/projects/Project2";

import Footer1 from "@/components/footer/Footer1";

import usePortfolioStore from "@/components/store/usePortfolioStore";

const TemplateEditor: React.FC = () => {
  const { navbar, hero, setNavbar, setHero, project, setProject, footer, setFooter } = usePortfolioStore();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const bodyData = { navbar, hero, project, footer };
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error("Failed to download ZIP");

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

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-50 p-6 border-r overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Editing Your Portfolio</h2>
        <div className="border bg-white p-6 shadow-md rounded-lg">
          {navbar === "Navbar1" && <Navbar1 />}
          {navbar === "Navbar2" && <Navbar2 />}
          {navbar === "Navbar3" && <Navbar3 />}
          {navbar === "Navbar4" && <Navbar4 />}
          {navbar === "Navbar5" && <Navbar5 />}

          {hero === "Hero1" && <Hero1 />}
          {hero === "Hero2" && <Hero2 />}
          {hero === "Hero3" && <Hero3 />}
          {hero === "Hero4" && <Hero4 />}
          {hero === "Hero5" && <Hero5 />}

          {project === "Project1" && <Project1 />}
          {project === "Project2" && <Project2 />}

          {footer === "Footer1" && <Footer1 />}
        </div>
      </div>

      <div className="w-1/3 p-6 bg-white overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Customize Your Portfolio</h2>

        {[{ name: "Navbar", options: ["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5"], setter: setNavbar, selected: navbar },
          { name: "Hero", options: ["Hero1", "Hero2", "Hero3", "Hero4", "Hero5"], setter: setHero, selected: hero },
          { name: "Project", options: ["Project1", "Project2"], setter: setProject, selected: project },
          { name: "Footer", options: ["Footer1"], setter: setFooter, selected: footer }
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
                    onClick={() => setter(selected === option ? null : option)}
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
      </div>
    </div>
  );
};

export default TemplateEditor;