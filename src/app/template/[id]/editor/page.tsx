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
import Navbar6 from "@/components/navbars/Navbar6";
import Hero1 from "@/components/heroes/Hero1";
import Hero2 from "@/components/heroes/Hero2";
import Hero3 from "@/components/heroes/Hero3";
import Hero4 from "@/components/heroes/Hero4";
import Hero5 from "@/components/heroes/Hero5";
import { Hero6 } from "@/components/heroes/Hero6";
import Hero7 from "@/components/heroes/Hero7";

interface SelectedComponents {
  navbar: string;
  hero: string;
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
  Navbar6,
};

const heroComponents: Record<string, React.ElementType> = {
  Hero1,
  Hero2,
  Hero3,
  Hero4,
  Hero5,
  Hero6,
  Hero7,
};

export default function EditorPage() {
  const { setNavbar } = usePortfolioStore();

  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({
    navbar: "",
    hero: "",
  });

  const [formData, setFormData] = useState<FormData>({
    navbar: {},
    hero: {},
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedComponents = localStorage.getItem("selectedComponents");
    if (savedComponents) {
      try {
        const parsedData = JSON.parse(savedComponents) as SelectedComponents;
        setNavbar(parsedData.navbar);
        setSelectedComponents(parsedData);
      } catch (error) {
        console.error("Error loading selected components:", error);
      }
    }
  }, [setNavbar]);

  const handleEditDownload = async () => {
    if (!selectedComponents.navbar && !selectedComponents.hero) {
      console.warn("⚠️ No components selected.");
      return;
    }

    setIsDownloading(true);
    try {
      const components = [];

      if (selectedComponents.navbar) {
        components.push({
          name: selectedComponents.navbar,
          type: "navbars",
          editedComponents: formData.navbar,
        });
      }

      if (selectedComponents.hero) {
        components.push({
          name: selectedComponents.hero,
          type: "heroes",
          editedComponents: formData.hero,
        });
      }

      const response = await fetch("/api/editdownload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ components }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to download ZIP: ${errorText || response.statusText}`);
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "edited-components.zip";
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

  const handleUploadToVercel = async () => {
    if (!selectedComponents.navbar && !selectedComponents.hero) {
      console.warn("⚠️ No components selected.");
      return;
    }
  
    setIsUploading(true);
    try {
      const files: Record<string, string> = {};
  
      if (selectedComponents.navbar) {
        const filePath = `components/${selectedComponents.navbar}.tsx`;
        files[filePath] = `export default function ${selectedComponents.navbar}() {
    return <nav>${JSON.stringify(formData.navbar)}</nav>;
  }`;
      }
  
      if (selectedComponents.hero) {
        const filePath = `components/${selectedComponents.hero}.tsx`;
        files[filePath] = `export default function ${selectedComponents.hero}() {
    return <section>${JSON.stringify(formData.hero)}</section>;
  }`;
      }
  
      // STEP 1: Upload to GitHub
      const githubUploadRes = await fetch("/api/github/upload-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: "user_github_token", // 🔒 Replace with real token
          repoName: "username/portfolio-site", // ✅ Correct field name now
          files, // ✅ Actual file content now
        }),
      });
  
      if (!githubUploadRes.ok) {
        const errText = await githubUploadRes.text();
        throw new Error(`GitHub upload failed: ${errText}`);
      }
  
      // STEP 2: Trigger Vercel deploy
      const vercelTriggerRes = await fetch("/api/vercel/trigger-vercel-deployment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vercelToken: "user_vercel_token", // 🔒 Replace with real token
          projectName: "portfolio-site",
          userGitHubRepo: "username/portfolio-site",
        }),
      });
  
      if (!vercelTriggerRes.ok) {
        const errText = await vercelTriggerRes.text();
        throw new Error(`Vercel deployment failed: ${errText}`);
      }
  
      const result = await vercelTriggerRes.json();
      console.log("✅ Vercel deployment triggered:", result);
      alert("Deployment triggered successfully!");
    } catch (err) {
      console.error("❌ Upload/Deploy failed:", err);
      alert("Upload/Deploy failed. See console.");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleFormChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const SelectedNavbarComponent = navbarComponents[selectedComponents.navbar] || null;
  const SelectedHeroComponent = heroComponents[selectedComponents.hero] || null;

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full">
        {/* Preview Area */}
        <div className="w-2/3 p-5 bg-gray-100 overflow-y-auto space-y-6">
          {SelectedNavbarComponent && (
            <div className="border bg-white p-5 shadow-lg rounded-md">
              <SelectedNavbarComponent data={formData.navbar} />
            </div>
          )}
          {SelectedHeroComponent && (
            <div className="border bg-white p-5 shadow-lg rounded-md">
              <SelectedHeroComponent data={formData.hero} />
            </div>
          )}
        </div>

        {/* Editor Panel */}
        <div className="w-1/3 h-full bg-gray-100 p-6 overflow-auto">
          <h2 className="text-lg font-bold mb-4">Customize Your Components</h2>

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

          {selectedComponents.hero && (
            <>
              <h3 className="text-md font-semibold mt-6">Hero Settings</h3>
              <DynamicForm
                section="hero"
                selectedComponent={selectedComponents.hero}
                formData={formData.hero}
                onChange={handleFormChange}
              />
            </>
          )}

          <button
            onClick={handleEditDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-6 disabled:opacity-50"
            disabled={isDownloading || (!selectedComponents.navbar && !selectedComponents.hero)}
          >
            {isDownloading ? "Downloading..." : "Download Edited Components"}
          </button>

          {/* New Button to Upload to Vercel */}
          <button
            onClick={handleUploadToVercel}
            className="px-4 py-2 bg-green-500 text-white rounded-lg mt-6 disabled:opacity-50"
            disabled={isUploading || (!selectedComponents.navbar && !selectedComponents.hero)}
          >
            {isUploading ? "Uploading..." : "Upload to Vercel"}
          </button>
        </div>
      </div>
    </>
  );
}
