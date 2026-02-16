import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";
import os from "os";

const readFile = promisify(fs.readFile);

const basePaths = [
  path.resolve(process.cwd(), "src/components"),
  "D:/Programming 2024/port-builder/src/components",
  "/Users/apple/Downloads/port-builder/src/components"
];

function findFile(paths: string[], subPath: string): string | null {
  for (const base of paths) {
    const fullPath = path.join(base, subPath);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  
  // If not found with direct path, search recursively in subdirectories
  // e.g., looking for "heroes/Hero1.tsx" should find "heroes/ModernHeroes/Hero1.tsx"
  for (const base of paths) {
    const [typeFolder, fileName] = subPath.split("/");
    const typePath = path.join(base, typeFolder);
    
    if (fs.existsSync(typePath) && fs.statSync(typePath).isDirectory()) {
      const found = searchRecursive(typePath, fileName);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
}

function searchRecursive(dir: string, fileName: string): string | null {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file === fileName) {
      return filePath;
    } else if (stat.isDirectory()) {
      const result = searchRecursive(filePath, fileName);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

// Function to dynamically generate the page.tsx content
interface Component {
  name: string;
  type: string;
}

function generatePageCode(components: Component[]): string {
  const imports: string[] = [];
  const componentTags: string[] = [];

  components.forEach(({ name, type }) => {
    console.log(`Processing component: ${name} (${type})`); // Debugging the component processing
    
    if (type === "navbars") {
      imports.push(`import Navbar from "../components/navbars/edited_${name}";`);
      componentTags.push(`<Navbar />`);
    }
    if (type === "heroes") {  // Update the type check to handle "heroes"
      console.log("Including Hero component: ", name); // Debugging Hero inclusion
      imports.push(`import Hero from "../components/heroes/edited_${name}";`);
      componentTags.push(`<Hero />`);
    }
    if (type === "projects") {
      imports.push(`import Project from "../components/projects/edited_${name}";`);
      componentTags.push(`<Project />`);
    }
    if (type === "footer") {
      imports.push(`import Footer from "../components/footer/edited_${name}";`);
      componentTags.push(`<Footer />`);
    }
  });

  console.log("Generated imports:", imports); // Log imports to ensure Hero is included
  console.log("Generated component tags:", componentTags); // Log tags to check if Hero is added
  
  const importsSection = imports.join("\n");
  const componentTagsSection = componentTags.join("\n  ");

  return `
import React from 'react';
${importsSection}

export default function Home() {
  return (
    <div>
      ${componentTagsSection}
    </div>
  );
}
  `;
}

export async function POST(req: Request): Promise<Response> {
  try {
    console.log("📥 Receiving download request...");
    const { components } = await req.json();

    if (!Array.isArray(components) || components.length === 0) {
      return NextResponse.json({ error: "No components provided" }, { status: 400 });
    }

    const validBasePaths = basePaths.filter(fs.existsSync);
    if (validBasePaths.length === 0) {
      console.error("❌ No valid base paths found.");
      return NextResponse.json({ error: "No valid component base paths found" }, { status: 500 });
    }

    console.log("📂 Using base path:", validBasePaths);

    const tmpDir = path.join(os.tmpdir(), "edited_portfolio");
    const componentsDir = path.join(tmpDir, "components");
    fs.mkdirSync(componentsDir, { recursive: true });

    const zipPath = path.join(tmpDir, "edited-portfolio.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);

    // Process components
    for (const { name, type, editedComponents } of components) {
      console.log(`🔧 Processing: ${name} (${type})`);
      const componentPath = findFile(validBasePaths, `${type}/${name}.tsx`);
      if (!componentPath) {
        console.warn(`⚠️ Component not found: ${name}`);
        continue;
      }

      let code = await readFile(componentPath, "utf-8");

      // Inject edited components data if provided
      if (editedComponents) {
        const entries = Object.entries(editedComponents).map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${JSON.stringify(value, null, 2)}`;
          } else {
            return `${key}: ${JSON.stringify(value)}`;
          }
        });

        const overrideProps = `
          // Injected edited data
          const data = {
            ${entries.join(",\n")}
          };
        `;

        code = code
          .replace(/("use client"\s*;?\s*)/, `$1\n\n${overrideProps}`)
          .replace(/const (\w+): React\.FC<[\w<>{} ,]+> = \(\{ data }\)/, `const $1: React.FC = ()`);
      }

      const typeDir = path.join(componentsDir, type);
      fs.mkdirSync(typeDir, { recursive: true });

      const editedPath = path.join(typeDir, `edited_${name}.tsx`);
      fs.writeFileSync(editedPath, code, "utf-8");
      archive.file(editedPath, { name: `components/${type}/edited_${name}.tsx` });
    }

    // Generate the page.tsx content
    const start = Date.now();
    const pageCode = generatePageCode(components);
    // Save the generated page.tsx
    const end = Date.now();
    console.log(end-start, "ms to generate page.tsx");
    const pageFilePath = path.join(componentsDir, "app", "page.tsx");
    fs.mkdirSync(path.dirname(pageFilePath), { recursive: true });
    fs.writeFileSync(pageFilePath, pageCode, "utf-8");

    archive.file(pageFilePath, { name: "app/page.tsx" });

    // ⬇️ Add core Next.js project files

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
    };

    // Add core project files to archive
    for (const [fileName, content] of Object.entries(projectFiles)) {
      archive.append(content, { name: fileName });
    }

    // Finalize the archive
    archive.finalize();

    return new Promise<Response>((resolve, reject) => {
      output.on("close", async () => {
        try {
          const buffer = await readFile(zipPath);
          console.log("✅ Archive ready!");
          resolve(
            new NextResponse(new Uint8Array(buffer), {
              headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment; filename=edited-portfolio.zip",
              },
            })
          );
        } catch (err) {
          console.error("❌ Reading ZIP failed:", err);
          reject(NextResponse.json({ error: "Failed to read ZIP" }, { status: 500 }));
        }
      });

      archive.on("error", (err) => {
        console.error("❌ Archiving failed:", err);
        reject(NextResponse.json({ error: "ZIP creation failed" }, { status: 500 }));
      });
    });
  } catch (err) {
    console.error("❌ Unexpected server error:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
