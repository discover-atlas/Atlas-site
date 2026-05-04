import CustomCursor from "./components/CustomCursor";
import LoadingCurtain from "./components/LoadingCurtain";
import ScrollProgress from "./components/ScrollProgress";
import NavHeader from "@/components/ui/nav-header";
import { Hero } from "@/components/ui/lamp-hero";
import ServicesSection from "./components/ServicesSection";
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
        <Hero
          title={<>Automate<br /><span className="text-[#f0ede8]/18">Everything.</span></>}
          subtitle="We build systems that replace repetitive work, capture every lead, and scale your business — without scaling headcount."
          actions={[
            {
              label: "Book a Strategy Call",
              href: "https://calendly.com/drikusbisschoff/al-agency-discovery-call",
              variant: "default",
            },
            {
              label: "See Our Work",
              href: "#services",
              variant: "outline",
            },
          ]}
        />
        <ServicesSection />
        <AnimatedSocialMediaSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
