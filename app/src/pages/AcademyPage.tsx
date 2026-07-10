import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Award, 
  Scissors, 
  ArrowRight, 
  Check, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Compass 
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

const programs = [
  {
    id: 'kaftan-masterclass',
    title: 'Masterclass in Luxury Kaftan Construction',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    description: 'Master the art of creating exquisitely tailored African kaftans. Learn everything from fabric selection and alignment to intricate embroidery styles and clean finishing.',
    highlights: [
      'Fabric property analysis (Aso-Oke, Polish Cotton, Royal Silks)',
      'Traditional and contemporary neckline embroidery techniques',
      'Advanced neck piping, placket design, and cuffs styling',
      'Pressing, packaging, and high-end presentation standard'
    ]
  },
  {
    id: 'pattern-drafting',
    title: 'Professional Menswear Pattern Drafting',
    duration: '2 Months',
    level: 'Intermediate to Advanced',
    description: 'Transition from freehand cutting to professional pattern drafting. Learn to draft custom blocks, manipulate darts, and adjust patterns for perfect fitting on various body shapes.',
    highlights: [
      'Standard body measurement and posture evaluation',
      'Drafting primary blocks for kaftans, Agbadas, and shirts',
      'Pattern grading, fitting adjustments, and ease calculation',
      'Solving complex posture styling issues'
    ]
  },
  {
    id: 'embroidery-artistry',
    title: 'Artisanal Embroidery & Embellishment',
    duration: '1 Month',
    level: 'All Levels',
    description: 'Unlock your creative potential in decorative stitchcraft. Learn design composition, hand embroidery, computer-aided machine embroidery, and traditional native embellishments.',
    highlights: [
      'Symmetric and asymmetric embroidery design sketching',
      'Traditional hand-stitching and modern chain-stitch techniques',
      'Color harmonization and thread selection secrets',
      'Stabilizing backings and fabric-embroidery pairing'
    ]
  },
  {
    id: 'fashion-business',
    title: 'Fashion Entrepreneurship & Brand Scaling',
    duration: '6 Weeks',
    level: 'All Levels',
    description: 'Learn the business behind fashion. Gain key insights into supply chain, brand positioning, marketing, pricing strategy, custom client management, and launching a luxury brand.',
    highlights: [
      'Luxury positioning and pricing architecture',
      'Sourcing fabrics, contracting tailors, and production scaling',
      'Social media storytelling and visual curation for luxury brands',
      'Client onboarding, fittings management, and customer service'
    ]
  }
];

const pillars = [
  {
    icon: GraduationCap,
    title: 'Master Tailor Mentorship',
    description: 'Learn directly from master artisans and brand directors who live and breathe luxury African menswear daily.'
  },
  {
    icon: Scissors,
    title: 'Live Atelier Environment',
    description: 'Train inside a functional, busy fashion house. Observe real client workflows, fittings, and daily production challenges.'
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    description: 'Top-performing graduates secure an immediate 3-month paid internship with Hayzed Casual or partner luxury labels.'
  },
  {
    icon: Compass,
    title: 'Brand Incubation Support',
    description: 'Get post-graduation support on business registration, logo design, sourcing contacts, and launching your debut collection.'
  }
];

const termOptions = [
  'Fall Term (Sept - Nov 2026)',
  'Winter Term (Jan - Mar 2027)',
  'Spring Term (Apr - Jun 2027)'
];

const experienceOptions = [
  'Absolute Beginner (No sewing experience)',
  'Basic Sewer (Can sew straight lines/simple items)',
  'Intermediate Tailor (Can sew garments, want to perfect finishing)',
  'Fashion Designer (Want to learn menswear tailoring or business)'
];

