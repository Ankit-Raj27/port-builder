"use client"
import { useSearchParams } from "next/navigation";

const DeploySuccess = () => {
    const searchParams = useSearchParams();
    const deployment_url = searchParams.get("deployment_url");
  
    return (
      <div>
        <h1>Deployment Successful!</h1>
        <p>Your app has been successfully deployed. You can view it here:</p>
        <a href={deployment_url || undefined} target="_blank" rel="noopener noreferrer">
          {deployment_url}
        </a>
      </div>
    );
  };
  
  export default DeploySuccess;
  