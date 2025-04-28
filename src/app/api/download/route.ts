import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

// Enhanced function to find file paths with multiple patterns and extensive logging
function findFile(basePaths: string[], component: string, type: string): string | null {
  console.log(`🔍 Finding ${type}/${component}`);
  
  // Handle plural/singular type names
  const typeFolder = type;
  // Convert heroes to hero if needed when looking up files (but keep folder name as heroes)
  const lookupType = type === "heroes" ? "heroes" : type;
  
  // Check if component contains a number (like Hero1, Experience2)
  const componentName = component.replace(/\d+$/, '');
  const componentNumber = component.match(/\d+$/)?.[0] || "";
  
  // Define the possible styles and folder structures
  const styles = ["Creative", "Modern", "Business"];
  
  // Iterate through each base path
  for (const basePath of basePaths) {
    console.log(`Checking in base path: ${basePath}`);
    
    // Try different path patterns
    const pathPatterns = [
      // Pattern 1: type/StyleType/ComponentN.tsx (e.g., heroes/CreativeHeroes/Hero1.tsx)
      ...styles.map(style => ({
        path: path.join(basePath, typeFolder, `${style}${componentName}s`),
        file: `${componentName}${componentNumber}.tsx`
      })),
      
      // Pattern 2: type/Component/ComponentN.tsx (e.g., heroes/Hero/Hero1.tsx)
      {
        path: path.join(basePath, typeFolder, componentName),
        file: `${componentName}${componentNumber}.tsx`
      },
      
      // Pattern 3: type/ComponentN.tsx (e.g., heroes/Hero1.tsx)
      {
        path: path.join(basePath, typeFolder),
        file: `${componentName}${componentNumber}.tsx`
      },
      
      // Pattern 4: lookupType/StyleType/ComponentN.tsx (e.g., hero/CreativeHero/Hero1.tsx)
      ...styles.map(style => ({
        path: path.join(basePath, lookupType, `${style}${componentName}`),
        file: `${componentName}${componentNumber}.tsx`
      })),
      
      // Pattern 5: Handle letter case variations (e.g., Heroes vs heroes)
      {
        path: path.join(basePath, typeFolder.toLowerCase()),
        file: `${componentName}${componentNumber}.tsx`
      },
      
      // Pattern 6: Check in common folder as fallback
      {
        path: path.join(basePath, "common"),
        file: `${componentName}${componentNumber}.tsx`
      }
    ];
    
    // Try all patterns
    for (const pattern of pathPatterns) {
      const filePath = path.join(pattern.path, pattern.file);
      console.log(`Checking path: ${filePath}`);
      if (fs.existsSync(filePath)) {
        console.log(`✅ Found file: ${filePath}`);
        return filePath;
      }
    }
  }
  console.log(`❌ Could not find ${type}/${component}`);
  return null;
}

