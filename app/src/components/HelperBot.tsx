import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from './ui/button';

export default function HelperBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Show greeting after 3 seconds
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Greeting Bubble */}
      {showGreeting && !isOpen && (
        <div className="bg-white p-4 rounded-2xl shadow-elevated border border-brand-light-grey max-w-[200px] animate-fade-in relative">
          <button 
            onClick={() => setShowGreeting(false)}
            className="absolute -top-2 -right-2 bg-brand-light-grey rounded-full p-1 hover:bg-white transition-colors"
          >
            <X className="w-3 h-3 text-brand-grey" />
          </button>
          <p className="text-sm text-brand-black leading-relaxed">
            Hi! I'm your Hayzed assistant. How can I help you today?
          </p>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-elevated border border-brand-light-grey overflow-hidden flex flex-col animate-fade-in">
          {/* Header */}
          <div className="bg-brand-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold overflow-hidden p-1 border border-white/20">
                <img 
                  src={`${import.meta.env.BASE_URL}images/tailor-bot.png`} 
                  alt="Tailor Assistant" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-display text-sm">Hayzed Assistant</h3>
                <span className="text-brand-gold text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 bg-brand-off-white min-h-[300px] flex flex-col gap-4">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-brand-light-grey max-w-[85%]">
              <p className="text-sm text-brand-black">
                Welcome to Hayzed Casual! 🤝 Looking for a custom kaftan or need measuring advice? I'm here to help.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-brand-light-grey flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-brand-off-white border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-brand-gold outline-none"
            />
            <Button size="icon" className="bg-brand-black rounded-full w-9 h-9">
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGreeting(false);
        }}
        className={`w-16 h-16 rounded-full shadow-elevated flex items-center justify-center transition-all duration-500 hover:scale-110 overflow-hidden p-1 border-2 border-brand-gold bg-white ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/tailor-bot.png`} 
          alt="Chat" 
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  );
}
