import type { Metric, SkillGroup, SocialLink, Stat } from "@/types/content";

export const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

export const asBoolean = (value: unknown): boolean => value === true;

export const asStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

export const asLinks = (value: unknown): SocialLink[] =>
  Array.isArray(value)
    ? value.flatMap((item) => {
        if (typeof item !== "object" || item === null) return [];
        const { label, href } = item as Record<string, unknown>;
        return typeof label === "string" && typeof href === "string"
          ? [{ label, href }]
          : [];
      })
    : [];

export const asSkillGroups = (value: unknown): SkillGroup[] =>
  Array.isArray(value)
    ? value.flatMap((item) => {
        if (typeof item !== "object" || item === null) return [];
        const { category, items } = item as Record<string, unknown>;
        return typeof category === "string"
          ? [{ category, items: asStringArray(items) }]
          : [];
      })
    : [];

export const asStats = (value: unknown): Stat[] =>
  Array.isArray(value)
    ? value.flatMap((item) => {
        if (typeof item !== "object" || item === null) return [];
        const { label, value: raw } = item as Record<string, unknown>;
        return typeof label === "string" && raw !== undefined
          ? [{ label, value: String(raw) }]
          : [];
      })
    : [];

export const asMetrics = (value: unknown): Metric[] =>
  Array.isArray(value)
    ? value.flatMap((item) => {
        if (typeof item !== "object" || item === null) return [];
        const { label, value: raw, detail } = item as Record<string, unknown>;
        if (typeof label !== "string" || raw === undefined) return [];
        return [
          {
            label,
            value: String(raw),
            ...(typeof detail === "string" ? { detail } : {}),
          },
        ];
      })
    : [];

export const extractExcerpt = (content: string): string => {
  const paragraph = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#"));

  return paragraph ? paragraph.replace(/\n/g, " ") : "";
};
