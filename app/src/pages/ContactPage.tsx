import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Hayzed Casual Atelier', 'Kwara State, Nigeria'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['09063165030'],
    action: {
      label: 'Call Now',
      href: 'tel:+2349063165030',
    },
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['Hayzedcasual@gmail.com'],
    action: {
      label: 'Send Email',
      href: 'mailto:Hayzedcasual@gmail.com',
    },
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
  },
];

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      // Replace 'mqakozoy' with your actual Formspree Form ID
      const response = await fetch('https://formspree.io/f/mqakozoy', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `New Inquiry: ${formData.subject}` }),
      });
      if (response.ok) {
        setShowDialog(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const whatsappUrl = 'https://wa.me/2349063165030?text=Hello%20Hayzed%20Casual,%20I%20would%20like%20to%20inquire%20about%20your%20kaftans';

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
                Get in Touch
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-6">
                Contact Us
              </h1>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed mb-8">
                We would love to hear from you. Whether you have a question about our
                collections, sizing, or custom orders, our team is ready to assist you.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-sm font-medium transition-colors group"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className={`bg-white rounded-xl p-6 shadow-soft transition-all duration-700 ease-fluid hover:shadow-elevated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-display text-lg text-brand-black mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-brand-grey text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {info.action && (
                  <a
                    href={info.action.href}
                    className="inline-flex items-center gap-1 text-brand-gold text-sm font-medium mt-4 hover:underline"
                  >
                    {info.action.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={sectionRef} className="py-20 sm:py-28 lg:py-36 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft">
                <h2 className="font-display text-2xl text-brand-black mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-black mb-2">
                        Your Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
                        className="border-brand-light-grey focus:border-brand-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-2">
                      Subject *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help you?"
                      className="border-brand-light-grey focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your inquiry..."
                      className="border-brand-light-grey focus:border-brand-gold min-h-[150px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-brand-black hover:bg-brand-grey text-white py-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Quick Contact */}
            <div
              className={`transition-all duration-700 ease-fluid ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="bg-brand-black rounded-2xl p-6 sm:p-8 text-white h-full">
                <h2 className="font-display text-2xl mb-6">Quick Contact</h2>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">
                      WhatsApp (Fastest Response)
                    </h3>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-lg hover:text-brand-gold transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      09063165030
                    </a>
                  </div>

                  <div>
                    <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+2349063165030"
                      className="block text-lg hover:text-brand-gold transition-colors mb-1"
                    >
                      09063165030
                    </a>
                  </div>

                  <div>
                    <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:Hayzedcasual@gmail.com"
                      className="block text-lg hover:text-brand-gold transition-colors"
                    >
                      Hayzedcasual@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">
                    Follow Us
                  </h3>
                  <a
                    href="https://instagram.com/hayzedcasual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-brand-gold transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @hayzedcasual
                  </a>
                </div>
              </div>
            </div>
          </div>
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
              Message Sent!
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for reaching out to Hayzed Casual. We have received your
              message and will get back to you within 24 hours.
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
