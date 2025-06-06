"use client";

import Link from "next/link";
import { SignUp, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/template"); // Redirect if user is already signed in
    }
  }, [isSignedIn, router]);
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <SignUp forceRedirectUrl={"/template"} />

        <p className="px-8 text-center text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="hover:underline underline-offset-4">
            Terms of Use
          </Link>{" "}
          and acknowledge you&apos;ve read our{" "}
          <Link href="/privacy" className="hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
