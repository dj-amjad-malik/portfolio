import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import AboutSectionShort from "@/components/AboutSectionShort";
import MusicStylesVisual from "@/components/MusicStylesVisual";
import ClientLogosCarousel from "@/components/ClientLogosCarousel";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSectionShort />
        <MusicStylesVisual />
        <ClientLogosCarousel />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
