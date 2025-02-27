import { useEffect } from "react";
import { useRouter } from "next/router";
import usePortfolioStore from "../components/store/usePortfolioStore";
import Navbar1 from "../components/navbars/Navbar1";
import Navbar2 from "../components/navbars/Navbar2";
import Hero1 from "../components/hero/Hero1";
import Hero2 from "../components/hero/Hero2";

const Editor = () => {
  const router = useRouter();
  const { template } = router.query;
  const { navbar, hero, setNavbar, setHero } = usePortfolioStore();
  
  // Auto-load template sections
  useEffect(() => {
    if (template === "template1") {
      setNavbar("Navbar1");
      setHero("Hero1");
    } else if (template === "template2") {
      setNavbar("Navbar2");
      setHero("Hero2");
    }
  }, [template]);

  return (
    <div className="flex h-screen">
      {/* Left - Live Preview */}
      <div className="flex-1 bg-gray-100 p-10 border-r">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="border bg-white p-5 shadow-lg rounded-md">
          {navbar === "Navbar1" && <Navbar1 />}
          {navbar === "Navbar2" && <Navbar2 />}
          {hero === "Hero1" && <Hero1 />}
          {hero === "Hero2" && <Hero2 />}
        </div>
      </div>

      {/* Right - Customization Panel */}
      <div className="w-1/3 p-10 bg-white">
        <h2 className="text-2xl font-bold mb-4">Customize Your Portfolio</h2>

        <h3 className="text-lg font-semibold">Select a Navbar:</h3>
        <button onClick={() => setNavbar("Navbar1")} className="p-2 m-2 bg-gray-300 w-full text-left">
          Navbar 1
        </button>
        <button onClick={() => setNavbar("Navbar2")} className="p-2 m-2 bg-gray-300 w-full text-left">
          Navbar 2
        </button>

        <h3 className="text-lg font-semibold mt-4">Select a Hero Section:</h3>
        <button onClick={() => setHero("Hero1")} className="p-2 m-2 bg-gray-300 w-full text-left">
          Hero 1
        </button>
        <button onClick={() => setHero("Hero2")} className="p-2 m-2 bg-gray-300 w-full text-left">
          Hero 2
        </button>

        <button className="mt-6 w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600">
          Download Portfolio 🚀
        </button>
      </div>
    </div>
  );
};

export default Editor;
