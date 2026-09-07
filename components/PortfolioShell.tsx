"use client";

import { useState } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SiteHeader } from "@/components/ui/SiteHeader";
import type { Navigator, Profile, WorkGroup } from "@/types/content";

type Props = {
  navigator: Navigator;
  profile: Profile;
  workGroups: WorkGroup[];
};

export const PortfolioShell = ({
  navigator,
  profile,
  workGroups,
}: Props) => {
  const [openSlugs, setOpenSlugs] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const toggle = (slug: string) =>
    setOpenSlugs((current) => {
      const next = new Set(current);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });

  const navSections = navigator.sections.filter(
    (section) => section.nav !== false,
  );

  return (
    <>
      <SiteHeader nameEn={profile.nameEn} sections={navSections} />

      <main id="top">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <WorkSection
          groups={workGroups}
          openSlugs={openSlugs}
          onToggle={toggle}
        />
        <ContactSection profile={profile} />
      </main>
    </>
  );
};
