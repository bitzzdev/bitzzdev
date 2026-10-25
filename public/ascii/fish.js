<canvas id="ascii-fishshell-streamline-simple-icon" role="img" aria-label="fishshell streamline simple icon" style="width: 100%; max-width: 640px"></canvas>
<script type="module">
import { mount } from "https://ascii.rest/mount.js";

// fishshell streamline simple icon, drawn in ascii on https://ascii.rest/make/
const meta = {
  name: "fishshell streamline simple icon",
  category: "companies",
  note: "the fishshell streamline simple icon logo, glinting now and then",
  cols: 64,
  rows: 21,
  fps: 30,
  options: { shine: 5 },
  // The logo's colour for a light page, then for a dark one; each as drawn, then twice lighter for the glint.
  palette: [
    "#000000", "#595959", "#b3b3b3", "#e8ebef", "#f0f2f5", "#f8f9fa",
  ],
};

// In a <pre>, in the page's own colour.
const MONO = String.raw`

                         _88q_
                       _88P"88q_
                    .p88P'   "88q_
                    __'        '''
             __pp88888888qqq_,
           q88P"""'     '""Y88qp                   ._pppqqq_
       _pp "'                 '" q_             _p 'P"""""888,
     _p88(                       O88q,       .p88P         88p
   _p88"    qqp                   'Y88q,   _p88P"     .,__p88"
  q88"      d8P                     'Y88p q88P'       88888q,
  "888q,                           _p88P' 'Y88q_          "88p
    'Y88q,                       _p88"       "88q_         |88
       "8|                       d8"           "88 __,    _p8P
         ' 8qq_,           __ppP '               " Y8888888P"
            ""888qqqqqppp888P"'
                '""""^""""'
                  88p
                  )8b
                   )8|

`;

// On a canvas, and the colour of each cell: an index into the logo's colours.
const ART = String.raw`

                         _88q_
                       _88P"88q_
                    .p88P'   "88q_
                    __'        '''
             __pp88888888qqq_,
           q88P"""'     '""Y88qp                   ._pppqqq_
       _pp "'                 '" q_             _p 'P"""""888,
     _p88(                       O88q,       .p88P         88p
   _p88"    qqp                   'Y88q,   _p88P"     .,__p88"
  q88"      d8P                     'Y88p q88P'       88888q,
  "888q,                           _p88P' 'Y88q_          "88p
    'Y88q,                       _p88"       "88q_         |88
       "8|                       d8"           "88 __,    _p8P
         ' 8qq_,           __ppP '               " Y8888888P"
            ""888qqqqqppp888P"'
                '""""^""""'
                  88p
                  )8b
                   )8|

`;
const INK = String.raw`

                         00000
                       000000000
                    000000   00000
                    000        000
             00000000000000000
           00000000     00000000                   000000000
       000 00                 00 00             00 00000000000
     00000                       00000       00000         000
   00000    000                   000000   000000     00000000
  0000      000                     00000 00000       0000000
  000000                           000000 000000          0000
    000000                       00000       00000         000
       000                       000           000 000    0000
         0 00000           00000 0               0 0000000000
            0000000000000000000
                00000000000
                  000
                  000
                   000

`;

const START = 0.5; // seconds before the first glint
const PASS = 2; // seconds a glint takes to cross
const HALF = 5; // half its width, in cells
const LEAN = 0.9; // cells it shifts left a row down, so it leans like a slash
const SOLID = "8dbqpPYOo0"; // what the glint turns to slashes; thin edges keep their shape

const lines = (art) => art.slice(1, -1).split("\n").map((line) => line.padEnd(meta.cols));

function fishshellStreamlineSimpleIcon({ shine = meta.options.shine } = {}) {
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

mount(document.getElementById("ascii-fishshell-streamline-simple-icon"), { meta, default: fishshellStreamlineSimpleIcon });
</script>
