import type { NextApiRequest, NextApiResponse } from "next";
import { unzipAndPush } from "../../components/utils/unzipAndPush";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token as string;
  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  try {
    const repoUrl = await unzipAndPush(token);
    res.redirect(repoUrl);
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "An unknown error occurred" });
  }
}
