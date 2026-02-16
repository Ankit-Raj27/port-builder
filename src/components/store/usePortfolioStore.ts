import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HeroContent {
  title: string;
  name: string;
  subtitle: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

interface NavbarContent {
  brandName: string;
  links: { label: string; href: string }[];
}

interface FooterContent {
  text: string;
  copyright: string;
}

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface PortfolioState {
  navbar: string | null;
  hero: string | null;
  contact: string | null;
  project: string | null;
  blog: string | null;
  footer: string | null;
  experience: string | null;
  linkedPages: { [key: string]: string[] };
  
  // Content State
  heroContent: HeroContent;
  navbarContent: NavbarContent;
  footerContent: FooterContent;
  projectContent: { title: string; items: ProjectItem[] };
  experienceContent: { title: string; items: ExperienceItem[] };
  
  // AI Generated Content
  generatedCodes: { [key: string]: string }; // e.g. { Hero: "code...", Navbar: "code..." }
  lastUpdated: number; // For triggering re-renders

  setNavbar: (navbar: string | null) => void;
  setHero: (hero: string | null) => void;
  setProject: (project: string | null) => void;
  setBlog: (blog: string | null) => void;
  setFooter: (footer: string | null) => void;
  setContact: (contact: string | null) => void;
  setExperience: (experience: string | null) => void;
  setLinkedPages: (section: string, pages: string[]) => void;
  
  // Content Actions
  updateHeroContent: (updates: Partial<HeroContent>) => void;
  updateNavbarContent: (updates: Partial<NavbarContent>) => void;
  updateFooterContent: (updates: Partial<FooterContent>) => void;
  updateProjectContent: (updates: { title?: string; items?: ProjectItem[] }) => void;
  updateExperienceContent: (updates: { title?: string; items?: ExperienceItem[] }) => void;
  
  setGeneratedCode: (type: string, code: string) => void;
}

const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      navbar: "Navbar1",
      hero: "Hero1",
      contact: null,
      project: "Project1",
      blog: null,
      footer: "Footer1",
      experience: "Experience1",
      linkedPages: {},
      
      generatedCodes: {},
      lastUpdated: 0,

      // Default Contents
      heroContent: {
        title: "Hi, I am",
        name: "John Doe",
        subtitle: "Frontend Developer & UI/UX Designer",
        description: "I create beautiful, responsive websites with modern technologies that help businesses grow and users smile.",
        primaryButton: "View My Work",
        secondaryButton: "Contact Me"
      },
      navbarContent: {
        brandName: "PORTFOLIO",
        links: [
          { label: "About", href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Experience", href: "#experience" },
          { label: "Contact", href: "#contact" }
        ]
      },
      footerContent: {
        text: "Building digital experiences with passion and precision.",
        copyright: "© 2024 Portfolio. All rights reserved."
      },
      projectContent: {
        title: "Featured Projects",
        items: [
          { id: 1, title: "E-Commerce App", description: "A full-stack online store.", tags: ["Next.js", "Stripe"] },
          { id: 2, title: "Portfolio Tool", description: "AI-powered builder.", tags: ["React", "AI"] }
        ]
      },
      experienceContent: {
        title: "Work Experience",
        items: [
          { id: 1, role: "Senior Dev", company: "Tech Corp", duration: "2022 - Present", description: "Leading the frontend team." },
          { id: 2, role: "Junior Dev", company: "StartUp Inc", duration: "2020 - 2022", description: "Built mobile apps." }
        ]
      },

      setNavbar: (navbar) => set({ navbar }),
      setHero: (hero) => set({ hero }),
      setProject: (project) => set({ project }),
      setBlog: (blog) => set({ blog }),
      setFooter: (footer) => set({ footer }),
      setExperience: (experience) => set({ experience }),
      setContact: (contact) => set({ contact }),

      setLinkedPages: (section, pages) => set((state) => ({
        linkedPages: { ...state.linkedPages, [section]: pages },
      })),

      updateHeroContent: (updates) =>
        set((state) => ({ heroContent: { ...state.heroContent, ...updates } })),
      updateNavbarContent: (updates) =>
        set((state) => ({ navbarContent: { ...state.navbarContent, ...updates } })),
      updateFooterContent: (updates) =>
        set((state) => ({ footerContent: { ...state.footerContent, ...updates } })),
      updateProjectContent: (updates) =>
        set((state) => ({ projectContent: { ...state.projectContent, ...updates } })),
      updateExperienceContent: (updates) =>
        set((state) => ({ experienceContent: { ...state.experienceContent, ...updates } })),
      
      setGeneratedCode: (type, code) => set((state) => ({
        generatedCodes: { ...state.generatedCodes, [type]: code },
        lastUpdated: Date.now()
      })),
    }),
    {
      name: "portfolio-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePortfolioStore;
