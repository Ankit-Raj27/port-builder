import { create } from "zustand";
interface PortfolioState {
  navbar: string | null;
  hero: string | null;
  project: string | null;
  footer: string | null;
  heroText: { title: string; description: string; buttonText: string };
  setNavbar: (navbar: string | null) => void;
  setHero: (hero: string | null) => void;
  setProject: (project: string | null) => void;
  setFooter: (footer: string | null) => void;
  setHeroText: (text: { title: string; description: string; buttonText: string }) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  navbar: "Navbar1",
  hero: "Hero1",
  project: "Project1",
  footer: "Footer1",
  heroText: {
    title: "Welcome to My Portfolio",
    description: "Showcasing my projects.",
    buttonText: "Get Started",
  },
  setNavbar: (navbar) => set({ navbar }),
  setHero: (hero) => set({ hero }),
  setProject: (project) => set({ project }),
  setFooter: (footer) => set({ footer }),
  setHeroText: (heroText) => set({ heroText }),
}));

export default usePortfolioStore;