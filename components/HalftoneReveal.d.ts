export interface HalftoneRevealProps {
  src?: string;
  mode?: "mono" | "cmyk" | "rgb" | "duotone";
  shape?: "dot" | "line" | "cross" | "diamond" | "concentric";
  cellSize?: number;
  angle?: number;
  scale?: number;
  inkColor?: string;
  accentColor?: string;
  paperColor?: string;
  contrast?: number;
  brightness?: number;
  invert?: boolean;
  roughness?: number;
  colorShift?: number;
  revealRadius?: number;
  softness?: number;
  revealStrength?: number;
  fadeSpeed?: number;
  linger?: number;
  clickBurst?: boolean;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const HalftoneReveal: React.ComponentType<HalftoneRevealProps>;
export default HalftoneReveal;
