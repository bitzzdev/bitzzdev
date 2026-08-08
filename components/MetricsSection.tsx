import Reveal from "@/components/Reveal";

const METRICS = [
  { number: "100%", label: "Satisfaction", desc: "Client receives dedicated high-end support and precise engineering." },
  { number: "40+", label: "Custom Deployments", desc: "From high-performance SaaS platforms to custom commerce architectures." },
  { number: "3x", label: "Load Speed Boost", desc: "Lightweight build tooling, code splitting, and extreme CDN performance." },
  { number: "24/7", label: "Active Support", desc: "Unmatched post-launch assistance and direct feedback loops." },
];

export default function MetricsSection() {
  return (
    <section className="metrics">
      <div className="metrics-grid">
        {METRICS.map((m, i) => (
          <Reveal key={m.label} className="metric-item" delay={i * 100}>
            <div className="metric-number">{m.number}</div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-desc">{m.desc}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}