import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Code is missing' });
    }
    try {
      // Handle the OAuth token exchange here, as previously shown in the code above
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GITHUB_REDIRECT_URL,
        }),
      });
      const data = await response.json();
      
      if (data.access_token) {
        // The callback route should not redirect here, but process the token
        res.status(200).json({ access_token: data.access_token });
      } else {
        res.status(400).json({ error: 'Failed to exchange token' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
