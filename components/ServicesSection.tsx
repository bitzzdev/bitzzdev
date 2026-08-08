import Reveal from "@/components/Reveal";

export default function ServicesSection() {
  return (
    <section className="services" id="services">
      <div className="section-label">
        <span className="section-label-dot"></span>
        <span>Services</span>
      </div>
      <h2 className="section-title reveal">What we offer</h2>
      <div className="services-list">
        <Reveal className="service-item">
          <span className="service-number">01</span>
          <h3 className="service-title">Custom Web Applications</h3>
          <p className="service-desc">Robust, interactive Single Page Applications tailored with modern JavaScript ecosystems. Built to deliver exceptional user experiences.</p>
        </Reveal>
        <Reveal className="service-item">
          <span className="service-number">02</span>
          <h3 className="service-title">UI/UX Responsive Design</h3>
          <p className="service-desc">Mobile-first design schemas. Intuitive user interfaces with fluid animations, cohesive color systems, and optimal conversion journeys.</p>
        </Reveal>
        <Reveal className="service-item">
          <span className="service-number">03</span>
          <h3 className="service-title">Performance &amp; SEO Auditing</h3>
          <p className="service-desc">Eliminating script bloat and optimizing media. High Core Web Vital compliance to rank your services at the top of Google.</p>
        </Reveal>
      </div>
    </section>
  );
}