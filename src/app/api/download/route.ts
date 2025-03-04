import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

// ✅ Function to find a file from multiple base paths
function findFile(basePaths: string[], subPath: string): string | null {
  for (const basePath of basePaths) {
    const fullPath = path.join(basePath, subPath);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

// ✅ Recursively add files from a folder
function addFilesFromFolder(archive: archiver.Archiver, folderPath: string, zipFolderPath: string): void {
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

export async function POST(req: Request) {
  try {
    const { navbar, hero, project, footer } = await req.json();
    const basePaths = [
      path.resolve("/Users/apple/Downloads/port-builder/src/components"),
      path.resolve("D:/Programming 2024/port-builder/src/components"),
      path.resolve(process.cwd(), "src/components"),
    ];

    const navbarPath = navbar ? findFile(basePaths, `navbars/${navbar}.tsx`) : null;
    const heroPath = hero ? findFile(basePaths, `hero/${hero}.tsx`) : null;
    const projectPath = project ? findFile(basePaths, `projects/${project}.tsx`) : null;
    const footerPath = footer ? findFile(basePaths, `footer/${footer}.tsx`) : null;
    const uiPath = findFile(basePaths, "ui");

    console.log("📂 Checking files:");
    console.log(`   📁 Navbar Path: ${navbarPath ?? "❌ Not Selected"}`);
    console.log(`   📁 Hero Path: ${heroPath ?? "❌ Not Selected"}`);
    console.log(`   📁 Project Path: ${projectPath ?? "❌ Not Selected"}`);
    console.log(`   📁 Footer Path: ${footerPath ?? "❌ Not Selected"}`);
    console.log(`   📁 UI Folder Path: ${uiPath ?? "❌ Not Found"}`);

    if (!navbarPath && !heroPath && !projectPath && !footerPath) {
      return NextResponse.json({ error: "No components selected" }, { status: 400 });
    }

    const tmpDir = "/tmp";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const zipPath = path.join(tmpDir, "portfolio.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on("close", async () => {
        console.log(`✅ ZIP finalized with ${archive.pointer()} bytes`);
        if (archive.pointer() === 0) {
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

      if (navbarPath) archive.append(fs.createReadStream(navbarPath), { name: `components/navbars/${navbar}.tsx` });
      if (heroPath) archive.append(fs.createReadStream(heroPath), { name: `components/hero/${hero}.tsx` });
      if (projectPath) archive.append(fs.createReadStream(projectPath), { name: `components/projects/${project}.tsx` });
      if (footerPath) archive.append(fs.createReadStream(footerPath), { name: `components/footer/${footer}.tsx` });
      if (uiPath) addFilesFromFolder(archive, uiPath, "components/ui");

      archive.finalize();
    });
  } catch (error) {
    console.error("❌ Unexpected Server Error:", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}