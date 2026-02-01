import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

function findFile(
  basePaths: string[],
  component: string,
  type: string
): string | null {
  const typeFolder = type;
  const lookupType = type === "heroes" ? "heroes" : type;
  const componentName = component.replace(/\d+$/, "");
  const componentNumber = component.match(/\d+$/)?.[0] || "";

  const styles = ["Creative", "Modern", "Business"];

  for (const basePath of basePaths) {
    const pathPatterns = [
      ...styles.map((style) => ({
        path: path.join(basePath, typeFolder, `${style}${componentName}s`),
        file: `${componentName}${componentNumber}.tsx`,
      })),

      {
        path: path.join(basePath, typeFolder, componentName),
        file: `${componentName}${componentNumber}.tsx`,
      },

      {
        path: path.join(basePath, typeFolder),
        file: `${componentName}${componentNumber}.tsx`,
      },
      ...styles.map((style) => ({
        path: path.join(basePath, lookupType, `${style}${componentName}`),
        file: `${componentName}${componentNumber}.tsx`,
      })),

      {
        path: path.join(basePath, typeFolder.toLowerCase()),
        file: `${componentName}${componentNumber}.tsx`,
      },

      {
        path: path.join(basePath, "common"),
        file: `${componentName}${componentNumber}.tsx`,
      },
    ];

    // Try all patterns
    for (const pattern of pathPatterns) {
      const filePath = path.join(pattern.path, pattern.file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ Found file: ${filePath}`);
        return filePath;
      }
    }
  }
  return null;
}

// adding folders to ZIP
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
    const { navbar, hero, experience, project, footer, linkedPages } =
      await req.json();
    const basePaths = [
      path.resolve(process.cwd(), "src/components"),
      path.resolve("D:/Programming 2024/port-builder/src/components"),
      path.resolve("/Users/apple/Downloads/port-builder/src/components"),
    ];

    const navbarPath = navbar ? findFile(basePaths, navbar, "navbars") : null;

    const heroPath = hero ? findFile(basePaths, hero, "heroes") : null;
    const experiencePath = experience
      ? findFile(basePaths, experience, "experience")
      : null;
    const projectPath = project
      ? findFile(basePaths, project, "projects")
      : null;
    const footerPath = footer ? findFile(basePaths, footer, "footer") : null;

    // UI components
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
        if (archive.pointer() === 0) {
          return resolve(
            NextResponse.json({ error: "ZIP file is empty" }, { status: 500 })
          );
        }
        try {
          const fileBuffer = await readFile(zipPath);
          resolve(
            new NextResponse(new Uint8Array(fileBuffer), {
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

      archive.pipe(output);

      archive.append("", { name: "components/" });
      archive.append("", { name: "components/navbars/" });
      archive.append("", { name: "components/heroes/" });
      archive.append("", { name: "components/experience/" });
      archive.append("", { name: "components/projects/" });
      archive.append("", { name: "components/footer/" });
      archive.append("", { name: "components/pages/" });
      archive.append("", { name: "components/ui/" });
      archive.append("", { name: "components/common/" });
      archive.append("", { name: "app/" });

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

      const pageImports = [];
      const pageComponents = [];

      if (navbarPath) {
        pageImports.push(
          `import Navbar from "../components/navbars/${navbar}";`
        );
        pageComponents.push(`<Navbar />`);
      }

      if (heroPath) {
        let heroImportPath = `../components/heroes/${hero}`;
        if (heroPath.includes("/common/")) {
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

      projectFiles["app/page.tsx"] = pageTsx;

      Object.entries(projectFiles).forEach(([fileName, fileContent]) => {
        archive.append(fileContent, { name: fileName });
      });

      if (navbarPath) {
        const destPath = `components/navbars/${navbar}.tsx`;
        archive.file(navbarPath, { name: destPath });
        console.log(`✅ Added navbar: ${navbarPath} -> ${destPath}`);
      }

      if (heroPath) {
        let destPath = `components/heroes/${hero}.tsx`;
        if (heroPath.includes("/common/")) {
          destPath = `components/common/${hero}.tsx`;
        }
        archive.file(heroPath, { name: destPath });
      }

      if (experiencePath) {
        let destPath = `components/experience/${experience}.tsx`;
        if (experiencePath.includes("/common/")) {
          destPath = `components/common/${experience}.tsx`;
        }
        archive.file(experiencePath, { name: destPath });
      }

      if (experiencePath) {
        let destPath = `components/experience/${experience}.tsx`;
        if (experiencePath.includes("/common/")) {
          destPath = `components/common/${experience}.tsx`;
        }
        archive.file(experiencePath, { name: destPath });
      }

      if (projectPath) {
        let destPath = `components/projects/${project}.tsx`;
        if (projectPath.includes("/common/")) {
          destPath = `components/common/${project}.tsx`;
        }
        archive.file(projectPath, { name: destPath });
      }

      if (footerPath) {
        let destPath = `components/footer/${footer}.tsx`;
        if (footerPath.includes("/common/")) {
          destPath = `components/common/${footer}.tsx`;
        }
        archive.file(footerPath, { name: destPath });
      }

    
      Object.entries(linkedPagePaths).forEach(([pageName, pagePath]) => {
        let destPath = `components/pages/${pageName}.tsx`;
        if (pagePath.includes("/common/")) {
          destPath = `components/common/${pageName}.tsx`;
        }
        archive.file(pagePath, { name: destPath });
      });

    
      if (uiPath && fs.existsSync(uiPath)) {
        addFilesFromFolder(archive, uiPath, "components/ui");
      }

      archive.finalize();
    });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
