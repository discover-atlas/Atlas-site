import CustomCursor from "./components/CustomCursor";
import LoadingCurtain from "./components/LoadingCurtain";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import ProblemSection from "./components/ProblemSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import ResultsSection from "./components/ResultsSection";
import IndustriesSection from "./components/IndustriesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Global overlays */}
      <CustomCursor />
      <LoadingCurtain />
      <ScrollProgress />

      {/* Page */}
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <ServicesSection />
        <ProcessSection />
        <ResultsSection />
        <IndustriesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
