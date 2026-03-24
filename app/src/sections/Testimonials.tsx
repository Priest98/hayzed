import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Olajide Fashola',
    avatar: 'images/avatar-1.jpg',
    role: 'Business Executive',
    content: 'Hayzed Casual transformed my wardrobe. The attention to detail in every stitch is remarkable. I have never felt more confident at corporate events.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Chidi Okonkwo',
    avatar: 'images/avatar-2.jpg',
    role: 'Groom',
    content: 'For my traditional wedding, I needed something exceptional. The wedding kaftan exceeded all expectations. My bride was speechless.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emeka Kalu',
    avatar: 'images/avatar-3.jpg',
    role: 'Creative Director',
    content: 'As someone who appreciates fine craftsmanship, Hayzed Casual delivers excellence. Each piece tells a story of Nigerian heritage and modern sophistication.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Tunde Adebayo',
    avatar: 'images/avatar-4.jpg',
    role: 'Entrepreneur',
    content: 'I have been a loyal customer for three years. The quality has remained consistently outstanding, and the customer service is impeccable.',
    rating: 5,
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-36 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-fluid ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
            Client Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
}

function TestimonialCard({ testimonial, index, isVisible }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group bg-white rounded-2xl p-6 sm:p-8 shadow-soft transition-all duration-700 ease-fluid hover:shadow-elevated ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${200 + index * 150}ms`,
        transform: isVisible ? `translateY(${index % 2 === 0 ? 0 : 20}px)` : 'translateY(40px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote
          className={`w-8 h-8 text-brand-gold transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {/* Content */}
      <p className="text-brand-grey text-base sm:text-lg leading-relaxed mb-8">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={`${import.meta.env.BASE_URL}${testimonial.avatar}`}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-display text-lg text-brand-black">{testimonial.name}</h4>
          <p className="text-brand-grey text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
