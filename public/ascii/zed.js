<canvas id="ascii-zed-logo-black" role="img" aria-label="zed logo black" style="width: 100%; max-width: 640px"></canvas>
<script type="module">
import { mount } from "https://ascii.rest/mount.js";

// zed logo black, drawn in ascii on https://ascii.rest/make/
const meta = {
  name: "zed logo black",
  category: "companies",
  note: "the zed logo black logo, glinting now and then",
  cols: 64,
  rows: 32,
  fps: 30,
  options: { shine: 5 },
  // The logo's colour for a light page, then for a dark one; each as drawn, then twice lighter for the glint.
  palette: [
    "#000000", "#595959", "#b3b3b3", "#e8ebef", "#f0f2f5", "#f8f9fa",
  ],
};

// In a <pre>, in the page's own colour.
const MONO = String.raw`

   _pp88888888888888888888888888888888888888888888888888888q,
  )888888888888888888888888888888888888888888888888888888888P
  8888'                                              _p8888P'
  8888                                             _p8888P'
  8888                                           _p8888P'
  8888       _pq8888888888888888888888888888888888888P'
  8888      q88888888888888888888888888888888888888P'     _qqq
  8888      d888'                          _p8888P'       8888
  8888      d888                         _p8888P'         8888
  8888      d888                       _p8888P'           8888
  8888      d888       _pqqqqqqqqqqqqqp8888P'             8888
  8888      d888      |888888888888888888P'     qqqp      8888
  8888      d888      |888(''''''_p8888P'       888b      8888
  8888      d888      |888|    _p8888P'         888b      8888
  8888      d888             _p8888P'           888b      8888
  8888      d888           _p8888P'   ...       888b      8888
  8888      d888         _p8888P'    |888|      888b      8888
  8888      d888       _p8888P_______)888|      888b      8888
  8888      d888     _p888888888888888888|      888b      8888
  8888             _p888888888888888888P"       888b      8888
  8888           _p8888P'                       888b      8888
  8888         _p8888P'                         888b      8888
  8888       _p8888P'                          .888b      8888
  """"     _p88888888888888888888888888888888888888P      8888
         _p88888888888888888888888888888888888888P"       8888
       _p8888P'                                           8888
     _p8888P'                                             8888
   .p8888P'                                              _8888
   q888888888888888888888888888888888888888888888888888888888"
   "8888888888888888888888888888888888888888888888888888888P'

`;

// On a canvas, and the colour of each cell: an index into the logo's colours.
const ART = String.raw`

   _pp88888888888888888888888888888888888888888888888888888q,
  )888888888888888888888888888888888888888888888888888888888P
  8888'                                              _p8888P'
  8888                                             _p8888P'
  8888                                           _p8888P'
  8888       _pq8888888888888888888888888888888888888P'
  8888      q88888888888888888888888888888888888888P'     _qqq
  8888      d888'                          _p8888P'       8888
  8888      d888                         _p8888P'         8888
  8888      d888                       _p8888P'           8888
  8888      d888       _pqqqqqqqqqqqqqp8888P'             8888
  8888      d888      |888888888888888888P'     qqqp      8888
  8888      d888      |888(''''''_p8888P'       888b      8888
  8888      d888      |888|    _p8888P'         888b      8888
  8888      d888             _p8888P'           888b      8888
  8888      d888           _p8888P'   ...       888b      8888
  8888      d888         _p8888P'    |888|      888b      8888
  8888      d888       _p8888P_______)888|      888b      8888
  8888      d888     _p888888888888888888|      888b      8888
  8888             _p888888888888888888P"       888b      8888
  8888           _p8888P'                       888b      8888
  8888         _p8888P'                         888b      8888
  8888       _p8888P'                          .888b      8888
  """"     _p88888888888888888888888888888888888888P      8888
         _p88888888888888888888888888888888888888P"       8888
       _p8888P'                                           8888
     _p8888P'                                             8888
   .p8888P'                                              _8888
   q888888888888888888888888888888888888888888888888888888888"
   "8888888888888888888888888888888888888888888888888888888P'

`;
const INK = String.raw`

   0000000000000000000000000000000000000000000000000000000000
  00000000000000000000000000000000000000000000000000000000000
  00000                                              00000000
  0000                                             00000000
  0000                                           00000000
  0000       000000000000000000000000000000000000000000
  0000      00000000000000000000000000000000000000000     0000
  0000      00000                          00000000       0000
  0000      0000                         00000000         0000
  0000      0000                       00000000           0000
  0000      0000       0000000000000000000000             0000
  0000      0000      000000000000000000000     0000      0000
  0000      0000      0000000000000000000       0000      0000
  0000      0000      00000    00000000         0000      0000
  0000      0000             00000000           0000      0000
  0000      0000           00000000   000       0000      0000
  0000      0000         00000000    00000      0000      0000
  0000      0000       0000000000000000000      0000      0000
  0000      0000     000000000000000000000      0000      0000
  0000             0000000000000000000000       0000      0000
  0000           00000000                       0000      0000
  0000         00000000                         0000      0000
  0000       00000000                          00000      0000
  0000     00000000000000000000000000000000000000000      0000
         000000000000000000000000000000000000000000       0000
       00000000                                           0000
     00000000                                             0000
   00000000                                              00000
   00000000000000000000000000000000000000000000000000000000000
   0000000000000000000000000000000000000000000000000000000000

`;

const START = 0.5; // seconds before the first glint
const PASS = 2; // seconds a glint takes to cross
const HALF = 5; // half its width, in cells
const LEAN = 0.9; // cells it shifts left a row down, so it leans like a slash
const SOLID = "8dbqpPYOo0"; // what the glint turns to slashes; thin edges keep their shape

const lines = (art) => art.slice(1, -1).split("\n").map((line) => line.padEnd(meta.cols));

function zedLogoBlack({ shine = meta.options.shine } = {}) {
  const { cols, rows } = meta;
  const mono = lines(MONO), art = lines(ART), ink = lines(INK);
  const n = meta.palette.length / 6;
  const every = shine > 0 ? Math.max(shine, PASS + 0.5) : 0;
  // The glint crosses the logo's ink, edge to edge, rather than the whole frame.
  let lo = Infinity, hi = -Infinity;
  for (const pic of [mono, art])
    pic.forEach((line, y) => {
      for (let x = 0; x < cols; x++) if (line[x] !== " ") (lo = Math.min(lo, x + LEAN * y)), (hi = Math.max(hi, x + LEAN * y));
    });
  const span = hi - lo + 2 * HALF;

  return (t, { paper = false, color } = {}) => {
    const pic = color ? art : mono;
    const since = t - START;
    const at = every && since >= 0 ? lo - HALF + (span * (since % every)) / PASS : -Infinity;
    const out = [];
    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        let ch = pic[y][x];
        if (ch !== " ") {
          const d = Math.abs(x + LEAN * y - at);
          let k = d < HALF ? 1 - d / HALF : 0;
          k = k * k * (3 - 2 * k);
          if (k > 0.55 && SOLID.includes(ch)) ch = "/";
          if (color) color[y * cols + x] = (paper ? 0 : 3 * n) + (k > 0.6 ? 2 : k > 0.25 ? 1 : 0) * n + parseInt(ink[y][x], 36);
        }
        line += ch;
      }
      out.push(line);
    }
    return out.join("\n");
  };
}

mount(document.getElementById("ascii-zed-logo-black"), { meta, default: zedLogoBlack });
</script>
