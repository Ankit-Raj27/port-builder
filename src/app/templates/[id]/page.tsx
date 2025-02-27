"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar1 from "@/components/navbars/Navbar1";
import Navbar2 from "@/components/navbars/Navbar2";
import Hero1 from "@/components/hero/Hero1";
import Hero2 from "@/components/hero/Hero2";
import usePortfolioStore from "@/components/store/usePortfolioStore";

const TemplateEditor: React.FC = () => {
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id") || "";
  const queryNavbar = queryParams.get("navbar");
  const queryHero = queryParams.get("hero");

  const { navbar, hero, setNavbar, setHero } = usePortfolioStore();

  useEffect(() => {
    if (queryNavbar) setNavbar(queryNavbar);
    if (queryHero) setHero(queryHero);
  }, [queryNavbar, queryHero, setNavbar, setHero]);

  return (
    <div className="flex h-screen">
      {/* Left Section - Live Preview */}
      <div className="flex-1 bg-gray-100 p-10 border-r">
        <h2 className="text-xl font-semibold mb-4">Editing: {id}</h2>
        <div className="border bg-white p-5 shadow-lg rounded-md">
          {navbar === "Navbar1" && <Navbar1 />}
          {navbar === "Navbar2" && <Navbar2 />}
          {hero === "Hero1" && <Hero1 />}
          {hero === "Hero2" && <Hero2 />}
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

        {/* Hero Section Selection */}
        <h3 className="text-lg font-semibold mt-4">Select a Hero Section:</h3>
        <button onClick={() => setHero("Hero1")} className={`p-2 m-2 w-full text-left ${hero === "Hero1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 1
        </button>
        <button onClick={() => setHero("Hero2")} className={`p-2 m-2 w-full text-left ${hero === "Hero2" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          Hero 2
        </button>
      </div>
    </div>
  );
};

export default TemplateEditor;