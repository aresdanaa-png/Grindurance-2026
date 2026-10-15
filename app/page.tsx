import HeroSection from '@/components/home/HeroSection';
import CategoryCockpit from '@/components/home/CategoryCockpit';
import RacePackSection from '@/components/home/RacePackSection';
import TimelineSection from '@/components/home/TimelineSection';
import CommunitySocialSection from '@/components/home/CommunitySocialSection';
import SponsorsSection from '@/components/home/SponsorsSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black">
      <HeroSection />
      <CategoryCockpit />
      <RacePackSection />
      <TimelineSection />
      <CommunitySocialSection />
      <SponsorsSection />
      <CtaSection />
    </div>
  );
}
