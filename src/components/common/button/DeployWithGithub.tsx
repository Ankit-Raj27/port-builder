'use client';

import { useEffect, useState } from 'react';

export default function DeployWithGithub() {
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL;
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('access_token');

    if (token) {
      setLoading(true);

      const repoName = `portbuilder-${Date.now()}`;

      fetch('/api/github/create-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: token,
          repoName,
          description: 'Created with PortBuilder',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.repo?.html_url) {
            window.location.href = data.repo.html_url; // Redirect to new repo
          } else {
            alert('Failed to create repo.');
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong.');
        })
        .finally(() => setLoading(false));
    }
  }, []);
  console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);


  return (
    <button
      onClick={handleGithubLogin}
      className="px-4 py-2 bg-black text-white rounded"
      disabled={loading}
    >
      {loading ? 'Deploying...' : 'Deploy with GitHub + Vercel'}
    </button>
  );
}
