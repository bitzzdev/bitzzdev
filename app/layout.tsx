import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bitupan Borah",
  "alternateName": [
    "bitz",
    "bitz.is-a.dev",
    "bitzdev",
    "bitzzdev",
    "bitzzdev.vercel.app",
    "bitzdev.vercel.app",
  ],
  "url": "https://bitz.is-a.dev",
  "image": "https://bitz.is-a.dev/favicon.png",
  "jobTitle": "Software Developer & Web Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "bitz.is-a.dev",
  },
  "sameAs": [
    "https://github.com/bitzzdev",
    "https://bitzzdev.vercel.app",
    "https://bitzdev.vercel.app",
  ],
  "knowsAbout": [
    "Software Development",
    "Web Development",
    "Frontend Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Full Stack Development",
    "UI/UX Engineering",
  ],
  "description":
    "Bitupan Borah (bitz / bitz.is-a.dev / bitzdev / bitzzdev) - Software Developer & Web Developer crafting pixel-perfect, high-performance web experiences.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bitz.is-a.dev"),
  title: "bitz.is-a.dev: Bitupan Borah — Software Developer & Web Developer",
  description:
    "Software Developer & Web Developer crafting high-performance, pixel-perfect web experiences. Text and ASCII-first portfolio.",
  keywords: [
    "bitz",
    "bitz.is-a.dev",
    "Bitupan Borah",
    "bitzdev",
    "bitzzdev",
    "Software Developer",
    "Web Developer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Bitupan Borah", url: "https://bitz.is-a.dev" }],
  creator: "Bitupan Borah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitz.is-a.dev",
    siteName: "bitz.is-a.dev",
    title: "bitz.is-a.dev | Bitupan Borah — Software Developer & Web Developer",
    description:
      "Portfolio of Bitupan Borah, a software developer crafting high-performance digital products.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "bitz.is-a.dev - Software Developer & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "bitz.is-a.dev | Bitupan Borah — Software Developer & Web Developer",
    description:
      "Bitupan Borah - Software Developer & Web Developer crafting pixel-perfect web applications.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "google8c5cc6188709f829",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement,s=null;try{s=localStorage.getItem("theme")}catch(e){}var t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");r.dataset.theme=t;})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}