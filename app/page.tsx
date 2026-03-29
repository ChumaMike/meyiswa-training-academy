import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import FacultyCards from '@/components/home/FacultyCards';
import OpenDayBanner from '@/components/home/OpenDayBanner';
import Testimonials from '@/components/home/Testimonials';
import ClientLogos from '@/components/home/ClientLogos';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FacultyCards />
      <OpenDayBanner />
      <Testimonials />
      <ClientLogos />
    </>
  );
}
