import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { Octokit } from "@octokit/rest";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code in query" }, { status: 400 });
  }

  try {
    // 1. Exchange GitHub code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const access_token = tokenRes.data.access_token;
    if (!access_token) {
      return NextResponse.json({ error: "Failed to get GitHub token" }, { status: 500 });
    }

    // 2. Create GitHub client
    const octokit = new Octokit({ auth: access_token });

    // 3. Get GitHub user
    const { data: user } = await octokit.rest.users.getAuthenticated();
    const repoName = "portfolio-site";

    // 4. Create repo
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: false,
    });

    // 5. Add README.md
    await octokit.repos.createOrUpdateFileContents({
      owner: user.login,
      repo: repoName,
      path: "README.md",
      message: "Initial commit",
      content: Buffer.from(`# ${repoName}`).toString("base64"),
    });

    // 6. Redirect to Vercel OAuth
    const vercelRedirect = `https://vercel.com/oauth/authorize?client_id=${process.env.VERCEL_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/auth/vercel&scope=project%20deployment`;

    return NextResponse.redirect(vercelRedirect);
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return NextResponse.json({ error: "GitHub auth failed" }, { status: 500 });
  }
}
