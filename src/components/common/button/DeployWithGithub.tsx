// components/common/button/DeployToGithubButton.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

interface DeployToGithubButtonProps {
  className?: string;
}

const DeployToGithubButton: React.FC<DeployToGithubButtonProps> = ({ className }) => {
  const { isLoaded, user } = useUser();

  const handleDeployToGithub = () => {
    if (!isLoaded || !user) {
      toast.error("Please sign in to deploy to GitHub.");
      return;
    }

    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID; 
    const redirectUri = `${window.location.origin}/api/auth/github-callback`;
    const scope = "repo";

    if (!githubClientId) {
      toast.error("GitHub Client ID not configured.");
      console.error("GITHUB_CLIENT_ID environment variable is missing.");
      return;
    }

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;

    window.location.href = githubAuthUrl;
  };

  return (
    <button
      onClick={handleDeployToGithub}
      className={`mt-4 w-full bg-gray-800 hover:bg-gray-700 transition-colors text-white px-4 py-3 rounded-lg shadow-md  disabled:bg-gray-400 ${className || ""}`}
    >
      Deploy to GitHub
    </button>
  );
};

export default DeployToGithubButton;