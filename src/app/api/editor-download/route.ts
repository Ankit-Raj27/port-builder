import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import archiver from "archiver";

export async function GET() {
  try {
    const zipPath = "/tmp/portfolio.zip"; // Temporary ZIP path
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);

    // Example: Add a single file to ZIP (Replace this with your files)
    archive.append("Hello World!", { name: "example.txt" });

    await archive.finalize(); // Finish ZIP process

    return new Promise((resolve, reject) => {
      output.on("close", () => {
        const fileStream = fs.createReadStream(zipPath);

        // ✅ Convert `ReadStream` into `ReadableStream`
        const readableStream = new ReadableStream({
          start(controller) {
            fileStream.on("data", (chunk) => controller.enqueue(chunk));
            fileStream.on("end", () => controller.close());
            fileStream.on("error", (err) => controller.error(err));
          },
        });

        // ✅ Return Next.js Response with the proper stream
        resolve(
          new NextResponse(readableStream, {
            headers: {
              "Content-Type": "application/zip",
              "Content-Disposition": "attachment; filename=portfolio.zip",
            },
          })
        );

        // Cleanup after download
        fileStream.on("close", () => fs.unlinkSync(zipPath));
      });

      output.on("error", reject);
    });
  } catch (error) {
    console.error("ZIP creation failed:", error);
    return NextResponse.json({ error: "Failed to generate ZIP" }, { status: 500 });
  }
}
