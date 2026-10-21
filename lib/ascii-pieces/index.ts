// Export all 10 curated pieces requested by the user from ascii.rest
import * as alpineDawnModule from "./alpine-dawn.js";
import * as auroraFjordModule from "./aurora-fjord.js";
import * as blackPrismModule from "./black-prism.js";
import * as cloudSeaModule from "./cloud-sea.js";
import * as deepReefModule from "./deep-reef.js";
import * as desertNightModule from "./desert-night.js";
import * as earthriseModule from "./earthrise.js";
import * as edgeOrbitModule from "./edge-orbit.js";
import * as kyotoDuskModule from "./kyoto-dusk.js";
import * as tokyoRainModule from "./tokyo-rain.js";

export const CURATED_PIECES = [
  alpineDawnModule,
  auroraFjordModule,
  blackPrismModule,
  cloudSeaModule,
  deepReefModule,
  desertNightModule,
  earthriseModule,
  edgeOrbitModule,
  kyotoDuskModule,
  tokyoRainModule,
];

export const PIECE_BY_SLUG: Record<string, any> = {
  "alpine-dawn": alpineDawnModule,
  "aurora-fjord": auroraFjordModule,
  "black-prism": blackPrismModule,
  "cloud-sea": cloudSeaModule,
  "deep-reef": deepReefModule,
  "desert-night": desertNightModule,
  "earthrise": earthriseModule,
  "edge-orbit": edgeOrbitModule,
  "kyoto-dusk": kyotoDuskModule,
  "tokyo-rain": tokyoRainModule,
};
