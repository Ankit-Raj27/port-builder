// import { auth } from "@clerk/nextjs/server";
// import { saveVercelConnection } from "@/lib/vercel";

// export async function GET(req: Request) {
//   const { userId } = auth();

//   if (!userId) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return new Response("Missing OAuth code", { status: 400 });
//   }

//   const res = await fetch("https://api.vercel.com/v2/oauth/access_token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       client_id: process.env.VERCEL_CLIENT_ID,
//       client_secret: process.env.VERCEL_CLIENT_SECRET,
//       code,
//       redirect_uri: "https://portbuilder.com/api/vercel/callback",
//     }),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     return new Response(`OAuth failed: ${errorText}`, { status: 500 });
//   }

//   const { access_token, user_id, team_id } = await res.json();

//   await saveVercelConnection({
//     userId, // ✅ from Clerk
//     vercelUserId: user_id,
//     accessToken: access_token,
//     teamId: team_id ?? null,
//   });

//   return Response.redirect("https://portbuilder.com/dashboard");
// }
