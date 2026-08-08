import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import ScrollText from "@/components/ScrollText";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MetricsSection from "@/components/MetricsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <ScrollText text="Great founders changing the world deserve a presence as powerful as what they're building. Most founders we work with have built something significant, but their website doesn't show it yet. That gap costs more than revenue. It costs the certainty that your brand is finally being understood." />
      <ScrollText text="I engineer highly-optimized, pixel-perfect freelance web solutions. Speed-obsessed development designed to scale businesses, connect services, and convert users. No complexity. No noise. Just exceptional code that loads in milliseconds and converts visitors into customers." />
      <ProjectsSection />
      <ProcessSection />
      <ServicesSection />
      <TestimonialsSection />
      <MetricsSection />
      <ContactSection />
      <Footer />
    </SiteShell>
  );
}