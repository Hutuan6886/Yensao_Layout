import { headers } from "next/headers";
const getRealHost = (): string => {
  const baseUrl = headers().get("host"); // Lấy runtime host
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host: string = `${protocol}://${baseUrl}`;
  return host;
};

export default getRealHost;
