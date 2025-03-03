import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { navbar, hero } = await req.json();
    const zip = new JSZip();

    // ✅ Ensure components folder exists in ZIP
    const componentsFolder = zip.folder("components");
    const navbarFolder = componentsFolder?.folder("navbars");
    const heroFolder = componentsFolder?.folder("hero");

    // ✅ Function to add real component files
    const addComponentToZip = (sourcePath: string, zipPath: string) => {
      const fullPath = path.join(process.cwd(), sourcePath);
      if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        zip.file(zipPath, fileContent);
      } else {
        console.error(`❌ File not found: ${sourcePath}`);
      }
    };

    // ✅ Copy Navbar component
    if (navbar) {
      const navbarPath = `components/navbars/${navbar}.tsx`;
      addComponentToZip(navbarPath, `components/navbars/${navbar}.tsx`);
    }

    // ✅ Copy Hero component
    if (hero) {
      const heroPath = `components/hero/${hero}.tsx`;
      addComponentToZip(heroPath, `components/hero/${hero}.tsx`);
    }

    // ✅ Add required Next.js project files
    zip.file(
      "package.json",
      JSON.stringify(
        {
          name: "portfolio",
          version: "1.0.0",
          scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start",
          },
          dependencies: {
            next: "^14.2.0",
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            tailwindcss: "^3.3.0",
            postcss: "^8.4.0",
            autoprefixer: "^10.4.0",
          },
          devDependencies: {
            typescript: "^5.0.0",
            "@types/react": "^18.0.0",
            "@types/node": "^20.0.0",
          },
        },
        null,
        2
      )
    );

    zip.file(
      "next.config.js",
      `/** @type {import('next').NextConfig} */
      const nextConfig = { reactStrictMode: true };
      module.exports = nextConfig;`
    );

    zip.file(
      "tailwind.config.js",
      `module.exports = {
        content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
        theme: { extend: {} },
        plugins: [],
      };`
    );

    zip.file(
      "postcss.config.js",
      `module.exports = {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      };`
    );

    zip.file(
      "app/globals.css",
      `@tailwind base;
      @tailwind components;
      @tailwind utilities;`
    );

    zip.file(
      "app/layout.tsx",
      `import "./globals.css";

      export const metadata = {
        title: "Generated Portfolio",
        description: "Portfolio site dynamically created.",
      };

      export default function RootLayout({ children }: { children: React.ReactNode }) {
        return (
          <html lang="en">
            <body>{children}</body>
          </html>
        );
      }`
    );

    // ✅ Add `page.tsx` to **automatically load the selected components**
    zip.file(
      "app/page.tsx",
      `import Navbar from "../components/navbars/${navbar}";
      import Hero from "../components/hero/${hero}";

      export default function Home() {
        return (
          <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
            <Navbar />
            <Hero />
          </main>
        );
      }`
    );

    // ✅ Generate ZIP
    const content = await zip.generateAsync({ type: "nodebuffer" });

    // ✅ Send ZIP as response
    const response = new NextResponse(content);
    response.headers.set("Content-Disposition", "attachment; filename=portfolio.zip");
    response.headers.set("Content-Type", "application/zip");

    return response;
  } catch (error) {
    console.error("❌ ZIP generation failed:", error);
    return NextResponse.json({ error: "Failed to generate ZIP" }, { status: 500 });
  }
}
