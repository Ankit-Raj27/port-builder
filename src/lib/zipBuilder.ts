// src/lib/zipBuilder.ts
import JSZip from "jszip";

export async function generateZipBuffer(components: {
  navbar: string;
  hero: string;
  // add any other components you use
}): Promise<Buffer> {
  const zip = new JSZip();

  // Sample: index.html file
  const htmlContent = `
<!DOCTYPE html>
<html>
<head><title>Portfolio</title></head>
<body>
  ${components.navbar}
  ${components.hero}
</body>
</html>
`;

  zip.file("index.html", htmlContent);

  // Add more files (CSS, JS) if needed
  return await zip.generateAsync({ type: "nodebuffer" });
}
