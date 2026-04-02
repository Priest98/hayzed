import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

import { featuredProducts } from '@/lib/data';

export default function FeaturedCollections() {
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
      { threshold: 0.2 }
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
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16 transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div>
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-2">
              Curated Selection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-2 text-brand-black hover:text-brand-gold transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  isVisible: boolean;
}

function ProductCard({ product, index, isVisible }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${100 + index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-light-grey mb-4">
        <img
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-all duration-700 ease-fluid ${isHovered ? 'scale-105' : 'scale-100'
            }`}
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-brand-black/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Quick View Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="bg-white text-brand-black px-6 py-3 text-sm font-medium rounded-full transform transition-transform duration-500 hover:scale-105">
            Quick View
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-brand-black text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-display text-xl text-brand-black group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-grey text-sm font-medium">
          ₦{product.price.toLocaleString()} NGN
        </p>
      </div>
    </Link>
  );
}
