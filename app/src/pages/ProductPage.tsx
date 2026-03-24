import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Ruler, Sparkles, WashingMachine, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { allProducts } from '@/lib/data';
import type { Product } from '@/types';

const products: Product[] = allProducts;

const sizeGuide = [
  { size: 'S', chest: '36-38', length: '52', sleeve: '24' },
  { size: 'M', chest: '40-42', length: '54', sleeve: '25' },
  { size: 'L', chest: '44-46', length: '56', sleeve: '26' },
  { size: 'XL', chest: '48-50', length: '58', sleeve: '27' },
  { size: 'XXL', chest: '52-54', length: '60', sleeve: '28' },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const product = products.find(p => p.id === id);

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

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-brand-black mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="bg-brand-black hover:bg-brand-grey text-white">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addItem(product, selectedSize, selectedColor);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const whatsappMessage = `Hello Hayzed Casual, I would like to order the ${product.name} in ${selectedColor}, size ${selectedSize}. Quantity: ${quantity}.`;
  const whatsappUrl = `https://wa.me/2349063165030?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <div
          className={`mb-8 transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Collections</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div
            className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-brand-light-grey rounded-lg">
              <img
                src={`${import.meta.env.BASE_URL}${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Strip - In a real app, this would show multiple images */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square bg-brand-light-grey rounded-lg overflow-hidden ${i === 0 ? 'ring-2 ring-brand-black' : ''}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${product.image}`}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div
            className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '0.4s' }}
          >
            {/* Category & Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20">
                {product.category}
              </Badge>
              {product.inStock && (
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <Check className="w-3 h-3" />
                  In Stock
                </span>
              )}
            </div>

            {/* Title & Price */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-4">
              {product.name}
            </h1>
            <p className="font-display text-2xl sm:text-3xl text-brand-gold mb-6">
              ₦{product.price.toLocaleString()} NGN
            </p>

            {/* Description */}
            <p className="text-brand-grey leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-brand-black mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all ${selectedColor === color
                        ? 'border-brand-black bg-brand-black text-white'
                        : 'border-brand-light-grey hover:border-brand-grey'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-brand-black">Size</h3>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-brand-gold text-sm hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3" />
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-sm rounded-lg border transition-all ${selectedSize === size
                        ? 'border-brand-black bg-brand-black text-white'
                        : 'border-brand-light-grey hover:border-brand-grey'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide Table */}
            {showSizeGuide && (
              <div className="mb-6 p-4 bg-brand-light-grey rounded-lg">
                <h4 className="font-medium text-brand-black mb-3">Size Guide (inches)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-grey/20">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest</th>
                        <th className="text-left py-2">Length</th>
                        <th className="text-left py-2">Sleeve</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((row) => (
                        <tr key={row.size} className="border-b border-brand-grey/10">
                          <td className="py-2">{row.size}</td>
                          <td className="py-2">{row.chest}</td>
                          <td className="py-2">{row.length}</td>
                          <td className="py-2">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-brand-grey mt-2">
                  Measurements are in inches. Length is measured from shoulder to hem.
                </p>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-brand-black mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-light-grey rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-brand-grey hover:text-brand-black transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-brand-grey hover:text-brand-black transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                onClick={handleAddToCart}
                className={`w-full py-6 text-sm font-medium transition-all duration-300 ${addedToCart
                    ? 'bg-green-600 hover:bg-green-600'
                    : 'bg-brand-black hover:bg-brand-grey'
                  } text-white`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Product Details */}
            <div className="border-t border-brand-light-grey pt-8 space-y-6">
              {/* Fabric */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Fabric & Material</h4>
                  <p className="text-sm text-brand-grey">{product.fabric}</p>
                </div>
              </div>

              {/* Fit */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Fit & Style</h4>
                  <p className="text-sm text-brand-grey">{product.fit}</p>
                </div>
              </div>

              {/* Care */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0">
                  <WashingMachine className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Care Instructions</h4>
                  <p className="text-sm text-brand-grey">{product.care}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
