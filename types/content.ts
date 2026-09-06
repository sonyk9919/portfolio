export type SocialLink = {
  label: string;
  href: string;
};

export type NavigatorSection = {
  id: string;
  label: string;
  nav?: boolean;
};

export type Navigator = {
  profile: string;
  sections: NavigatorSection[];
  work: string[];
  projects: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Stat = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  stats: Stat[];
  nameEn: string;
  title: string;
  description: string;
  email: string;
  location: string;
  socials: SocialLink[];
  skills: SkillGroup[];
  bodyHtml: string;
};

export type WorkKind = "company" | "personal";

export type Work = {
  slug: string;
  name: string;
  kind: WorkKind;
  role: string;
  period: string;
  current: boolean;
  achievements: string[];
  bodyHtml: string;
  summary: string;
};

export type WorkGroup = Work & {
  projects: Project[];
};

export type Metric = {
  label: string;
  value: string;
  detail?: string;
};

export type Project = {
  slug: string;
  work: string;
  problem: string;
  metrics: Metric[];
  title: string;
  tagline: string;
  role: string;
  period: string;
  stack: string[];
  accent: string;
  featured: boolean;
  links: SocialLink[];
  highlights: string[];
  bodyHtml: string;
  excerpt: string;
};

export type ParsedFile = {
  data: Record<string, unknown>;
  bodyHtml: string;
  excerpt: string;
  slug: string;
};
