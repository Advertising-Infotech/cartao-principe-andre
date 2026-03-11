import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CarouselItem {
  file: string;
  socialProof: string;
  line1: string;
  line2: string;
  line3: string;
  type: 'video' | 'image';
}

// Mapeia idioma → arquivo JSON
function getJsonPath(lang: string): string {
  if (lang === 'pt') return 'carrossel/Titulos_pt.json';
  return `carrossel/Titulos_${lang}.json`;
}

export const FeaturedProperty: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentLanguage = i18n.language;

  // Carrega o JSON do idioma atual (com fallback para pt)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let data: any[][] = [];

      try {
        // Tenta carregar o JSON do idioma atual
        const response = await fetch(getJsonPath(currentLanguage));
        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error(`JSON not found for ${currentLanguage}`);
        }
      } catch {
        // Fallback para português
        try {
          const fallback = await fetch('/carrossel/Titulos_pt.json');
          if (fallback.ok) {
            data = await fallback.json();
          }
        } catch (e) {
          console.error('Failed to load carousel data:', e);
        }
      }

      // Mapeia os arrays para objetos CarouselItem
      const parsed: CarouselItem[] = data
        .filter(row => row && row[0] && typeof row[0] === 'string' &&
          (row[0].toLowerCase().includes('.jpg') ||
           row[0].toLowerCase().includes('.jpeg') ||
           row[0].toLowerCase().includes('.png') ||
           row[0].toLowerCase().includes('.mp4')))
        .map(row => {
          const fileName = String(row[0]).trim();
          return {
            file: fileName,
            socialProof: row[1] ? String(row[1]) : '',
            line1: row[2] ? String(row[2]) : '',
            line2: row[3] ? String(row[3]) : '',
            line3: row[4] ? String(row[4]) : '',
            type: fileName.toLowerCase().endsWith('.mp4') ? 'video' : 'image'
          };
        });

      setItems(parsed);
      setCurrentIndex(0);
      setLoading(false);
    };

    loadData();
  }, [currentLanguage]);

  const handleNext = () => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (loading) {
    return <div className="w-full h-64 flex items-center justify-center text-white">
      <Loader2 className="animate-spin mr-2" />
      Loading...
    </div>;
  }

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  return (
    <div className="w-full mt-2 mb-4">
      <div className="flex items-end justify-between mb-4 px-1">
        <h3 className="text-white text-sm font-semibold uppercase tracking-wider leading-tight whitespace-pre-line">
          {t('titlesSection')}
        </h3>
        <span className="text-2xl font-bold animate-blink-yellow shrink-0 ml-4 mb-0.5">
          {currentIndex + 1} / {items.length}
        </span>
      </div>
      
      <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-[1.02] duration-300">
        <div className="relative h-64 w-full overflow-hidden bg-black/40">
            {currentItem.socialProof && (
              <div className="absolute top-3 right-3 z-10 text-[#D4AF37] text-[11px] font-black leading-tight text-right uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-pre-line">
                {currentItem.socialProof}
              </div>
            )}
            
            {currentItem.type === 'video' ? (
              <video 
                  key={currentItem.file}
                  src={`carrossel/${currentItem.file.trim()}`} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <img 
                  key={currentItem.file}
                  src={`carrossel/${currentItem.file.trim()}`} 
                  alt={currentItem.line1 || `Honor ${currentIndex}`}
                  onError={(e) => {
                    console.error('Image load error:', currentItem.file);
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/800/600?blur=2';
                  }}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100" />
            
            {/* Coluna C - Sobreposta à foto/vídeo */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h4 className="font-bold text-white truncate leading-tight text-lg sm:text-xl drop-shadow-lg">
                {currentItem.line1}
              </h4>
            </div>
        </div>

        <div className="pt-3 pb-4 px-4 relative bg-white/5 backdrop-blur-md border-t border-white/5">
            {/* Coluna D */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 flex items-center truncate leading-tight text-[0.82rem] sm:text-[0.94rem]">
                    {currentItem.line2}
                </p>
            </div>
            
            <div className="flex items-start justify-between gap-4">
                {/* Coluna E */}
                <span className="text-[#D4AF37] font-bold leading-tight text-base sm:text-lg line-clamp-2 flex-1">
                  {currentItem.line3}
                </span>
                
                {/* Botões Anterior e Próximo */}
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