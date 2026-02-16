import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

/**
 * Robustly find a component file on disk.
 */
function resolveComponentPath(basePath: string, type: string, componentName: string): string | null {
  const styles = ["Modern", "Creative", "Business", "Elite"];
  
  for (const style of styles) {
    // Check both singular and plural folder naming (e.g., EliteHero vs EliteHeroes)
    const folderVariations = [
      `${style}${type.charAt(0).toUpperCase() + type.slice(1)}`,       // e.g. EliteHeroes
      `${style}${type.charAt(0).toUpperCase() + type.slice(1, -1)}`,   // e.g. EliteHero
      `${style}${type.charAt(0).toUpperCase() + type.slice(1)}s`,      // e.g. EliteHeroes (Plural)
    ];

    for (const folder of folderVariations) {
      const filePath = path.join(basePath, type, folder, `${componentName}.tsx`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }

  // Fallback: Direct type folder
  const directPath = path.join(basePath, type, `${componentName}.tsx`);
  if (fs.existsSync(directPath)) return directPath;

  // Fallback: Common folder
  const commonPath = path.join(basePath, "common", `${componentName}.tsx`);
  if (fs.existsSync(commonPath)) return commonPath;

  return null;
}

function addFilesFromFolder(archive: archiver.Archiver, folderPath: string, zipFolderPath: string) {
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const zipFilePath = path.join(zipFolderPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        addFilesFromFolder(archive, filePath, zipFilePath);
      } else {
        archive.append(fs.createReadStream(filePath), { name: zipFilePath });
      }
    });
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { 
      navbar, hero, experience, project, footer, 
      navbarContent, heroContent, projectContent, experienceContent, footerContent,
      generatedCode, // Added here
      linkedPages 
    } = body;

    const basePath = path.resolve(process.cwd(), "src/components");

    if (!fs.existsSync(basePath)) {
      return NextResponse.json({ error: "Components directory not found on server" }, { status: 500 });
    }

    const componentPaths = {
      navbar: navbar ? resolveComponentPath(basePath, "navbars", navbar) : null,
      hero: hero ? resolveComponentPath(basePath, "heroes", hero) : null,
      experience: experience ? resolveComponentPath(basePath, "experience", experience) : null,
      project: project ? resolveComponentPath(basePath, "projects", project) : null,
      footer: footer ? resolveComponentPath(basePath, "footer", footer) : null,
    };

    const tmpDir = path.join(process.cwd(), ".tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    
    const zipFilename = `portfolio-${Date.now()}.zip`;
    const zipPath = path.join(tmpDir, zipFilename);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    const streamPromise = new Promise<void>((resolve, reject) => {
      output.on("close", resolve);
      archive.on("error", reject);
    });

    archive.pipe(output);

    // 1. Add Components (All 5 sections)
    if (navbar === "AIComponent" && generatedCode) {
      archive.append(generatedCode, { name: `src/components/navbars/${navbar}.tsx` });
    } else if (componentPaths.navbar) {
      archive.file(componentPaths.navbar, { name: `src/components/navbars/${navbar}.tsx` });
    }

    if (hero === "AIComponent" && generatedCode) {
      archive.append(generatedCode, { name: `src/components/heroes/${hero}.tsx` });
    } else if (componentPaths.hero) {
      archive.file(componentPaths.hero, { name: `src/components/heroes/${hero}.tsx` });
    }

    if (experience === "AIComponent" && generatedCode) {
      archive.append(generatedCode, { name: `src/components/experience/${experience}.tsx` });
    } else if (componentPaths.experience) {
      archive.file(componentPaths.experience, { name: `src/components/experience/${experience}.tsx` });
    }

    if (project === "AIComponent" && generatedCode) {
      archive.append(generatedCode, { name: `src/components/projects/${project}.tsx` });
    } else if (componentPaths.project) {
      archive.file(componentPaths.project, { name: `src/components/projects/${project}.tsx` });
    }

    if (footer === "AIComponent" && generatedCode) {
      archive.append(generatedCode, { name: `src/components/footer/${footer}.tsx` });
    } else if (componentPaths.footer) {
      archive.file(componentPaths.footer, { name: `src/components/footer/${footer}.tsx` });
    }

    // 2. Add Infrastructure
    const uiPath = path.join(basePath, "ui");
    if (fs.existsSync(uiPath)) addFilesFromFolder(archive, uiPath, "src/components/ui");
    
    const libPath = path.resolve(process.cwd(), "src/lib");
    if (fs.existsSync(libPath)) addFilesFromFolder(archive, libPath, "src/lib");

    const commonPath = path.join(basePath, "common");
    if (fs.existsSync(commonPath)) addFilesFromFolder(archive, commonPath, "src/components/common");

    const publicPath = path.resolve(process.cwd(), "public");
    if (fs.existsSync(publicPath)) addFilesFromFolder(archive, publicPath, "public");

    // 3. INJECT CONTENT INTO STORE
    const userStoreContent = `
import { create } from "zustand";

const usePortfolioStore = create((set) => ({
  navbarContent: ${JSON.stringify(navbarContent || {}, null, 2)},
  heroContent: ${JSON.stringify(heroContent || {}, null, 2)},
  projectContent: ${JSON.stringify(projectContent || {}, null, 2)},
  experienceContent: ${JSON.stringify(experienceContent || {}, null, 2)},
  footerContent: ${JSON.stringify(footerContent || {}, null, 2)},
  
  updateHeroContent: () => {},
  updateNavbarContent: () => {},
  updateProjectContent: () => {},
  updateExperienceContent: () => {},
  updateFooterContent: () => {},
  
  setNavbar: () => {},
  setHero: () => {},
  setProject: () => {},
  setFooter: () => {},
  setExperience: () => {},
}));

export default usePortfolioStore;
    `;
    archive.append(userStoreContent, { name: "src/components/store/usePortfolioStore.ts" });

    // 4. Generate Main Page (src/app/page.tsx)
    const imports = [
      'import React from "react";',
      componentPaths.navbar ? `import Navbar from "@/components/navbars/${navbar}";` : "",
      componentPaths.hero ? `import Hero from "@/components/heroes/${hero}";` : "",
      componentPaths.experience ? `import Experience from "@/components/experience/${experience}";` : "",
      componentPaths.project ? `import Project from "@/components/projects/${project}";` : "",
      componentPaths.footer ? `import Footer from "@/components/footer/${footer}";` : "",
    ].filter(Boolean).join("\n");

    const jsx = [
      componentPaths.navbar ? "<Navbar isEditable={false} />" : "",
      componentPaths.hero ? "<Hero isEditable={false} />" : "",
      componentPaths.experience ? "<Experience isEditable={false} />" : "",
      componentPaths.project ? "<Project isEditable={false} />" : "",
      componentPaths.footer ? "<Footer isEditable={false} />" : "",
    ].filter(Boolean).join("\n      ");

    const pageContent = `
${imports}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      ${jsx}
    </main>
  );
}
    `;
    archive.append(pageContent, { name: "src/app/page.tsx" });

    // 5. Config Files
    const packageJson = `{
  "name": "my-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19",
    "react-dom": "^19",
    "lucide-react": "^0.462.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "framer-motion": "^11.0.3",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}`;
    archive.append(packageJson, { name: "package.json" });

    const postcssConfig = `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};`;
    archive.append(postcssConfig, { name: "postcss.config.js" });

    const tsConfig = `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
    archive.append(tsConfig, { name: "tsconfig.json" });

    const tailwindConfig = `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: ["class"],\n  content: [\"./src/app/**/*.{js,ts,jsx,tsx,mdx}\", \"./src/components/**/*.{js,ts,jsx,tsx,mdx}\"],\n  theme: { extend: {} },\n  plugins: [require(\"tailwindcss-animate\")],\n};`;
    archive.append(tailwindConfig, { name: "tailwind.config.js" });

    const globalsCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --background: 0 0% 100%;\n  --foreground: 0 0% 3.9%;\n  --card: 0 0% 100%;\n  --card-foreground: 0 0% 3.9%;\n  --popover: 0 0% 100%;\n  --popover-foreground: 0 0% 3.9%;\n  --primary: 0 0% 9%;\n  --primary-foreground: 0 0% 98%;\n  --secondary: 0 0% 96.1%;\n  --secondary-foreground: 0 0% 9%;\n  --muted: 0 0% 96.1%;\n  --muted-foreground: 0 0% 45.1%;\n  --accent: 0 0% 96.1%;\n  --accent-foreground: 0 0% 9%;\n  --destructive: 0 84.2% 60.2%;\n  --destructive-foreground: 0 0% 98%;\n  --border: 0 0% 89.8%;\n  --input: 0 0% 89.8%;\n  --ring: 0 0% 3.9%;\n  --radius: 0.5rem;\n}\n\n.dark {\n  --background: 0 0% 3.9%;\n  --foreground: 0 0% 98%;\n  --card: 0 0% 3.9%;\n  --card-foreground: 0 0% 98%;\n  --popover: 0 0% 3.9%;\n  --popover-foreground: 0 0% 98%;\n  --primary: 0 0% 98%;\n  --primary-foreground: 0 0% 9%;\n  --secondary: 0 0% 14.9%;\n  --secondary-foreground: 0 0% 98%;\n  --muted: 0 0% 14.9%;\n  --muted-foreground: 0 0% 63.9%;\n  --accent: 0 0% 14.9%;\n  --accent-foreground: 0 0% 98%;\n  --destructive: 0 62.8% 30.6%;\n  --destructive-foreground: 0 0% 98%;\n  --border: 0 0% 14.9%;\n  --input: 0 0% 14.9%;\n  --ring: 0 0% 83.1%;\n}`;
    archive.append(globalsCss, { name: "src/app/globals.css" });

    const layoutContent = `import type { Metadata } from "next";\nimport "./globals.css";\n\nexport const metadata: Metadata = {\n  title: "My Portfolio",\n  description: "Generated by PortBuilder",\n};\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}`;
    archive.append(layoutContent, { name: "src/app/layout.tsx" });

    await archive.finalize();
    await streamPromise;

    const fileBuffer = await readFile(zipPath);
    fs.unlinkSync(zipPath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=portfolio.zip",
      },
    });

  } catch (error) {
    console.error("❌ ZIP Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate ZIP", details: String(error) }, { status: 500 });
  }
}
