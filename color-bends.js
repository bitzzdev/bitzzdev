(function(){
var selector = '.color-bends';
document.querySelectorAll(selector).forEach(function(container) {
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0';
  container.appendChild(canvas);

  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
  if (!gl) return;

  var vertSrc = '\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n';

  var hexToRgb = function(hex) {
    var h = hex.replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(function(c) { return c + c; }).join('');
    var num = parseInt(h.slice(0, 6), 16);
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  };

  var ds = container.dataset;
  var rawColors = (ds.colors || '#A855F7').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
  var parsedColors = rawColors.map(hexToRgb);
  var rotationDeg = parseFloat(ds.rotation) || 90;
  var speedVal = parseFloat(ds.speed) || 0.2;
  var scaleVal = parseFloat(ds.scale) || 1;
  var freqVal = parseFloat(ds.frequency) || 1;
  var warpVal = parseFloat(ds.warp) || 1;
  var intensityVal = parseFloat(ds.intensity) || 1.5;

  var fragSrc = '\nprecision highp float;\n#define MAX_COLORS 8\nvarying vec2 vUv;\nuniform vec2 uCanvas;\nuniform float uTime;\nuniform float uSpeed;\nuniform vec2 uRot;\nuniform int uColorCount;\nuniform vec3 uColors[MAX_COLORS];\nuniform int uTransparent;\nuniform float uScale;\nuniform float uFrequency;\nuniform float uWarpStrength;\nuniform vec2 uPointer;\nuniform float uMouseInfluence;\nuniform float uParallax;\nuniform float uNoise;\nuniform int uIterations;\nuniform float uIntensity;\nuniform float uBandWidth;\n\nvoid main() {\n  float t = uTime * uSpeed;\n  vec2 p = vUv * 2.0 - 1.0;\n  p += uPointer * uParallax * 0.1;\n  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);\n  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);\n  q /= max(uScale, 0.0001);\n  q /= 0.5 + 0.2 * dot(q, q);\n  q += 0.2 * cos(t) - 7.56;\n  vec2 toward = (uPointer - rp);\n  q += toward * uMouseInfluence * 0.2;\n\n  for (int j = 0; j < 5; j++) {\n    if (j >= uIterations - 1) break;\n    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));\n    q += (rr - q) * 0.15;\n  }\n\n  vec3 col = vec3(0.0);\n  float a = 1.0;\n\n  if (uColorCount > 0) {\n    vec2 s = q;\n    vec3 sumCol = vec3(0.0);\n    float cover = 0.0;\n    for (int i = 0; i < MAX_COLORS; ++i) {\n      if (i >= uColorCount) break;\n      s -= 0.01;\n      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\n      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);\n      float kBelow = clamp(uWarpStrength, 0.0, 1.0);\n      float kMix = pow(kBelow, 0.3);\n      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\n      vec2 disp = (r - s) * kBelow;\n      vec2 warped = s + disp * gain;\n      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);\n      float m = mix(m0, m1, kMix);\n      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));\n      sumCol += uColors[i] * w;\n      cover = max(cover, w);\n    }\n    col = clamp(sumCol, 0.0, 1.0);\n    a = uTransparent > 0 ? cover : 1.0;\n  } else {\n    vec2 s = q;\n    for (int k = 0; k < 3; ++k) {\n      s -= 0.01;\n      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\n      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);\n      float kBelow = clamp(uWarpStrength, 0.0, 1.0);\n      float kMix = pow(kBelow, 0.3);\n      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\n      vec2 disp = (r - s) * kBelow;\n      vec2 warped = s + disp * gain;\n      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);\n      float m = mix(m0, m1, kMix);\n      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));\n    }\n    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;\n  }\n\n  col *= uIntensity;\n\n  if (uNoise > 0.0001) {\n    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);\n    col += (n - 0.5) * uNoise;\n    col = clamp(col, 0.0, 1.0);\n  }\n\n  vec3 rgb = (uTransparent > 0) ? col * a : col;\n  gl_FragColor = vec4(rgb, a);\n}\n';

  function compile(s, t) {
    var sh = gl.createShader(t);
    gl.shaderSource(sh, s);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('CB err:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  var vs = compile(vertSrc, gl.VERTEX_SHADER);
  var fs = compile(fragSrc, gl.FRAGMENT_SHADER);
  if (!vs || !fs) return;

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error('CB link err'); return; }
  gl.useProgram(prog);

  var positions = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);
  var uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
  var indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

  var posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  var posLoc = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  var uvBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
  var uvLoc = gl.getAttribLocation(prog, 'uv');
  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

  var idxBuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  var colorsLoc = gl.getUniformLocation(prog, 'uColors');
  var u = {
    uCanvas: gl.getUniformLocation(prog, 'uCanvas'),
    uTime: gl.getUniformLocation(prog, 'uTime'),
    uSpeed: gl.getUniformLocation(prog, 'uSpeed'),
    uRot: gl.getUniformLocation(prog, 'uRot'),
    uColorCount: gl.getUniformLocation(prog, 'uColorCount'),
    uColors: colorsLoc,
    uTransparent: gl.getUniformLocation(prog, 'uTransparent'),
    uScale: gl.getUniformLocation(prog, 'uScale'),
    uFrequency: gl.getUniformLocation(prog, 'uFrequency'),
    uWarpStrength: gl.getUniformLocation(prog, 'uWarpStrength'),
    uPointer: gl.getUniformLocation(prog, 'uPointer'),
    uMouseInfluence: gl.getUniformLocation(prog, 'uMouseInfluence'),
    uParallax: gl.getUniformLocation(prog, 'uParallax'),
    uNoise: gl.getUniformLocation(prog, 'uNoise'),
    uIterations: gl.getUniformLocation(prog, 'uIterations'),
    uIntensity: gl.getUniformLocation(prog, 'uIntensity'),
    uBandWidth: gl.getUniformLocation(prog, 'uBandWidth'),
  };

  var colorData = new Float32Array(24);
  parsedColors.forEach(function(c, i) {
    colorData[i * 3] = c[0];
    colorData[i * 3 + 1] = c[1];
    colorData[i * 3 + 2] = c[2];
  });

  gl.uniform1f(u.uSpeed, speedVal);
  gl.uniform2f(u.uRot, Math.cos(rotationDeg * Math.PI / 180), Math.sin(rotationDeg * Math.PI / 180));
  gl.uniform1i(u.uColorCount, parsedColors.length);
  gl.uniform3fv(u.uColors, colorData);
  gl.uniform1i(u.uTransparent, 0);
  gl.uniform1f(u.uScale, scaleVal);
  gl.uniform1f(u.uFrequency, freqVal);
  gl.uniform1f(u.uWarpStrength, warpVal);
  gl.uniform2f(u.uPointer, 0, 0);
  gl.uniform1f(u.uMouseInfluence, 1);
  gl.uniform1f(u.uParallax, 0.5);
  gl.uniform1f(u.uNoise, 0.15);
  gl.uniform1i(u.uIterations, 1);
  gl.uniform1f(u.uIntensity, 1.5);
  gl.uniform1f(u.uIntensity, intensityVal);
  gl.uniform1f(u.uBandWidth, 6);

  var pointer = { x: 0, y: 0 };
  var smoothPointer = { x: 0, y: 0 };

  function resize() {
    var w = container.clientWidth;
    var h = container.clientHeight;
    var dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.uCanvas, canvas.width, canvas.height);
  }

  var lastTime = 0;
  resize();
  var ro = new ResizeObserver(function() { resize(); });
  ro.observe(container);

  canvas.addEventListener('pointermove', function(e) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  });

  function loop(t) {
    var now = t * 0.001;
    var dt = now - lastTime;
    lastTime = now;
    gl.uniform1f(u.uTime, now);
    var smooth = 8;
    var amt = Math.min(1, dt * smooth);
    smoothPointer.x += (pointer.x - smoothPointer.x) * amt;
    smoothPointer.y += (pointer.y - smoothPointer.y) * amt;
    gl.uniform2f(u.uPointer, smoothPointer.x, smoothPointer.y);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
})();
