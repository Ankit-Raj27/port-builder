"use client"
import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div>
      <h1>Deployment Failed</h1>
      <p>Something went wrong with the deployment:</p>
      <pre>{reason}</pre>
    </div>
  );
};

export default ErrorPage;
