import { create } from "zustand";

interface PortfolioState {
  navbar: string | null;
  hero: string | null;
  contact: string | null;
  setNavbar: (navbar: string | null) => void;
  setHero: (hero: string | null) => void;
  setContact: (contact: string | null) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  navbar: null,
  hero: null,
  contact: null,
  setNavbar: (navbar) => set({ navbar }),
  setHero: (hero) => set({ hero }),
  setContact: (contact) => set({ contact }),
}));

export default usePortfolioStore;
