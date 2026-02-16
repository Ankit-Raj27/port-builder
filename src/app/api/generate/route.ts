import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set in environment" },
        { status: 500 }
      );
    }

    const systemPrompt = `
You are an expert React and Tailwind CSS developer.

Task: Generate a premium, aesthetic ${type} component for a portfolio website.

Requirements:
1. Component name must be exactly 'AIComponent'.
2. Export as 'default'.
3. Use React (TypeScript).
4. Use Tailwind CSS for all styling.
5. Use 'lucide-react' for icons.
6. The component should be a single file.
7. Do not use external libraries except 'framer-motion'.
8. Use dark theme bg-[#050505] with Indigo & Cyan accents.
9. Return ONLY raw code. No markdown, no explanations.

User Description:
${prompt}
`;

    // ---------------- GEMINI CALL ----------------
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    // -------- SAFE RESPONSE PARSING --------
    let data: any = null;
    const raw = await response.text();

    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      console.error("🔴 Non-JSON Gemini response:", raw);
    }

    if (!response.ok) {
      console.error("🔴 Gemini API Error:", raw);
      throw new Error(data?.error?.message || "Gemini API request failed");
    }

    if (!data?.candidates?.length) {
      console.error("⚠️ Empty Gemini output:", raw);
      throw new Error("Gemini returned empty output");
    }

    let generatedCode =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!generatedCode) {
      throw new Error("No code returned by Gemini");
    }

    // -------- CLEAN MARKDOWN BLOCKS --------
    generatedCode = generatedCode
      .replace(/```[a-zA-Z]*\n?/g, "")
      .replace(/```/g, "")
      .trim();

    // -------- WRITE FILE SAFELY --------
    const generatedPath = path.resolve(
      process.cwd(),
      "src/components/generated/AIComponent.tsx"
    );

    const dir = path.dirname(generatedPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(generatedPath, generatedCode);

    return NextResponse.json({
      success: true,
      message: "Component forged in the fire of AI.",
      code: generatedCode,
    });

  } catch (error: any) {
    console.error("❌ Generation Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to generate component" },
      { status: 500 }
    );
  }
}
