import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import archiver from "archiver";
import { promisify } from "util";
import { z } from "zod";
import { isGuardFailure, requireSubscribedUser } from "@/lib/server/auth";

const readFile = promisify(fs.readFile);
const srcRoot = path.resolve(process.cwd(), "src");

const componentNameSchema = z
  .string()
  .regex(/^[A-Za-z][A-Za-z0-9_]*$/)
  .nullable()
  .optional();

const templateStyleSchema = z.enum(["Modern", "Creative", "Business"]).optional();

const downloadRequestSchema = z
  .object({
    navbar: componentNameSchema,
    navbarStyle: templateStyleSchema,
    hero: componentNameSchema,
    heroStyle: templateStyleSchema,
    experience: componentNameSchema,
    experienceStyle: templateStyleSchema,
    project: componentNameSchema,
    projectStyle: templateStyleSchema,
    footer: componentNameSchema,
    footerStyle: templateStyleSchema,
    linkedPages: z.array(z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/)).optional(),
    editedNavbarContent: z.string().optional(),
    editedHeroContent: z.string().optional(),
    editedExperienceContent: z.string().optional(),
    editedProjectContent: z.string().optional(),
    editedFooterContent: z.string().optional(),
    editedLinkedPages: z.record(z.string()).optional(),
  })
  .passthrough();

function toZipPath(filePath: string): string {
  const relativeToSrc = path.relative(srcRoot, filePath);

  if (!relativeToSrc.startsWith("..") && !path.isAbsolute(relativeToSrc)) {
    return relativeToSrc.replace(/\\/g, "/");
  }

  const normalized = filePath.replace(/\\/g, "/");
  const componentsIndex = normalized.lastIndexOf("/components/");
  if (componentsIndex !== -1) {
    return normalized.substring(componentsIndex + 1);
  }

  const libIndex = normalized.lastIndexOf("/lib/");
  if (libIndex !== -1) {
    return normalized.substring(libIndex + 1);
  }

  return path.basename(filePath);
}

function withoutExtension(filePath: string): string {
  return filePath.replace(/\.[^.]+$/, "");
}

function componentImport(filePath: string): string {
  return `@/${withoutExtension(toZipPath(filePath))}`;
}

function addProjectFileIfExists(
  archive: archiver.Archiver,
  projectPath: string,
  zipPath: string
): void {
  const absolutePath = path.resolve(process.cwd(), projectPath);
  if (fs.existsSync(absolutePath)) {
    archive.file(absolutePath, { name: zipPath });
  }
}

