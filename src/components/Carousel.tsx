import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CarouselItem } from '../types';

export function Carousel() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJsonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const lang = i18n.language || 'pt';
        const response = await fetch(`/carrossel/Titulos_${lang}.json`);
        if (!response.ok) throw new Error(`Falha ao carregar Titulos_${lang}.json: ${response.status}`);

        const jsonData = await response.json();

        if (!Array.isArray(jsonData)) throw new Error('Formato JSON inválido - Esperado Array');

        const items: CarouselItem[] = jsonData
          .filter((row) => {
            if (!Array.isArray(row) || row.length === 0 || row[0] === undefined || row[0] === null)
              return false;
            const firstCell = String(row[0]).trim().toLowerCase();
            if (firstCell === '' || ['arquivo', 'file', 'nome', 'título', 'titulo'].includes(firstCell))
              return false;
            return true;
          })
          .map((row) => {
            let fileName = String(row[0]).trim();

            if (/^\d+$/.test(fileName)) {
              fileName = fileName.padStart(2, '0');
            }

            if (fileName.toLowerCase().includes('homenagem') || fileName.toLowerCase().includes('video')) {
              if (!fileName.includes('.')) fileName = 'homenagem_em_video.mp4';
            }

            if (!fileName.includes('.')) {
              const num = parseInt(fileName);
              if (num >= 1 && num <= 11) fileName += '.jpeg';
              else if (num >= 51 && num <= 52) fileName += '.png';
              else if (!isNaN(num)) fileName += '.jpg';
              else if (fileName.toLowerCase().includes('video')) fileName = 'homenagem_em_video.mp4';
            }

            const finalFileName = fileName.toLowerCase();
            return {
              file: finalFileName,
              socialProof: row[1] ? String(row[1]).replace(/\\n/g, '\n') : '',
              line1: row[2] ? String(row[2]) : '',
              line2: row[3] ? String(row[3]) : '',
              line3: row[4] ? String(row[4]) : '',
              type: finalFileName.endsWith('.mp4') ? 'video' : 'image',
            };
          });

        if (items.length === 0) throw new Error('Nenhum dado encontrado no JSON');

        setCurrentIndex(0);
        setCarouselItems(items);
      } catch (err) {
        console.error('Erro no Carrossel:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadJsonData();
  }, [i18n.language]);

  const handleNext = () => {
    if (carouselItems.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    if (carouselItems.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-white bg-white/5 rounded-2xl border border-white/10 mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mb-2" />
        <p className="text-xs uppercase tracking-widest opacity-50">{t('loading')}</p>
      </div>
    );
  }

  if (error || carouselItems.length === 0) {
    return (
      <div className="w-full p-6 text-center text-white bg-red-500/10 rounded-2xl border border-red-500/20 mb-4">
        <p className="text-sm font-bold text-red-400 mb-1">{t('errorLoading')}</p>
        <p className="text-[10px] uppercase tracking-widest opacity-60">{error || 'Sem dados'}</p>
      </div>
    );
  }

  const currentItem = carouselItems[currentIndex];

  return (
    <div className="w-full mt-2 mb-4">
      <div className="flex items-end justify-end mb-4 px-1">
        <span className="text-2xl font-bold animate-blink-yellow shrink-0 mb-0.5">
          {currentIndex + 1} / {carouselItems.length}
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
              src={`/carrossel/${currentItem.file}`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <img
              key={currentItem.file}
              src={`/carrossel/${currentItem.file}`}
              alt={currentItem.line1 || `Honor ${currentIndex}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100" />

          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h4 className="font-bold text-white truncate leading-tight text-lg sm:text-xl drop-shadow-lg">
              {currentItem.line1}
            </h4>
          </div>
        </div>

        <div className="pt-3 pb-4 px-4 relative bg-white/5 backdrop-blur-md border-t border-white/5">
          <p className="text-gray-300 mb-2 flex items-center truncate leading-tight text-[0.82rem] sm:text-[0.94rem]">
            {currentItem.line2}
          </p>

          <div className="flex items-start justify-between gap-4">
            <span className="text-[#D4AF37] font-bold leading-tight text-base sm:text-lg line-clamp-2 flex-1">
              {currentItem.line3}
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
}
