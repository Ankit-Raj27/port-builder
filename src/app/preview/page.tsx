"use client";

import { useEffect, useState } from "react";
import Navbar1 from "@/components/navbars/Navbar1";
import Hero1 from "@/components/hero/Hero1";
import Footer1 from "@/components/footer/Footer1";

// Define Component Mapping
const componentMap: any = {
  navbar: {
    Navbar1,
  },
  hero: {
    Hero1,
  },
  footer: {
    Footer1,
  },
};

interface SelectedComponents {
  navbar?: string;
  hero?: string;
  footer?: string;
}

const PreviewPage = () => {
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({});

  useEffect(() => {
    const stored = localStorage.getItem("selectedComponents");
    if (stored) {
      setSelectedComponents(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Navbar Preview */}
      {selectedComponents.navbar && componentMap.navbar[selectedComponents.navbar] && (
        <>{componentMap.navbar[selectedComponents.navbar]()}</>
      )}

      {/* Hero Preview */}
      {selectedComponents.hero && componentMap.hero[selectedComponents.hero] && (
        <>{componentMap.hero[selectedComponents.hero]()}</>
      )}

      {/* Footer Preview */}
      {selectedComponents.footer && componentMap.footer[selectedComponents.footer] && (
        <>{componentMap.footer[selectedComponents.footer]()}</>
      )}
    </div>
  );
};

export default PreviewPage;
