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
      return NextResponse.json({ message: 'Vercel deployment triggered', deployment });
    } catch (error: any) {
      return NextResponse.json({ error: error.message || 'Failed to trigger deployment' }, { status: 500 });
    }
  }
  