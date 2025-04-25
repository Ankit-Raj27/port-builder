
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">
        {error ?? "An unexpected error occurred."}
      </p>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading error page...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
