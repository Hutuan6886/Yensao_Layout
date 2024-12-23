import { S3Client } from "@aws-sdk/client-s3";

export const r2Bucket = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.ACCOUNT_CLOUDFLARE_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
  },
});