// Recursively add folders to ZIP
function addFilesFromFolder(
  archive: archiver.Archiver,
  folderPath: string,
  zipFolderPath: string
): void {
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
    const { navbar, hero, experience, project, footer, linkedPages } = await req.json();
    const basePaths = [
      path.resolve(process.cwd(), "src/components"),
      path.resolve("D:/Programming 2024/port-builder/src/components"),
      path.resolve("/Users/apple/Downloads/port-builder/src/components"),
    ];

    console.log("🔍 Looking for components with parameters:", {
      navbar,
      hero,
      experience,
      project, 
      footer,
      linkedPages
    });

    console.log("🔍 Looking for navbar component:", navbar);
    const navbarPath = navbar
      ? findFile(basePaths, navbar, "navbars")
      : null;
    console.log(navbarPath ? `✅ Found navbar at: ${navbarPath}` : `❌ Could not find navbar: ${navbar}`);
    
    console.log("🔍 Looking for hero component:", hero);
    const heroPath = hero ? findFile(basePaths, hero, "heroes") : null;
    console.log(heroPath ? `✅ Found hero at: ${heroPath}` : `❌ Could not find hero: ${hero}`);
    
    console.log("🔍 Looking for experience component:", experience);
    const experiencePath = experience ? findFile(basePaths, experience, "experience") : null;
    console.log(experiencePath ? `✅ Found experience at: ${experiencePath}` : `❌ Could not find experience: ${experience}`);
    
    console.log("🔍 Looking for project component:", project);
    const projectPath = project ? findFile(basePaths, project, "projects") : null;
    console.log(projectPath ? `✅ Found project at: ${projectPath}` : `❌ Could not find project: ${project}`);
    
    console.log("🔍 Looking for footer component:", footer);
    const footerPath = footer ? findFile(basePaths, footer, "footer") : null;
    console.log(footerPath ? `✅ Found footer at: ${footerPath}` : `❌ Could not find footer: ${footer}`);
    
    // Try to find UI components
    let uiPath = null;
    for (const basePath of basePaths) {
      const potentialPath = path.join(basePath, "ui");
      if (fs.existsSync(potentialPath)) {
        uiPath = potentialPath;
        console.log(`✅ Found UI components at: ${uiPath}`);
        break;
      }
    }
    if (!uiPath) {
      console.log("❌ Could not find UI components folder");
    }

    // Find linked page paths
    const linkedPagePaths: { [key: string]: string } = {};
    if (linkedPages && Array.isArray(linkedPages)) {
      linkedPages.forEach((page: string) => {
        console.log(`🔍 Looking for linked page: ${page}`);
        const pagePath = findFile(basePaths, page, "pages");
        if (pagePath) {
          linkedPagePaths[page] = pagePath;
          console.log(`✅ Found linked page at: ${pagePath}`);
        } else {
          console.log(`❌ Could not find linked page: ${page}`);
        }
      });
    }

    console.log("📂 Selected Components Summary:", {
      navbarPath,
      heroPath,
      experiencePath,
      projectPath,
      footerPath,
      uiPath,
      linkedPagePaths,
    });

    if (
      !navbarPath &&
      !heroPath &&
      !experiencePath &&
      !projectPath &&
      !footerPath
    ) {
      return NextResponse.json(
        { error: "No components selected" },
        { status: 400 }
      );
    }

    const tmpDir = "/tmp";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const zipPath = path.join(tmpDir, "portfolio.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    return new Promise<Response>((resolve, reject) => {
      output.on("close", async () => {
        console.log(`✅ ZIP finalized with ${archive.pointer()} bytes`);
        if (archive.pointer() === 0) {
          return resolve(
            NextResponse.json({ error: "ZIP file is empty" }, { status: 500 })
          );
        }
        try {
          const fileBuffer = await readFile(zipPath);
          resolve(
            new NextResponse(fileBuffer, {
              headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment; filename=portfolio.zip",
              },
            })
          );
        } catch (err) {
          console.error("❌ Failed to read ZIP file:", err);
          reject(
            NextResponse.json(
              { error: "Failed to read ZIP file" },
              { status: 500 }
            )
          );
        }
      });

      archive.on("error", (err) => {
        console.error("❌ Archiver Error:", err);
        reject(
          NextResponse.json({ error: "ZIP creation failed" }, { status: 500 })
        );
      });

      archive.pipe(output);

      // Create the directory structure first
      archive.append('', { name: 'components/' });
      archive.append('', { name: 'components/navbars/' });
      archive.append('', { name: 'components/heroes/' });
      archive.append('', { name: 'components/experience/' });
      archive.append('', { name: 'components/projects/' });
      archive.append('', { name: 'components/footer/' });
      archive.append('', { name: 'components/pages/' });
      archive.append('', { name: 'components/ui/' });
      archive.append('', { name: 'components/common/' });
      archive.append('', { name: 'app/' });

      const projectFiles: Record<string, string> = {
        "package.json": `{
          "name": "portfolio",
          "version": "1.0.0",
          "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "postinstall": "npx shadcn@latest init -y && npx shadcn@latest add"
          },
          "dependencies": {
          "@hookform/resolvers": "^4.1.0",
              "@radix-ui/react-accordion": "^1.2.3",
              "@radix-ui/react-alert-dialog": "^1.1.6",
              "@radix-ui/react-aspect-ratio": "^1.1.2",
              "@radix-ui/react-avatar": "^1.1.3",
              "@radix-ui/react-checkbox": "^1.1.4",
              "@radix-ui/react-collapsible": "^1.1.3",
              "@radix-ui/react-context-menu": "^2.2.6",
              "@radix-ui/react-dialog": "^1.1.6",
              "@radix-ui/react-dropdown-menu": "^2.1.6",
              "@radix-ui/react-hover-card": "^1.1.6",
              "@radix-ui/react-label": "^2.1.2",
              "@radix-ui/react-menubar": "^1.1.6",
              "@radix-ui/react-navigation-menu": "^1.2.5",
              "@radix-ui/react-popover": "^1.1.6",
              "@radix-ui/react-progress": "^1.1.2",
              "@radix-ui/react-radio-group": "^1.2.3",
              "@radix-ui/react-scroll-area": "^1.2.3",
              "@radix-ui/react-select": "^2.1.6",
              "@radix-ui/react-separator": "^1.1.2",
              "@radix-ui/react-slider": "^1.2.3",
              "@radix-ui/react-slot": "^1.1.2",
              "@radix-ui/react-switch": "^1.1.3",
              "@radix-ui/react-tabs": "^1.1.3",
              "@radix-ui/react-toast": "^1.2.6",
              "@radix-ui/react-toggle": "^1.1.2",
              "@radix-ui/react-toggle-group": "^1.1.2",
              "@radix-ui/react-tooltip": "^1.1.8",
              "archiver": "^7.0.1",
              "class-variance-authority": "^0.7.1",
              "clsx": "^2.1.1",
              "cmdk": "^1.0.0",
              "date-fns": "^3.6.0",
              "embla-carousel-react": "^8.5.2",
              "framer-motion": "^12.4.2",
              "input-otp": "^1.4.2",
              "jszip": "^3.10.1",
              "lucide-react": "^0.462.0",
              "next-themes": "^0.4.4",
              "react-day-picker": "^8.10.1",
              "react-hook-form": "^7.54.2",
               "react-icons": "^5.4.0",
              "react-resizable-panels": "^2.1.7",
              "recharts": "^2.15.1",
              "sonner": "^2.0.0",
              "tailwind-merge": "^2.6.0",
              "tailwindcss-animate": "^1.0.7",
              "vaul": "^1.1.2",
              "zod": "^3.24.2",
              "zustand": "^5.0.3",

            "next": "^15.1.7",
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "tailwindcss": "^3.4.0",
            "postcss": "^8.4.0",
            "autoprefixer": "^10.4.0"
          }
        }`,
        "tsconfig.json": `{
          "compilerOptions": {
            "target": "es5",
            "lib": ["dom", "dom.iterable", "esnext"],
            "allowJs": true,
            "skipLibCheck": true,
            "strict": false,
            "forceConsistentCasingInFileNames": true,
            "noEmit": true,
            "incremental": true,
            "module": "esnext",
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "jsx": "preserve",
            "baseUrl": ".",
            "paths": {
              "@/*": ["./*"]
            }
          },
          "include": ["**/*.ts", "**/*.tsx"],
          "exclude": ["node_modules"]
        }`,
        "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
        module.exports = {
          content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
          theme: { extend: {} },
          plugins: [],
        };`,
        "postcss.config.js": `module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        };`,
        "app/globals.css": `@tailwind base;
        @tailwind components;
        @tailwind utilities;`,
        "next.config.js": `module.exports = { reactStrictMode: true };`,
        "app/layout.tsx": `import React from "react";
        import "./globals.css"; 

        export default function RootLayout({ children }: { children: React.ReactNode }) {
          return (
            <html lang="en">
              <body>{children}</body>
            </html>
          );
        }`,
      };

      // Create a dynamic app/page.tsx file based on selected components
      const pageImports = [];
      const pageComponents = [];

      // Determine correct import paths based on what was found
      if (navbarPath) {
        pageImports.push(`import Navbar from "../components/navbars/${navbar}";`);
        pageComponents.push(`<Navbar />`);
      }

      if (heroPath) {
        // Get the actual component path structure from the found path
        let heroImportPath = `../components/heroes/${hero}`;
        if (heroPath.includes("/hero/")) {
          heroImportPath = `../components/hero/${hero}`;
        } else if (heroPath.includes("/common/")) {
          heroImportPath = `../components/common/${hero}`;
        }
        pageImports.push(`import Hero from "${heroImportPath}";`);
        pageComponents.push(`<Hero />`);
      }

      if (experiencePath) {
        let experienceImportPath = `../components/experience/${experience}`;
        if (experiencePath.includes("/common/")) {
          experienceImportPath = `../components/common/${experience}`;
        }
        pageImports.push(`import Experience from "${experienceImportPath}";`);
        pageComponents.push(`<Experience />`);
      }

      if (projectPath) {
        let projectImportPath = `../components/projects/${project}`;
        if (projectPath.includes("/common/")) {
          projectImportPath = `../components/common/${project}`;
        }
        pageImports.push(`import Project from "${projectImportPath}";`);
        pageComponents.push(`<Project />`);
      }

      if (footerPath) {
        let footerImportPath = `../components/footer/${footer}`;
        if (footerPath.includes("/common/")) {
          footerImportPath = `../components/common/${footer}`;
        }
        pageImports.push(`import Footer from "${footerImportPath}";`);
        pageComponents.push(`<Footer />`);
      }

      const pageTsx = `
        import React from "react";
        ${pageImports.join("\n")}

        export default function Home() {
          return (
            <div className="flex flex-col min-h-screen">
              ${pageComponents.join("\n              ")}
            </div>
          );
        }
      `;

      // Add the dynamically created page.tsx file
      projectFiles["app/page.tsx"] = pageTsx;

      // Add all the project files
      Object.entries(projectFiles).forEach(([fileName, fileContent]) => {
        archive.append(fileContent, { name: fileName });
      });

      // Add selected component files with proper destination paths
      if (navbarPath) {
        const destPath = `components/navbars/${navbar}.tsx`;
        archive.file(navbarPath, { name: destPath });
        console.log(`✅ Added navbar: ${navbarPath} -> ${destPath}`);
      }
      
      if (heroPath) {
        // Determine correct destination path based on source path
        let destPath = `components/heroes/${hero}.tsx`;
        if (heroPath.includes("/hero/")) {
          destPath = `components/hero/${hero}.tsx`;
          // Make sure the directory exists
          archive.append('', { name: 'components/hero/' });
        } else if (heroPath.includes("/common/")) {
          destPath = `components/common/${hero}.tsx`;
        }
        archive.file(heroPath, { name: destPath });
        console.log(`✅ Added hero: ${heroPath} -> ${destPath}`);
      }
      
      if (experiencePath) {
        let destPath = `components/experience/${experience}.tsx`;
        if (experiencePath.includes("/common/")) {
          destPath = `components/common/${experience}.tsx`;
        }
        archive.file(experiencePath, { name: destPath });
        console.log(`✅ Added experience: ${experiencePath} -> ${destPath}`);
      }
      
      if (projectPath) {
        let destPath = `components/projects/${project}.tsx`;
        if (projectPath.includes("/common/")) {
          destPath = `components/common/${project}.tsx`;
        }
        archive.file(projectPath, { name: destPath });
        console.log(`✅ Added project: ${projectPath} -> ${destPath}`);
      }
      
      if (footerPath) {
        let destPath = `components/footer/${footer}.tsx`;
        if (footerPath.includes("/common/")) {
          destPath = `components/common/${footer}.tsx`;
        }
        archive.file(footerPath, { name: destPath });
        console.log(`✅ Added footer: ${footerPath} -> ${destPath}`);
      }

      // Add all linked pages
      Object.entries(linkedPagePaths).forEach(([pageName, pagePath]) => {
        let destPath = `components/pages/${pageName}.tsx`;
        if (pagePath.includes("/common/")) {
          destPath = `components/common/${pageName}.tsx`;
        }
        archive.file(pagePath, { name: destPath });
        console.log(`✅ Added linked page: ${pagePath} -> ${destPath}`);
      });

      // Add UI folder recursively if it exists
      if (uiPath && fs.existsSync(uiPath)) {
        addFilesFromFolder(archive, uiPath, "components/ui");
        console.log(`✅ Added UI components from: ${uiPath}`);
      } else {
        console.log(`⚠️ UI path not found or not accessible: ${uiPath}`);
      }

      // Finalize ZIP
      archive.finalize();
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}