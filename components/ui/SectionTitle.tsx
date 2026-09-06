type Props = {
  index: string;
  label: string;
};

export const SectionTitle = ({ index, label }: Props) => (
  <div className="flex items-baseline gap-4">
    <span className="font-mono text-sm text-neutral-400 dark:text-neutral-600">
      {index}
    </span>
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{label}</h2>
  </div>
);
