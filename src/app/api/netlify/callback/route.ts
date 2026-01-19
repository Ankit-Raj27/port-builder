// src/app/api/netlify/callback/route.ts

import { auth } from "@clerk/nextjs/server";
import { saveNetlifyConnection } from "@/lib/netlify";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const tokenRes = await fetch("https://api.netlify.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.NETLIFY_CLIENT_ID,
      client_secret: process.env.NETLIFY_CLIENT_SECRET,
      code,
      redirect_uri: "https://portbuilder.com/api/netlify/callback",
    }),
  });

  if (!tokenRes.ok) {
    return new Response("Token exchange failed", { status: 500 });
  }

  const data = await tokenRes.json();

  await saveNetlifyConnection({
    userId,
    accessToken: data.access_token,
  });

  // ✅ Redirect user back to dashboard
  return Response.redirect("https://portbuilder.com/dashboard");
}
