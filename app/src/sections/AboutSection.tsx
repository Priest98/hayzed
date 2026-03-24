import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setImageRevealed(true), 300);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-36 bg-brand-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={imageRef}
              className={`relative transition-all duration-1000 ease-fluid ${imageRevealed ? 'clip-path-reveal' : ''
                }`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-story.jpeg`}
                  alt="Hayzed Casual Kaftans"
                  className={`w-full h-full object-cover transition-transform duration-1000 ease-fluid ${isVisible ? 'scale-100' : 'scale-110'
                    }`}
                />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-beige -z-10" />

              {/* Experience Badge */}
              <div
                className={`absolute -bottom-6 -left-6 bg-brand-black text-white p-6 sm:p-8 transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '0.6s' }}
              >
                <span className="font-display text-3xl sm:text-4xl block">2019</span>
                <span className="text-white/70 text-xs uppercase tracking-wider">Established in Kwara</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 lg:pl-8">
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6 leading-tight">
                About Hayzed Casual
              </h2>
            </div>

            <div
              className={`space-y-6 transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                Founded in Kwara State in 2019, our journey began with a simple vision:
                to bridge the gap between traditional African heritage and contemporary fashion.
              </p>

              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                Formerly known as Hayzed Couture and rebranded in 2025 as HAYZEDCASUAL, we believe
                in sustainable fashion that honors our roots while embracing modern elegance.
              </p>

              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                From Kwara to the world, our kaftans have graced weddings, corporate events,
                and celebrations, making every moment memorable with African luxury.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-brand-light-grey transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <div>
                <span className="font-display text-2xl sm:text-3xl text-brand-black">500+</span>
                <span className="block text-brand-grey text-xs uppercase tracking-wider mt-1">Happy Clients</span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl text-brand-black">50+</span>
                <span className="block text-brand-grey text-xs uppercase tracking-wider mt-1">Designs</span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl text-brand-black">15+</span>
                <span className="block text-brand-grey text-xs uppercase tracking-wider mt-1">Awards</span>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`mt-10 transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <Link to="/about">
                <Button
                  size="lg"
                  className="bg-brand-black hover:bg-brand-grey text-white transition-all duration-300 group"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .clip-path-reveal {
          clip-path: inset(0 0 0 0);
        }
      `}</style>
    </section>
  );
}
