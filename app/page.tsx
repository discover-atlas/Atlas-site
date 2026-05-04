import CustomCursor from "./components/CustomCursor";
import LoadingCurtain from "./components/LoadingCurtain";
import ScrollProgress from "./components/ScrollProgress";
import NavHeader from "@/components/ui/nav-header";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import ServicesSection from "./components/ServicesSection";
import { Gallery6 } from "@/components/ui/gallery6";
import AnimatedSocialMediaSection from "./components/AnimatedSocialMediaSection";
import ProcessSection from "./components/ProcessSection";
import CTASection from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <>
      {/* Global overlays */}
      <CustomCursor />
      <LoadingCurtain />
      <ScrollProgress />

      {/* Navigation */}
      <NavHeader />

      {/* Page */}
      <main>
        <AnimatedShaderHero
          trustBadge={{ text: "Automation Consulting Agency", icon: "⚡" }}
          headline={{ line1: "Automate", line2: "Everything." }}
          subtitle="We build systems that replace repetitive work, capture every lead, and scale your business — without scaling headcount."
          buttons={{
            primary: {
              text: "Book a Strategy Call",
              href: "https://calendly.com/drikusbisschoff/al-agency-discovery-call",
            },
          }}
        />
        <ServicesSection />
        <Gallery6 />
        <AnimatedSocialMediaSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
