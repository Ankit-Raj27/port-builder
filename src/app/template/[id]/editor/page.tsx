"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import usePortfolioStore from "@/components/store/usePortfolioStore";
import DynamicForm from "@/components/forms/DynamicForm";

// Import Navbar components
import Navbar1 from "@/components/navbars/Navbar1";
import Navbar2 from "@/components/navbars/Navbar2";
import Navbar3 from "@/components/navbars/Navbar3";
import Navbar4 from "@/components/navbars/Navbar4";
import Navbar5 from "@/components/navbars/Navbar5";
import Navbar6 from "@/components/navbars/Navbar6";

// Define TypeScript interface for selected Navbar
interface SelectedComponents {
  navbar: string;
}

const EditorPage = () => {
  const params = useParams(); // ✅ Get template ID from URL
  const { navbar, setNavbar } = usePortfolioStore();

  // ✅ Ensure correct Navbar is selected
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({ navbar: "" });

  // ✅ Store form data
  const [formData, setFormData] = useState<Record<string, any>>({ navbar: {} });

  // ✅ Load selected components on mount
  useEffect(() => {
    const savedComponents = localStorage.getItem("selectedComponents");
    if (savedComponents) {
      try {
        const parsedData = JSON.parse(savedComponents);
        setNavbar(parsedData.navbar);
        setSelectedComponents({ navbar: parsedData.navbar });
      } catch (error) {
        console.error("Error loading selected components:", error);
      }
    }
  }, [setNavbar]);



const [isDownloading, setIsDownloading] = useState(false);

const handleEditDownload = async () => {
  setIsDownloading(true);
  try {
    // ✅ Ensure we capture the latest state
    const updatedNavbarCode = JSON.stringify(formData.navbar, null, 2);

    const bodyData = {
      navbar: selectedComponents.navbar,
      editedComponents: { navbar: updatedNavbarCode }, // ✅ Now sending correct JSON
    };

    console.log("📤 Sending Edited Navbar for Download:", bodyData);

    const response = await fetch("/api/editdownload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to download ZIP: ${errorText || response.statusText}`);
    }

    const blob = await response.blob();
    if (blob.size === 0) {
      throw new Error("Received empty ZIP file");
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited-navbar.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("❌ Download failed:", error instanceof Error ? error.message : error);
  } finally {
    setIsDownloading(false);
  }
};
       


  


  // ✅ Handle form changes
  const handleFormChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Live Preview */}
      <div className="w-2/3 p-5 bg-gray-100 overflow-hidden">
        <div className="border bg-white p-5 shadow-lg rounded-md">
          {/* ✅ Render only the selected Navbar */}
          {selectedComponents.navbar === "Navbar1" && <Navbar1 data={formData.navbar} />}
          {selectedComponents.navbar === "Navbar2" && <Navbar2  />}
          {selectedComponents.navbar === "Navbar3" && <Navbar3  />}
          {selectedComponents.navbar === "Navbar4" && <Navbar4  />}
          {selectedComponents.navbar === "Navbar5" && <Navbar5  />}
          {selectedComponents.navbar === "Navbar6" && <Navbar6  />}
        </div>
      </div>

      {/* Right Side - Form Editor */}
      <div className="w-1/3 h-full bg-gray-100 p-6 overflow-auto">
        <h2 className="text-lg font-bold mb-4">Customize Your Navbar</h2>

        {/* ✅ Show DynamicForm only if a Navbar is selected */}
        {selectedComponents.navbar && (
          <>
            <h3 className="text-md font-semibold">Navbar Settings</h3>
            <DynamicForm
              section="navbar"
              selectedComponent={selectedComponents.navbar}
              formData={formData.navbar} 
              onChange={handleFormChange}
            />
          </>
        )}

<button 
        onClick={handleEditDownload} 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 disabled:opacity-50"
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download Edited Components"}
      </button>
      </div>
    </div>
  );
};

export default EditorPage;