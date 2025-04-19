'use client';

import React from 'react';

export default function GitHubLoginButton() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL;

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;

    window.location.href = githubAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      Login with GitHub
    </button>
  );
}
