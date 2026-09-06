"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { NavigatorSection } from "@/types/content";

type Props = {
  nameEn: string;
  sections: NavigatorSection[];
};

export const SiteHeader = ({ nameEn, sections }: Props) => (
  <header className="fixed inset-x-0 top-0 z-40 border-b border-black/8 bg-[var(--background)]/85 backdrop-blur-md dark:border-white/10">
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3 lg:max-w-4xl lg:px-10">
      <a
        href="#top"
        className="shrink-0 text-sm font-semibold tracking-widest"
      >
        {nameEn}
      </a>

      <nav className="flex min-w-0 items-center gap-1 sm:gap-2">
        <ul className="flex min-w-0 items-center gap-0.5 overflow-x-auto sm:gap-1 [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100 sm:px-3"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </div>
  </header>
);
