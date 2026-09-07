import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Profile } from "@/types/content";

type Props = {
  profile: Profile;
};

export const ContactSection = ({ profile }: Props) => (
  <section
    id="contact"
    className="mx-auto max-w-3xl scroll-mt-20 px-6 pb-32 pt-20 lg:max-w-4xl lg:px-10"
  >
    <SectionTitle index="03" label="Contact" />

    <a
      href={`mailto:${profile.email}`}
      className="mt-10 block text-3xl font-semibold tracking-tight underline decoration-1 underline-offset-8 sm:text-4xl"
    >
      {profile.email}
    </a>

    <div className="mt-8 flex flex-wrap gap-5">
      {profile.socials.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          {social.label} ↗
        </a>
      ))}
    </div>

    <p className="mt-14 text-sm text-neutral-500 dark:text-neutral-500">
      {profile.location}
    </p>
  </section>
);
