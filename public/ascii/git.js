<canvas id="ascii-git-icon-1788c" role="img" aria-label="git icon 1788c" style="width: 100%; max-width: 640px"></canvas>
<script type="module">
import { mount } from "https://ascii.rest/mount.js";

// git icon 1788c, drawn in ascii on https://ascii.rest/make/
const meta = {
  name: "git icon 1788c",
  category: "companies",
  note: "the git icon 1788c logo, glinting now and then",
  cols: 64,
  rows: 32,
  fps: 30,
  options: { shine: 5 },
  // The logo's colour for a light page, then for a dark one; each as drawn, then twice lighter for the glint.
  palette: [
    "#f03c2e", "#f58077", "#fbc5c0", "#f03c2e", "#f58077", "#fbc5c0",
  ],
};

// In a <pre>, in the page's own colour.
const MONO = String.raw`

                            _p8888q,
                          _p88888888q,
                        _p888888888888q,
                        Y888888888888888q,
                    __   'Y888888888888888q,
                  _p88q,   'Y888888888888888q,
                _p888888q,   'YPY8888888888888q,
              _p8888888888q,       "888888888888q,
            _p8888888888888P        "8888888888888q,
          _p8888888888888888        )888888888888888q,
        _p888888888888888888q_       'Y888888888888888q,
      _p8888888888888888888888|   q,   'Y888888888888888q,
    _p888888888888888888888888|   88q,   'Y888888888888888q,
  .p88888888888888888888888888|   8888q,       "888888888888q,
  d888888888888888888888888888|   888888(        888888888888b
  8888888888888888888888888888|   888888,        d888888888888
   Y88888888888888888888888888|   8888888_     .q88888888888P
    'Y888888888888888888888888|   888888888qqpp88888888888P'
      'Y8888888888888888888888|   8888888888888888888888P'
        'Y8888888888888888888P'   "8888888888888888888P'
          'Y8888888888888888'       )888888888888888P'
            'Y8888888888888b        .8888888888888P'
              'Y888888888888_      .p88888888888P'
                'Y88888888888qq___p88888888888P'
                  'Y888888888888888888888888P'
                    'Y88888888888888888888P'
                      'Y8888888888888888P'
                        'Y888888888888P'
                          'Y88888888P'
                            'Y8888P'

`;

// On a canvas, and the colour of each cell: an index into the logo's colours.
const ART = String.raw`

                            _p8888q,
                          _p88888888q,
                        _p888888888888q,
                        Y888888888888888q,
                    __   'Y888888888888888q,
                  _p88q,   'Y888888888888888q,
                _p888888q,   'YPY8888888888888q,
              _p8888888888q,       "888888888888q,
            _p8888888888888P        "8888888888888q,
          _p8888888888888888        )888888888888888q,
        _p888888888888888888q_       'Y888888888888888q,
      _p8888888888888888888888|   q,   'Y888888888888888q,
    _p888888888888888888888888|   88q,   'Y888888888888888q,
  .p88888888888888888888888888|   8888q,       "888888888888q,
  d888888888888888888888888888|   888888(        888888888888b
  8888888888888888888888888888|   888888,        d888888888888
   Y88888888888888888888888888|   8888888_     .q88888888888P
    'Y888888888888888888888888|   888888888qqpp88888888888P'
      'Y8888888888888888888888|   8888888888888888888888P'
        'Y8888888888888888888P'   "8888888888888888888P'
          'Y8888888888888888'       )888888888888888P'
            'Y8888888888888b        .8888888888888P'
              'Y888888888888_      .p88888888888P'
                'Y88888888888qq___p88888888888P'
                  'Y888888888888888888888888P'
                    'Y88888888888888888888P'
                      'Y8888888888888888P'
                        'Y888888888888P'
                          'Y88888888P'
                            'Y8888P'

`;
const INK = String.raw`

                            00000000
                          000000000000
                        0000000000000000
                        000000000000000000
                    00   0000000000000000000
                  000000   0000000000000000000
                0000000000   0000000000000000000
              00000000000000       000000000000000
            0000000000000000        0000000000000000
          000000000000000000        000000000000000000
        0000000000000000000000       0000000000000000000
      0000000000000000000000000   00   0000000000000000000
    000000000000000000000000000   0000   0000000000000000000
  00000000000000000000000000000   000000       000000000000000
  00000000000000000000000000000   0000000        0000000000000
  00000000000000000000000000000   0000000        0000000000000
   0000000000000000000000000000   00000000     00000000000000
    000000000000000000000000000   00000000000000000000000000
      0000000000000000000000000   000000000000000000000000
        00000000000000000000000   0000000000000000000000
          0000000000000000000       000000000000000000
            0000000000000000        0000000000000000
              000000000000000      000000000000000
                00000000000000000000000000000000
                  0000000000000000000000000000
                    000000000000000000000000
                      00000000000000000000
                        0000000000000000
                          000000000000
                            00000000

`;

const START = 0.5; // seconds before the first glint
const PASS = 2; // seconds a glint takes to cross
const HALF = 5; // half its width, in cells
const LEAN = 0.9; // cells it shifts left a row down, so it leans like a slash
const SOLID = "8dbqpPYOo0"; // what the glint turns to slashes; thin edges keep their shape

const lines = (art) => art.slice(1, -1).split("\n").map((line) => line.padEnd(meta.cols));

function gitIcon1788c({ shine = meta.options.shine } = {}) {
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

mount(document.getElementById("ascii-git-icon-1788c"), { meta, default: gitIcon1788c });
</script>
