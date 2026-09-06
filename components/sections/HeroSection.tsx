import type { Profile } from "@/types/content";

type Props = {
  profile: Profile;
};

export const HeroSection = ({ profile }: Props) => (
  <section className="flex min-h-[90vh] items-center px-6">
    <div className="mx-auto w-full max-w-3xl lg:max-w-4xl lg:px-10">
      <p className="text-sm font-medium tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
        {profile.title.toUpperCase()}
      </p>

      <h1 className="mt-5 text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
        {profile.name}
      </h1>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          프로젝트 보기
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          연락하기
        </a>
      </div>

      {profile.stats.length > 0 && (
        <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-6">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-neutral-500 dark:text-neutral-500">
                {stat.label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  </section>
);
