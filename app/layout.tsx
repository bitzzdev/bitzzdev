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
  "alternateName": ["bitz", "bitz.dev", "bitzdev", "bitzzdev", "bitz.is-a.dev"],
  "url": "https://bitz.is-a.dev",
  "image": "https://bitz.is-a.dev/favicon.png",
  "jobTitle": "Software Developer & Web Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "bitz.dev",
  },
  "sameAs": ["https://github.com/bitzzdev"],
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
    "Bitupan Borah (bitz / bitz.dev / bitzdev / bitzzdev / bitz.is-a.dev) - Freelance Software Developer & Web Developer crafting pixel-perfect, high-performance web experiences.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bitz.is-a.dev"),
  title: {
    default: "bitz.dev | Bitupan Borah — Software Developer & Web Developer",
    template: "%s | bitz.dev",
  },
  description:
    "bitz.dev (bitz / bitzdev / bitzzdev / bitz.is-a.dev) - Bitupan Borah is a freelance Software Developer & Web Developer crafting pixel-perfect, high-performance web experiences.",
  keywords: [
    "bitz",
    "bitz.dev",
    "bitz.is-a.dev",
    "bitzdev",
    "bitzzdev",
    "software developer",
    "web developer",
    "freelance web developer",
    "freelance software developer",
    "bitz software developer",
    "bitz web developer",
    "bitz.dev software developer",
    "bitz.dev web developer",
    "bitz.is-a.dev web developer",
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
  publisher: "bitz.dev",
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
    siteName: "bitz.dev",
    title: "bitz.dev | Bitupan Borah — Software Developer & Web Developer",
    description:
      "Portfolio of Bitupan Borah (bitz / bitz.dev / bitzdev / bitzzdev / bitz.is-a.dev), a freelance Software Developer & Web Developer crafting high-performance digital products.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "bitz.dev - Software Developer & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bitz.dev | Bitupan Borah — Software Developer & Web Developer",
    description:
      "Bitupan Borah (bitz / bitz.dev / bitzdev / bitzzdev / bitz.is-a.dev) - Freelance Software Developer & Web Developer crafting pixel-perfect web applications.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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