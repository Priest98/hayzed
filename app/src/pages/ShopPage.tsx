import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Grid3X3, LayoutGrid, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

import { allProducts, categories } from '@/lib/data';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [gridView, setGridView] = useState<'grid' | 'large'>('grid');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Immediate entrance animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentCategory = searchParams.get('category') || 'all';
    if (selectedCategory !== currentCategory) {
      if (selectedCategory === 'all') {
        searchParams.delete('category');
      } else {
        searchParams.set('category', selectedCategory);
      }
      setSearchParams(searchParams, { replace: true });
    }
  }, [selectedCategory, searchParams, setSearchParams]);

  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div
          className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-2">
            Explore
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6">
            Our Collections
          </h1>
          <p className="text-brand-grey max-w-xl">
            Discover our curated selection of premium kaftans, each piece crafted
            with meticulous attention to detail and African heritage.
          </p>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="sticky top-20 z-30 bg-brand-off-white/95 backdrop-blur-sm border-b border-brand-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-brand-black text-white'
                    : 'bg-white text-brand-grey hover:bg-brand-light-grey'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-brand-grey">
                {filteredProducts.length} Products
              </span>
              <div className="flex items-center gap-1 bg-white rounded-lg p-1">
                <button
                  onClick={() => setGridView('grid')}
                  className={`p-2 rounded transition-colors ${gridView === 'grid' ? 'bg-brand-black text-white' : 'text-brand-grey'
                    }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridView('large')}
                  className={`p-2 rounded transition-colors ${gridView === 'large' ? 'bg-brand-black text-white' : 'text-brand-grey'
                    }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          key={selectedCategory} // Add key to force re-render/re-animate on category change
          className={`grid gap-6 lg:gap-8 ${gridView === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2'
            }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
              gridView={gridView}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-grey mb-4">No products found in this category.</p>
            <Button
              onClick={() => setSelectedCategory('all')}
              className="bg-brand-black hover:bg-brand-grey text-white"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  isVisible: boolean;
  gridView: 'grid' | 'large';
}

function ProductCard({ product, index, isVisible, gridView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 30}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-brand-light-grey mb-4 ${gridView === 'large' ? 'aspect-[4/5]' : 'aspect-[3/4]'
          }`}
      >
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
          className={`absolute inset-0 bg-brand-black/30 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Quick View Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="bg-white text-brand-black px-6 py-3 text-sm font-medium rounded-full transform transition-transform duration-500 hover:scale-105 flex items-center gap-2">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-sm text-brand-black hover:bg-white">
            {product.category}
          </Badge>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-brand-black text-white px-3 py-1.5 text-sm font-medium rounded-full">
            ₦{product.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-display text-xl text-brand-black group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-grey text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-brand-grey pt-2">
          <span>{product.fabric}</span>
          <span className="w-1 h-1 rounded-full bg-brand-grey" />
          <span>{product.fit}</span>
        </div>
      </div>
    </Link>
  );
}
