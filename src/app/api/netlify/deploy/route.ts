import { auth } from "@clerk/nextjs/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { promisify } from "util";
import { getNetlifyAccessToken } from "@/lib/netlify";
import { deployZipToNetlify } from "@/lib/netlifyDeploy";

const readFile = promisify(fs.readFile);

export async function POST(req: Request): Promise<Response> {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const accessToken = await getNetlifyAccessToken(userId);
  if (!accessToken) {
    return new Response("Netlify not connected", { status: 400 });
  }

  // 🔁 COPY your existing body parsing
  const {
    navbar,
    hero,
    experience,
    project,
    footer,
    linkedPages,
  } = await req.json();

  // 🔁 COPY your existing basePaths, findFile, addFilesFromFolder helpers
  // (literally paste them here unchanged)

  const tmpDir = "/tmp";
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const zipPath = path.join(tmpDir, `portfolio-${Date.now()}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise<Response>((resolve, reject) => {
    output.on("close", async () => {
      try {
        const zipBuffer = await readFile(zipPath);

        // 🚀 DEPLOY TO NETLIFY
        const site = await deployZipToNetlify(accessToken, zipBuffer);

        resolve(
          Response.json({
            success: true,
            url: site.url,
          })
        );
      } catch (err) {
        reject(
          Response.json(
            { error: "Netlify deploy failed" },
            { status: 500 }
          )
        );
      }
    });

    archive.pipe(output);

    // 🔁 COPY ALL archive.append / archive.file logic from download route
    // (UNCHANGED)

    archive.finalize();
  });
}
