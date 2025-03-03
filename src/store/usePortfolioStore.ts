import { create } from "zustand";

// Define available themes
export type ThemeType = "basic" | "gradient" | "glassmorphism" | "dark";

// Zustand store with TypeScript types
interface PortfolioStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
  theme: "basic", // Default theme
  setTheme: (theme) => set({ theme }),
}));

export default usePortfolioStore;
