"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

import usePortfolioStore from "@/components/store/usePortfolioStore";

const TemplateEditor: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQueryParams(new URLSearchParams(window.location.search));
    }
  }, []);

  // ✅ Fix: Ensure queryParams isn't null before calling .get()
  const id = queryParams?.get("id") || "";
  const queryNavbar = queryParams?.get("navbar") || null;
  const queryHero = queryParams?.get("hero") || null;
  const queryProject = queryParams?.get("project") || null;
  const queryBlog = queryParams?.get("blog") || null;
  const queryFooter = queryParams?.get("footer") || null;

  const { navbar, hero, setNavbar, setHero, project, setProject, blog, setBlog, footer, setFooter } = usePortfolioStore();

  useEffect(() => {
    if (queryNavbar) setNavbar(queryNavbar);
    if (queryHero) setHero(queryHero);
    if (queryProject) setProject(queryProject);
    if (queryBlog) setBlog(queryBlog);
    if (queryFooter) setFooter(queryFooter);
  }, [queryNavbar, queryHero, queryProject, queryBlog, queryFooter, setNavbar, setHero, setProject, setBlog, setFooter]);

  // Download Zip function
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Explicitly define bodyData type
      const bodyData: { navbar: string | null; hero: string | null; project?: string | null } = {
        navbar,
        hero,
      };
  
      if (project) bodyData.project = project; // ✅ Only add project if it exists
  
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to download ZIP: ${errorMessage}`);
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
          

  return (
    <div className="flex h-screen">
      {/* Left Section - Live Preview */}
      <div className="flex-1 bg-gray-100 p-10 border-r">
        <h2 className="text-xl font-semibold mb-4">Editing: {id}</h2>
        <div className="border bg-white p-5 shadow-lg rounded-md">
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
        </div>
      </div>

      {/* Right Section - Component Selection */}
      <div className="w-1/3 p-10 bg-white">
        <h2 className="text-2xl font-bold mb-4">Customize Your Portfolio</h2>

        {/* Navbar Selection */}
        <h3 className="text-lg font-semibold">Select a Navbar:</h3>
        {["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5"].map((nav) => (
          <button
            key={nav}
            onClick={() => setNavbar(nav)}
            className={`p-2 m-2 w-full text-left ${navbar === nav ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {nav}
          </button>
        ))}

        {/* Hero Section Selection */}
        <h3 className="text-lg font-semibold mt-4">Select a Hero Section:</h3>
        {["Hero1", "Hero2", "Hero3", "Hero4", "Hero5"].map((h) => (
          <button
            key={h}
            onClick={() => setHero(h)}
            className={`p-2 m-2 w-full text-left ${hero === h ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {h}
          </button>
        ))}

        {/* Project Section Selection */}
        <h3 className="text-lg font-semibold mt-4">Select a Project Section:</h3>
        {["Project1", "Project2"].map((p) => (
          <button
            key={p}
            onClick={() => setProject(p)}
            className={`p-2 m-2 w-full text-left ${project === p ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {p}
          </button>

          
        ))}
         <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isDownloading ? "Downloading..." : "Download ZIP"}
      </button>
      </div>

   
     
    </div>
  );
};

export default TemplateEditor;
