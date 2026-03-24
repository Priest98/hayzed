import { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, Gem } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients', description: 'Trusted by gentlemen across Nigeria and the diaspora' },
  { icon: Award, value: '15+', label: 'Industry Awards', description: 'Recognized for excellence in African fashion' },
  { icon: Globe, value: '12', label: 'Countries', description: 'Shipping to customers worldwide' },
  { icon: Gem, value: '1000+', label: 'Custom Pieces', description: 'Handcrafted with love and precision' },
];

const values = [
  {
    title: 'Heritage & Craftsmanship',
    description: 'Every kaftan we create is a celebration of Nigerian textile heritage. Our artisans bring decades of experience, passing down techniques through generations while incorporating modern innovations.',
  },
  {
    title: 'Quality & Excellence',
    description: 'We source only the finest fabrics from across Africa and beyond. Each piece undergoes rigorous quality checks to ensure it meets our exacting standards before reaching our customers.',
  },
  {
    title: 'Modern Elegance',
    description: 'While rooted in tradition, our designs speak to the contemporary gentleman. We blend classic silhouettes with modern cuts, creating kaftans that transition seamlessly from traditional ceremonies to corporate events.',
  },
  {
    title: 'Sustainable Fashion',
    description: 'We are committed to ethical production practices. Our fabrics are sourced from sustainable suppliers, and we ensure fair wages for all our artisans, supporting local communities.',
  },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
                Our Story
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6 leading-tight">
                Where Heritage Meets Modern Elegance
              </h1>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed mb-6">
                Hayzed Casual was born from a deep appreciation for Nigerian textile heritage
                and a vision to bring traditional craftsmanship to the contemporary fashion landscape.
                Founded in Kwara State in 2019, we have grown into a celebrated brand trusted by
                discerning gentlemen across Nigeria and beyond.
              </p>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                The brand name started as Hayzed Couture and was rebranded in 2025 as HAYZEDCASUAL,
                reflecting our evolution while maintaining our commitment to effortless casual luxury.
              </p>
            </div>

            {/* Image */}
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-story.jpeg`}
                  alt="Hayzed Casual Kaftans"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-black/5 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <span className="font-display text-3xl sm:text-4xl text-brand-black block mb-1">
                  {stat.value}
                </span>
                <span className="text-brand-black font-medium text-sm uppercase tracking-wider mb-2 block">
                  {stat.label}
                </span>
                <p className="text-brand-grey text-xs">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={sectionRef} className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`p-6 sm:p-8 bg-white rounded-xl shadow-soft transition-all duration-700 ease-fluid hover:shadow-elevated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <h3 className="font-display text-xl sm:text-2xl text-brand-black mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-grey leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 sm:py-28 lg:py-36 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6">
                The Art of Craftsmanship
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                Each Hayzed Casual kaftan represents hours of meticulous handwork by our
                master craftsmen. From the initial pattern cutting to the final stitch,
                every step is executed with precision and care.
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                We partner with local textile artisans across Nigeria, supporting
                traditional weaving and dyeing techniques that have been passed down
                through generations. This commitment to heritage ensures that every
                kaftan carries the soul of African craftsmanship.
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Our atelier in Kwara buzzes with creative energy, where young apprentices
                learn from master tailors, ensuring these precious skills continue to
                thrive in the modern era.
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/product-classic.jpg`}
                  alt="Craftsmanship"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden mt-8">
                <img
                  src={`${import.meta.env.BASE_URL}images/product-wedding.jpg`}
                  alt="Embroidery detail"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
