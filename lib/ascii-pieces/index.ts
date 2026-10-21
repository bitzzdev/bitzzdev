// Dynamic piece loaders for lazy-loading on demand (only when animating in viewport)
export interface SceneConfig {
  name: string;
  slug: string;
  load: () => Promise<any>;
}

export const PROJECT_BANNER_CONFIGS: SceneConfig[] = [
  { name: "saturn rise", slug: "saturn-rise", load: () => import("./saturn-rise.js") },
  { name: "green storm", slug: "green-storm", load: () => import("./green-storm.js") },
  { name: "jungle falls", slug: "jungle-falls", load: () => import("./jungle-falls.js") },
  { name: "lantern lake", slug: "lantern-lake", load: () => import("./lantern-lake.js") },
  { name: "marine drive", slug: "marine-drive", load: () => import("./marine-drive.js") },
  { name: "misty forest", slug: "misty-forest", load: () => import("./misty-forest.js") },
  { name: "night coast", slug: "night-coast", load: () => import("./night-coast.js") },
  { name: "alpine dawn", slug: "alpine-dawn", load: () => import("./alpine-dawn.js") },
  { name: "aurora fjord", slug: "aurora-fjord", load: () => import("./aurora-fjord.js") },
  { name: "black prism", slug: "black-prism", load: () => import("./black-prism.js") },
  { name: "cloud sea", slug: "cloud-sea", load: () => import("./cloud-sea.js") },
  { name: "deep reef", slug: "deep-reef", load: () => import("./deep-reef.js") },
  { name: "desert night", slug: "desert-night", load: () => import("./desert-night.js") },
  { name: "earthrise", slug: "earthrise", load: () => import("./earthrise.js") },
  { name: "edge orbit", slug: "edge-orbit", load: () => import("./edge-orbit.js") },
  { name: "kyoto dusk", slug: "kyoto-dusk", load: () => import("./kyoto-dusk.js") },
  { name: "tokyo rain", slug: "tokyo-rain", load: () => import("./tokyo-rain.js") },
];
