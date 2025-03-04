import { create } from "zustand";

interface PortfolioState {
  navbar: string | null;
  hero: string | null;
  contact: string | null;
  project: string | null;
  blog: string | null;
  footer: string | null;
  setNavbar: (navbar: string | null) => void;
  setHero: (hero: string | null) => void;
  setProject: (project: string | null) => void;
  setBlog: (blog: string | null) => void;
  setFooter: (footer: string | null) => void;
  setContact: (contact: string | null) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  navbar: null,
  hero: null,
  contact: null,
  project: null,
  blog: null,
  footer: null,
  setNavbar: (navbar) => set({ navbar }),
  setHero: (hero) => set({ hero }),
  setProject: (project) => set({ project }),
  setBlog: (blog) => set({ blog }),  
  setFooter: (footer) => set({ footer }),
  setContact: (contact) => set({ contact }),
}));

export default usePortfolioStore;
