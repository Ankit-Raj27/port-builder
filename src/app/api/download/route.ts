import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

// Function to find file paths
function findFile(basePaths: string[], subPath: string): string | null {
  for (const basePath of basePaths) {
    const fullPath = path.join(basePath, subPath);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
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
    const { navbar, hero, experience, project, footer, linkedPages } =
      await req.json();
    const basePaths = [
      path.resolve(process.cwd(), "src/components"),
      path.resolve("D:/Programming 2024/port-builder/src/components"),
      path.resolve("/Users/apple/Downloads/port-builder/src/components"),
    ];

    const navbarPath = navbar
      ? findFile(basePaths, `navbars/${navbar}.tsx`)
      : null;
    const heroPath = hero ? findFile(basePaths, `heroes/${hero}.tsx`) : null;
    const experiencePath = experience
      ? findFile(basePaths, `experience/${experience}.tsx`)
      : null;
    const projectPath = project
      ? findFile(basePaths, `projects/${project}.tsx`)
      : null;
    const footerPath = footer
      ? findFile(basePaths, `footer/${footer}.tsx`)
      : null;
    const uiPath = findFile(basePaths, "ui");
    // Find linked page paths
    const linkedPagePaths: { [key: string]: string } = {};
    if (linkedPages && Array.isArray(linkedPages)) {
      linkedPages.forEach((page: string) => {
        const pagePath = findFile(basePaths, `pages/${page}.tsx`);
        if (pagePath) {
          linkedPagePaths[page] = pagePath;
        }
      });
    }

    console.log("📂 Selected Components:", {
      navbarPath,
      heroPath,
      projectPath,
      footerPath,
      uiPath,
      linkedPagePaths,
    });

    if (
      !navbarPath &&
      !hero &&
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
        } catch {
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

      const projectFiles = {
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
              "@/": ["./"]
            }
          }
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
        "app/page.tsx": `import Navbar from "../components/navbars/${navbar}";
        ${hero ? `import Hero from "../components/hero/${hero}";` : ""}
        ${
          project
            ? `import Project from "../components/projects/${project}";`
            : ""
        }
        ${footer ? `import Footer from "../components/footer/${footer}";` : ""}

        export default function Home() {
          return (
            <div>
              <Navbar />
              ${hero ? `<Hero />` : ""}
              ${project ? `<Project />` : ""}
              ${footer ? `<Footer />` : ""}
            </div>
          );
        }`,
      };

      Object.entries(projectFiles).forEach(([fileName, fileContent]) => {
        archive.append(fileContent, { name: fileName });
      });

      // Add selected component files
      if (navbarPath) {
        archive.file(navbarPath, { name: `components/navbars/${navbar}.tsx` });
      }
      if (heroPath) {
        archive.file(heroPath, { name: `components/hero/${hero}.tsx` });
      }
      if (experiencePath) {
        archive.file(experiencePath, {
          name: `components/experience/${experience}.tsx`,
        });
      }
      if (projectPath) {
        archive.file(projectPath, {
          name: `components/projects/${project}.tsx`,
        });
      }
      if (footerPath) {
        archive.file(footerPath, { name: `components/footer/${footer}.tsx` });
      }

      // Add all linked pages
      Object.entries(linkedPagePaths).forEach(([pageName, pagePath]) => {
        archive.file(pagePath, { name: `components/pages/${pageName}.tsx` });
      });

      // Add UI folder recursively
      if (uiPath) {
        addFilesFromFolder(archive, uiPath, "components/ui");
      }

      // Finalize ZIP
      archive.finalize();
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
