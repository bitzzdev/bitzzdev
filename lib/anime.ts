import * as animeModule from "animejs";

// Handle CJS / ESM default export compatibility in TypeScript
const anime = (animeModule as any).default || animeModule;

export default anime;
