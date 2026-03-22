'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CAROUSEL_ITEMS = [
  { src: '/carrossel/01.jpeg', socialProof: 'Reconhecimento', line1: 'Honraria literária internacional', line2: 'Embajadores Culturales & de Paz', line3: 'Homenagem' },
  { src: '/carrossel/02.jpeg', socialProof: 'Nomeação mundial', line1: 'Força e bem estar – México', line2: 'Confederación Diplomática de Derechos Humanos', line3: 'Nomeação' },
  { src: '/carrossel/03.jpeg', socialProof: 'Príncipe de Israel', line1: 'Reconhecimento global', line2: 'International Court of Justice', line3: 'Nomeação' },
  { src: '/carrossel/20.jpg', socialProof: 'Homenagem', line1: 'Os melhores de Goiás', line2: 'Alô TV – Leno Silva', line3: 'Troféu' },
  { src: '/carrossel/50.jpg', socialProof: 'ONU', line1: 'Guardião Mundial da Cultura', line2: 'Comissão de Assuntos Econômicos da ONU', line3: 'Membro Honorário' },
];

export const FeaturedProperty: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const item = CAROUSEL_ITEMS[currentIndex];

  return (
    <div className="w-full mt-2 mb-4">
      <div className="flex items-end justify-end mb-4 px-1">
        <span className="text-2xl font-bold animate-blink-yellow shrink-0 mb-0.5">
          {currentIndex + 1} / {CAROUSEL_ITEMS.length}
        </span>
      </div>
      
      <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-[1.02] duration-300">
        <div className="relative h-64 w-full overflow-hidden bg-black/40">
          <img 
            src={item.src}
            alt={item.line1}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          
          <div className="absolute top-3 right-3 z-10 text-[#D4AF37] text-[11px] font-black leading-tight text-right uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {item.socialProof}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h4 className="font-bold text-white truncate leading-tight text-lg sm:text-xl drop-shadow-lg">
              {item.line1}
            </h4>
          </div>
        </div>

        <div className="pt-3 pb-4 px-4 relative bg-white/5 backdrop-blur-md border-t border-white/5">
          <p className="text-gray-300 mb-2 text-[0.82rem] sm:text-[0.94rem]">
            {item.line2}
          </p>
          
          <div className="flex items-start justify-between gap-4">
            <span className="text-[#D4AF37] font-bold text-base sm:text-lg line-clamp-2 flex-1">
              {item.line3}
            </span>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handlePrev}
                className="flex items-center gap-1 text-white text-[10px] bg-white/10 hover:bg-[#D4AF37] hover:text-black px-2.5 py-2 rounded-lg transition-colors duration-300 backdrop-blur-md border border-white/20 uppercase font-bold"
              >
                <ArrowLeft size={12} /> {t('prev')}
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-1 text-white text-[10px] bg-white/10 hover:bg-[#D4AF37] hover:text-black px-2.5 py-2 rounded-lg transition-colors duration-300 backdrop-blur-md border border-white/20 uppercase font-bold"
              >
                {t('next')} <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
