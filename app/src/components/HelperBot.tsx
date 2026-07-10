import { useState, useEffect, useRef } from 'react';
import { X, Send, Scissors, Ruler, Sparkles, Calendar, ArrowRight, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const EXPERT_KNOWLEDGE = {
  fabrics: {
    'aso-oke': 'Our hand-woven Aso-oke is the crown jewel of our collection—offering unparalleled structure and cultural depth for majestic Agbada sets.',
    'silk': 'We utilize premium silk blends that provide a fluid, royal drape, perfect for high-profile reception wear and contemporary tunics.',
    'cotton': 'Our Polish Cotton and Viscose mixes are selected for their crisp finish and breathability, ideal for daily luxury and corporate kaftans.',
    'linen': 'For a more relaxed yet refined aesthetic, our Linen-Cotton blends offer effortless elegance and superior comfort in warmer climates.'
  },
  process: [
    '01. Initial Consultation: Discussing your vision and occasion.',
    '02. Precise Measurements: Taken by our master tailors for a perfect fit.',
    '03. Fabric Selection: Curating the finest textiles for your piece.',
    '04. Fitting & Adjustments: Refining the silhouette to perfection.',
    '05. Final Delivery: Delivery of your unique Hayzed masterpiece.'
  ],
  responses: {
    greeting: "Welcome to Hayzed Casual Luxury. I am your elite concierge. How may I assist your pursuit of sartorial excellence today?",
    fabrics: "We curate only the finest textiles. From hand-woven Aso-oke to premium Polish Cotton and Royal Silks, each fabric is chosen for its character and longevity.",
    tailoring: "Bespoke tailoring is at the heart of Hayzed. Our 5-step process ensures that every garment is a second skin, reflecting your stature and style.",
    booking: "To begin your bespoke journey, I recommend booking a private consultation. Experience the luxury of a perfect fit.",
    academy: "The Hayzed Fashion Academy offers intensive professional programs in Luxury Kaftan Construction, Menswear Pattern Drafting, Artisanal Embroidery, and Fashion Brand scaling. Classes are limited to 8 students for absolute 1-on-1 mentorship.",
    default: "I appreciate your inquiry. For specific style consultations or measurement advice, our master tailors are available for private appointments."
  }
};

export default function HelperBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: EXPERT_KNOWLEDGE.responses.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated Intelligence
    setTimeout(() => {
      let response = EXPERT_KNOWLEDGE.responses.default;
      const lower = input.toLowerCase();

      if (lower.includes('academy') || lower.includes('course') || lower.includes('learn') || lower.includes('school') || lower.includes('training') || lower.includes('study') || lower.includes('class')) {
        response = `${EXPERT_KNOWLEDGE.responses.academy} You can learn more about our curriculum and enrollment terms on our 'Academy' page.`;
      } else if (lower.includes('fabric') || lower.includes('material')) {
        response = `${EXPERT_KNOWLEDGE.responses.fabrics} Would you like to know about our Aso-oke or Royal Silks specifically?`;
      } else if (lower.includes('tailor') || lower.includes('custom') || lower.includes('measure') || lower.includes('fit') || lower.includes('how it works')) {
        response = `${EXPERT_KNOWLEDGE.responses.tailoring} Our process includes: \n\n${EXPERT_KNOWLEDGE.process.join('\n')}\n\nShall I guide you to our booking page?`;
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('consult')) {
        response = `${EXPERT_KNOWLEDGE.responses.booking} You can secure your session directly via our 'Book Custom Fit' link below.`;
      } else if (lower.includes('aso-oke') || lower.includes('asooke')) {
        response = EXPERT_KNOWLEDGE.fabrics['aso-oke'] + " It is especially favored for our Luxe Agbada collections.";
      } else if (lower.includes('price') || lower.includes('cost')) {
        response = "At Hayzed, luxury is measured in craftsmanship. Prices for bespoke pieces start from ₦60,000 for Kaftans and ₦150,000 for Luxe Agbada sets, depending on fabric choice.";
      }

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Greeting Bubble */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-4 rounded-2xl shadow-elevated border border-brand-light-grey max-w-[240px] relative pointer-events-auto"
          >
            <button 
              onClick={() => setShowGreeting(false)}
              className="absolute -top-2 -right-2 bg-brand-light-grey rounded-full p-1 hover:bg-brand-gold hover:text-white transition-all shadow-sm"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-brand-black leading-relaxed pr-2 font-medium">
              Greetings. Seeking the perfect fit or premium fabric advice? I am at your service.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-[350px] sm:w-[420px] h-[600px] rounded-3xl shadow-elevated border border-brand-light-grey overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-brand-black p-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30">
                  <Scissors className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-white font-display text-lg tracking-wide">Elite Concierge</h3>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-brand-gold text-[0.65rem] uppercase tracking-[0.2em] font-medium">
                      Tailoring Expert
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 bg-brand-off-white/50 overflow-y-auto flex flex-col gap-6 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'assistant' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[0.9rem] leading-relaxed shadow-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-white text-brand-black rounded-tl-none border border-brand-light-grey whitespace-pre-line' 
                      : 'bg-brand-black text-white rounded-tr-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-brand-light-grey flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap bg-brand-off-white/50">
              <button 
                onClick={() => setInput('Tell me about your fabrics')}
                className="px-3 py-1.5 rounded-full border border-brand-gold/20 text-[0.65rem] uppercase tracking-widest text-brand-black hover:bg-brand-gold/10 transition-colors bg-white mt-1"
              >
                <Sparkles className="w-3 h-3 inline mr-1" /> Fabrics
              </button>
              <button 
                onClick={() => setInput('How does custom tailoring work?')}
                className="px-3 py-1.5 rounded-full border border-brand-gold/20 text-[0.65rem] uppercase tracking-widest text-brand-black hover:bg-brand-gold/10 transition-colors bg-white mt-1"
              >
                <Ruler className="w-4 h-4 inline mr-1" /> Process
              </button>
              <button 
                onClick={() => setInput('Tell me about your fashion academy')}
                className="px-3 py-1.5 rounded-full border border-brand-gold/20 text-[0.65rem] uppercase tracking-widest text-brand-black hover:bg-brand-gold/10 transition-colors bg-white mt-1"
              >
                <BookOpen className="w-3.5 h-3.5 inline mr-1" /> Academy
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-brand-light-grey flex flex-col gap-4">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about fabrics or tailoring..." 
                  className="flex-1 bg-brand-off-white border-none rounded-full px-5 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none placeholder:text-brand-grey/50"
                />
                <Button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-brand-black hover:bg-brand-gold hover:text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-md group disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                </Button>
              </div>
              <Link 
                to="/custom" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-brand-gold text-white py-3.5 rounded-full text-[0.7rem] uppercase tracking-luxury font-semibold shadow-luxury hover:bg-brand-black transition-all group"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Custom Fit
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGreeting(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full shadow-elevated flex items-center justify-center transition-all duration-500 overflow-hidden border-2 bg-white relative group ${
          isOpen ? 'border-brand-black rotate-90' : 'border-brand-gold'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div 
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-8 h-8 text-brand-black" />
            </motion.div>
          ) : (
            <motion.div 
              key="bot"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <MessageSquare className="w-7 h-7 text-brand-gold" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-brand-gold rounded-full border-2 border-white translate-x-1/4 -translate-y-1/4">
                <span className="absolute inset-0 bg-brand-gold rounded-full animate-ping opacity-75" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
