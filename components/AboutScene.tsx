"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = `
uniform float uTime;
uniform float uProgress;
varying vec3 vN;
varying vec3 vPos;
varying float vGlob;
void main() {
  vec3 n = normalize(position);
  float t = uTime * 0.5;
  float d = sin(position.x * 3.0 + t) * sin(position.y * 2.6 + t * 1.3 + position.z) * sin(position.z * 2.2 - t * 0.9 + position.x);
  float amp = 0.45;
  vec3 p = position + n * amp * d;
  vN = normalize(normalMatrix * n);
  vPos = p;
  vGlob = d;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (240.0 / -mv.z) * (0.4 + 0.6 * uProgress);
}
`;

const FRAG = `
uniform float uTime;
uniform float uProgress;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uAlpha;
varying vec3 vN;
varying vec3 vPos;
varying float vGlob;
void main() {
  vec3 V = normalize(cameraPosition - vPos);
  vec3 N = normalize(vN);
  float fres = pow(1.0 - abs(dot(N, V)), 2.4);
  float t = uTime * 0.12;
  float band = sin(vPos.x * 2.5 + t * 2.0) * 0.5 + 0.5;
  float bandB = sin(vPos.y * 2.2 - t * 1.6) * 0.5 + 0.5;
  vec3 col = mix(uA, uB, bandB);
  col = mix(col, uC, band * 0.6);
  vec3 base = col * (0.3 + 0.55 * fres);
  base += uB * fres * 0.6;
  float alpha = (0.35 + 0.9 * fres) * uAlpha * uProgress;
  gl_FragColor = vec4(base, alpha);
}
`;

const hex = (h: string): [number, number, number] => {
  const v = h.replace("#", "");
  return [
    parseInt(v.slice(0, 2), 16) / 255,
    parseInt(v.slice(2, 4), 16) / 255,
    parseInt(v.slice(4, 6), 16) / 255,
  ];
};

const PALETTE = [
  new THREE.Vector3(...hex("6366f1")),
  new THREE.Vector3(...hex("ec4899")),
  new THREE.Vector3(...hex("f59e0b")),
];

export default function AboutScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 4.4;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uA: { value: PALETTE[0] },
        uB: { value: PALETTE[1] },
        uC: { value: PALETTE[2] },
        uAlpha: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
    });

    const blobGeo = new THREE.IcosahedronGeometry(1.1, 6);
    const blob = new THREE.Mesh(blobGeo, material);

    const particleCount = 320;
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);

    const group = new THREE.Group();
    group.add(blob);
    group.add(particles);
    scene.add(group);

    const clock = new THREE.Clock();
    let start = -1;
    let revealed = false;
    let scrollY = 0;
    let mx = 0;
    let my = 0;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const scrollListener = () => {
      const modal = container.closest(".about-modal") as HTMLElement | null;
      scrollY = modal ? modal.scrollTop : 0;
    };
    container.closest(".about-modal")?.addEventListener("scroll", scrollListener);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (start < 0) start = clock.elapsedTime;
          io.disconnect();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    let raf = 0;
    const loop = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      if (start >= 0) {
        const p = Math.min(1, (elapsed - start) / 1.4);
        material.uniforms.uProgress.value = p;
      }

      const norm = (h: number) => (h > 0 ? scrollY / h : 0);
      const fadeOut = THREE.MathUtils.clamp(1 - norm(container.clientHeight) * 1.1, 0.15, 1);
      material.uniforms.uAlpha.value = fadeOut;

      const pointer = new THREE.Vector2(mx, my).multiplyScalar(0.25);
      group.rotation.y += 0.0035;
      group.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + pointer.y;
      group.position.x = pointer.x;
      group.position.y = pointer.y + scrollY * 0.25;
      group.scale.setScalar(1 - norm(container.clientHeight) * 0.35);

      pMat.opacity = 0.45 * fadeOut;

      scene.matrixWorldAutoUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      container.closest(".about-modal")?.removeEventListener("scroll", scrollListener);
      io.disconnect();
      pGeo.dispose();
      pMat.dispose();
      blobGeo.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="about-scene-canvas" />;
}