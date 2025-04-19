// app/api/github/create-repo/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accessToken, repoName, description = "My new repository" } = await req.json();

    // Check if the repository name is provided
    if (!repoName) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
    }

    // Making the request to GitHub API to create a new repository
    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        name: repoName,
        description,
        private: false, // You can make this configurable as well
      }),
    });

    // Check for errors in the response
    if (!response.ok) {
      const error = await response.json();
      console.error("GitHub API Error:", error);
      return NextResponse.json({ error: error.message || "Failed to create repo" }, { status: response.status });
    }

    // Parse the successful response from GitHub
    const repo = await response.json();

    // Return the created repo information
    return NextResponse.json({ repo });
  } catch (error) {
    console.error("Failed to create repo:", error);
    return NextResponse.json({ error: "Failed to create repo" }, { status: 500 });
  }
}
