import { Markdown } from "@/components/ui/Markdown";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Profile } from "@/types/content";

type Props = {
  profile: Profile;
};

export const AboutSection = ({ profile }: Props) => (
  <section
    id="about"
    className="mx-auto max-w-3xl scroll-mt-20 px-6 py-32 lg:max-w-4xl lg:px-10"
  >
    <SectionTitle index="01" label="About" />

    <Markdown
      html={profile.bodyHtml}
      className="mt-10 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
    />

    <div className="mt-14 grid gap-6 sm:grid-cols-2">
      {profile.skills.map((group) => (
        <div
          key={group.category}
          className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <h3 className="text-xs font-semibold tracking-widest text-neutral-500 dark:text-neutral-400">
            {group.category.toUpperCase()}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full bg-black/5 px-3 py-1 text-sm dark:bg-white/10"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
