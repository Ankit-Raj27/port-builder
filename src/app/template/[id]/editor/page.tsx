"use client";

import { useEffect, useState } from "react";
import usePortfolioStore from "@/components/store/usePortfolioStore";
import DynamicForm from "@/components/forms/DynamicForm";

import { Navbar } from "@/components/navbars/Navbar";
import Navbar1 from "@/components/navbars/Navbar1";
import Navbar2 from "@/components/navbars/Navbar2";
import Navbar3 from "@/components/navbars/Navbar3";
import Navbar4 from "@/components/navbars/Navbar4";
import Navbar5 from "@/components/navbars/Navbar5";

interface SelectedComponents {
  navbar: string;
}

interface FormData {
  [key: string]: Record<string, string>;
}

const navbarComponents: Record<string, React.ElementType> = {
  Navbar1,
  Navbar2,
  Navbar3,
  Navbar4,
  Navbar5,
};

export default function EditorPage() {
  const { setNavbar } = usePortfolioStore();

  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({ navbar: "" });
  const [formData, setFormData] = useState<FormData>({ navbar: {} });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const savedComponents = localStorage.getItem("selectedComponents");
    if (savedComponents) {
      try {
        const parsedData = JSON.parse(savedComponents) as SelectedComponents;
        setNavbar(parsedData.navbar);
        setSelectedComponents({ navbar: parsedData.navbar });
      } catch (error) {
        console.error("Error loading selected components:", error);
      }
    }
  }, [setNavbar]);

  const handleEditDownload = async () => {
    if (!selectedComponents.navbar) {
      console.warn("⚠️ No navbar selected.");
      return;
    }

    setIsDownloading(true);
    try {
      const bodyData = {
        components: [
          {
            name: selectedComponents.navbar,
            type: "navbars",
            editedComponents: formData.navbar,
          },
        ],
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
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "edited-navbar.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("❌ Download failed:", error);
      alert("Download failed. Check console for details.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFormChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const SelectedNavbarComponent = navbarComponents[selectedComponents.navbar] || null;

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full">
        <div className="w-2/3 p-5 bg-gray-100 overflow-hidden">
          <div className="border bg-white p-5 shadow-lg rounded-md">
            {SelectedNavbarComponent && <SelectedNavbarComponent data={formData.navbar} />}
          </div>
        </div>

        <div className="w-1/3 h-full bg-gray-100 p-6 overflow-auto">
          <h2 className="text-lg font-bold mb-4">Customize Your Navbar</h2>
          {selectedComponents.navbar ? (
            <>
              <h3 className="text-md font-semibold">Navbar Settings</h3>
              <DynamicForm
                section="navbar"
                selectedComponent={selectedComponents.navbar}
                formData={formData.navbar}
                onChange={handleFormChange}
              />
            </>
          ) : (
            <p className="text-sm text-gray-500">Please select a navbar from the template screen.</p>
          )}

          <button
            onClick={handleEditDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 disabled:opacity-50"
            disabled={isDownloading || !selectedComponents.navbar}
          >
            {isDownloading ? "Downloading..." : "Download Edited Components"}
          </button>
        </div>
      </div>
    </>
  );
}
