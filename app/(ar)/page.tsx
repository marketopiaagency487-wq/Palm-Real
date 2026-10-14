import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { ar } from "@/lib/content";
import { SITE_URL } from "@/lib/fonts";

export const metadata: Metadata = {
  title: ar.seo.title,
  description: ar.seo.description,
  keywords: ar.seo.keywords,
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
      en: "/en",
      "x-default": "/en",
    },
  },
  openGraph: {
    title: ar.seo.title,
    description: ar.seo.description,
    url: `${SITE_URL}/`,
    siteName: "Palm Gardens at PX",
    locale: ar.seo.ogLocale,
    type: "website",
    images: [{ url: "/images/render-4.jpg", width: 1600, height: 1298, alt: "Palm Gardens at PX" }],
  },
  twitter: { card: "summary_large_image", title: ar.seo.title, description: ar.seo.description },
};

export default function ArabicPage() {
  return <Landing d={ar} />;
}
