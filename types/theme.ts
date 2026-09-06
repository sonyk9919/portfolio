export type Theme = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};
