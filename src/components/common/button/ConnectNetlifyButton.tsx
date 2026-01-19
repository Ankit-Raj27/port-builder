"use client";

export function ConnectNetlifyButton() {
  const connectNetlify = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_NETLIFY_CLIENT_ID!,
      redirect_uri: "https://portbuilder.com/api/netlify/callback",
      response_type: "code",
    });

    window.location.href = `https://app.netlify.com/authorize?${params.toString()}`;
  };

  return (
    <button className="bg-teal-600 text-white px-4 py-2 rounded" onClick={connectNetlify}>
      Connect Netlify
    </button>
  );
}
