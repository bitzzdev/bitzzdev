import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const CANONICAL_URL = "https://bitz.is-a.dev";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${CANONICAL_URL}/#person`,
  "name": "Bitupan Borah",
  "givenName": "Bitupan",
  "familyName": "Borah",
  "alternateName": [
    "Dev Borah",
    "Dev",
    "bitz.dev",
    "bitzzdev"
  ],
  "birthDate": "2008-08-25",
  "gender": "Male",
  "nationality": {
    "@type": "Country",
    "name": "India"
  },
  "homeLocation": {
    "@type": "Place",
    "name": "Assam, India"
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Assam",
    "addressCountry": "India"
  },
  "url": CANONICAL_URL,
  "image": `${CANONICAL_URL}/me.png`,
  "jobTitle": "Software Developer & Web Developer",
  "description": "Dev Borah (Bitupan Borah), also known as @bitz.dev and @bitzzdev, is a software developer, web developer, and open-source creator from Assam, India specializing in high-performance web applications and systems engineering.",
  "sameAs": [
    "https://github.com/bitzzdev",
    "https://instagram.com/bitz.dev",
    "https://bitzzdev.vercel.app",
    "https://bitzdev.vercel.app"
  ],
  "knowsAbout": [
    "Software Development",
    "Web Development",
    "Frontend Engineering",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Open Source Software",
    "Performance Optimization"
  ],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": CANONICAL_URL
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${CANONICAL_URL}/#website`,
  "url": CANONICAL_URL,
  "name": "bitz.is-a.dev — Dev Borah (Bitupan Borah)",
  "alternateName": ["bitz.is-a.dev", "Dev Borah Portfolio", "Bitupan Borah Portfolio"],
  "description": "Official personal portfolio of Dev Borah (Bitupan Borah), software developer & web developer in Assam, India.",
  "publisher": {
    "@id": `${CANONICAL_URL}/#person`
  },
  "inLanguage": "en"
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${CANONICAL_URL}/#profilepage`,
  "url": CANONICAL_URL,
  "name": "Dev Borah (Bitupan Borah) — Software Developer Profile",
  "isPartOf": {
    "@id": `${CANONICAL_URL}/#website`
  },
  "mainEntity": {
    "@id": `${CANONICAL_URL}/#person`
  }
};

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd, profilePageJsonLd]
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: {
    default: "Dev Borah (Bitupan Borah) — Software & Web Developer | Assam, India",
    template: "%s | Dev Borah",
  },
  description:
    "Official website of Dev Borah (Bitupan Borah / @bitz.dev / @bitzzdev), a software developer and open-source creator from Assam, India building high-performance web applications.",
  keywords: [
    "Bitupan Borah",
    "Dev Borah",
    "Dev",
    "bitupan",
    "bitupan borah software developer",
    "dev borah software developer",
    "bitz.dev",
    "bitzzdev",
    "bitz.is-a.dev",
    "software developer assam",
    "software developer india",
    "web developer assam",
    "web developer india",
    "full stack developer",
    "frontend developer",
    "next.js developer",
    "react developer",
    "open source creator",
  ],
  authors: [{ name: "Dev Borah", url: CANONICAL_URL }],
  creator: "Dev Borah",
  publisher: "Dev Borah",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: CANONICAL_URL,
    siteName: "bitz.is-a.dev",
    title: "Dev Borah (Bitupan Borah) — Software & Web Developer",
    description:
      "Official website and portfolio of Dev Borah (Bitupan Borah / @bitz.dev / @bitzzdev) — software developer and open-source creator based in Assam, India.",
    firstName: "Dev",
    lastName: "Borah",
    username: "bitzzdev",
    gender: "male",
    images: [
      {
        url: "/me.png",
        width: 1215,
        height: 1295,
        alt: "Dev Borah (Bitupan Borah) — Software & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Borah (Bitupan Borah) — Software & Web Developer",
    description:
      "Official portfolio of Dev Borah (Bitupan Borah / @bitz.dev / @bitzzdev) — software developer in Assam, India.",
    images: ["/me.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "google8c5cc6188709f829",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}