import CustomCursor from "./components/CustomCursor";
import LoadingCurtain from "./components/LoadingCurtain";
import ScrollProgress from "./components/ScrollProgress";
import NavHeader from "@/components/ui/nav-header";
import HeroGeometric from "@/components/ui/modern-hero-section";
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
        <HeroGeometric />
        <ServicesSection />
        <AnimatedSocialMediaSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
