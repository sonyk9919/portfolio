import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_PATTERN = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const PUBLIC_DIR = path.join(process.cwd(), "public");

const isExternal = (src: string) =>
  src.startsWith("http://") ||
  src.startsWith("https://") ||
  src.startsWith("data:");

export const collectImageSources = (markdown: string): string[] => {
  const sources: string[] = [];
  let match = IMAGE_PATTERN.exec(markdown);

  while (match !== null) {
    sources.push(match[1]);
    match = IMAGE_PATTERN.exec(markdown);
  }

  IMAGE_PATTERN.lastIndex = 0;
  return sources;
};

export const assertLocalImagesExist = async (
  markdown: string,
  origin: string,
): Promise<void> => {
  const local = collectImageSources(markdown).filter(
    (src) => !isExternal(src),
  );

  for (const src of local) {
    if (!src.startsWith("/")) {
      throw new Error(
        `${origin}: 이미지 경로는 "/"로 시작해야 합니다 (public 기준). 받은 값: ${src}`,
      );
    }

    const abs = path.join(PUBLIC_DIR, decodeURIComponent(src));

    if (!abs.startsWith(PUBLIC_DIR + path.sep)) {
      throw new Error(`${origin}: public 바깥의 이미지 경로입니다: ${src}`);
    }

    try {
      await fs.access(abs);
    } catch {
      throw new Error(
        `${origin}: 이미지를 찾을 수 없습니다: public${src}\n파일을 public${src} 에 두었는지 확인하세요.`,
      );
    }
  }
};
