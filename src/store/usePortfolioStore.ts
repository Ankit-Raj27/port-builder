import { create } from "zustand";

interface HeroContent {
  title: string;
  name: string;
  subtitle: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

interface PortfolioState {
  navbar: string | null;
  navbarStyle: string | null;
  hero: string | null;
  heroStyle: string | null;
  project: string | null;
  projectStyle: string | null;
  footer: string | null;
  footerStyle: string | null;
  experience: string | null;
  experienceStyle: string | null;
  
  // Content State
  heroContent: HeroContent;

  // Actions
  setNavbar: (navbar: string | null, style?: string | null) => void;
  setHero: (hero: string | null, style?: string | null) => void;
  setProject: (project: string | null, style?: string | null) => void;
  setFooter: (footer: string | null, style?: string | null) => void;
  setExperience: (experience: string | null, style?: string | null) => void;
  
  // Content Actions
  updateHeroContent: (updates: Partial<HeroContent>) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  navbar: "Navbar1",
  navbarStyle: "Modern",
  hero: "Hero1",
  heroStyle: "Modern",
  project: "Project1",
  projectStyle: "Modern",
  experience: "Experience1",
  experienceStyle: "Modern",
  footer: "Footer1",
  footerStyle: "Modern",

  heroContent: {
    title: "Hi, I am",
    name: "John Doe",
    subtitle: "Frontend Developer & UI/UX Designer",
    description: "I create beautiful, responsive websites with modern technologies that help businesses grow and users smile.",
    primaryButton: "View My Work",
    secondaryButton: "Contact Me"
  },

  setNavbar: (navbar, style) => set({ navbar, navbarStyle: style || null }),
  setHero: (hero, style) => set({ hero, heroStyle: style || null }),
  setProject: (project, style) => set({ project, projectStyle: style || null }),
  setFooter: (footer, style) => set({ footer, footerStyle: style || null }),
  setExperience: (experience, style) => set({ experience, experienceStyle: style || null }),

  updateHeroContent: (updates) =>
    set((state) => ({
      heroContent: { ...state.heroContent, ...updates },
    })),
}));

export default usePortfolioStore;
