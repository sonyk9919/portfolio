import { sendGAEvent } from "@next/third-parties/google";

const isEnabled = () => Boolean(process.env.NEXT_PUBLIC_GA_ID);

export const trackProjectOpen = (slug: string, title: string) => {
  if (!isEnabled()) return;
  sendGAEvent("event", "project_open", { project_slug: slug, project_title: title });
};

export const trackLinkClick = (label: string, href: string) => {
  if (!isEnabled()) return;
  sendGAEvent("event", "outbound_click", { link_label: label, link_href: href });
};
