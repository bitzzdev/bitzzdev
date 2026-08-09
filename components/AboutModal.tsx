"use client";

import { useSite } from "@/components/site-context";
import Reveal from "@/components/Reveal";

export default function AboutModal() {
  const { aboutOpen, setAboutOpen } = useSite();

  if (!aboutOpen) return null;

  return (
    <div className="about-modal open" data-lenis-prevent>
      <button className="about-modal-close" onClick={() => setAboutOpen(false)}>
        <span>Close</span>
        <span className="esc">esc</span>
      </button>
      <div className="about-content">
        <Reveal>
          <div className="about-eyebrow">
            <div className="about-eyebrow-dot"></div>
            <span>About the developer</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="about-heading">
            Hey I&apos;m Bitupan. I started bitz.dev because I watched businesses struggle with
            sluggish, over-engineered websites that never converted despite the quality of their
            products.
            <br />
            <br />
            That gap became an obsession. I&apos;ve spent years breaking down what separates
            forgettable digital presence from work that actually moves people; thinking that shapes
            every project we take on.
            <br />
            <br />
            When we work together, I&apos;m immersed in your story, ruthless about what moves
            people, and built to close the gap between who you are and how the world sees you.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="about-section">
            <h2 className="about-section-title">
              <span className="dot"></span>Clients
            </h2>
            <div className="about-clients-grid">
              <div className="about-client-item">SaaS Startups</div>
              <div className="about-client-item">E-commerce Brands</div>
              <div className="about-client-item">Creative Agencies</div>
              <div className="about-client-item">FinTech Companies</div>
              <div className="about-client-item">Tech Enterprises</div>
              <div className="about-client-item">Global Businesses</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="about-section">
            <h2 className="about-section-title">
              <span className="dot"></span>Awards
            </h2>
            <div className="about-clients-grid">
              <div className="about-client-item">100% Client Satisfaction</div>
              <div className="about-client-item">40+ Deployments</div>
              <div className="about-client-item">3x Speed Improvements</div>
              <div className="about-client-item">24/7 Support</div>
              <div className="about-client-item">Core Web Vitals Expert</div>
              <div className="about-client-item">SEO Specialist</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="about-section">
            <h2 className="about-section-title">
              <span className="dot"></span>Principles
            </h2>
            <div className="about-values-grid">
              <div className="about-value-item">
                <h3 className="about-value-title">Performance first, aesthetics second</h3>
                <p className="about-value-desc">
                  Every creative decision we make is interrogated against one question: does this
                  actually serve your growth?
                </p>
              </div>
              <div className="about-value-item">
                <h3 className="about-value-title">All in or nothing</h3>
                <p className="about-value-desc">
                  We take on fewer projects so we can give each one everything. When we commit to
                  your brand, we&apos;re fully present, fully invested, fully responsible for the
                  result.
                </p>
              </div>
              <div className="about-value-item">
                <h3 className="about-value-title">Human-first, always</h3>
                <p className="about-value-desc">
                  Behind every brand is a person with a real story and real stakes. We never lose
                  sight of that. The most powerful digital experiences are the ones that feel
                  unmistakably human.
                </p>
              </div>
              <div className="about-value-item">
                <h3 className="about-value-title">Intention over speed</h3>
                <p className="about-value-desc">
                  Rushed work compounds into regret. We move at the pace the work demands. Every
                  layer earns its place before we move to the next.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}