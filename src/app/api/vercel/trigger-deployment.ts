const triggerVercelDeployment = async (vercelToken: string, projectName: string, userGitHubRepo: string) => {
    const vercelApiUrl = `https://api.vercel.com/v9/projects/${projectName}/deployments`;
  
    const response = await fetch(vercelApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gitSource: {
          type: 'github',
          repo: userGitHubRepo,
        },
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to trigger Vercel deployment: ${errorText}`);
    }
  
    return await response.json();
  };
  
  export async function POST(req: Request) {
    const { vercelToken, projectName, userGitHubRepo } = await req.json();
  
    try {
      const deployment = await triggerVercelDeployment(vercelToken, projectName, userGitHubRepo);
      return new Response(JSON.stringify({ message: 'Vercel deployment triggered', deployment }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to trigger deployment';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
  