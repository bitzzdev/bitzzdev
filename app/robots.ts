import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ascii/", "/ascii-posters/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/me.png", "/favicon.png"],
        disallow: ["/ascii/", "/ascii-posters/"],
      },
    ],
    sitemap: "https://bitz.is-a.dev/sitemap.xml",
  };
}
