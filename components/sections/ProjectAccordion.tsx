"use client";

import { MetricStrip } from "@/components/sections/MetricStrip";
import { Markdown } from "@/components/ui/Markdown";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/content";

type Props = {
  project: Project;
  open: boolean;
  onToggle: (slug: string) => void;
  onRegister: (slug: string, node: HTMLElement | null) => void;
};

export const ProjectAccordion = ({
  project,
  open,
  onToggle,
  onRegister,
}: Props) => (
  <article
    ref={(node) => onRegister(project.slug, node)}
    className={`relative overflow-hidden rounded-xl border transition-colors ${
      open
        ? "border-black/15 bg-white/80 dark:border-white/20 dark:bg-white/[0.06]"
        : "border-black/10 bg-white/50 hover:border-black/22 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/22 dark:hover:bg-white/[0.05]"
    }`}
  >
    <span
      className="absolute inset-y-0 left-0 w-[3px]"
      style={{ backgroundColor: project.accent }}
    />

    <h4>
      <button
        type="button"
        onClick={() => onToggle(project.slug)}
        aria-expanded={open}
        aria-controls={`project-body-${project.slug}`}
        className="flex w-full items-start gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-base font-semibold tracking-tight sm:text-lg">
              {project.title}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {project.period}
            </span>
          </span>

          <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
            {project.tagline}
          </span>

          {!open && (
            <span className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </span>
          )}
        </span>

        <span
          className={`mt-1 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
    </h4>

    <div
      id={`project-body-${project.slug}`}
      hidden={!open}
      className="border-t border-black/8 px-5 py-5 dark:border-white/10 sm:px-6 sm:py-6"
    >
      {project.problem && (
        <p className="border-l-2 pl-4 text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300"
          style={{ borderColor: project.accent }}
        >
          {project.problem}
        </p>
      )}

      {project.metrics.length > 0 && (
        <MetricStrip metrics={project.metrics} accent={project.accent} />
      )}

      <Markdown
        html={project.bodyHtml}
        className="mt-6 text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300"
      />

      {project.highlights.length > 0 && (
        <div className="mt-6">
          <h5 className="text-xs font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
            한 일
          </h5>
          <ul className="mt-2.5 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <dl className="mt-6 grid gap-4 border-t border-black/8 pt-5 text-sm dark:border-white/10 sm:grid-cols-2">
        <div>
          <dt className="text-neutral-500 dark:text-neutral-400">역할</dt>
          <dd className="mt-0.5">{project.role}</dd>
        </div>
        <div>
          <dt className="text-neutral-500 dark:text-neutral-400">기간</dt>
          <dd className="mt-0.5">{project.period}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline underline-offset-4 hover:no-underline"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  </article>
);
