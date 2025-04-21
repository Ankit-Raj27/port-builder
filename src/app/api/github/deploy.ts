import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { accessToken, repoName, description, zipContent } = req.body;

  try {
    // Create the repository
    const createRepoResponse = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: repoName,
        description,
        private: false, // Adjust this if you want the repository to be private
      }),
    });

    const repoData = await createRepoResponse.json();
    if (!repoData.name) {
      throw new Error('Failed to create GitHub repository');
    }

    // Log the repository creation response for debugging
    console.log('Repository created:', repoData);

    // Upload the zip file to the new repository
    const uploadFileResponse = await fetch(
      `https://api.github.com/repos/${repoData.owner.login}/${repoData.name}/contents/template.zip`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Initial commit',
          content: zipContent,
        }),
      }
    );

    const uploadFileData = await uploadFileResponse.json();
    if (!uploadFileData.content) {
      throw new Error('Failed to upload file to GitHub');
    }

    // Log the file upload response
    console.log('File uploaded:', uploadFileData);

    // Respond with the repository URL
    res.status(200).json({ repo: { html_url: repoData.html_url } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to deploy repository' });
  }
}
