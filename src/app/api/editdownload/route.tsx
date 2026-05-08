import archiver from "archiver";
import fs from "fs";
import os from "os";
import path from "path";
import { NextResponse } from "next/server";
import { promisify } from "util";
import { z } from "zod";
import { isGuardFailure, requireSubscribedUser } from "@/lib/server/auth";

const readFile = promisify(fs.readFile);

const basePaths = [path.resolve(process.cwd(), "src/components")];

const editDownloadRequestSchema = z.object({
  components: z
    .array(
      z.object({
        name: z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/),
        type: z.enum(["navbars", "heroes", "projects", "footer", "experience"]),
        editedComponents: z.record(z.unknown()).optional(),
      })
    )
    .min(1),
});

type EditDownloadComponent = z.infer<typeof editDownloadRequestSchema>["components"][number];

function searchRecursive(dir: string, fileName: string): string | null {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && file === fileName) {
      return filePath;
    }

    if (stat.isDirectory()) {
      const result = searchRecursive(filePath, fileName);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

function findFile(paths: string[], subPath: string): string | null {
  for (const base of paths) {
    const fullPath = path.join(base, subPath);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

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

function getComponentAlias(type: EditDownloadComponent["type"]): string {
  switch (type) {
    case "navbars":
      return "Navbar";
    case "heroes":
      return "Hero";
    case "projects":
      return "Project";
    case "footer":
      return "Footer";
    case "experience":
      return "Experience";
  }
}

function generatePageCode(components: EditDownloadComponent[]): string {
  const imports = components
    .map(({ name, type }) => {
      const alias = getComponentAlias(type);
      return `import ${alias} from "@/components/${type}/edited_${name}";`;
    })
    .join("\n");

  const componentTags = components
    .map(({ type }) => {
      const alias = getComponentAlias(type);
      return `<${alias} />`;
    })
    .join("\n      ");

  return `import React from "react";
${imports}

export default function Home() {
  return (
    <div>
      ${componentTags}
    </div>
  );
}
`;
}

function injectEditedData(code: string, editedComponents?: Record<string, unknown>): string {
  if (!editedComponents) {
    return code;
  }

  const entries = Object.entries(editedComponents).map(
    ([key, value]) => `${key}: ${JSON.stringify(value, null, 2)}`
  );

  const overrideProps = `
const data = {
  ${entries.join(",\n")}
};
`;

  return code
    .replace(/("use client"\s*;?\s*)/, `$1\n\n${overrideProps}`)
    .replace(
      /const (\w+): React\.FC<[\w<>{} ,]+> = \(\{ data }\)/,
      "const $1: React.FC = ()"
    );
}

const projectFiles: Record<string, string> = {
  "package.json": JSON.stringify(
    {
      name: "portfolio",
      version: "1.0.0",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        "@radix-ui/react-slot": "^1.1.2",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "framer-motion": "^12.4.2",
        "lucide-react": "^0.462.0",
        next: "^15.1.7",
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "tailwind-merge": "^2.6.0",
        tailwindcss: "^3.4.0",
      },
      devDependencies: {
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        autoprefixer: "^10.4.0",
        postcss: "^8.4.0",
        typescript: "^5",
      },
    },
    null,
    2
  ),
  "tsconfig.json": JSON.stringify(
    {
      compilerOptions: {
        target: "es2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: false,
        noEmit: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        baseUrl: ".",
        paths: {
          "@/*": ["./*"],
        },
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    },
    null,
    2
  ),
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

export async function POST(req: Request): Promise<Response> {
  try {
    const guard = await requireSubscribedUser();
    if (isGuardFailure(guard)) {
      return guard.response;
    }

    const parsed = editDownloadRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid edit download request" }, { status: 400 });
    }

    const validBasePaths = basePaths.filter(fs.existsSync);
    if (validBasePaths.length === 0) {
      return NextResponse.json({ error: "Component base path not found" }, { status: 500 });
    }

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "edited-portfolio-"));
    const zipPath = path.join(tmpDir, "edited-portfolio.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    return new Promise<Response>((resolve, reject) => {
      output.on("close", async () => {
        try {
          const buffer = await readFile(zipPath);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          resolve(
            new NextResponse(new Uint8Array(buffer), {
              headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment; filename=edited-portfolio.zip",
              },
            })
          );
        } catch {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          reject(NextResponse.json({ error: "Failed to read ZIP" }, { status: 500 }));
        }
      });

      archive.on("error", () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        reject(NextResponse.json({ error: "ZIP creation failed" }, { status: 500 }));
      });

      archive.pipe(output);

      void (async () => {
        try {
          for (const component of parsed.data.components) {
            const componentPath = findFile(validBasePaths, `${component.type}/${component.name}.tsx`);
            if (!componentPath) {
              continue;
            }

            const code = injectEditedData(
              await readFile(componentPath, "utf-8"),
              component.editedComponents
            );

            archive.append(code, {
              name: `components/${component.type}/edited_${component.name}.tsx`,
            });
          }

          archive.append(generatePageCode(parsed.data.components), { name: "app/page.tsx" });

          for (const [fileName, content] of Object.entries(projectFiles)) {
            archive.append(content, { name: fileName });
          }

          archive.finalize();
        } catch {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          reject(NextResponse.json({ error: "ZIP creation failed" }, { status: 500 }));
        }
      })();
    });
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
