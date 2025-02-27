import { useEffect, useState } from "react";
import usePortfolioStore from "../components/store/usePortfolioStore";
import Navbar from "../components/navbars/Navbar";
import Navbar1 from "../components/navbars/Navbar1";
import Navbar2 from "../components/navbars/Navbar2";
import Hero1 from "../components/hero/Hero1";
import Hero2 from "../components/hero/Hero2";
import axios from "axios";

const Home = () => {
  const { navbar, hero, setNavbar, setHero } = usePortfolioStore();
  const [previewHtml, setPreviewHtml] = useState("");

  // Generate live preview dynamically
  useEffect(() => {
    const htmlTemplate = `
      <html>
        <head>
          <title>Portfolio Preview</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            .navbar { background: #333; color: white; padding: 10px; }
            .hero { background: #f4f4f4; padding: 30px; }
          </style>
        </head>
        <body>
          <div class="navbar">${navbar === "Navbar1" ? "Navbar 1" : "Navbar 2"}</div>
          <div class="hero">${hero === "Hero1" ? "Hero 1 Section" : "Hero 2 Section"}</div>
        </body>
      </html>
    `;
    setPreviewHtml(htmlTemplate);
  }, [navbar, hero]);

  // Handle download button
  const handleDownload = async () => {
    try {
      const response = await axios.post("/api/generate", { navbar, hero }, { responseType: "blob" });

      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "portfolio.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Open Live Preview in a new tab
  const handleLivePreview = () => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(previewHtml);
      newWindow.document.close();
    }
  };

  return (
    <div>
    <Navbar />
    
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <div className="border-b shadow-md p-4 bg-gray-200">
        {navbar === "Navbar1" && <Navbar1 />}
        {navbar === "Navbar2" && <Navbar2 />}
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Section - Live Preview */}
        <div className="flex-1 bg-gray-100 p-10 border-r">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <div className="border bg-white p-5 shadow-lg rounded-md">
            {hero === "Hero1" && <Hero1 />}
            {hero === "Hero2" && <Hero2 />}
          </div>
        </div>

        {/* Right Section - Component Selection */}
        <div className="w-1/3 p-10 bg-white">
          <h2 className="text-2xl font-bold mb-4">Customize Your Portfolio</h2>

          {/* Navbar Selection */}
          <h3 className="text-lg font-semibold">Select a Navbar:</h3>
          <button
            onClick={() => setNavbar("Navbar1")}
            className={`p-2 m-2 w-full text-left rounded-md transition-all ${
              navbar === "Navbar1" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Navbar 1
          </button>
          <button
            onClick={() => setNavbar("Navbar2")}
            className={`p-2 m-2 w-full text-left rounded-md transition-all ${
              navbar === "Navbar2" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Navbar 2
          </button>

          {/* Hero Section Selection */}
          <h3 className="text-lg font-semibold mt-4">Select a Hero Section:</h3>
          <button
            onClick={() => setHero("Hero1")}
            className={`p-2 m-2 w-full text-left rounded-md transition-all ${
              hero === "Hero1" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Hero 1
          </button>
          <button
            onClick={() => setHero("Hero2")}
            className={`p-2 m-2 w-full text-left rounded-md transition-all ${
              hero === "Hero2" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Hero 2
          </button>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            <button
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all"
              onClick={handleDownload}
            >
              Download Portfolio 🚀
            </button>
            <button
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
              onClick={handleLivePreview}
            >
              Live Preview 🔥
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
