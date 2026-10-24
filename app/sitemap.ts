import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://bitz.is-a.dev",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        "https://bitz.is-a.dev/me.png",
        "https://bitz.is-a.dev/favicon.png",
      ],
    },
  ];
}
