// components/DeployWithGithub.tsx
export default function DeployWithGithub() {
    const handleGithubLogin = () => {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=repo`;
      window.location.href = authUrl;
    };
  
    return (
      <button onClick={handleGithubLogin} className="px-4 py-2 bg-black text-white rounded">
        Deploy with GitHub + Vercel
      </button>
    );
  }
  