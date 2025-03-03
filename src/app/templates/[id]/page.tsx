"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id") || "";
  const queryNavbar = queryParams.get("navbar");
  const queryHero = queryParams.get("hero");
  const queryProject = queryParams.get("project");
  const queryBlog = queryParams.get("blog");
  const queryFooter = queryParams.get("footer");

  const { navbar, hero, setNavbar, setHero, project, setProject, blog, setBlog,footer, setFooter } = usePortfolioStore();

  useEffect(() => {
    if (queryNavbar) setNavbar(queryNavbar);
    if (queryHero) setHero(queryHero);
    if (queryProject) setProject(queryProject);
    if (queryBlog) setBlog(queryBlog);
    if (queryFooter) setFooter(queryFooter);
  }, [queryNavbar, queryHero, queryProject, queryBlog,queryFooter, setNavbar, setHero,setProject,setBlog,setFooter]);

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
        <button onClick={() => setNavbar("Navbar1")} className={`p-2 m-2 w-full text-left ${navbar === "Navbar1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Navbar 1
        </button>
        <button onClick={() => setNavbar("Navbar2")} className={`p-2 m-2 w-full text-left ${navbar === "Navbar2" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Navbar 2
        </button>
        <button onClick={() => setNavbar("Navbar3")} className={`p-2 m-2 w-full text-left ${navbar === "Navbar3" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Navbar 3
        </button>
        <button onClick={() => setNavbar("Navbar4")} className={`p-2 m-2 w-full text-left ${navbar === "Navbar4" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Navbar 4
        </button>
        <button onClick={() => setNavbar("Navbar5")} className={`p-2 m-2 w-full text-left ${navbar === "Navbar5" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Navbar 5
        </button>

        {/* Hero Section Selection */}
        <h3 className="text-lg font-semibold mt-4">Select a Hero Section:</h3>
        <button onClick={() => setHero("Hero1")} className={`p-2 m-2 w-full text-left ${hero === "Hero1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 1
        </button>
        <button onClick={() => setHero("Hero2")} className={`p-2 m-2 w-full text-left ${hero === "Hero2" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 2
        </button>
        <button onClick={() => setHero("Hero3")} className={`p-2 m-2 w-full text-left ${hero === "Hero3" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 3
        </button>
        <button onClick={() => setHero("Hero4")} className={`p-2 m-2 w-full text-left ${hero === "Hero4" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 4
        </button>
        <button onClick={() => setHero("Hero5")} className={`p-2 m-2 w-full text-left ${hero === "Hero5" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 5
        </button>

        {/* Project Section Selection */}
        <h3 className="text-lg font-semibold mt-4">Select a Hero Section:</h3>
        <button onClick={() => setProject("Project1")} className={`p-2 m-2 w-full text-left ${project === "Project1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Project 1
        </button>
      </div>
    </div>
  );
};

export default TemplateEditor;