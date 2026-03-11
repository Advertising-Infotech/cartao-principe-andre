import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import carouselData from '../carouselData.json';

export const FeaturedProperty: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel items configuration from JSON
  const carouselItems = carouselData.map(item => ({
    type: item.file.endsWith('.mp4') ? 'video' : 'image',
    src: `/carrossel/${item.file}`,
    socialProof: item.socialProof,
    medal: item.medal,
    location: item.location,
    merit: item.merit
  }));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div className="w-full mt-2 mb-4">
      <div className="flex items-end justify-between mb-4 px-1">
        <h3 className="text-white text-sm font-semibold uppercase tracking-wider leading-tight whitespace-pre-line">
          {t('titlesSection')}
        </h3>
        <span className="text-[#D4AF37] text-xs shrink-0 ml-4 mb-0.5">
          {currentIndex + 1} / {carouselItems.length}
        </span>
      </div>
      
      <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-[1.02] duration-300">
        <div className="relative h-64 w-full overflow-hidden bg-black/40">
            <div className="absolute top-3 right-3 z-10 text-[#D4AF37] text-[10px] font-black leading-tight text-right uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-pre-line">
              {currentItem.socialProof}
            </div>
            
            {currentItem.type === 'video' ? (
              <video 
                  key={currentItem.src}
                  src={currentItem.src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <img 
                  key={currentItem.src}
                  src={currentItem.src} 
                  alt={currentItem.medal}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        </div>

        <div className="p-4 relative -mt-12">
            <h4 className="text-lg font-bold text-white mb-1">
              {currentItem.medal}
            </h4>
            <p className="text-gray-300 text-sm mb-3 flex items-center">
                {currentItem.location}
            </p>
            
            <div className="flex items-center justify-between mt-2">
                <span className="text-[#D4AF37] font-bold text-lg">{currentItem.merit}</span>
                <div className="flex items-center gap-2">
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
