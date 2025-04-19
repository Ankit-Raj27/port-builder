import { NextResponse } from 'next/server';
import axios from 'axios';

const clientId = process.env.GITHUB_CLIENT_ID!;
const clientSecret = process.env.GITHUB_CLIENT_SECRET!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  try {
    // Exchange the code for an access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = tokenRes.data.access_token;

    if (!accessToken) {
      return NextResponse.json({ error: 'No access token received' }, { status: 500 });
    }

    // Optional: fetch GitHub user to confirm access
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userRes.data;

    // TODO: Store access token in session or database as needed

    return NextResponse.json({
      success: true,
      accessToken,
      user,
    });
  } catch (error: any) {
    console.error('GitHub OAuth Error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'GitHub OAuth failed' }, { status: 500 });
  }
}
