"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./MoltenMetal.css";

export type MoltenMetalColorMode = "molten" | "ember" | "frost";

export interface MoltenMetalProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: MoltenMetalColorMode;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
  backgroundColor?: string;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const colorModeToFloat = (mode: MoltenMetalColorMode): number =>
  mode === "ember" ? 1 : mode === "frost" ? 2 : 0;

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform bool uLightMode;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  if (uLightMode) {
    float signal = 1.0 - exp(-max(c, 0.0) * 6.5);
    float body = smoothstep(0.075, 0.68, signal);
    float ridge = smoothstep(0.42, 0.92, signal);

    vec3 lightCol = mix(uColor1, uColor2, smoothstep(0.08, 0.52, signal));
    lightCol = mix(lightCol, uColor3, smoothstep(0.52, 0.96, signal));
    lightCol = mix(lightCol, lightCol * 0.72, ridge * 0.24);

    float coverage = body * mix(0.2, 0.86, signal) * uOpacity;
    if (uGrain > 0.5) {
      float gr = hash(gl_FragCoord.xy + iTime);
      coverage += (gr - 0.5) * uGrainIntensity * body * 0.16;
    }
    fragColor = vec4(mix(uBackgroundColor, lightCol, clamp(coverage, 0.0, 0.92)), 1.0);
  } else {
    fragColor = vec4(col * a, a);
  }
}
`;

type MoltenMetalCtx = {
  renderer: InstanceType<typeof Renderer>;
  program: InstanceType<typeof Program>;
  mesh: InstanceType<typeof Mesh>;
};

// Global context manager to prevent hitting browser WebGL context limits (typically 8–16)
interface ActiveContextEntry {
  cleanup: () => void;
}
const activeContexts = new Set<ActiveContextEntry>();
const MAX_ACTIVE_CONTEXTS = 6;

function registerActiveContext(entry: ActiveContextEntry) {
  activeContexts.add(entry);
  if (activeContexts.size > MAX_ACTIVE_CONTEXTS) {
    const oldest = activeContexts.values().next().value;
    if (oldest) {
      activeContexts.delete(oldest);
      oldest.cleanup();
    }
  }
}

function unregisterActiveContext(entry: ActiveContextEntry) {
  activeContexts.delete(entry);
}

const MoltenMetal: React.FC<MoltenMetalProps> = ({
  color1 = "#5227FF",
  color2 = "#FF9FFC",
  color3 = "#FFFFFF",
  speed = 0.35,
  scale = 4,
  detail = 3,
  glow = 1.6,
  coreSize = 0.1,
  swirl = 1,
  fold = -0.2,
  blackPoint = 0.05,
  brightness = 1.3,
  colorMode = "molten",
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  opacity = 1.0,
  backgroundColor = "#080807",
  lightMode = false,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<MoltenMetalCtx | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Keep latest props accessible in render/update loops
  const propsRef = useRef({
    color1,
    color2,
    color3,
    speed,
    scale,
    detail,
    glow,
    coreSize,
    swirl,
    fold,
    blackPoint,
    brightness,
    colorMode,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    opacity,
    backgroundColor,
    lightMode,
  });

  propsRef.current = {
    color1,
    color2,
    color3,
    speed,
    scale,
    detail,
    glow,
    coreSize,
    swirl,
    fold,
    blackPoint,
    brightness,
    colorMode,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    opacity,
    backgroundColor,
    lightMode,
  };

  const updateUniforms = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const u = ctx.program.uniforms;
    const p = propsRef.current;

    u.uSpeed.value = p.speed;
    u.uScale.value = p.scale;
    u.uDetail.value = p.detail;
    u.uGlow.value = p.glow;
    u.uCoreSize.value = Math.max(p.coreSize, 0.001);
    u.uSwirl.value = p.swirl;
    u.uFold.value = p.fold;
    u.uBlackPoint.value = p.blackPoint;
    u.uBrightness.value = p.brightness;
    u.uColorMode.value = colorModeToFloat(p.colorMode);
    u.uGrain.value = p.grain ? 1 : 0;
    u.uGrainIntensity.value = p.grainIntensity;
    u.uOpacity.value = p.opacity;
    u.uMouseStrength.value = p.mouseStrength;
    u.uEnableMouse.value = p.mouseInteraction;
    u.uLightMode.value = p.lightMode;

    const c1 = hexToRgb(p.color1);
    const c2 = hexToRgb(p.color2);
    const c3 = hexToRgb(p.color3);
    const bg = hexToRgb(p.backgroundColor);

    const uc1 = u.uColor1.value as Float32Array;
    const uc2 = u.uColor2.value as Float32Array;
    const uc3 = u.uColor3.value as Float32Array;
    const ubg = u.uBackgroundColor.value as Float32Array;

    uc1[0] = c1[0];
    uc1[1] = c1[1];
    uc1[2] = c1[2];

    uc2[0] = c2[0];
    uc2[1] = c2[1];
    uc2[2] = c2[2];

    uc3[0] = c3[0];
    uc3[1] = c3[1];
    uc3[2] = c3[2];

    ubg[0] = bg[0];
    ubg[1] = bg[1];
    ubg[2] = bg[2];
  };

  // Update uniforms whenever relevant props change
  useEffect(() => {
    updateUniforms();
  }, [
    color1,
    color2,
    color3,
    speed,
    scale,
    detail,
    glow,
    coreSize,
    swirl,
    fold,
    blackPoint,
    brightness,
    colorMode,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    opacity,
    backgroundColor,
    lightMode,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isIntersecting = false;
    let isPageVisible = !document.hidden;

    const initWebGL = () => {
      if (!containerRef.current || ctxRef.current) return;

      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 2),
        });
      } catch {
        return;
      }

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      const canvas = gl.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 0.4s ease";

      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uSpeed: { value: 0.35 },
          uScale: { value: 4 },
          uDetail: { value: 3 },
          uGlow: { value: 1.6 },
          uCoreSize: { value: 0.1 },
          uSwirl: { value: 1 },
          uFold: { value: -0.2 },
          uBlackPoint: { value: 0.05 },
          uBrightness: { value: 1.3 },
          uColorMode: { value: 0 },
          uGrain: { value: 1 },
          uGrainIntensity: { value: 0.05 },
          uOpacity: { value: 1.0 },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
          uMouseStrength: { value: 0.3 },
          uEnableMouse: { value: true },
          uColor1: { value: new Float32Array([1, 1, 1]) },
          uColor2: { value: new Float32Array([1, 1, 1]) },
          uColor3: { value: new Float32Array([1, 1, 1]) },
          uBackgroundColor: { value: new Float32Array([0, 0, 0]) },
          uLightMode: { value: false },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      const ctx: MoltenMetalCtx = { renderer, program, mesh };
      ctxRef.current = ctx;
      updateUniforms();

      const setSize = () => {
        if (!containerRef.current || !ctxRef.current) return;
        const rect = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer.setSize(w, h);
        const res = program.uniforms.iResolution.value as Float32Array;
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
        renderer.render({ scene: mesh });
      };

      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      setSize();

      // Mouse movement handling on card/container
      const targetMouse: [number, number] = [0.5, 0.5];
      const currentMouse: [number, number] = [0.5, 0.5];

      const mouseTarget = container.parentElement || container;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targetMouse[0] = (e.clientX - rect.left) / rect.width;
          targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
        }
      };
      const handleMouseLeave = () => {
        targetMouse[0] = 0.5;
        targetMouse[1] = 0.5;
      };

      mouseTarget.addEventListener("mousemove", handleMouseMove);
      mouseTarget.addEventListener("mouseleave", handleMouseLeave);

      let raf = 0;
      const t0 = performance.now();
      let hasRenderedFirstFrame = false;

      const loop = (t: number) => {
        if (!ctxRef.current) return;
        program.uniforms.iTime.value = (t - t0) * 0.001;
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        const m = program.uniforms.uMouse.value as Float32Array;
        m[0] = currentMouse[0];
        m[1] = currentMouse[1];

        renderer.render({ scene: mesh });

        if (!hasRenderedFirstFrame) {
          hasRenderedFirstFrame = true;
          canvas.style.opacity = "1";
        }

        if (isIntersecting && isPageVisible) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = 0;
        }
      };

      const startLoop = () => {
        if (raf === 0 && isIntersecting && isPageVisible) {
          raf = requestAnimationFrame(loop);
        }
      };

      const stopLoop = () => {
        if (raf !== 0) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };

      startLoop();

      const cleanupEntry: ActiveContextEntry = {
        cleanup: () => {
          stopLoop();
          ro.disconnect();
          mouseTarget.removeEventListener("mousemove", handleMouseMove);
          mouseTarget.removeEventListener("mouseleave", handleMouseLeave);
          if (canvas.parentNode === container) {
            container.removeChild(canvas);
          }
          try {
            gl.getExtension("WEBGL_lose_context")?.loseContext();
          } catch {
            // ignore
          }
          ctxRef.current = null;
        },
      };

      registerActiveContext(cleanupEntry);
      cleanupRef.current = () => {
        unregisterActiveContext(cleanupEntry);
        cleanupEntry.cleanup();
      };
    };

    const destroyWebGL = () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          if (!ctxRef.current) {
            initWebGL();
          }
        } else {
          destroyWebGL();
        }
      },
      { rootMargin: "150px 0px", threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && isIntersecting && !ctxRef.current) {
        initWebGL();
      } else if (!isPageVisible && ctxRef.current) {
        destroyWebGL();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      destroyWebGL();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`molten-metal-container ${className}`.trim()}
      style={style}
    />
  );
};

export default MoltenMetal;
