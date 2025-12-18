import React, { useState, useEffect } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { ActionGrid } from './components/ActionGrid';
import { FeaturedProperty } from './components/FeaturedProperty';
import { Footer } from './components/Footer';
import { UserPlus } from 'lucide-react';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
  }, []);

  const handleSaveContact = () => {
    // Simulating vCard download
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Arthur Morgan
N:Morgan;Arthur;;;
TITLE:Luxury Real Estate Agent
TEL;TYPE=CELL:+5511999999999
EMAIL:contact@luxestate.com
URL:https://luxestate.com
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Arthur_Morgan_LuxEstate.vcf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-x-hidden bg-black font-sans">
      
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1600596542815-3ad19fb812a7?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Luxury Architecture Background" 
          className="w-full h-full object-cover animate-pulse-slow"
        />
      </div>

      {/* Main Glassmorphism Container */}
      <main 
        className={`
          relative z-20 w-full max-w-md mx-auto min-h-screen sm:min-h-[85vh] sm:rounded-[2rem] 
          bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl
          flex flex-col items-center p-6 sm:p-8
          transition-all duration-1000 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        {/* Shine Effect Top Right */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4AF37] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 pointer-events-none"></div>

        {/* Components */}
        <ProfileHeader />
        
        <ActionGrid />

        {/* Save Contact Button (Main CTA) */}
        <button 
          onClick={handleSaveContact}
          className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-[#D4AF37]/50 hover:bg-[#b5952f] transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 uppercase tracking-wider text-sm mb-2"
        >
          <UserPlus size={20} />
          Salvar na Agenda
        </button>

        <FeaturedProperty />
        
        <Footer />
      </main>
    </div>
  );
};

export default App;