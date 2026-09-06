import path from "node:path";

export const CONTENT_DIR = path.join(process.cwd(), "content");

export const NAVIGATOR_PATH = path.join(CONTENT_DIR, "navigator.json");

export const resolveContentPath = (relPath: string): string => {
  const normalized = relPath.replace(/^\.?\/?content\//, "");
  const abs = path.join(CONTENT_DIR, normalized);

  if (!abs.startsWith(CONTENT_DIR + path.sep)) {
    throw new Error(`content/ 바깥의 경로는 사용할 수 없습니다: ${relPath}`);
  }

  return abs;
};