export default function AcademyPage() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    term: '',
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

  const handleInquireNow = (programTitle: string) => {
    setFormData(prev => ({ ...prev, program: programTitle }));
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/mjgpaqoy', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          _subject: `Academy Enrollment Inquiry: ${formData.name} - ${formData.program}` 
        }),
      });
      if (response.ok) {
        setShowDialog(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          program: '',
          term: '',
          experience: '',
          notes: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Academy form error:', error);
      alert('Failed to submit inquiry. Please try again or reach out on WhatsApp.');
    }
  };

  const whatsappMessage = `Hello Hayzed Academy, I would like to inquire about the ${formData.program || 'courses'}. Name: ${formData.name}, Phone: ${formData.phone}, Term: ${formData.term}`;
  const whatsappUrl = `https://wa.me/2349063165030?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-brand-off-white pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-brand-cream overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Left Content */}
            <div className="transition-all duration-700 ease-fluid animate-fade-up">
              <p className="text-brand-gold text-sm uppercase tracking-[0.25em] mb-4 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                Hayzed Fashion Academy
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-black mb-6 leading-tight">
                Crafting the Next Generation of <span className="italic">Luxury Designers</span>
              </h1>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed mb-8">
                Step into the elite world of luxury African menswear. Our academy offers intensive, 
                hands-on training programs in Kwara, Nigeria, bridging ancestral craftsmanship 
                with modern technical design and brand building. Learn the secrets of perfect fit 
                and high-end finishing from master tailors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-black hover:bg-brand-grey text-white px-8 py-4 rounded-full text-sm font-medium transition-colors group flex items-center justify-center gap-2 shadow-soft"
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand-black/20 hover:bg-brand-black/5 text-brand-black px-8 py-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Chat with Admissions
                </a>
              </div>
            </div>

            {/* Hero Right Image */}
            <div className="relative animate-scale-in">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated border border-white/20">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-kaftans.jpg`}
                  alt="Hayzed Academy Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-soft border border-brand-light-grey flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center">
                  <Award className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block font-display text-lg font-bold text-brand-black">100% Practical</span>
                  <span className="block text-xs text-brand-grey">Hands-on sewing & drafting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Overview Section */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side: Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-brand-cream rounded-xl overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-story.jpeg`}
                  alt="Pattern cutting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] bg-brand-cream rounded-xl overflow-hidden mt-8">
                <img
                  src={`${import.meta.env.BASE_URL}images/product-classic.jpg`}
                  alt="Classic tailoring"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right side: Mission details */}
            <div className="space-y-6">
              <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold">
                Our Educational Philosophy
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-black leading-tight">
                Where Ancestral Heritage Meets Haute Couture Precision
              </h2>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                At Hayzed Academy, we do not believe in shortcuts or freehand approximations. 
                We teach the rigorous science of measurement, pattern drafting, and structural integrity.
              </p>
              <p className="text-brand-grey text-base sm:text-lg leading-relaxed">
                Our programs are intensive and fully practical. Under the close watch of Master Tailors, 
                you will learn to handle fabrics correctly, understand the anatomy of menswear fit, and 
                perfect the invisible elements—such as stabilizer selection and collar structure—that 
                differentiate amateur garments from casual luxury masterpieces.
              </p>
              <div className="pt-4 border-t border-brand-light-grey grid grid-cols-2 gap-6">
                <div>
                  <span className="block font-display text-2xl text-brand-gold font-bold">1-on-1</span>
                  <span className="text-sm text-brand-grey">Individual tailoring desks</span>
                </div>
                <div>
                  <span className="block font-display text-2xl text-brand-gold font-bold">8 Students</span>
                  <span className="text-sm text-brand-grey">Strict limit per class intake</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 sm:py-24 bg-brand-black text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">Why study with us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">The Pillars of Hayzed Education</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                  <pillar.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl text-white mb-3">{pillar.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Programs Section */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
            <p className="text-brand-gold text-sm uppercase tracking-[0.2em] mb-4">Programs & Curriculum</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black">Our Professional Programs</h2>
            <p className="text-brand-grey mt-4">Select the path that fits your career goals. Whether you want to launch a local label, master the sewing machine, or draft bespoke patterns.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {programs.map((program) => (
              <div 
                key={program.id}
                className="bg-white rounded-2xl border border-brand-light-grey/60 p-6 sm:p-8 shadow-soft flex flex-col justify-between hover:shadow-elevated transition-shadow duration-300"
              >
                <div>
                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <span className="bg-brand-cream text-brand-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {program.level}
                    </span>
                    <span className="text-brand-grey text-sm font-medium flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-brand-gold" />
                      {program.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-brand-black mb-4">{program.title}</h3>
                  <p className="text-brand-grey text-sm leading-relaxed mb-6">{program.description}</p>
                  
                  {/* Highlights checklist */}
                  <div className="border-t border-brand-light-grey pt-6 mb-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-black mb-4">Curriculum Highlights:</h4>
                    <ul className="space-y-3">
                      {program.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-brand-grey text-sm">
                          <Check className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* CTA */}
                <Button 
                  onClick={() => handleInquireNow(program.title)}
                  className="w-full bg-brand-black hover:bg-brand-grey text-white py-6"
                >
                  Inquire About This Course
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery/Student Creations Showcase */}
      <section className="py-20 sm:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-xl mx-auto">
            <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">Live Lookbook</p>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-black">Student & Atelier Showcase</h2>
            <p className="text-brand-grey text-sm mt-3">Take a look inside the daily life of our academy and the professional kaftans structured in our masterclasses.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft">
              <img
                src={`${import.meta.env.BASE_URL}images/agbada-5-1.jpeg`}
                alt="Student luxury Agbada"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft mt-4 md:mt-8">
              <img
                src={`${import.meta.env.BASE_URL}images/casual-3.jpeg`}
                alt="Kaftan collar detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft">
              <img
                src={`${import.meta.env.BASE_URL}images/agbada-5-2.jpeg`}
                alt="Embroidery work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-soft mt-4 md:mt-8">
              <img
                src={`${import.meta.env.BASE_URL}images/casual-7.jpeg`}
                alt="Sleeve and button tailoring"
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
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-4">Enrollment & Inquiry Form</h2>
            <p className="text-brand-grey max-w-xl mx-auto text-sm">
              Spaces are strictly capped at 8 students per term to ensure premium 1-on-1 mentorship. 
              Fill out the details below, and our admissions team will call you within 24 hours.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className={`bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-brand-light-grey/80 transition-all duration-700 ease-fluid ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Contact details */}
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
                <label className="block text-sm font-medium text-brand-black mb-2">Select Program *</label>
                <Select
                  value={formData.program}
                  onValueChange={(val) => setFormData({ ...formData, program: val })}
                  required
                >
                  <SelectTrigger className="border-brand-light-grey focus:border-brand-gold">
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((p) => (
                      <SelectItem key={p.id} value={p.title}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">Preferred Intake Term *</label>
                <Select
                  value={formData.term}
                  onValueChange={(val) => setFormData({ ...formData, term: val })}
                  required
                >
                  <SelectTrigger className="border-brand-light-grey focus:border-brand-gold">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {termOptions.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">Your Sewing/Design Experience *</label>
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
                Inquire on WhatsApp
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
