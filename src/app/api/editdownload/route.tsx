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
    if (fs.existsSync(fullPath)) {return fullPath};
  }
  return null;
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

    for (const { name, type, editedComponents } of components) {
      console.log(`🔧 Processing: ${name} (${type})`);
      const componentPath = findFile(validBasePaths, `${type}/${name}.tsx`);
      if (!componentPath) {
        console.warn(`⚠️ Component not found: ${name}`);
        continue;
      }

      let code = await readFile(componentPath, "utf-8");

      // ✅ Inject any provided edited props into the component
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

    // Optional: include app/page.tsx if it exists
    const pagePath = findFile(validBasePaths, "app/page.tsx");
    if (pagePath) {
      const pageCode = await readFile(pagePath, "utf-8");
      const pageFilePath = path.join(componentsDir, "app", "page.tsx");
      fs.mkdirSync(path.dirname(pageFilePath), { recursive: true });
      fs.writeFileSync(pageFilePath, pageCode, "utf-8");
      archive.file(pageFilePath, { name: "app/page.tsx" });
    }

    archive.finalize();

    return new Promise<Response>((resolve, reject) => {
      output.on("close", async () => {
        try {
          const buffer = await readFile(zipPath);
          console.log("✅ Archive ready!");
          resolve(
            new NextResponse(buffer, {
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
