import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Courses from '@/components/sections/Courses';
import Abilities from '@/components/sections/Abilities';
import LeaderboardPreview from '@/components/sections/LeaderboardPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Courses />
      <Abilities />
      <LeaderboardPreview />
    </>
  );
}
