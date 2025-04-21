export default function DeployToGithub() {

    const handleDeployClick = () => {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=repo`;
        window.location.href = githubAuthUrl;
    };

    return (
        <div className="p-8">
            <button
                onClick={handleDeployClick}
                className="bg-black text-white px-6 py-3 rounded-md"
            >
                Deploy to GitHub
            </button>
        </div>
    );
}