"use client";

import Link from "next/link";

export default function PreviewPage() {


  const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/auth/github&scope=repo`;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl">Ready to Deploy?</h2>
      <Link href={githubOAuthURL}>
        <button className="bg-black text-white px-4 py-2 rounded">Deploy to GitHub & Vercel</button>
      </Link>
    </div>
  );
}
