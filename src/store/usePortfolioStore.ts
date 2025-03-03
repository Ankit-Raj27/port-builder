import { create } from "zustand";

// Define available themes
export type ThemeType = "basic" | "gradient" | "glassmorphism" | "dark";

// Zustand store with TypeScript types
interface PortfolioStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  
  navbar: string;
  hero: string;
  project: string;

  setNavbar: (navbar: string) => void;
  setHero: (hero: string) => void;
  setProject: (project: string) => void;
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
  theme: "basic", // Default theme
  setTheme: (theme) => set({ theme }),

  navbar: "Navbar1", // ✅ Default Navbar
  hero: "Hero1", // ✅ Default Hero
  project: "Project1", // ✅ Default Project (Prevents `null.tsx` error)

  setNavbar: (navbar) => set({ navbar }),
  setHero: (hero) => set({ hero }),
  setProject: (project) => set({ project }),
}));

export default usePortfolioStore;
