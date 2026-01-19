import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Explicit public routes
const isPublicRoute = createRouteMatcher([
  "/api/netlify/callback",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    // ⛔ IMPORTANT: do NOT touch auth() here
    return NextResponse.next();
  }

  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match everything EXCEPT static files
    "/((?!_next|.*\\..*).*)",
  ],
};
