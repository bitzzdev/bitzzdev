import SiteShell from "@/components/SiteShell";
import CustomCursor from "@/components/CustomCursor";
import AnimeHero from "@/components/AnimeHero";
import Marquee from "@/components/Marquee";
import AnimeScrollText from "@/components/AnimeScrollText";
import ProjectsSection from "@/components/ProjectsSection";
import AnimeServices from "@/components/AnimeServices";
import AnimeProcess from "@/components/AnimeProcess";
import AnimeMetrics from "@/components/AnimeMetrics";
import AnimeTestimonials from "@/components/AnimeTestimonials";
import AnimeContact from "@/components/AnimeContact";
import AnimeFooter from "@/components/AnimeFooter";

export default function Home() {
  return (
    <SiteShell>
      <CustomCursor />
      <AnimeHero />
      <Marquee />
      <AnimeScrollText
        tagline="Obsessive Engineering"
        text="Great founders changing the world deserve a digital presence as powerful as what they're building. Most founders we work with have built something significant, but their website doesn't show it yet. That gap costs more than revenue. It costs the certainty that your brand is finally being understood."
      />
      <AnimeScrollText
        tagline="Zero Noise & Sub-Second Latency"
        text="I engineer highly-optimized, pixel-perfect freelance web solutions. Speed-obsessed development designed to scale businesses, connect services, and convert users. No complexity. No noise. Just exceptional code that loads in milliseconds and converts visitors into loyal customers."
      />
      <ProjectsSection />
      <AnimeServices />
      <AnimeProcess />
      <AnimeMetrics />
      <AnimeTestimonials />
      <AnimeContact />
      <AnimeFooter />
    </SiteShell>
  );
}