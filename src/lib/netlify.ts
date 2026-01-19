// src/lib/netlify.ts

import fs from "fs";
import path from "path";
import { encrypt, decrypt } from "./crypto";

const STORE_PATH = path.join(process.cwd(), ".netlify-connections.json");

type NetlifyConnection = {
  userId: string;
  accessToken: string; // encrypted
  createdAt: string;
};

function readStore(): NetlifyConnection[] {
  if (!fs.existsSync(STORE_PATH)) return [];
  return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
}

function writeStore(data: NetlifyConnection[]) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

export async function saveNetlifyConnection({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) {
  const store = readStore();

  const encrypted = encrypt(accessToken);

  const existing = store.find((c) => c.userId === userId);

  if (existing) {
    existing.accessToken = encrypted;
  } else {
    store.push({
      userId,
      accessToken: encrypted,
      createdAt: new Date().toISOString(),
    });
  }

  writeStore(store);
}

export async function getNetlifyAccessToken(userId: string) {
  const store = readStore();
  const record = store.find((c) => c.userId === userId);
  if (!record) return null;

  return decrypt(record.accessToken);
}
