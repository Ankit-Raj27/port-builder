import JSZip from "jszip";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { navbar, hero } = req.body;
  const zip = new JSZip();

  // Add a basic package.json file
  zip.file("package.json", JSON.stringify({
    name: "portfolio",
    version: "1.0.0",
    dependencies: {
      "next": "latest",
      "react": "latest",
      "react-dom": "latest",
    },
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start"
    }
  }, null, 2));

  // Add Next.js pages
  zip.file("pages/index.js", `
    import ${navbar} from "../components/navbars/${navbar}";
    import ${hero} from "../components/hero/${hero}";
    
    export default function Home() {
      return (
        <div>
          <${navbar} />
          <${hero} />
        </div>
      );
    }
  `);

  // Add Navbar Component
  zip.file(`components/navbars/${navbar}.js`, `
    const ${navbar} = () => (
      <nav className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">My Portfolio</h1>
      </nav>
    );
    export default ${navbar};
  `);

  // Add Hero Component
  zip.file(`components/hero/${hero}.js`, `
    const ${hero} = () => (
      <section className="p-10 bg-gray-200 text-center">
        <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
      </section>
    );
    export default ${hero};
  `);

  // Generate ZIP file
  const content = await zip.generateAsync({ type: "nodebuffer" });

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", 'attachment; filename="portfolio.zip"');
  res.send(content);
}
