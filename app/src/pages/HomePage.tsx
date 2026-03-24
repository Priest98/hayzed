import Hero from '@/sections/Hero';
import FeaturedCollections from '@/sections/FeaturedCollections';
import AboutSection from '@/sections/AboutSection';
import Testimonials from '@/sections/Testimonials';
import InstagramLookbook from '@/sections/InstagramLookbook';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <AboutSection />
      <Testimonials />
      <InstagramLookbook />
    </>
  );
}
