"use client";

import { useEffect, useRef } from "react";

const VERT_SRC = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG_SRC = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform float iSpeed;
  uniform vec3 iRayColor1;
  uniform vec3 iRayColor2;
  uniform float iIntensity;
  uniform float iSpread;
  uniform float iFlipX;
  uniform float iFlipY;
  uniform float iTilt;
  uniform float iSaturation;
  uniform float iBlend;
  uniform float iFalloff;
  uniform float iOpacity;

  float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
    vec2 sourceToCoord = coord - raySource;
    float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
    return clamp(
      (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
      (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
      0.0, 1.0
    ) * clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
    if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

    vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
    vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

    float tiltRad = iTilt * 3.14159265 / 180.0;
    float cs = cos(tiltRad);
    float sn = sin(tiltRad);
    vec2 rel = coord - rayPos;
    vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

    float halfSpread = iSpread * 0.275;
    vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
    vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

    vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
    vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

    vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

    float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
    float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
    color.rgb *= brightness;

    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(gray), color.rgb, iSaturation);

    color.a = max(color.r, max(color.g, color.b)) * iOpacity;
    gl_FragColor = color;
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
}

function compileShader(gl: WebGLRenderingContext, src: string, type: number) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function SideRays() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const el: HTMLDivElement = container;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block";
    container.appendChild(canvas);

    const glOrNull = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!glOrNull) return;
    const gl: WebGLRenderingContext = glOrNull;

    const vertShader = compileShader(gl, VERT_SRC, gl.VERTEX_SHADER);
    const fragShader = compileShader(gl, FRAG_SRC, gl.FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms: Record<string, WebGLUniformLocation | null> = {
      iTime: gl.getUniformLocation(program, "iTime"),
      iResolution: gl.getUniformLocation(program, "iResolution"),
      iSpeed: gl.getUniformLocation(program, "iSpeed"),
      iRayColor1: gl.getUniformLocation(program, "iRayColor1"),
      iRayColor2: gl.getUniformLocation(program, "iRayColor2"),
      iIntensity: gl.getUniformLocation(program, "iIntensity"),
      iSpread: gl.getUniformLocation(program, "iSpread"),
      iFlipX: gl.getUniformLocation(program, "iFlipX"),
      iFlipY: gl.getUniformLocation(program, "iFlipY"),
      iTilt: gl.getUniformLocation(program, "iTilt"),
      iSaturation: gl.getUniformLocation(program, "iSaturation"),
      iBlend: gl.getUniformLocation(program, "iBlend"),
      iFalloff: gl.getUniformLocation(program, "iFalloff"),
      iOpacity: gl.getUniformLocation(program, "iOpacity"),
    };

    const color1 = hexToRgb("#EAB308");
    const color2 = hexToRgb("#96c8ff");

    function updateSize() {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
    }

    gl.uniform1f(uniforms.iSpeed, 2.5);
    gl.uniform3f(uniforms.iRayColor1, color1[0], color1[1], color1[2]);
    gl.uniform3f(uniforms.iRayColor2, color2[0], color2[1], color2[2]);
    gl.uniform1f(uniforms.iIntensity, 2);
    gl.uniform1f(uniforms.iSpread, 2);
    gl.uniform1f(uniforms.iFlipX, 0);
    gl.uniform1f(uniforms.iFlipY, 0);
    gl.uniform1f(uniforms.iTilt, 0);
    gl.uniform1f(uniforms.iSaturation, 1.5);
    gl.uniform1f(uniforms.iBlend, 0.75);
    gl.uniform1f(uniforms.iFalloff, 1.6);
    gl.uniform1f(uniforms.iOpacity, 1.0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    updateSize();
    window.addEventListener("resize", updateSize);

    let animId = 0;
    const loop = (t: number) => {
      gl.uniform1f(uniforms.iTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div className="side-rays" ref={containerRef} />;
}