import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { assertLocalImagesExist } from "@/lib/images";
import { NAVIGATOR_PATH, resolveContentPath } from "@/lib/paths";
import {
  asBoolean,
  asLinks,
  asMetrics,
  asSkillGroups,
  asStats,
  asString,
  asStringArray,
  extractExcerpt,
} from "@/lib/frontmatter";
import type {
  Navigator,
  ParsedFile,
  Profile,
  Project,
  Work,
  WorkGroup,
  WorkKind,
} from "@/types/content";

const readNavigator = async (): Promise<Navigator> => {
  const raw = await fs.readFile(NAVIGATOR_PATH, "utf8");
  const parsed = JSON.parse(raw) as Partial<Navigator>;

  if (!parsed.profile) {
    throw new Error("navigator.json: 'profile' 경로가 없습니다.");
  }

  return {
    profile: parsed.profile,
    sections: parsed.sections ?? [],
    work: parsed.work ?? [],
    projects: parsed.projects ?? [],
  };
};

const parseFile = async (relPath: string): Promise<ParsedFile> => {
  const abs = resolveContentPath(relPath);

  let raw: string;
  try {
    raw = await fs.readFile(abs, "utf8");
  } catch {
    throw new Error(
      `navigator.json 이 가리키는 파일을 찾을 수 없습니다: ${relPath}`,
    );
  }

  const { data, content } = matter(raw);
  await assertLocalImagesExist(content, relPath);

  const processed = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return {
    data: data as Record<string, unknown>,
    bodyHtml: processed.toString(),
    excerpt: extractExcerpt(content),
    slug: path.basename(relPath, ".md"),
  };
};

export const getNavigator = async (): Promise<Navigator> => readNavigator();

export const getProfile = async (): Promise<Profile> => {
  const nav = await readNavigator();
  const { data, bodyHtml } = await parseFile(nav.profile);

  return {
    name: asString(data.name, "이름"),
    nameEn: asString(data.nameEn, "NAME"),
    title: asString(data.title),
    description: asString(data.description),
    email: asString(data.email),
    location: asString(data.location),
    socials: asLinks(data.socials),
    stats: asStats(data.stats),
    skills: asSkillGroups(data.skills),
    bodyHtml,
  };
};

export const getProjects = async (): Promise<Project[]> => {
  const nav = await readNavigator();
  const parsed = await Promise.all(nav.projects.map(parseFile));

  return parsed.map(({ data, bodyHtml, excerpt, slug }) => ({
    slug,
    work: asString(data.work),
    problem: asString(data.problem),
    metrics: asMetrics(data.metrics),
    title: asString(data.title, slug),
    tagline: asString(data.tagline),
    role: asString(data.role),
    period: asString(data.period),
    stack: asStringArray(data.stack),
    accent: asString(data.accent, "#6366f1"),
    featured: asBoolean(data.featured),
    links: asLinks(data.links),
    highlights: asStringArray(data.highlights),
    bodyHtml,
    excerpt,
  }));
};

const asWorkKind = (value: unknown): WorkKind =>
  value === "personal" ? "personal" : "company";

export const getWork = async (): Promise<Work[]> => {
  const nav = await readNavigator();
  const parsed = await Promise.all(nav.work.map(parseFile));

  return parsed.map(({ data, bodyHtml, excerpt, slug }) => ({
    slug,
    name: asString(data.name, slug),
    kind: asWorkKind(data.kind),
    role: asString(data.role),
    period: asString(data.period),
    current: asBoolean(data.current),
    achievements: asStringArray(data.achievements),
    bodyHtml,
    summary: excerpt,
  }));
};

export const getWorkGroups = async (): Promise<WorkGroup[]> => {
  const [work, projects] = await Promise.all([getWork(), getProjects()]);

  const known = new Set(work.map((item) => item.slug));
  const orphan = projects.find((project) => !known.has(project.work));

  if (orphan) {
    throw new Error(
      `프로젝트 '${orphan.slug}'의 work 값 '${orphan.work}'에 해당하는 소속이 없습니다. content/work/ 아래 파일명과 맞는지 확인하세요.`,
    );
  }

  return work.map((item) => ({
    ...item,
    projects: projects.filter((project) => project.work === item.slug),
  }));
};
