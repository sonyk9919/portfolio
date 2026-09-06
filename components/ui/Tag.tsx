type Props = {
  children: React.ReactNode;
  muted?: boolean;
};

export const Tag = ({ children, muted = false }: Props) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-xs ${
      muted
        ? "bg-white/15 text-neutral-200 dark:bg-white/10"
        : "bg-black/5 text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
    }`}
  >
    {children}
  </span>
);
