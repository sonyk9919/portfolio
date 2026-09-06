type Props = {
  html: string;
  className?: string;
};

export const Markdown = ({ html, className = "" }: Props) => (
  <div
    className={`prose-portfolio ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
