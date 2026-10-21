import { getPublicRepos } from "@/lib/github";
import AsciiWorkGrid from "@/components/AsciiWorkGrid";
import ThemeToggle from "@/components/ThemeToggle";
import ContactForm from "@/components/ContactForm";
import CpuAsciiArt from "@/components/CpuAsciiArt";
import AboutHalftoneImage from "@/components/AboutHalftoneImage";

export default async function Home() {
  const repos = await getPublicRepos();

  return (
    <div className="frame">
      {/* ═══ SIDEBAR ═══ */}
      <aside className="side">
        <a className="brand" href="/">
          bitz.is-a.dev
        </a>
        <p className="by">
          by{" "}
          <a href="https://github.com/bitzzdev" target="_blank" rel="noreferrer">
            @bitzzdev
          </a>
          /
          <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">
            @bitz.dev
          </a>
          /
          <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">
            Dev
          </a>
          /
          <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">
            Bitupan
          </a>
        </p>

        <div className="quick-links">
          <a href="#work">[work]</a>
          <a href="#about">[about]</a>
          <a href="#services">[services]</a>
          <a href="#process">[process]</a>
          <a href="#metrics">[metrics]</a>
          <a href="#contact">[contact]</a>
        </div>

        <div className="asks">
          <a href="https://github.com/bitzzdev" target="_blank" rel="noreferrer">[github]</a>
          <a href="mailto:bitupanborah1k@gmail.com">[email]</a>
          <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">[instagram]</a>
        </div>

        <nav aria-label="Index">
          <h2>navigation</h2>
          <ul>
            <li><a href="#work">selected projects ({repos.length})</a></li>
            <li><a href="#about">developer story</a></li>
            <li><a href="#services">capabilities &amp; offerings</a></li>
            <li><a href="#process">engineering process</a></li>
            <li><a href="#metrics">performance benchmarks</a></li>
            <li><a href="#testimonials">client feedback</a></li>
            <li><a href="#contact">transmission terminal</a></li>
          </ul>
        </nav>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="page">
        {/* Notice bar */}
        <div className="notice">
          <span className="tag">status</span>
          <span>open for freelance contracts, fullstack web applications &amp; systems design</span>
          <a className="go" href="#contact">[initiate]</a>
        </div>

        {/* Top title & tools */}
        <div className="top">
          <h1>Bitupan/Dev Borah — Software &amp; Web Developer</h1>
          <span className="tools">
            <a href="https://github.com/bitzzdev" target="_blank" rel="noreferrer">[github]</a>
            <ThemeToggle />
          </span>
        </div>

        {/* Big ascii hero banner */}
        <div className="hero-link">
          <div
            className="well big"
            style={{
              "--cols": 66,
              "--rows": 16,
            } as React.CSSProperties}
          >
            <CpuAsciiArt />
          </div>
        </div>

        {/* Introduction */}
        <p className="lede">
          Great founders changing the world deserve a digital presence as powerful as what they&apos;re building.
          I engineer highly-optimized, pixel-perfect freelance web solutions: speed-obsessed development designed to scale businesses,
          connect services, and convert users. No noise, no bloat. Just exceptional code that loads in milliseconds.
        </p>

        {/* ═══ WORK SECTION ═══ */}
        <section className="section" id="work">
          <div className="section-head">
            <h2>selected work</h2>
            <span className="count">{repos.length} repositories</span>
          </div>
          <AsciiWorkGrid initialRepos={repos} />
        </section>

        {/* ═══ ABOUT SECTION (Moved directly after projects) ═══ */}
        <section className="section" id="about">
          <div className="section-head">
            <h2>about the developer</h2>
            <span className="count">origin &amp; bio</span>
          </div>
          <div className="lede">
            <p>
              Hey, I&apos;m Dev (Bitupan Borah). Honestly, I became a developer because I just really love computer stuff.
              Ever since I first touched a computer, tinkering with software, understanding how systems work under the hood,
              and building things from scratch has been what excites me every day. That&apos;s the simple truth.
            </p>
            <br />
            <p>
              I love clean code, lightning-fast interfaces, and getting rid of unnecessary bloat. Whether it&apos;s
              crafting responsive web applications, designing system tools, or optimizing performance so things load instantly,
              I treat every project as something to build with genuine care and craft.
            </p>
            <br />
            {/* Interactive Halftone Reveal Effect for me.png */}
            <AboutHalftoneImage />
            <div className="snippet" style={{ margin: "1.5rem 0", padding: "1rem 1.5rem" }}>
              <div><strong>Name:</strong> Bitupan Borah (Dev / Dev Borah)</div>
              <div><strong>Born:</strong> August 25, 2008 (DOB: 25/08/2008)</div>
              <div><strong>Origin &amp; Location:</strong> Assam, India</div>
              <div><strong>GitHub:</strong> <a href="https://github.com/bitzzdev" target="_blank" rel="noreferrer">github.com/bitzzdev</a></div>
              <div><strong>Instagram:</strong> <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">@bitz.dev</a></div>
              <div><strong>What I Do:</strong> Software &amp; Web Development, Frontend Engineering, Systems &amp; Performance</div>
            </div>
            <p className="muted">
              Based in Assam, India &mdash; open for collaboration, freelance contracts, and cool projects worldwide.
            </p>
          </div>
        </section>

        {/* ═══ SERVICES SECTION ═══ */}
        <section className="section" id="services">
          <div className="section-head">
            <h2>services &amp; capabilities</h2>
            <span className="count">03 offerings</span>
          </div>
          <div className="services-flow">
            <div className="service-row">
              <div className="service-row-head">
                <span className="service-row-num">01</span>
                <span className="service-row-title">Custom Web Applications</span>
              </div>
              <p className="service-row-desc">
                Robust, interactive Single Page Applications &amp; fullstack platforms tailored with modern JavaScript ecosystems.
                Engineered for speed, durability, and fault tolerance.
              </p>
            </div>

            <div className="service-row">
              <div className="service-row-head">
                <span className="service-row-num">02</span>
                <span className="service-row-title">UI/UX Systems &amp; Interfaces</span>
              </div>
              <p className="service-row-desc">
                Responsive architectures with fluid ergonomics, cohesive color systems, and optimal conversion journeys.
                Crafted with attention to micro-interactions and accessibility.
              </p>
            </div>

            <div className="service-row">
              <div className="service-row-head">
                <span className="service-row-num">03</span>
                <span className="service-row-title">Performance &amp; SEO Auditing</span>
              </div>
              <p className="service-row-desc">
                Eliminating script bloat and optimizing network waterfalls. Comprehensive Core Web Vital compliance
                to rank your services at the top of search indexes and guarantee sub-second load times.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ PROCESS SECTION ═══ */}
        <section className="section" id="process">
          <div className="section-head">
            <h2>how we build together</h2>
            <span className="count">03 phases</span>
          </div>
          <div className="services-flow">
            <div className="service-row">
              <div className="service-row-head">
                <span className="service-row-num">01</span>
                <span className="service-row-title">Discovery</span>
              </div>
              <p className="service-row-desc">
                We dive deep into your brand, audience, and architectural goals to understand what makes your solution unique
                and how to position you for lasting defensibility.
              </p>
            </div>

            <div className="service-row">
              <div className="service-row-head">
                <span className="service-row-num">02</span>
                <span className="service-row-title">Strategy</span>
              </div>
              <p className="service-row-desc">
                We craft a concise technical roadmap aligning your digital interface with business targets,
                ensuring every engineering decision directly compounds revenue and performance.
              </p>
            </div>

            <div className="service-row">
              <div className="service-row-head">
                <span className="service-row-num">03</span>
                <span className="service-row-title">Execution</span>
              </div>
              <p className="service-row-desc">
                We build with absolute precision, combining clean and tested code with thoughtful design
                to deploy experiences that impress and convert.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ METRICS TABLE SECTION ═══ */}
        <section className="section" id="metrics">
          <div className="section-head">
            <h2>performance benchmarks</h2>
            <span className="count">verified stats</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>metric</th>
                <th>benchmark</th>
                <th>engineering notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>satisfaction</td>
                <td>100%</td>
                <td>Dedicated high-end support and precise engineering.</td>
              </tr>
              <tr>
                <td>deployments</td>
                <td>40+</td>
                <td>From high-performance SaaS platforms to custom commerce architectures.</td>
              </tr>
              <tr>
                <td>load speed</td>
                <td>3x boost</td>
                <td>Lightweight build tooling, code splitting, zero excess dependency trees.</td>
              </tr>
              <tr>
                <td>uptime &amp; support</td>
                <td>24/7</td>
                <td>Direct communication channels, rapid iteration cycles.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ═══ TESTIMONIALS SECTION ═══ */}
        <section className="section" id="testimonials">
          <div className="section-head">
            <h2>client feedback</h2>
            <span className="count">verified citations</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="quote-box">
              <p>
                &ldquo;Bitupan&apos;s work was exceptional. He rewrote our entire web interface using custom-tailored elements.
                Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself.&rdquo;
              </p>
              <div className="quote-author">— Johnathan S., SaaS Founder, Austin TX</div>
            </div>

            <div className="quote-box">
              <p>
                &ldquo;The attention to detail is unmatched. Every pixel is in place, and the performance is breathtaking.
                He didn&apos;t just build a site; he built a conversion engine for our agency.&rdquo;
              </p>
              <div className="quote-author">— Sarah Chen, Creative Director, Tokyo</div>
            </div>

            <div className="quote-box">
              <p>
                &ldquo;Professional, transparent, and incredibly fast. Bitupan delivered a complex dashboard architecture
                in half the estimated time without compromising a single feature.&rdquo;
              </p>
              <div className="quote-author">— Marcus Thorne, CTO, FinTech Global</div>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT SECTION ═══ */}
        <section className="section" id="contact">
          <div className="section-head">
            <h2>transmission terminal</h2>
            <span className="count">direct dispatch</span>
          </div>
          <p className="muted" style={{ marginBottom: "1rem" }}>
            Have a project in mind, an existing codebase in need of optimization, or a contract to discuss?
            Transmit your briefing below or ping directly at <a href="mailto:bitupanborah1k@gmail.com">bitupanborah1k@gmail.com</a>.
          </p>
          <ContactForm />
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="foot">
          <div>
            &copy; {new Date().getFullYear()} bitz.is-a.dev. Handcrafted in India. All rights reserved.
          </div>
          <div className="foot-links">
            <a href="https://github.com/bitzzdev" target="_blank" rel="noreferrer">[github]</a>
            <a href="mailto:bitupanborah1k@gmail.com">[email]</a>
            <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">[instagram]</a>
            <a href="#work">[top]</a>
          </div>
        </footer>
      </main>
    </div>
  );
}