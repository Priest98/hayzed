import Hero from '@/sections/Hero';
import FeaturedCollections from '@/sections/FeaturedCollections';
import AboutSection from '@/sections/AboutSection';
import Testimonials from '@/sections/Testimonials';
import InstagramLookbook from '@/sections/InstagramLookbook';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

function AcademyAnnouncement() {
  return (
    <section className="bg-brand-black text-white py-4 relative overflow-hidden border-b border-brand-gold/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 border border-brand-gold/30">
            <GraduationCap className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-display tracking-wide">
              <span className="text-brand-gold font-bold uppercase tracking-widest text-[0.65rem] mr-3 border border-brand-gold/50 px-2 py-0.5 rounded-full">New</span>
              Join the Hayzed Fashion Academy
            </p>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Master Native Wear in 3 Months. Classes start August 10th.
            </p>
          </div>
        </div>
        <Link 
          to="/academy" 
          className="group flex items-center gap-2 text-sm font-medium bg-brand-gold text-brand-black px-6 py-2.5 rounded-full hover:bg-white transition-colors whitespace-nowrap shadow-luxury"
        >
          Explore Program
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AcademyAnnouncement />
      <FeaturedCollections />
      <AboutSection />
      <Testimonials />
      <InstagramLookbook />
    </>
  );
}
