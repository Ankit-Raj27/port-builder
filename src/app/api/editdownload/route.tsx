import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

function findFile(basePaths: string[], subPath: string): string | null {
  for (const basePath of basePaths) {
    const fullPath = path.join(basePath, subPath);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { navbar, editedComponents } = await req.json();
    const basePaths = [
      path.resolve(process.cwd(), "src/components"),
      path.resolve("D:/Programming 2024/port-builder/src/components"),
      path.resolve("/Users/apple/Downloads/port-builder/src/components"),
    ];

    const navbarPath = navbar ? findFile(basePaths, `navbars/${navbar}.tsx`) : null;

    console.log("📂 Selected Components:", { navbarPath });

    if (!navbarPath && !editedComponents?.navbar) {
      return NextResponse.json({ error: "No components selected" }, { status: 400 });
    }

    const tmpDir = "/tmp";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const zipPath = path.join(tmpDir, "edited-portfolio.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    return new Promise<Response>((resolve, reject) => {
      output.on("close", async () => {
        console.log(`✅ ZIP finalized with ${archive.pointer()} bytes`);
        if (archive.pointer() === 0) {
          return resolve(NextResponse.json({ error: "ZIP file is empty" }, { status: 500 }));
        }
        try {
          const fileBuffer = await readFile(zipPath);
          resolve(
            new NextResponse(fileBuffer, {
              headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment; filename=edited-portfolio.zip",
              },
            })
          );
        } catch {
          reject(NextResponse.json({ error: "Failed to read ZIP file" }, { status: 500 }));
        }
      });

      archive.on("error", (err) => {
        console.error("❌ Archiver Error:", err);
        reject(NextResponse.json({ error: "ZIP creation failed" }, { status: 500 }));
      });

      archive.pipe(output);

      const tempFiles: string[] = [];

      // ✅ If edited navbar exists, create a temp file and add it to ZIP
      if (editedComponents?.navbar) {
        console.log("✅ Using Edited Navbar Component");

        const tempNavbarPath = path.join(tmpDir, `edited_${navbar}.tsx`);
        fs.writeFileSync(tempNavbarPath, editedComponents.navbar, "utf-8");

        archive.append(fs.createReadStream(tempNavbarPath), { name: `components/navbars/${navbar}.tsx` });
        tempFiles.push(tempNavbarPath); 
      } else if (navbarPath) {
        console.log("📂 Adding Original Navbar File:", navbarPath);
        archive.append(fs.createReadStream(navbarPath), { name: `components/navbars/${navbar}.tsx` });
      }

      // ✅ Cleanup temp files after ZIP is finalized
      archive.on("end", () => {
        tempFiles.forEach((file) => {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`🗑️ Deleted temp file: ${file}`);
          }
        });
      });

      archive.finalize();
    });
  } catch (error) {
    console.error("❌ Unexpected Server Error:", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
