import SideRays from "@/components/SideRays";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grain"></div>
      <SideRays
        speed={2.5}
        rayColor1="#EAB308"
        rayColor2="#96c8ff"
        intensity={2}
        spread={2}
        origin="top-right"
        tilt={0}
        saturation={1.5}
        blend={0.75}
        falloff={1.6}
        opacity={1.0}
      />
      <h1 className="hero-title">bitz.dev</h1>
      <p className="hero-subtitle">
        Freelance Frontend Developer crafting pixel-perfect, high-performance web experiences.
      </p>
    </section>
  );
}