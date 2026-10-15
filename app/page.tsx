import HeroSection from '@/components/home/HeroSection';
import CategoryCockpit from '@/components/home/CategoryCockpit';
import RacePackSection from '@/components/home/RacePackSection';
import TimelineSection from '@/components/home/TimelineSection';
import BasecampSection from '@/components/home/BasecampSection';
import SafetySection from '@/components/home/SafetySection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black">
      <HeroSection />
      <CategoryCockpit />
      <RacePackSection />
      <TimelineSection />
      <BasecampSection />
      <SafetySection />
      <CtaSection />
    </div>
  );
}
