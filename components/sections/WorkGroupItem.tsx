"use client";

import { ProjectAccordion } from "@/components/sections/ProjectAccordion";
import type { WorkGroup } from "@/types/content";

type Props = {
  group: WorkGroup;
  openSlugs: ReadonlySet<string>;
  onToggle: (slug: string) => void;
};

export const WorkGroupItem = ({ group, openSlugs, onToggle }: Props) => {
  const isPersonal = group.kind === "personal";

  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        className={`absolute left-0 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full ring-4 ${
          group.current
            ? "bg-indigo-500 ring-indigo-500/15"
            : isPersonal
              ? "bg-neutral-300 ring-transparent dark:bg-neutral-700"
              : "bg-neutral-400 ring-transparent dark:bg-neutral-600"
        }`}
      />

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-semibold tracking-tight">{group.name}</h3>

          {isPersonal ? (
            <span className="rounded-full border border-black/12 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-white/20 dark:text-neutral-400">
              사이드 프로젝트
            </span>
          ) : (
            group.current && (
              <span className="rounded-full bg-indigo-500/12 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-300">
                재직 중
              </span>
            )
          )}
        </div>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {[group.role, group.period].filter(Boolean).join(" · ")}
        </p>

        {group.summary && (
          <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {group.summary}
          </p>
        )}

        {group.achievements.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {group.achievements.map((achievement) => (
              <li
                key={achievement}
                className="flex gap-2.5 text-sm text-neutral-600 dark:text-neutral-400"
              >
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-current" />
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </header>

      {group.projects.length > 0 && (
        <div className="mt-6 space-y-3">
          {group.projects.map((project) => (
            <ProjectAccordion
              key={project.slug}
              project={project}
              open={openSlugs.has(project.slug)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </li>
  );
};
