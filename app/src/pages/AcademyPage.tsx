import { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Scissors, 
  ArrowRight, 
  Check, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Calendar,
  MapPin,
  DollarSign,
  UserCheck,
  Users
} from 'lucide-react';
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

const syllabus = [
  {
    title: 'Sewing Machine Mastery',
    description: 'Learn the ins and outs of industrial sewing machine operations, straight and curved stitching controls, needle dynamics, tension balancing, and machine maintenance.',
    highlights: ['Industrial lockstitch setup', 'Stitch length and tension control', 'Troubleshooting and minor machine repairs', 'Safety and speed drills']
  },
  {
    title: 'Pattern Drafting',
    description: 'Transition from freehand cutting to professional pattern drafting. Learn standard body measurement evaluation and how to draft custom blocks for a perfect fit.',
    highlights: ['Body measurement analysis', 'Senator and Kaftan block construction', 'Dart manipulation and neck contouring', 'Fitting adjustments and pattern grading']
  },
  {
    title: "Men's Senator & Kaftan Styles",
    description: "Master the design and construction of contemporary Senator and Kaftan styles. Learn classic and asymmetric cuts, detailing, and proper fabric pairing.",
    highlights: ['Placket construction styles', 'Cuffs and sleeve styling', 'Asymmetric design cutting', 'Traditional Yoruba cap and styling pairings']
  },
  {
    title: 'Finishing & Styling Techniques',
    description: 'Perfect the invisible elements that separate amateur work from luxury couture. Learn neat piping, collar fixing, invisible hemming, and professional pressing.',
    highlights: ['Clean placket fixing', 'Precision collar joining', 'Inseam pockets and side vents', 'Professional pressing and fabric stabilizing']
  },
  {
    title: 'Branding and Selling Your Designs',
    description: 'Learn how to package, brand, price, and sell your creations. Understand the business architecture of a luxury menswear label.',
    highlights: ['Clothing photography and visual curation', 'Pricing strategies for premium segments', 'Client onboarding and custom fittings management', 'Social media marketing and brand scaling']
  }
];

const highlights = [
  {
    icon: Scissors,
    title: 'Hands-on Practicals',
    description: '100% practical, focused training with your own dedicated sewing workspace in our modern Kwara atelier.'
  },
  {
    icon: Briefcase,
    title: 'Fashion Business Classes',
    description: 'Dedicated business training covering brand positioning, client relationships, and scaling your designs from day one.'
  },
  {
    icon: Users,
    title: 'Guest Fashion Experts',
    description: 'Masterclasses and guest lectures led by elite fashion experts in the Nigerian luxury fashion sector.'
  },
  {
    icon: Award,
    title: 'Final Showcase & Certificate',
    description: 'Graduation capsule collection presentation followed by the award of your professional fashion certificate.'
  }
];

const experienceOptions = [
  'Absolute Beginner (No sewing experience)',
  'Basic Sewer (Can sew straight lines/simple items)',
  'Intermediate Tailor (Can sew garments, want to perfect finishing)',
  'Fashion Designer (Want to learn luxury menswear tailoring)'
];

