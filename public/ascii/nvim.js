<canvas id="ascii-neovim-mark" role="img" aria-label="neovim mark" style="width: 100%; max-width: 530px"></canvas>
<script type="module">
import { mount } from "https://ascii.rest/mount.js";

// neovim mark, drawn in ascii on https://ascii.rest/make/
const meta = {
  name: "neovim mark",
  category: "companies",
  note: "the neovim mark logo, glinting now and then",
  cols: 53,
  rows: 32,
  fps: 30,
  options: { shine: 5 },
  // The logo's 5 colours for a light page, then for a dark one; each as drawn, then twice lighter for the glint.
  palette: [
    "#1174c3", "#6fb653", "#50923c", "#62a441", "#1391d8", "#64a5d8",
    "#a1d08f", "#8db880", "#99c484", "#66b8e6", "#b8d5ed", "#d4e9cb",
    "#cbdec5", "#d0e4c6", "#b8def3", "#1174c3", "#6fb653", "#50923c",
    "#62a441", "#1391d8", "#64a5d8", "#a1d08f", "#8db880", "#99c484",
    "#66b8e6", "#b8d5ed", "#d4e9cb", "#cbdec5", "#d0e4c6", "#b8def3",
  ],
};

// In a <pre>, in the page's own colour.
const MONO = String.raw`

             _p,                      q_
           _p888(                     88q_
         _p888888q,                   8888q_
       _p888888888q,                  888888q_
     _p8888888888888_                 88888888q,
   _p8888888888888888q                8888888888q,
  q8888888888888888888q,              888888888888p
  8888888888888888888888_             8888888888888
  88888888888888888888888q            8888888888888
  888888888888888888888888q,          8888888888888
  88888888888888888888888888,         8888888888888
  888888888888888888888888888p        8888888888888
  888888888888b"88888888888888q,      8888888888888
  888888888888p "888888888888888,     8888888888888
  888888888888p  'O88888888888888(    8888888888888
  888888888888p    "88888888888888q,  8888888888888
  888888888888p     "88888888888888q, 8888888888888
  888888888888p      'O88888888888888(8888888888888
  888888888888p        Y888888888888888888888888888
  888888888888p         "88888888888888888888888888
  888888888888p          '8888888888888888888888888
  888888888888p            Y88888888888888888888888
  888888888888p             "8888888888888888888888
  O88888888888p              '88888888888888888888P
   "O888888888p                Y8888888888888888P"
     "O8888888p                 "88888888888888"
       "O88888p                  "88888888888"
         "O888p                    Y8888888"
           "O8p                     "8888"
             "Y                      "8"

`;

// On a canvas, and the colour of each cell: an index into the logo's colours.
const ART = String.raw`

             _p,                      q_
           _p888(                     88q_
         _p888888q,                   8888q_
       _p888888888q,                  888888q_
     _p8888888888888_                 88888888q,
   _p8888888888888888q                8888888888q,
  q8888888888888888888q,              888888888888p
  8888888888888888888888_             8888888888888
  88888888888888888888888q            8888888888888
  888888888888888888888888q,          8888888888888
  88888888888888888888888888,         8888888888888
  888888888888888888888888888p        8888888888888
  888888888888b"88888888888888q,      8888888888888
  888888888888p "888888888888888,     8888888888888
  888888888888p  'O88888888888888(    8888888888888
  888888888888p    "88888888888888q,  8888888888888
  888888888888p     "88888888888888q, 8888888888888
  888888888888p      'O88888888888888(8888888888888
  888888888888p        Y888888888888888888888888888
  888888888888p         "88888888888888888888888888
  888888888888p          '8888888888888888888888888
  888888888888p            Y88888888888888888888888
  888888888888p             "8888888888888888888888
  O88888888888p              '88888888888888888888P
   "O888888888p                Y8888888888888888P"
     "O8888888p                 "88888888888888"
       "O88888p                  "88888888888"
         "O888p                    Y8888888"
           "O8p                     "8888"
             "Y                      "8"

`;
const INK = String.raw`

             111                      11
           111111                     1111
         1111111111                   111111
       1111111111111                  11111111
     1111111111111111                 1111111113
   4441111111111111111                333333333333
  4444401111111111111111              3333333333333
  44444401111111111111111             3333333333333
  444444401111111111111111            3333333333333
  44444444001111111111111111          3333333333333
  444444444401111111111111111         3333333333333
  4444444444401111111111111111        3333333333333
  444444444444011111111111111111      3333333333333
  4444444444444 11111111111111113     2222222222222
  4444444444444  33333333333333333    2222222222222
  4444444444444    33333333333333333  2222222222222
  0000000000000     33333333333333333 2222222222222
  0000000000000      333333333333333332222222222222
  0000000000000        3333333333333333222222222222
  0000000000000         333333333333333322222222222
  0000000000000          33333333333333332222222222
  0000000000000            333333333333222222222222
  0000000000000             33333333332222222222222
  0000000000000              3222222222222222222222
   000000000000                2222222222222222222
     0000000000                 2222222222222222
       00000000                  2222222222222
         000000                    222222222
           0000                     222222
             00                      222

`;

const START = 0.5; // seconds before the first glint
const PASS = 2; // seconds a glint takes to cross
const HALF = 5; // half its width, in cells
const LEAN = 0.9; // cells it shifts left a row down, so it leans like a slash
const SOLID = "8dbqpPYOo0"; // what the glint turns to slashes; thin edges keep their shape

const lines = (art) => art.slice(1, -1).split("\n").map((line) => line.padEnd(meta.cols));

function neovimMark({ shine = meta.options.shine } = {}) {
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

mount(document.getElementById("ascii-neovim-mark"), { meta, default: neovimMark });
</script>
