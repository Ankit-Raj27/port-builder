export async function deployZipToNetlify(
  accessToken: string,
  zipBuffer: Buffer
) {
  const zipBlob = new Blob([zipBuffer], {
    type: "application/zip",
  });

  const res = await fetch("https://api.netlify.com/api/v1/sites", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/zip",
    },
    body: zipBlob,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const site = await res.json();

  return {
    id: site.id,
    url: site.ssl_url || site.url,
  };
}
