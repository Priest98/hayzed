import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  scrolled: boolean;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Custom Tailoring', href: '/custom' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation({ scrolled }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-fluid ${scrolled
            ? 'py-2'
            : 'py-4'
          }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-fluid ${scrolled
              ? 'max-w-3xl px-6 py-2 mx-4 sm:mx-auto mt-2 rounded-full bg-white/80 backdrop-blur-md shadow-soft border border-white/20'
              : 'max-w-7xl px-4 sm:px-6 lg:px-8'
            }`}
        >
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl sm:text-2xl font-medium text-brand-black tracking-tight"
            >
              Hayzed Casual
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium link-underline transition-colors ${location.pathname === link.href
                      ? 'text-brand-black'
                      : 'text-brand-grey hover:text-brand-black'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-brand-grey hover:text-brand-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    className="p-2 text-brand-grey hover:text-brand-black transition-colors relative"
                    aria-label="Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-black text-white text-xs rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="font-display text-xl">Your Cart</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
                    {items.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <ShoppingBag className="w-12 h-12 text-brand-grey mb-4" />
                        <p className="text-brand-grey">Your cart is empty</p>
                        <Link to="/shop" onClick={() => setIsOpen(false)}>
                          <Button className="mt-4 bg-brand-black hover:bg-brand-grey text-white">
                            Continue Shopping
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto space-y-4">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 p-4 bg-brand-light-grey/50 rounded-lg"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-24 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-brand-black">{item.name}</h4>
                                <p className="text-sm text-brand-grey">
                                  Size: {item.selectedSize}
                                </p>
                                <p className="text-sm text-brand-grey">
                                  Color: {item.selectedColor}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-6 h-6 rounded border border-brand-grey/30 flex items-center justify-center text-sm hover:bg-brand-light-grey"
                                    >
                                      -
                                    </button>
                                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-6 h-6 rounded border border-brand-grey/30 flex items-center justify-center text-sm hover:bg-brand-light-grey"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <p className="font-medium">
                                    ₦{(item.price * item.quantity).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-brand-grey hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-4 mt-4 space-y-4">
                          <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-brand-grey">Subtotal</span>
                            <span className="font-display text-lg pt-1">₦{totalPrice.toLocaleString()}</span>
                          </div>

                          <Link to="/checkout" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-brand-black hover:bg-brand-grey text-white py-6 text-base shadow-soft">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Proceed to Checkout
                            </Button>
                          </Link>

                          <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                              <div className="w-full border-t border-brand-light-grey"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-white px-2 text-brand-grey">Or</span>
                            </div>
                          </div>

                          <a
                            href={`https://wa.me/2349063165030?text=Hello%20Hayzed%20Casual,%20I%20would%20like%20to%20order%20these%20items:%20${items.map(i => `${i.name} (${i.selectedSize})`).join(', ')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Order via WhatsApp
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-brand-grey hover:text-brand-black transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-md border-b border-brand-light-grey transition-all duration-300 ease-fluid overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block text-base font-medium py-2 ${location.pathname === link.href
                    ? 'text-brand-black'
                    : 'text-brand-grey'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 ease-fluid ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="h-full flex flex-col items-center justify-center px-4">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-brand-grey hover:text-brand-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for kaftans..."
              className="w-full text-2xl sm:text-4xl font-display border-b-2 border-brand-black bg-transparent py-4 focus:outline-none text-center"
              autoFocus={searchOpen}
            />
            <p className="text-center text-brand-grey mt-4 text-sm">
              Press Enter to search or ESC to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
