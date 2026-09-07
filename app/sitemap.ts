import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: getSiteUrl(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;
