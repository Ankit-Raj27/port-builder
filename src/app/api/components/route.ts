import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import archiver from "archiver";
import { PassThrough } from "stream";

// Paths
const basePath = "/Users/apple/Downloads/port-builder/src/components";
const tempDir = "/tmp/edited_components"; // Temporary folder for edited files

// 📦 POST: Download ZIP with Edited Components
export async function POST(req: Request) {
  try {
    const { navbar, hero, project, footer } = await req.json();

    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = new PassThrough(); // ✅ Fix: Use PassThrough instead of Readable

    archive.pipe(stream); // ✅ Fix: Pipe archive to PassThrough

    // Add components to ZIP
    const components = { navbars: navbar, hero: hero, projects: project, footer: footer };

    for (const [folder, file] of Object.entries(components)) {
      if (file) {
        const editedPath = path.join(tempDir, folder, `${file}.tsx`);
        const finalPath = await fs.stat(editedPath).catch(() => false) ? editedPath : path.join(basePath, folder, `${file}.tsx`);

        if (finalPath) {
          archive.append(await fs.readFile(finalPath, "utf-8"), { name: `components/${folder}/${file}.tsx` });
        }
      }
    }

    archive.finalize(); // ✅ Finish ZIP file creation

    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=portfolio.zip",
      },
    });
  } catch (error) {
    console.error("❌ ZIP creation failed:", error);
    return NextResponse.json({ error: "ZIP creation failed" }, { status: 500 });
  }
}
