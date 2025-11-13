import HeroSection from '@/components/landing/HeroSection';
import ProblemSolutionSection from '@/components/landing/ProblemSolutionSection';
import DifferentiatorsSection from '@/components/landing/DifferentiatorsSection';
import CourseStructureSection from '@/components/landing/CourseStructureSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSolutionSection />
      <DifferentiatorsSection />
      <CourseStructureSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
