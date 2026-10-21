// Exactly the 17 requested scenes from ascii.rest for project banners
// The original 10 requested scenes:
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

// The 7 requested scenes:
import * as saturnRiseModule from "./saturn-rise.js";
import * as greenStormModule from "./green-storm.js";
import * as jungleFallsModule from "./jungle-falls.js";
import * as lanternLakeModule from "./lantern-lake.js";
import * as marineDriveModule from "./marine-drive.js";
import * as mistyForestModule from "./misty-forest.js";
import * as nightCoastModule from "./night-coast.js";

// Ordered so each project repo banner gets a unique, non-repeated scene!
export const PROJECT_BANNER_PIECES = [
  saturnRiseModule,
  greenStormModule,
  jungleFallsModule,
  lanternLakeModule,
  marineDriveModule,
  mistyForestModule,
  nightCoastModule,
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
