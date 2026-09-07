const FALLBACK_URL = "http://localhost:3000";

const normalize = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalize(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${normalize(vercel)}`;

  return FALLBACK_URL;
};
