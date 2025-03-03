import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

// Function to recursively add files from a folder
function addFilesFromFolder(archive, folderPath, zipFolderPath) {
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const zipFilePath = path.join(zipFolderPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // Recursively add subfolders
        addFilesFromFolder(archive, filePath, zipFilePath);
      } else {
        archive.append(fs.createReadStream(filePath), { name: zipFilePath });
      }
    });
  }
}

export async function POST(req: Request) {
  try {
    const { navbar, hero, project } = await req.json();
    const basePath = "/Users/apple/Downloads/port-builder/src/components";

    const navbarPath = path.join(basePath, "navbars", `${navbar}.tsx`);
    const heroPath = path.join(basePath, "hero", `${hero}.tsx`);
    const projectPath = project ? path.join(basePath, "projects", `${project}.tsx`) : null;
    const libPath = path.join(basePath, "../lib");
    //add foterr as abve
    const uiPath = path.join(basePath, "ui");
// log it 
    console.log("📂 Checking files:");
    console.log(`   📁 Navbar Path: ${navbarPath} → Exists: ${fs.existsSync(navbarPath)}`);
    console.log(`   📁 Hero Path: ${heroPath} → Exists: ${fs.existsSync(heroPath)}`);
    console.log(`   📁 Project Path: ${projectPath} → Exists: ${projectPath ? fs.existsSync(projectPath) : "N/A"}`);
    console.log(`   📁 UI Folder Path: ${uiPath} → Exists: ${fs.existsSync(uiPath)}`);
    console.log(`📁 Lib Folder Path: ${libPath} → Exists: ${fs.existsSync(libPath)}`);

    if (!fs.existsSync(navbarPath) || !fs.existsSync(heroPath) || (projectPath && !fs.existsSync(projectPath))) {
      return NextResponse.json({ error: "One or more files not found" }, { status: 404 });
    }

    
    // ✅ Ensure /tmp directory exists
    const tmpDir = "/tmp";
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const zipPath = path.join(tmpDir, "portfolio.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on("close", async () => {
        console.log(`✅ ZIP finalized with ${archive.pointer()} bytes`);
        if (archive.pointer() === 0) {
          console.error("❌ ZIP is empty! Aborting.");
          return resolve(NextResponse.json({ error: "ZIP file is empty" }, { status: 500 }));
        }

        try {
          const fileBuffer = await readFile(zipPath);
          resolve(new NextResponse(fileBuffer, {
            headers: {
              "Content-Type": "application/zip",
              "Content-Disposition": "attachment; filename=portfolio.zip",
            },
          }));
        } catch (error) {
          reject(NextResponse.json({ error: "Failed to read ZIP file" }, { status: 500 }));
        }
      });

      archive.on("error", (err) => {
        console.error("❌ Archiver Error:", err);
        reject(NextResponse.json({ error: "ZIP creation failed" }, { status: 500 }));
      });

      archive.pipe(output);

      // ✅ Add Next.js Project Files
      const projectFiles = {
        "package.json": `{
          "name": "portfolio",
          "version": "1.0.0",
          "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start"
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
              "next": "^15.1.7",
              "next-themes": "^0.4.4",
              "react": "^18.3.1",
              "react-day-picker": "^8.10.1",
              "react-dom": "^18.3.1",
              "react-hook-form": "^7.54.2",
              "react-icons": "^5.4.0",
              "react-resizable-panels": "^2.1.7",
              "recharts": "^2.15.1",
              "sonner": "^2.0.0",
              "tailwind-merge": "^2.6.0",
              "tailwindcss-animate": "^1.0.7",
              "vaul": "^1.1.2",
              "zod": "^3.24.2",
              "zustand": "^5.0.3"
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
          }
        }`,
        "next.config.js": `module.exports = { reactStrictMode: true };`,
        "app/layout.tsx": `import React from "react";

          export default function RootLayout({ children }: { children: React.ReactNode }) {
            return (
              <html lang="en">
                <body>{children}</body>
              </html>
            );
          }`,
        "app/page.tsx": `import Navbar from "../components/navbars/${navbar}";
          import Hero from "../components/hero/${hero}";
          import Project from "../components/projects/${project}";

          export default function Home() {
            return (
              <div>
                <Navbar />
                <Hero />
                {Project && <Project />}


              </div>
            );
          }`
      };
      //add fotter above <Fotter/>

      for (const [filePath, content] of Object.entries(projectFiles)) {
        archive.append(content, { name: filePath });
      }

      // ✅ Add UI Folder (Recursively Include All Files & Subfolders)
      addFilesFromFolder(archive, uiPath, "components/ui");

      // ✅ Ensure components are named consistently
      archive.append(fs.createReadStream(navbarPath), { name: `components/navbars/${navbar}.tsx` });
      archive.append(fs.createReadStream(heroPath), { name: `components/hero/${hero}.tsx` });
      //add fotter 

      if (projectPath) {
        archive.append(fs.createReadStream(projectPath), { name: `components/projects/${project}.tsx` });
      }

      archive.finalize();
    });
  } catch (error) {
    console.error("❌ Unexpected Server Error:", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
