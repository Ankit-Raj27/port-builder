'use client';

import { useEffect, useState } from 'react';

export default function DeployWithGithub() {
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL; // GitHub callback URL
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;

    window.location.href = authUrl;
  };

  // Handle redirect with code from GitHub
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
  
    if (code) {
      setLoading(true);
      const repoName = `portbuilder-${Date.now()}`;
  
      fetch('/api/github/exchange-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(async data => {
          if (!data.access_token) {
            throw new Error('Failed to get GitHub token');
          }
          console.log('Access Token:', data.access_token);

          // Debugging Token: Check if the token has repo permissions
          const checkToken = await fetch('https://api.github.com/user/repos', {
            headers: {
              'Authorization': `token ${data.access_token}`,
            }
          });
          const userRepos = await checkToken.json();
          if (checkToken.ok) {
            console.log('GitHub Repositories:', userRepos);
          } else {
            throw new Error('Token validation failed!');
          }
  
          // Fetch the zip content
          const zipRes = await fetch('/template.zip');
          const buffer = await zipRes.arrayBuffer();
          const base64Zip = btoa(
            new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
  
          // Deploy to GitHub
          const deployRes = await fetch('/api/github/deploy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              accessToken: data.access_token,
              repoName,
              description: 'Deployed via PortBuilder',
              zipContent: base64Zip,
            }),
          });
  
          const deployData = await deployRes.json();
          console.log('Deploy response:', deployData); // Log the deployment response for debugging
  
          if (deployData.repo?.html_url) {
            // Redirect to the success page with the access_token
            window.location.href = `/deploy-success?access_token=${data.access_token}`; 
          } else {
            console.error(deployData);
            alert('Failed to deploy.');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Deployment failed.');
        })
        .finally(() => setLoading(false));
    }
  }, []);

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
