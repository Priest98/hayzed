import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Calendar, Ruler, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const services = [
  {
    icon: Ruler,
    title: 'Bespoke Measurements',
    description: 'Every kaftan is tailored to your exact measurements for a perfect fit that flatters your physique.',
  },
  {
    icon: Calendar,
    title: 'Consultation Session',
    description: 'Book a one-on-one consultation with our master tailors to discuss your vision and preferences.',
  },
  {
    icon: MessageSquare,
    title: 'Design Collaboration',
    description: 'Work directly with our design team to create a unique piece that reflects your personal style.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We discuss your vision, preferences, and the occasion for your custom kaftan.',
  },
  {
    number: '02',
    title: 'Measurements',
    description: 'Our master tailors take precise measurements to ensure a perfect fit.',
  },
  {
    number: '03',
    title: 'Fabric Selection',
    description: 'Choose from our curated collection of premium fabrics and embellishments.',
  },
  {
    number: '04',
    title: 'Fitting & Adjustments',
    description: 'We schedule fittings to refine the fit and ensure complete satisfaction.',
  },
  {
    number: '05',
    title: 'Final Delivery',
    description: 'Your custom kaftan is delivered, ready for your special occasion.',
  },
];

const fabricOptions = [
  'Premium Cotton',
  'Silk-Cotton Blend',
  'Pure Silk',
  'Linen',
  'Wool Blend',
  'Other (specify in notes)',
];

const occasionOptions = [
  'Wedding',
  'Traditional Ceremony',
  'Corporate Event',
  'Religious Occasion',
  'Casual Wear',
  'Other',
];

export default function CustomTailoringPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fabric: '',
    occasion: '',
    preferredDate: '',
    notes: '',
  });
  const [showDialog, setShowDialog] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Using Formspree for reliable email delivery
      const response = await fetch('https://formspree.io/f/mjgpaqoy', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `Custom Tailoring Request: ${formData.name}` }),
      });
      if (response.ok) {
        setShowDialog(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          fabric: '',
          occasion: '',
          preferredDate: '',
          notes: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  const whatsappMessage = `Hello Hayzed Casual, I would like to book a custom tailoring appointment. Name: ${formData.name}, Phone: ${formData.phone}, Preferred Date: ${formData.preferredDate}`;
  const whatsappUrl = `https://wa.me/2349063165030?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
                Personalized Service
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6">
                Custom Tailoring
              </h1>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed mb-8">
                Experience the luxury of bespoke tailoring. Our master craftsmen create
                one-of-a-kind kaftans tailored to your exact measurements and personal style.
                From fabric selection to final stitch, every detail is designed with you in mind.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-black hover:bg-brand-grey text-white px-8 py-4 rounded-full text-sm font-medium transition-colors group"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`text-center p-8 bg-white rounded-xl shadow-soft transition-all duration-700 ease-fluid hover:shadow-elevated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-cream flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl text-brand-black mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-grey text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 sm:py-28 lg:py-36 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
              How It Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">
              The Custom Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="bg-white rounded-xl p-6 h-full shadow-soft">
                  <span className="font-display text-4xl text-brand-gold/30 block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg text-brand-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-grey text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-brand-gold/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section ref={sectionRef} className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">
              Get Started
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-4">
              Request a Consultation
            </h2>
            <p className="text-brand-grey max-w-xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours
              to schedule your custom tailoring consultation.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`bg-white rounded-2xl p-6 sm:p-8 shadow-soft transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Full Name *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Email Address *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Phone Number *
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 000 000 0000"
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Preferred Fabric
                </label>
                <Select
                  value={formData.fabric}
                  onValueChange={(value) => setFormData({ ...formData, fabric: value })}
                >
                  <SelectTrigger className="border-brand-light-grey focus:border-brand-gold">
                    <SelectValue placeholder="Select fabric" />
                  </SelectTrigger>
                  <SelectContent>
                    {fabricOptions.map((fabric) => (
                      <SelectItem key={fabric} value={fabric}>
                        {fabric}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Occasion
                </label>
                <Select
                  value={formData.occasion}
                  onValueChange={(value) => setFormData({ ...formData, occasion: value })}
                >
                  <SelectTrigger className="border-brand-light-grey focus:border-brand-gold">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasionOptions.map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>
                        {occasion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Preferred Consultation Date
                </label>
                <Input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-black mb-2">
                Additional Notes
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tell us about your vision for the kaftan, any specific design preferences, or questions you may have..."
                className="border-brand-light-grey focus:border-brand-gold min-h-[120px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                className="flex-1 bg-brand-black hover:bg-brand-grey text-white py-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <p className="text-xs text-brand-grey text-center mt-4">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="font-display text-xl text-center">
              Request Submitted!
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your interest in our custom tailoring service. Our team will
              contact you within 24 hours to schedule your consultation.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowDialog(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
