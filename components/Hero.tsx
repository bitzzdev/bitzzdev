import SideRays from "@/components/SideRays";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grain"></div>
      <SideRays />
      <h1 className="hero-title">bitz.dev</h1>
      <p className="hero-subtitle">
        Freelance Frontend Developer crafting pixel-perfect, high-performance web experiences.
      </p>
    </section>
  );
}