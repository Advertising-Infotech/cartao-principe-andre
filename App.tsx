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
    // vCard generation with correct encoding and information
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN;CHARSET=UTF-8:Príncipe André Luís',
      'N;CHARSET=UTF-8:Luís;André;Príncipe;;',
      'ORG;CHARSET=UTF-8:Advertising Infotech',
      'TITLE;CHARSET=UTF-8:Criador > Decisor > Orquestrador',
      'TEL;TYPE=CELL;TYPE=VOICE;TYPE=pref:+5562991599031',
      'EMAIL;TYPE=INTERNET;TYPE=WORK:advertisingpropaganda@gmail.com',
      'URL:https://advertisinginfotech.com.br',
      'NOTE;CHARSET=UTF-8:Criando novos mundos reciclando sentimentos.',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Principe_Andre_Luis.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-x-hidden bg-black font-sans">
      
      {/* Total Black Background */}
      <div className="fixed inset-0 z-0 bg-black"></div>

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