function findFile(
  basePaths: string[],
  component: string,
  type: string,
  style?: string
): string | null {
  const typeFolder = type;
  const componentName = component.replace(/\d+$/, "");
  const componentNumber = component.match(/\d+$/)?.[0] || "";

  // If style is specified, search in that style folder first
  const defaultStyles = ["Modern", "Creative", "Business"];
  const stylesToCheck = style
    ? [style, ...defaultStyles.filter((defaultStyle) => defaultStyle !== style)]
    : defaultStyles;

  for (const basePath of basePaths) {
    const pathPatterns = [
      ...stylesToCheck.map((s) => ({
        path: path.join(basePath, typeFolder, `${s}${componentName}es`),
        file: `${componentName}${componentNumber}.tsx`,
      })),
      ...stylesToCheck.map((s) => ({
        path: path.join(basePath, typeFolder, `${s}${componentName}s`),
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
      ...stylesToCheck.map((s) => ({
        path: path.join(basePath, typeFolder, `${s}${componentName}`),
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
    const guard = await requireSubscribedUser();
    if (isGuardFailure(guard)) {
      return guard.response;
    }

    const parsed = downloadRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid download request" }, { status: 400 });
    }

    // Accept edited content for all components with their styles
    const {
      navbar, navbarStyle, hero, heroStyle, experience, experienceStyle, project, projectStyle, footer, footerStyle, linkedPages,
      editedNavbarContent, editedHeroContent, editedExperienceContent, editedProjectContent, editedFooterContent,
      editedLinkedPages // { [pageName]: content }
    } = parsed.data;
    const basePaths = [
      path.resolve(process.cwd(), "src/components"),
    ];

    const navbarPath = navbar ? findFile(basePaths, navbar, "navbars", navbarStyle) : null;
    const heroPath = hero ? findFile(basePaths, hero, "heroes", heroStyle) : null;
    const experiencePath = experience ? findFile(basePaths, experience, "experience", experienceStyle) : null;
    const projectPath = project ? findFile(basePaths, project, "projects", projectStyle) : null;
    const footerPath = footer ? findFile(basePaths, footer, "footer", footerStyle) : null;

    // UI components
    let uiPath = null;
    for (const basePath of basePaths) {
      const potentialPath = path.join(basePath, "ui");
      if (fs.existsSync(potentialPath)) {
        uiPath = potentialPath;
        break;
      }
    }

    const linkedPagePaths: { [key: string]: string } = {};
    if (linkedPages && Array.isArray(linkedPages)) {
      linkedPages.forEach((page: string) => {
        const pagePath = findFile(basePaths, page, "pages");
        if (pagePath) {
          linkedPagePaths[page] = pagePath;
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

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-"));
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
          fs.rmSync(tmpDir, { recursive: true, force: true });
          resolve(
            new NextResponse(new Uint8Array(fileBuffer), {
              headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment; filename=portfolio.zip",
              },
            })
          );
        } catch {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          reject(
            NextResponse.json(
              { error: "Failed to read ZIP file" },
              { status: 500 }
            )

          );
        }
      });

      archive.on("error", (err) => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        reject(
          NextResponse.json(
            { error: `Failed to create ZIP file: ${err.message}` },
            { status: 500 }
          )
        );
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
      archive.append("", { name: "components/store/" });
      archive.append("", { name: "app/" });
      archive.append("", { name: "lib/" });

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
        pageImports.push(`import Navbar from "${componentImport(navbarPath)}";`);
        pageComponents.push(`<Navbar />`);
      }

      if (heroPath) {
        pageImports.push(`import Hero from "${componentImport(heroPath)}";`);
        pageComponents.push(`<Hero />`);
      }

      if (experiencePath) {
        pageImports.push(`import Experience from "${componentImport(experiencePath)}";`);
        pageComponents.push(`<Experience />`);
      }

      if (projectPath) {
        pageImports.push(`import Project from "${componentImport(projectPath)}";`);
        pageComponents.push(`<Project />`);
      }

      if (footerPath) {
        pageImports.push(`import Footer from "${componentImport(footerPath)}";`);
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

      // Add shared project files that selected components import through "@/...".
      addProjectFileIfExists(archive, "src/components/common/EditableText.tsx", "components/common/EditableText.tsx");
      addProjectFileIfExists(archive, "src/components/store/usePortfolioStore.ts", "components/store/usePortfolioStore.ts");
      addProjectFileIfExists(archive, "src/lib/utils.ts", "lib/utils.ts");

      // Add components with edited content if provided, else from disk.
      if (navbar && (editedNavbarContent || navbarPath)) {
        const fileName = navbarPath ? toZipPath(navbarPath) : `components/navbars/${navbar}.tsx`;
        if (editedNavbarContent) {
          archive.append(editedNavbarContent, { name: fileName });
        } else if (navbarPath) {
          archive.file(navbarPath, { name: fileName });
        }
      }

      if (hero && (editedHeroContent || heroPath)) {
        const fileName = heroPath ? toZipPath(heroPath) : `components/heroes/${hero}.tsx`;
        if (editedHeroContent) {
          archive.append(editedHeroContent, { name: fileName });
        } else if (heroPath) {
          archive.file(heroPath, { name: fileName });
        }
      }

      if (experience && (editedExperienceContent || experiencePath)) {
        const fileName = experiencePath ? toZipPath(experiencePath) : `components/experience/${experience}.tsx`;
        if (editedExperienceContent) {
          archive.append(editedExperienceContent, { name: fileName });
        } else if (experiencePath) {
          archive.file(experiencePath, { name: fileName });
        }
      }

      if (project && (editedProjectContent || projectPath)) {
        const fileName = projectPath ? toZipPath(projectPath) : `components/projects/${project}.tsx`;
        if (editedProjectContent) {
          archive.append(editedProjectContent, { name: fileName });
        } else if (projectPath) {
          archive.file(projectPath, { name: fileName });
        }
      }

      if (footer && (editedFooterContent || footerPath)) {
        const fileName = footerPath ? toZipPath(footerPath) : `components/footer/${footer}.tsx`;
        if (editedFooterContent) {
          archive.append(editedFooterContent, { name: fileName });
        } else if (footerPath) {
          archive.file(footerPath, { name: fileName });
        }
      }

      // Linked pages with edited content
      if (linkedPages && Array.isArray(linkedPages)) {
        for (const page of linkedPages) {
          let destPath = `components/pages/${page}.tsx`;
          const pagePath = linkedPagePaths[page];
          if (pagePath) {
            destPath = toZipPath(pagePath);
          }
          if (editedLinkedPages && editedLinkedPages[page]) {
            archive.append(editedLinkedPages[page], { name: destPath });
          } else if (pagePath) {
            archive.file(pagePath, { name: destPath });
          }
        }
      }

    
      if (uiPath && fs.existsSync(uiPath)) {
        addFilesFromFolder(archive, uiPath, "components/ui");
      }

      archive.finalize();
    });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
