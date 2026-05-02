import CustomCursor from "./components/CustomCursor";
import LoadingCurtain from "./components/LoadingCurtain";
import ScrollProgress from "./components/ScrollProgress";
import NavHeader from "@/components/ui/nav-header";
import { PremiumHero } from "@/components/ui/hero";
import ServicesSection from "./components/ServicesSection";
import AnimatedSocialMediaSection from "./components/AnimatedSocialMediaSection";
import ProcessSection from "./components/ProcessSection";
import ModernBackgroundPaths from "@/components/ui/modern-background-paths";
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
        <PremiumHero />
        <ServicesSection />
        <AnimatedSocialMediaSection />
        <ProcessSection />
        <ModernBackgroundPaths title="Automate Everything" />
      </main>

      <Footer />
    </>
  );
}
