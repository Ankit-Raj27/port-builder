// src/app/api/deploy/vercel.ts

import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: Request) {
  const { gitHubRepo } = await req.json();

  try {
    // Step 1: Trigger Vercel Deployment
    const deployResponse = await fetch("https://api.vercel.com/v12/now/deployments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.VERCEL_TOKEN}`, // Use a secret Vercel token if needed for authorization
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Port-Builder", // Name your project
        gitSource: {
          type: "github",
          repo: gitHubRepo, // GitHub repo linked with the user
          branch: "main", // Default branch for deployment (adjust if needed)
        },
        target: "production", // Set the target deployment environment
      }),
    });

    const deployData = await deployResponse.json();

    if (deployData.error) {
      console.error("Vercel API Error:", deployData); // Log the full error response
      throw new Error(deployData.error.message || "Unknown error");
    }

    // Step 2: Return Vercel deployment details
    console.log("Vercel Deployment Response:", deployData); // Log the success response
    return NextResponse.json(deployData);

  } catch (error) {
    console.error("Error deploying to Vercel:", error);

    // Capture the specific error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Deployment failed", details: errorMessage }, { status: 500 });
  }
}
