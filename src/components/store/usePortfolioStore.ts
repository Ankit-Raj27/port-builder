import { create } from "zustand";

interface PortfolioState {
  navbar: string | null;
  hero: string | null;
  contact: string | null;
  project: string | null;
  blog: string | null;
  footer: string | null;
  experience: string | null;
  linkedPages: { [key: string]: string[] }; // Store linked pages for each section
  setNavbar: (navbar: string | null) => void;
  setHero: (hero: string | null) => void;
  setProject: (project: string | null) => void;
  setBlog: (blog: string | null) => void;
  setFooter: (footer: string | null) => void;
  setContact: (contact: string | null) => void;
  setExperience: (experience: string | null) => void;
  setLinkedPages: (section: string, pages: string[]) => void; // To store linked pages
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  navbar: null,
  hero: null,
  contact: null,
  project: null,
  blog: null,
  footer: null,
  experience: null,
  linkedPages: {}, // Initialize empty linkedPages object

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
}));

export default usePortfolioStore;
