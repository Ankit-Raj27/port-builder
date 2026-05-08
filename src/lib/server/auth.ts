import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

type GuardSuccess = {
  user: ClerkUser;
  userId: string;
};

type GuardFailure = {
  response: NextResponse;
};

export type AuthGuardResult = GuardSuccess | GuardFailure;

export function isGuardFailure(result: AuthGuardResult): result is GuardFailure {
  return "response" in result;
}

function readMetadataFlag(metadata: unknown, key: string): boolean {
  if (!metadata || typeof metadata !== "object") {
    return false;
  }

  return Boolean((metadata as Record<string, unknown>)[key]);
}

export function hasActiveSubscription(user: ClerkUser): boolean {
  return (
    readMetadataFlag(user.privateMetadata, "isSubscribed") ||
    readMetadataFlag(user.publicMetadata, "isSubscribed")
  );
}

export async function requireAuthenticatedUser(): Promise<AuthGuardResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      response: NextResponse.json({ error: "User not found" }, { status: 401 }),
    };
  }

  return { user, userId };
}

export async function requireSubscribedUser(): Promise<AuthGuardResult> {
  const result = await requireAuthenticatedUser();

  if (isGuardFailure(result)) {
    return result;
  }

  if (!hasActiveSubscription(result.user)) {
    return {
      response: NextResponse.json(
        { error: "Active subscription required" },
        { status: 403 }
      ),
    };
  }

  return result;
}
