import { useEffect, useRef, useState } from 'react';
import { Instagram, Heart } from 'lucide-react';

const instagramPosts = [
  {
    id: '1',
    image: 'images/instagram-1.jpg',
    likes: 342,
    caption: 'Street style meets African heritage. Our classic kaftan in its natural element.',
  },
  {
    id: '2',
    image: 'images/instagram-2.jpg',
    likes: 518,
    caption: 'Elegance is the only beauty that never fades. Our premium collection.',
  },
  {
    id: '3',
    image: 'images/instagram-3.jpg',
    likes: 892,
    caption: 'Celebrating love and culture. Groom style perfected for the big day.',
  },
  {
    id: '4',
    image: 'images/instagram-4.jpg',
    likes: 467,
    caption: 'Every detail matters. From fabric selection to final stitch.',
  },
];

export default function InstagramLookbook() {
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
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-36 bg-brand-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16 transition-all duration-700 ease-fluid ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
              Follow Our Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">
              @hayzedcasual
            </h2>
          </div>
          <a
            href="https://instagram.com/hayzedcasual"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-black hover:text-brand-gold transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium">Follow Us</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com/hayzedcasual"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square overflow-hidden transition-all duration-700 ease-fluid ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${post.image}`}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                <Heart className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-sm font-medium">{post.likes} likes</span>
              </div>

              {/* Corner Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 ease-fluid ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <a
            href="https://instagram.com/hayzedcasual"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-brand-black text-brand-black hover:bg-brand-black hover:text-white transition-all duration-300 text-sm font-medium tracking-wide"
          >
            <Instagram className="w-4 h-4" />
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
