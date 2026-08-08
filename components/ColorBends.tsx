"use client";

import { useEffect, useRef } from "react";

const VERT_SRC = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision highp float;
  #define MAX_COLORS 8
  varying vec2 vUv;
  uniform vec2 uCanvas;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uRot;
  uniform int uColorCount;
  uniform vec3 uColors[MAX_COLORS];
  uniform int uTransparent;
  uniform float uScale;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform vec2 uPointer;
  uniform float uMouseInfluence;
  uniform float uParallax;
  uniform float uNoise;
  uniform int uIterations;
  uniform float uIntensity;
  uniform float uBandWidth;

  void main() {
    float t = uTime * uSpeed;
    vec2 p = vUv * 2.0 - 1.0;
    p += uPointer * uParallax * 0.1;
    vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
    vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
    q /= max(uScale, 0.0001);
    q /= 0.5 + 0.2 * dot(q, q);
    q += 0.2 * cos(t) - 7.56;
    vec2 toward = (uPointer - rp);
    q += toward * uMouseInfluence * 0.2;

    for (int j = 0; j < 5; j++) {
      if (j >= uIterations - 1) break;
      vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
      q += (rr - q) * 0.15;
    }

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
        if (i >= uColorCount) break;
        s -= 0.01;
        vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
        float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
        float kBelow = clamp(uWarpStrength, 0.0, 1.0);
        float kMix = pow(kBelow, 0.3);
        float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 disp = (r - s) * kBelow;
        vec2 warped = s + disp * gain;
        float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
        float m = mix(m0, m1, kMix);
        float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
        sumCol += uColors[i] * w;
        cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
      vec2 s = q;
      for (int k = 0; k < 3; ++k) {
        s -= 0.01;
        vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
        float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
        float kBelow = clamp(uWarpStrength, 0.0, 1.0);
        float kMix = pow(kBelow, 0.3);
        float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 disp = (r - s) * kBelow;
        vec2 warped = s + disp * gain;
        float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
        float m = mix(m0, m1, kMix);
        col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      }
      a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    col *= uIntensity;

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h.slice(0, 6), 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

function compileShader(gl: WebGLRenderingContext, src: string, type: number) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("CB shader err:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

interface ColorBendsProps {
  colors?: string;
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warp?: number;
  intensity?: number;
}

export default function ColorBends({
  colors = "#A855F7",
  rotation = 90,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warp = 1,
  intensity = 1.5,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block;position:absolute;inset:0";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const rawColors = colors
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedColors = rawColors.map(hexToRgb);
    const rotationDeg = rotation;
    const speedVal = speed;
    const scaleVal = scale;
    const freqVal = frequency;
    const warpVal = warp;
    const intensityVal = intensity;

    const vs = compileShader(gl, VERT_SRC, gl.VERTEX_SHADER);
    const fs = compileShader(gl, FRAG_SRC, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("CB link err:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const positions = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);
    const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(prog, "uv");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const idxBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const u: Record<string, WebGLUniformLocation | null> = {
      uCanvas: gl.getUniformLocation(prog, "uCanvas"),
      uTime: gl.getUniformLocation(prog, "uTime"),
      uSpeed: gl.getUniformLocation(prog, "uSpeed"),
      uRot: gl.getUniformLocation(prog, "uRot"),
      uColorCount: gl.getUniformLocation(prog, "uColorCount"),
      uColors: gl.getUniformLocation(prog, "uColors"),
      uTransparent: gl.getUniformLocation(prog, "uTransparent"),
      uScale: gl.getUniformLocation(prog, "uScale"),
      uFrequency: gl.getUniformLocation(prog, "uFrequency"),
      uWarpStrength: gl.getUniformLocation(prog, "uWarpStrength"),
      uPointer: gl.getUniformLocation(prog, "uPointer"),
      uMouseInfluence: gl.getUniformLocation(prog, "uMouseInfluence"),
      uParallax: gl.getUniformLocation(prog, "uParallax"),
      uNoise: gl.getUniformLocation(prog, "uNoise"),
      uIterations: gl.getUniformLocation(prog, "uIterations"),
      uIntensity: gl.getUniformLocation(prog, "uIntensity"),
      uBandWidth: gl.getUniformLocation(prog, "uBandWidth"),
    };

    const colorData = new Float32Array(24);
    parsedColors.forEach((c, i) => {
      colorData[i * 3] = c[0];
      colorData[i * 3 + 1] = c[1];
      colorData[i * 3 + 2] = c[2];
    });

    gl.uniform1f(u.uSpeed, speedVal);
    gl.uniform2f(u.uRot, Math.cos((rotationDeg * Math.PI) / 180), Math.sin((rotationDeg * Math.PI) / 180));
    gl.uniform1i(u.uColorCount, parsedColors.length);
    gl.uniform3fv(u.uColors, colorData);
    gl.uniform1i(u.uTransparent, 0);
    gl.uniform1f(u.uScale, scaleVal);
    gl.uniform1f(u.uFrequency, freqVal);
    gl.uniform1f(u.uWarpStrength, warpVal);
    gl.uniform1f(u.uIntensity, intensityVal);
    gl.uniform2f(u.uPointer, 0, 0);
    gl.uniform1f(u.uMouseInfluence, 1);
    gl.uniform1f(u.uParallax, 0.5);
    gl.uniform1f(u.uNoise, 0.15);
    gl.uniform1i(u.uIterations, 1);
    gl.uniform1f(u.uBandWidth, 6);

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uCanvas, canvas.width, canvas.height);
    };

    let lastTime = 0;

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    canvas.addEventListener("pointermove", onPointerMove);

    let animId = 0;
    const loop = (t: number) => {
      const now = t * 0.001;
      const dt = now - lastTime;
      lastTime = now;

      gl.uniform1f(u.uTime, now);

      const smooth = 8;
      const amt = Math.min(1, dt * smooth);
      smoothPointer.x += (pointer.x - smoothPointer.x) * amt;
      smoothPointer.y += (pointer.y - smoothPointer.y) * amt;
      gl.uniform2f(u.uPointer, smoothPointer.x, smoothPointer.y);

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colors, rotation, speed, scale, frequency, warp, intensity]);

  return <div className="color-bends" ref={containerRef} />;
}