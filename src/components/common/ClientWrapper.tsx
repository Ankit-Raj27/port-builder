// components/client-wrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingPage from "@/components/common/Loading";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // simulate load time or debounce transition

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <LoadingPage /> : <>{children}</>;
}
