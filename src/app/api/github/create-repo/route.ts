import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken, repoName, description = "My new repository" } = body;

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 401 });
    }

    if (!repoName) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
    }

    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName,
        description,
        private: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`GitHub API Error [${response.status}] for repo "${repoName}":`, error);
      return NextResponse.json({ error: error.message || "Failed to create repo" }, { status: response.status });
    }

    const repo = await response.json();
    return NextResponse.json({ repo });

  } catch (error) {
    console.error("Failed to create repo:", error);
    return NextResponse.json({ error: "Failed to create repo" }, { status: 500 });
  }
  
}
