import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
    const { items, totalPrice } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
    });
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-display mb-4">Your cart is empty</h2>
                <Link to="/shop">
                    <Button>Back to Shop</Button>
                </Link>
            </div>
        );
    }

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/.netlify/functions/paystack-init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    amount: totalPrice,
                    metadata: {
                        full_name: formData.name,
                        cart_items: items.map(item => ({
                            id: item.id,
                            name: item.name,
                            quantity: item.quantity,
                            size: item.selectedSize,
                            color: item.selectedColor
                        }))
                    }
                }),
            });

            const data = await response.json();

            if (data.status && data.data.authorization_url) {
                window.location.href = data.data.authorization_url;
            } else {
                alert('Failed to initialize payment. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-off-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-brand-grey hover:text-brand-black mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="order-2 lg:order-1">
                        <h1 className="font-display text-3xl mb-8">Checkout</h1>
                        <form onSubmit={handleCheckout} className="bg-white p-6 sm:p-8 rounded-2xl shadow-soft">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-brand-black mb-2">
                                        Email Address
                                    </label>
                                    <Input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-brand-black mb-2">
                                        Full Name
                                    </label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-brand-black hover:bg-brand-grey text-white py-6"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        ) : (
                                            <Lock className="w-4 h-4 mr-2" />
                                        )}
                                        Pay ₦{totalPrice.toLocaleString()} via Paystack
                                    </Button>
                                </div>
                                <p className="text-[10px] text-center text-brand-grey uppercase tracking-widest">
                                    Secure Payment Gateway by Paystack
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Cart Summary */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-brand-cream/50 p-6 sm:p-8 rounded-2xl">
                            <h2 className="font-display text-xl mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium">{item.name}</h4>
                                            <p className="text-xs text-brand-grey">
                                                {item.selectedColor} / {item.selectedSize} x {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-brand-black/10 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-brand-grey">Shipping</span>
                                    <span>Calculated at next step</span>
                                </div>
                                <div className="flex justify-between text-lg font-display pt-2">
                                    <span>Total</span>
                                    <span>₦{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
