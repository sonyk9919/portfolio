"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { useAnchoredToggle } from "@/components/ui/useAnchoredToggle";
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
  const { openSlug, toggle, register } = useAnchoredToggle();

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
          openSlug={openSlug}
          onToggle={toggle}
          onRegister={register}
        />
        <ContactSection profile={profile} />
      </main>
    </>
  );
};
