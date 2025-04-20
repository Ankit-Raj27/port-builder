import { NextResponse } from 'next/server';
import axios from 'axios';

const clientId = process.env.GITHUB_CLIENT_ID!;
const clientSecret = process.env.GITHUB_CLIENT_SECRET!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error?reason=missing_code`);
  }

  try {
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
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error?reason=no_token`);
    }

    // Redirect back to frontend with token in URL (safe for demo, but ideally use a cookie/session)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/deploy-success?access_token=${accessToken}`
    );
  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error?reason=unexpected_error`);
  }
}
