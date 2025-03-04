import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons
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
import usePortfolioStore from "@/store/usePortfolioStore";

interface DropdownProps {
  title: string;
  items: string[];
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
}

const Dropdown = ({ title, items, selectedItem, setSelectedItem }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md text-left font-semibold"
      >
        {title}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2 bg-white p-3 rounded-md shadow-md">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedItem(selectedItem === item ? null : item)}
              className={`block w-full px-3 py-2 text-sm rounded-md transition ${
                selectedItem === item
                  ? "bg-blue-500 text-white shadow-md"
                  : "border border-gray-300 bg-gray-100 hover:bg-blue-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TemplateEditor = () => {
  const { navbar, setNavbar, hero, setHero, project, setProject, footer, setFooter } = usePortfolioStore();

  return (
    <div className="flex h-screen">
      {/* Left Section - Live Preview (Fixed Size) */}
      <div className="flex-1 bg-gray-100 p-10 border-r overflow-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
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

          {footer === "Footer1" && <Footer1 />}
        </div>
      </div>

      {/* Right Section - Component Selection (Dropdown Menus) */}
      <div className="w-1/3 p-6 bg-white overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">Customize Your Portfolio</h2>

        <Dropdown title="Navbar" items={["Navbar1", "Navbar2", "Navbar3", "Navbar4", "Navbar5"]} selectedItem={navbar} setSelectedItem={setNavbar} />
        <Dropdown title="Hero Section" items={["Hero1", "Hero2", "Hero3", "Hero4", "Hero5"]} selectedItem={hero} setSelectedItem={setHero} />
        <Dropdown title="Project Section" items={["Project1", "Project2"]} selectedItem={project} setSelectedItem={setProject} />
        <Dropdown title="Footer" items={["Footer1"]} selectedItem={footer} setSelectedItem={setFooter} />

        {/* Download Button */}
        <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Download ZIP
        </button>
      </div>
    </div>
  );
};

export default TemplateEditor;
