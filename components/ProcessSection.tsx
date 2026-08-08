import Reveal from "@/components/Reveal";

export default function ProcessSection() {
  return (
    <section className="process" id="process">
      <div className="section-label">
        <span className="section-label-dot"></span>
        <span>Process</span>
      </div>
      <h2 className="section-title reveal">How we build together</h2>
      <div className="process-grid">
        <Reveal className="process-item" delay={0}>
          <div className="process-number">01</div>
          <h3 className="process-title">Discovery</h3>
          <p className="process-desc">We dive deep into your brand, audience, and goals to understand what makes you unique and how to position you for success.</p>
        </Reveal>
        <Reveal className="process-item" delay={100}>
          <div className="process-number">02</div>
          <h3 className="process-title">Strategy</h3>
          <p className="process-desc">We craft a clear roadmap that aligns your digital presence with your business objectives, ensuring every decision serves your growth.</p>
        </Reveal>
        <Reveal className="process-item" delay={200}>
          <div className="process-number">03</div>
          <h3 className="process-title">Execution</h3>
          <p className="process-desc">We build with precision, combining clean code with thoughtful design to create experiences that convert and impress.</p>
        </Reveal>
      </div>
    </section>
  );
}