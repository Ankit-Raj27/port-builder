import { NextResponse } from "next/server";
import { z } from "zod";
import { isGuardFailure, requireAuthenticatedUser } from "@/lib/server/auth";

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

const generateSchema = z.object({
  prompt: z.string().trim().min(10).max(2000),
  type: z
    .enum(["navbar", "hero", "experience", "project", "footer", "section"])
    .default("section"),
});

export async function POST(req: Request) {
  try {
    const guard = await requireAuthenticatedUser();
    if (isGuardFailure(guard)) {
      return guard.response;
    }

    const parsed = generateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid generation request" }, { status: 400 });
    }

    const { prompt, type } = parsed.data;

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

    const raw = await response.text();
    let data: GeminiResponse | null = null;

    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      return NextResponse.json({ error: "Invalid AI provider response" }, { status: 502 });
    }

    if (!response.ok) {
      throw new Error(data?.error?.message || "Gemini API request failed");
    }

    const generatedCode = data?.candidates?.[0]?.content?.parts?.[0]?.text
      ?.replace(/```[a-zA-Z]*\n?/g, "")
      .replace(/```/g, "")
      .trim();

    if (!generatedCode) {
      throw new Error("No code returned by Gemini");
    }

    return NextResponse.json({
      success: true,
      code: generatedCode,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate component";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
