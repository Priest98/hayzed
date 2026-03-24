import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !imageRef.current || !textRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;

      if (scrollY < heroHeight) {
        const parallaxImage = scrollY * 0.4;
        const parallaxText = scrollY * -0.2;

        imageRef.current.style.transform = `translateY(${parallaxImage}px) scale(${1 + scrollY * 0.0002})`;
        textRef.current.style.transform = `translateY(${parallaxText}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden grain-overlay"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className={`absolute inset-0 transition-all duration-[1.8s] ease-fluid ${isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/hero-kaftan.jpg`}
          alt="Hayzed Casual African Luxury Kaftan"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-16 sm:pb-24 lg:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={textRef}
            className={`max-w-3xl transition-all duration-1000 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '0.5s' }}
          >
            {/* Tagline */}
            <p
              className={`text-white/80 text-sm sm:text-base uppercase tracking-[0.3em] mb-4 transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '0.7s' }}
            >
              Nigerian Craftsmanship
            </p>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              <span
                className={`block transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '0.8s' }}
              >
                African Luxury,
              </span>
              <span
                className={`block transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '0.9s' }}
              >
                Modern Style
              </span>
            </h1>

            {/* Subtext */}
            <p
              className={`text-white/70 text-base sm:text-lg max-w-xl mb-8 transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '1s' }}
            >
              Exquisite kaftans crafted for the modern gentleman. Experience the perfect
              blend of traditional Nigerian heritage and contemporary elegance.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '1.1s' }}
            >
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-white text-brand-black hover:bg-brand-cream transition-all duration-300 group px-8 py-6 text-sm font-medium tracking-wide"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/custom">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 transition-all duration-300 px-8 py-6 text-sm font-medium tracking-wide"
                >
                  Book Custom Fit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div
          className={`text-white/30 text-xs uppercase tracking-[0.2em] transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          style={{ transitionDelay: '1.3s', writingMode: 'vertical-rl' }}
        >
          Est. Kwara, Nigeria
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ease-fluid ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{ transitionDelay: '1.4s' }}
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
