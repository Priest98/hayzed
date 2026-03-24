import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function PaymentSuccessPage() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const { clearCart } = useCart();
    const reference = searchParams.get('reference');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!reference) {
                setStatus('error');
                return;
            }

            try {
                const response = await fetch(`/.netlify/functions/paystack-verify?reference=${reference}`);
                const data = await response.json();

                if (data.status && data.data.status === 'success') {
                    setStatus('success');
                    clearCart();
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
            }
        };

        verifyPayment();
    }, [reference, clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-off-white">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-soft text-center">
                {status === 'loading' && (
                    <div className="space-y-4">
                        <Loader2 className="w-12 h-12 animate-spin mx-auto text-brand-gold" />
                        <h2 className="text-xl font-display">Verifying Payment...</h2>
                        <p className="text-brand-grey">Please do not close this window.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                        <h2 className="text-2xl font-display">Payment Successful!</h2>
                        <p className="text-brand-grey">
                            Thank you for your purchase. We've received your order and will begin
                            processing it shortly. A confirmation email has been sent.
                        </p>
                        <Link to="/shop">
                            <Button className="w-full bg-brand-black hover:bg-brand-grey text-white">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <XCircle className="w-16 h-16 mx-auto text-red-500" />
                        <h2 className="text-2xl font-display">Payment Failed</h2>
                        <p className="text-brand-grey">
                            We couldn't verify your payment. If you believe this is an error,
                            please contact our support team with reference: <br />
                            <code className="text-xs bg-gray-100 p-1 rounded">{reference}</code>
                        </p>
                        <div className="space-y-3">
                            <Link to="/checkout">
                                <Button className="w-full bg-brand-black hover:bg-brand-grey text-white">
                                    Try Again
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" className="w-full">
                                    Contact Support
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
