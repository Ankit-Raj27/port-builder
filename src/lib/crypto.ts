import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_SECRET!)
  .digest();

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(payload: string) {
  const buf = Buffer.from(payload, "base64");

  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(tag);

  return decipher.update(encrypted, undefined, "utf8") + decipher.final("utf8");
}
