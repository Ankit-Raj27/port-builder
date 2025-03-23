"use client";

import { useEffect, useState } from "react";
import React from "react";
import Navbar1 from "@/components/navbars/Navbar1";
import Hero1 from "@/components/hero/Hero1";
import Footer1 from "@/components/footer/Footer1";

// Define Component Mapping
const componentMap = {
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
  navbar?: keyof typeof componentMap.navbar;
  hero?: keyof typeof componentMap.hero;
  footer?: keyof typeof componentMap.footer;
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
      {selectedComponents.navbar &&
        componentMap.navbar[selectedComponents.navbar] &&
        React.createElement(componentMap.navbar[selectedComponents.navbar])}

      {/* Hero Preview */}
      {selectedComponents.hero &&
        componentMap.hero[selectedComponents.hero] &&
        React.createElement(componentMap.hero[selectedComponents.hero])}

      {/* Footer Preview */}
      {selectedComponents.footer &&
        componentMap.footer[selectedComponents.footer] &&
        React.createElement(componentMap.footer[selectedComponents.footer])}
    </div>
  );
};

export default PreviewPage;
