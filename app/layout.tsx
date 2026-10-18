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
    "Dev",
    "Dev Borah",
    "Bitupan",
    "Bitupan Borah",
    "bitz",
    "bitz.dev",
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
    "https://instagram.com/bitz.dev",
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
    "Bitupan Borah (Dev / Bitupan / Dev Borah / bitz.dev / bitz / bitzzdev) - Software Developer & Web Developer in Assam, India crafting pixel-perfect, high-performance web experiences.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bitz.is-a.dev"),
  title: "bitz.is-a.dev: Bitupan Borah (Dev) — Software Developer & Web Developer | Assam, India",
  description:
    "Portfolio of Bitupan Borah (Dev / Dev Borah / bitz.dev / bitzzdev), a software developer & web developer in Assam, India crafting high-performance, pixel-perfect web experiences.",
  keywords: [
    "Dev",
    "bitupan",
    "bitupan borah",
    "dev borah",
    "software developer",
    "software developer assam",
    "software developer india",
    "software developer assam/india",
    "bitz.dev",
    "bitz",
    "bitzzdev",
    "bitz.is-a.dev",
    "web developer",
    "full stack developer",
    "next.js developer",
    "react developer",
    "freelance software developer assam",
  ],
  authors: [{ name: "Bitupan Borah", url: "https://bitz.is-a.dev" }],
  creator: "Bitupan Borah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitz.is-a.dev",
    siteName: "bitz.is-a.dev",
    title: "bitz.is-a.dev | Bitupan Borah (Dev) — Software Developer in Assam, India",
    description:
      "Portfolio of Bitupan Borah (Dev / Dev Borah / bitz.dev / bitzzdev), a software developer & web developer in Assam, India.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "bitz.is-a.dev - Bitupan Borah (Dev) - Software Developer Assam India",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "bitz.is-a.dev | Bitupan Borah (Dev) — Software Developer",
    description:
      "Bitupan Borah (Dev / Dev Borah / bitz.dev / bitzzdev) - Software Developer & Web Developer in Assam, India.",
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