export default function AcademyPage() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    notes: ''
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

    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/mjgpaqoy', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          program: "Learn Fashion Design in 3 Months (Native Wear Masterclass)",
          _subject: `Academy Enrollment Inquiry: ${formData.name}` 
        }),
      });
      if (response.ok) {
        setShowDialog(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          notes: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Academy form error:', error);
      alert('Failed to submit inquiry. Please try again or contact us directly on WhatsApp.');
    }
  };

  const whatsappMessage = `Hello Hayzed Academy, I would like to enroll in the 3-Month Intensive Fashion Design Program. Name: ${formData.name}, Phone: ${formData.phone}`;
  const whatsappUrl = `https://wa.me/2349063165030?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-brand-cream overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-7 transition-all duration-700 ease-fluid animate-fade-up">
              <p className="text-brand-gold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                Hayzed Fashion Academy
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-black mb-6 leading-tight">
                Learn Fashion Design <span className="italic font-normal text-brand-gold">in 3 Months</span>
              </h1>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed mb-8">
                This intensive 3-month training program will equip you with the skills to master Men’s Native Wear, 
                guiding you through the entire process from initial sketch to finished stitching. Inspired by 
                the premium tailoring standards of Kwara’s luxury couture scene.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-black hover:bg-brand-grey text-white px-8 py-4 rounded-full text-sm font-medium transition-colors group flex items-center justify-center gap-2 shadow-soft"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand-black/20 hover:bg-brand-black/5 text-brand-black px-8 py-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Image / Badge card */}
            <div className="lg:col-span-5 relative animate-scale-in">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated border border-white/20">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-kaftans.jpg`}
                  alt="Hayzed Academy Student Senator Wear"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Ilorin badge */}
              <div className="absolute -bottom-6 -left-6 bg-brand-black text-white p-4 rounded-xl shadow-soft flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-black" />
                </div>
                <div>
                  <span className="block text-xs text-white/60 uppercase tracking-widest font-semibold">Location</span>
                  <span className="block font-display text-sm text-brand-beige">Ilorin, Kwara State</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Dates & Fees Cards */}
      <section className="py-12 sm:py-16 bg-white border-y border-brand-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sale date */}
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="block text-[0.65rem] uppercase tracking-widest text-brand-grey font-bold">Form Sales</span>
                <span className="block text-sm font-semibold text-brand-black mt-1">July 15th – 25th, 2026</span>
              </div>
            </div>

            {/* Class start */}
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="block text-[0.65rem] uppercase tracking-widest text-brand-grey font-bold">Class Start</span>
                <span className="block text-sm font-semibold text-brand-black mt-1">August 10th, 2026</span>
              </div>
            </div>

            {/* Normal fee */}
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="block text-[0.65rem] uppercase tracking-widest text-brand-grey font-bold">Training Fee</span>
                <span className="block text-sm font-semibold text-brand-black mt-1">₦250,000 NGN</span>
              </div>
            </div>

            {/* Early bird */}
            <div className="flex items-start gap-4 p-4 relative overflow-hidden bg-brand-cream/40 rounded-xl border border-brand-gold/20">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <span className="block text-[0.65rem] uppercase tracking-widest text-brand-gold font-bold">First 5 Applicants</span>
                <span className="block text-sm font-bold text-brand-black mt-1">₦200,000 NGN</span>
              </div>
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-brand-gold text-brand-black text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl">
                Promo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Luxury Standard (Sewphie Stitches Inspo) */}
      <section className="py-20 sm:py-28 bg-brand-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual block */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-soft">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-story.jpeg`}
                  alt="Haute couture tailoring"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-soft mt-8">
                <img
                  src={`${import.meta.env.BASE_URL}images/casual-3.jpeg`}
                  alt="Precision cuffs and collar joinings"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text block detailing the Sewphie Stitches Inspiration */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold">
                Haute Couture Inspiration
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-black leading-tight">
                Inspired by the Purest Standards of Kwara Couture
              </h2>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                Drawing inspiration from legendary Kwara luxury couture brands like **Sewphie Stitches**, 
                our training moves far beyond simple machine stitching. We teach students the structural 
                precision of high-end tailoring, emphasizing clean lines, mathematical body balancing, 
                and premium finishing techniques.
              </p>
              <p className="text-brand-grey text-base leading-relaxed">
                You will learn the secrets of structure—how to stabilize necklines, draft perfect Senator sleeves 
                that fit like a second skin, and achieve clean, flat plackets with invisible interior stitches. 
                Our curriculum is designed to produce master tailors, not just hobbyists.
              </p>
              <div className="pt-6 border-t border-brand-light-grey grid grid-cols-3 gap-6">
                <div>
                  <span className="block font-display text-xl text-brand-gold font-bold">100%</span>
                  <span className="text-xs text-brand-grey">Structured Pattern drafting</span>
                </div>
                <div>
                  <span className="block font-display text-xl text-brand-gold font-bold">8 Student</span>
                  <span className="text-xs text-brand-grey">Strict workspace capacity limit</span>
                </div>
                <div>
                  <span className="block font-display text-xl text-brand-gold font-bold">Premium</span>
                  <span className="text-xs text-brand-grey">Artisanal finishing focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights Section */}
      <section className="py-20 sm:py-24 bg-brand-black text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">Program Highlights</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">Why Study With Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                  <highlight.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl text-white mb-3">{highlight.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn (Detailed Syllabus) */}
      <section className="py-20 sm:py-28 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">Course Curriculum</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">What You Will Learn</h2>
            <p className="text-brand-grey mt-4">Our curriculum is carefully sequenced to guide you from absolute machine basics up to designing and selling high-end Senator and Kaftan wear.</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {syllabus.map((item, index) => (
              <div 
                key={index} 
                className="group border border-brand-light-grey rounded-2xl p-6 sm:p-8 hover:border-brand-gold transition-colors duration-300 bg-brand-off-white/30"
              >
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                  {/* Step number */}
                  <span className="font-display text-4xl text-brand-gold/30 shrink-0 font-bold leading-none">
                    0{index + 1}
                  </span>
                  
                  {/* Title & Description */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-brand-black font-semibold mb-2 group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-brand-grey text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Sub-highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-brand-grey font-medium">
                          <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Lookbook Grid */}
      <section className="py-20 sm:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-xl mx-auto">
            <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3 font-body">Portfolios</p>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-black">Native Wear Showcase</h2>
            <p className="text-brand-grey text-sm mt-3">Visualizing the structural quality of garments drafted and constructed by our tailors.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft">
              <img
                src={`${import.meta.env.BASE_URL}images/agbada-5-1.jpeg`}
                alt="Embroidery and structure details"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft mt-4 md:mt-8">
              <img
                src={`${import.meta.env.BASE_URL}images/casual-7.jpeg`}
                alt="Men's Senator styling"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft">
              <img
                src={`${import.meta.env.BASE_URL}images/agbada-5-2.jpeg`}
                alt="Premium hand embellishment"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft mt-4 md:mt-8">
              <img
                src={`${import.meta.env.BASE_URL}images/casual-12.jpeg`}
                alt="Flat placket and custom pockets"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section ref={formSectionRef} className="py-20 sm:py-28 lg:py-36 scroll-mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">Admissions Open</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-4">Apply for Admission</h2>
            <p className="text-brand-grey max-w-xl mx-auto text-sm">
              Standard tuition is ₦250,000 NGN. The first 5 applicants secure our early-bird rate of ₦200,000 NGN. 
              Fill out the details below, and our admissions team will contact you within 24 hours.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className={`bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-brand-light-grey/80 transition-all duration-700 ease-fluid ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">Email Address *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">Phone Number *</label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="border-brand-light-grey focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">Sewing / Tailoring Experience *</label>
                <Select
                  value={formData.experience}
                  onValueChange={(val) => setFormData({ ...formData, experience: val })}
                  required
                >
                  <SelectTrigger className="border-brand-light-grey focus:border-brand-gold">
                    <SelectValue placeholder="Describe experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-black mb-2">Tell us about your learning goals & career plans</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="What do you hope to achieve after completing this program? Do you plan to launch your own brand?"
                className="border-brand-light-grey focus:border-brand-gold min-h-[120px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                className="flex-1 bg-brand-black hover:bg-brand-grey text-white py-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Register Now on WhatsApp
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="font-display text-xl text-center">
              Application Inquired!
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your interest in the Hayzed Fashion Academy. We have received your inquiry
              and our admissions counselor will call or contact you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={() => setShowDialog(false)} className="mt-4 px-8">
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
