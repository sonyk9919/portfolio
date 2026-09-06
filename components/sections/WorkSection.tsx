"use client";

import { WorkGroupItem } from "@/components/sections/WorkGroupItem";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { WorkGroup } from "@/types/content";

type Props = {
  groups: WorkGroup[];
  openSlug: string | null;
  onToggle: (slug: string) => void;
  onRegister: (slug: string, node: HTMLElement | null) => void;
};

export const WorkSection = ({
  groups,
  openSlug,
  onToggle,
  onRegister,
}: Props) => (
  <section
    id="work"
    className="mx-auto max-w-3xl scroll-mt-20 px-6 py-32 lg:max-w-4xl lg:px-10"
  >
    <SectionTitle index="02" label="Work" />
    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
      소속별로 참여한 프로젝트입니다. 항목을 누르면 자세한 내용이 열립니다.
    </p>

    <ol className="mt-14 space-y-16 border-l border-black/10 dark:border-white/12">
      {groups.map((group) => (
        <WorkGroupItem
          key={group.slug}
          group={group}
          openSlug={openSlug}
          onToggle={onToggle}
          onRegister={onRegister}
        />
      ))}
    </ol>
  </section>
);
