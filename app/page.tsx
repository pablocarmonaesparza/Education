import HeroSection from "@/components/landing/HeroSection";
import AvailableCoursesSection from "@/components/landing/AvailableCoursesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import StructuredData from "@/components/shared/StructuredData";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <StructuredData />
      <HeroSection />
      <AvailableCoursesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
