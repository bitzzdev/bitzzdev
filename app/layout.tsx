import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
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
    "Bitupan Borah (bitz / bitz.is-a.dev / bitzdev / bitzzdev / bitzzdev.vercel.app / bitzdev.vercel.app) - Freelance Software Developer & Web Developer crafting pixel-perfect, high-performance web experiences.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bitz.is-a.dev"),
  title: {
    default: "bitz.is-a.dev | Bitupan Borah — Software Developer & Web Developer",
    template: "%s | bitz.is-a.dev",
  },
  description:
    "bitz.is-a.dev (bitz / bitzdev / bitzzdev / bitzzdev.vercel.app / bitzdev.vercel.app) - Bitupan Borah is a freelance Software Developer & Web Developer crafting pixel-perfect, high-performance web experiences.",
  keywords: [
    "bitz",
    "bitz.is-a.dev",
    "bitzzdev.vercel.app",
    "bitzdev.vercel.app",
    "bitzdev",
    "bitzzdev",
    "software developer",
    "web developer",
    "freelance web developer",
    "freelance software developer",
    "bitz software developer",
    "bitz web developer",
    "bitz.is-a.dev software developer",
    "bitz.is-a.dev web developer",
    "bitzzdev.vercel.app software developer",
    "bitzdev.vercel.app web developer",
    "bitzzdev developer",
    "bitzdev software developer",
    "bitzdev web developer",
    "frontend developer",
    "full stack developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "Bitupan Borah",
  ],
  authors: [{ name: "Bitupan Borah", url: "https://bitz.is-a.dev" }],
  creator: "Bitupan Borah",
  publisher: "bitz.is-a.dev",
  alternates: {
    canonical: "https://bitz.is-a.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitz.is-a.dev",
    siteName: "bitz.is-a.dev",
    title: "bitz.is-a.dev | Bitupan Borah — Software Developer & Web Developer",
    description:
      "Portfolio of Bitupan Borah (bitz / bitz.is-a.dev / bitzdev / bitzzdev / bitzzdev.vercel.app / bitzdev.vercel.app), a freelance Software Developer & Web Developer crafting high-performance digital products.",
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
    card: "summary_large_image",
    title: "bitz.is-a.dev | Bitupan Borah — Software Developer & Web Developer",
    description:
      "Bitupan Borah (bitz / bitz.is-a.dev / bitzdev / bitzzdev / bitzzdev.vercel.app / bitzdev.vercel.app) - Freelance Software Developer & Web Developer crafting pixel-perfect web applications.",
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
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}