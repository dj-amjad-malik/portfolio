import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/ServicesHero";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseSection from "@/components/WhyChooseSection";
import ServicesCTA from "@/components/ServicesCTA";
import ClientPortfolio from "@/components/ClientPortfolio";
import TestimonialsSection from "@/components/TestimonialsSection";

const ServicesPortfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ServicesHero />
        <ServicesGrid />
        <WhyChooseSection />
        <ClientPortfolio />
        <TestimonialsSection />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPortfolio;