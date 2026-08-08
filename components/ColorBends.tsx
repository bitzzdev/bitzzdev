"use client";

import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import "./ColorBends.css";

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h.slice(0, 6), 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
};

interface ColorBendsProps {
  colors?: string[];
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warp?: number;
  intensity?: number;
  className?: string;
}

const ColorBends = ({
  colors = ["#ff5c7a", "#f97316"],
  rotation = 90,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warp = 1,
  intensity = 1.5,
  className = "",
}: ColorBendsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }
    const initializeWebGL = async () => {
      if (!containerRef.current) return;
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const frag = `
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

      const parsedColors = colors.map(hexToRgb);
      const rotationRad = (rotation * Math.PI) / 180;
      const uniforms = {
        uCanvas: { value: [1, 1] },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: [Math.cos(rotationRad), Math.sin(rotationRad)] },
        uColorCount: { value: parsedColors.length },
        uColors: { value: parsedColors },
        uTransparent: { value: 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warp },
        uPointer: { value: [0, 0] },
        uMouseInfluence: { value: 1 },
        uParallax: { value: 0.5 },
        uNoise: { value: 0.15 },
        uIterations: { value: 1 },
        uIntensity: { value: intensity },
        uBandWidth: { value: 6 },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const pointer = { x: 0, y: 0 };
      const smoothPointer = { x: 0, y: 0 };

      const updateSize = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        uniforms.uCanvas.value = [w * renderer.dpr, h * renderer.dpr];
      };

      const onPointerMove = (e: PointerEvent) => {
        const canvas = renderer.gl.canvas;
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      };
      gl.canvas.addEventListener("pointermove", onPointerMove);

      let lastTime = 0;
      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        const now = t * 0.001;
        const dt = now - lastTime;
        lastTime = now;
        uniforms.uTime.value = now;

        const smooth = 8;
        const amt = Math.min(1, dt * smooth);
        smoothPointer.x += (pointer.x - smoothPointer.x) * amt;
        smoothPointer.y += (pointer.y - smoothPointer.y) * amt;
        uniforms.uPointer.value = [smoothPointer.x, smoothPointer.y];

        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (e) {
          return;
        }
      };

      window.addEventListener("resize", updateSize);
      const resizeObserver = new ResizeObserver(updateSize);
      if (containerRef.current) resizeObserver.observe(containerRef.current);

      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        window.removeEventListener("resize", updateSize);
        resizeObserver.disconnect();
        gl.canvas.removeEventListener("pointermove", onPointerMove);
        if (renderer) {
          try {
            const loseCtx = renderer.gl.getExtension("WEBGL_lose_context");
            if (loseCtx) loseCtx.loseContext();
            const canvas = renderer.gl.canvas;
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
          } catch (e) {}
        }
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };
    initializeWebGL();
    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [isVisible, colors, rotation, speed, scale, frequency, warp, intensity]);

  return <div ref={containerRef} className={`color-bends-container ${className}`.trim()} />;
};

export default ColorBends;