import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider, themeInitScript } from "@/components/ui/ThemeProvider";
import { getProfile } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const generateMetadata = async (): Promise<Metadata> => {
  const profile = await getProfile();
  const title = `${profile.name} — ${profile.title}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description: profile.description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: "/",
      siteName: title,
      title,
      description: profile.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="ko"
    suppressHydrationWarning
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
    </head>
    <body className="min-h-full">
      <ThemeProvider>{children}</ThemeProvider>
    </body>
    {gaId && <GoogleAnalytics gaId={gaId} />}
  </html>
);

export default RootLayout;
