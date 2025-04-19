import { NextResponse } from "next/server";

// Helper to create/update files in GitHub
const updateGitHubRepo = async (
  repoName: string,
  files: Record<string, string>,
  accessToken: string
) => {
  const githubApiUrl = `https://api.github.com/repos/${repoName}/contents`;

  const filePromises = Object.keys(files).map(async (filePath) => {
    const fileContent = files[filePath];
    const base64Content = Buffer.from(fileContent).toString("base64");
    const fileUrl = `${githubApiUrl}/${filePath}`;

    let sha: string | undefined;

    // Step 1: Check if file exists to fetch SHA
    const checkRes = await fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (checkRes.ok) {
      const existingFile = await checkRes.json();
      sha = existingFile.sha;
    } else if (checkRes.status !== 404) {
      const errText = await checkRes.text();
      throw new Error(`Failed to check existence of ${filePath}: ${errText}`);
    }

    // Step 2: Create or update the file
    const putRes = await fetch(fileUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Updated ${filePath} via API`,
        content: base64Content,
        branch: "main",
        ...(sha ? { sha } : {}), // include sha only when updating
      }),
    });

    if (!putRes.ok) {
      const errorDetails = await putRes.text();
      throw new Error(`Failed to update file: ${filePath} - ${errorDetails}`);
    }

    return await putRes.json();
  });

  return Promise.all(filePromises);
};

// API route handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken, repoName, files } = body;

    if (!accessToken || !repoName || !files || typeof files !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid required fields: accessToken, repoName, or files." },
        { status: 400 }
      );
    }

    const result = await updateGitHubRepo(repoName, files, accessToken);

    return NextResponse.json({ message: "Files uploaded successfully", result });
  } catch (error: any) {
    console.error("❌ Error uploading files to GitHub:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload files" },
      { status: 500 }
    );
  }
}
