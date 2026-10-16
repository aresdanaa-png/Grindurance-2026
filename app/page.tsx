import HeroSection from '@/components/home/HeroSection';
import CategoryCockpit from '@/components/home/CategoryCockpit';
import RacePackSection from '@/components/home/RacePackSection';
import TimelineSection from '@/components/home/TimelineSection';
import CommunitySocialSection from '@/components/home/CommunitySocialSection';
import SponsorsSection from '@/components/home/SponsorsSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black">
      <HeroSection />
      
      <ScrollReveal>
        <CategoryCockpit />
      </ScrollReveal>

      <ScrollReveal>
        <RacePackSection />
      </ScrollReveal>

      <ScrollReveal>
        <TimelineSection />
      </ScrollReveal>

      <ScrollReveal>
        <CommunitySocialSection />
      </ScrollReveal>

      <ScrollReveal>
        <SponsorsSection />
      </ScrollReveal>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </div>
  );
}
