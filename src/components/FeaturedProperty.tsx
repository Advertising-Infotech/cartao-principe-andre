'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CAROUSEL_ITEMS = [
  { src: '/carrossel/homenagem_em_video.mp4', type: 'video', socialProof: 'Prova social mundial', line1: 'Homenageado por deputados', line2: 'Assembleia Legislativa do Estado de Goiás', line3: 'Honraria Solene' },
  { src: '/carrossel/01.jpeg', type: 'image', socialProof: 'Reconhecimento', line1: 'Honraria literária internacional', line2: 'Embajadores Culturales & de Paz', line3: 'Homenagem' },
  { src: '/carrossel/02.jpeg', type: 'image', socialProof: 'Nomeação mundial', line1: 'Força e bem estar – México', line2: 'Confederación Diplomática de Derechos Humanos', line3: 'Nomeação' },
  { src: '/carrossel/03.jpeg', type: 'image', socialProof: 'Príncipe de Israel', line1: 'Reconhecimento global', line2: 'International Court of Justice', line3: 'Nomeação' },
  { src: '/carrossel/04.jpeg', type: 'image', socialProof: 'Compromisso', line1: 'Embaixador Internacional', line2: 'Alondra Gutiérrez Vargas – México', line3: 'Honraria' },
  { src: '/carrossel/05.jpeg', type: 'image', socialProof: 'Identificação', line1: 'Direitos humanos, arte e cultura', line2: 'Academia Internacional do Curdistão', line3: 'Adesão' },
  { src: '/carrossel/06.jpeg', type: 'image', socialProof: 'Honraria', line1: 'Embaixador internacional', line2: 'Organização pela Paz, Força e Bem Estar – México', line3: 'Reconhecimento' },
  { src: '/carrossel/07.jpeg', type: 'image', socialProof: 'ONU', line1: 'Autorização de relações exteriores', line2: 'Comissão Interamericana de Direitos Humanos', line3: 'Identificação' },
  { src: '/carrossel/08.jpeg', type: 'image', socialProof: 'Prêmio Prestigioso', line1: '86 organizações (Grupo Global)', line2: '81 organizações (Grupo Global da Honra)', line3: 'Orgulho Global' },
  { src: '/carrossel/10.jpeg', type: 'image', socialProof: 'UN HCR', line1: 'UNESCO – UNICEF', line2: 'UNCWP – Academia Internacional do Curdistão', line3: 'Certificado' },
  { src: '/carrossel/11.jpeg', type: 'image', socialProof: 'Direitos Humanos', line1: 'Direitos humanos internacional', line2: 'Fuerza Bienestar Mexico Comunidad Derechos Humanos', line3: 'Comissão' },
  { src: '/carrossel/12.jpg', type: 'image', socialProof: 'Cinema', line1: 'Documentário cinematográfico', line2: 'Festival internacional de Cinema Curta Canedo', line3: 'Premiação' },
  { src: '/carrossel/14.jpg', type: 'image', socialProof: 'Certificado Real', line1: 'National Royal Certificate', line2: 'Palace for Peace College', line3: 'Reconhecimento' },
  { src: '/carrossel/16.jpg', type: 'image', socialProof: 'Certificado de Honra', line1: 'Indicação ao Prêmio Nobel da Paz', line2: 'Liderança em paz e direitos humanos', line3: 'Indicação' },
  { src: '/carrossel/17.jpg', type: 'image', socialProof: 'Certificado de Honra', line1: 'MAHA Royal Foundation', line2: 'Casa Imperial dos 7 Reis', line3: 'Certificado' },
  { src: '/carrossel/18.jpg', type: 'image', socialProof: 'Certificado de Endorso', line1: 'Desenvolvedor de Negócios', line2: 'Atlantis Empire Worldwide Incorporated (Anewi)', line3: 'Certificado' },
  { src: '/carrossel/19.jpg', type: 'image', socialProof: 'Prêmio Global', line1: 'Prêmio de Paz Global – Índia', line2: 'Crimefree World and Peace Council', line3: 'Premiação' },
  { src: '/carrossel/20.jpg', type: 'image', socialProof: 'Homenagem', line1: 'Os melhores de Goiás', line2: 'Alô TV – Leno Silva. Premiação para os melhores de Goiás', line3: 'Troféu' },
  { src: '/carrossel/21.jpg', type: 'image', socialProof: 'Embaixador Mundial da Paz', line1: 'Pilares da Paz Internacional', line2: 'Reino Unido e Honra Global de Conexões – Nigéria', line3: 'Certificado' },
  { src: '/carrossel/24.jpg', type: 'image', socialProof: 'Honra Literária', line1: 'Prêmio Multidisciplinar de Excelência', line2: '48 organizações mundiais – ONU', line3: 'Prêmio' },
  { src: '/carrossel/25.jpg', type: 'image', socialProof: 'Membro Honorário', line1: 'Corte de Camelot', line2: 'Lei Comum Global, Lei Constitucional do Rei', line3: 'Endorso' },
  { src: '/carrossel/26.jpg', type: 'image', socialProof: 'Reconhecimento', line1: 'Vaticano – Autoridade Eclesiástica', line2: 'Reconhecimento eclesiástico do Vaticano', line3: 'Reconhecimento' },
  { src: '/carrossel/27.jpg', type: 'image', socialProof: 'Certificado de Nobreza', line1: 'Certificado de Nobreza Mundial', line2: 'Reino Unido Mundial de Atlantis', line3: 'Nobreza' },
  { src: '/carrossel/28.jpg', type: 'image', socialProof: 'Certificado de Cidadania', line1: 'Certificado de Cidadania nº 5399', line2: 'Reino Mundial e Eterno do Império de David', line3: 'Nobreza Imperial' },
  { src: '/carrossel/29.jpg', type: 'image', socialProof: 'Prêmio de Cinema', line1: 'Melhor Ator Coadjuvante', line2: 'Troféu Netuno – Mostra de Filmes do Interior', line3: 'Troféu' },
  { src: '/carrossel/30.jpg', type: 'image', socialProof: 'Honraria Nacional', line1: 'Os Melhores do Brasil', line2: '21 Organizações no Brasil – Grupo Inova – Paulo Melo', line3: 'Diploma' },
  { src: '/carrossel/31.jpg', type: 'image', socialProof: 'Reconhecimento', line1: 'Gestor da Nova Ordem Mundial', line2: 'Sistema Quântico de Inteligência Artificial Governamental', line3: 'Diploma' },
  { src: '/carrossel/32.jpg', type: 'image', socialProof: 'Título Nobiliárquico', line1: 'Majestade – Sultão', line2: 'Organização - Defensores da Paz Mundial da Realeza', line3: 'Nobreza Imperial' },
  { src: '/carrossel/33.jpg', type: 'image', socialProof: 'Certificado de Honra', line1: 'SIR – Nobre Cavaleiro', line2: 'Ordem Nobre da Tartária – Diversidade e Respeito', line3: 'Membro Honorário' },
  { src: '/carrossel/34.jpg', type: 'image', socialProof: 'Diploma', line1: 'Sua Alteza Imperial Russa / Inglesa', line2: 'Casa Real e Imperial de San Brisos', line3: 'Certificado' },
  { src: '/carrossel/35.jpg', type: 'image', socialProof: 'Troféu de cinema', line1: 'Melhor Filme', line2: 'Troféu Netuno – Mostra de Filmes do Interior', line3: 'Troféu' },
  { src: '/carrossel/36.jpg', type: 'image', socialProof: 'Autorização', line1: 'Autoridade financeira internacional', line2: 'Império Mundial de Nações Atlantis', line3: 'Autorização' },
  { src: '/carrossel/37.jpg', type: 'image', socialProof: 'Endorso Mundial', line1: 'União Global Intercontinental', line2: 'Sistema Quântico de Inteligência Artificial Governamental', line3: 'Certificado' },
  { src: '/carrossel/38.jpg', type: 'image', socialProof: 'Certificado', line1: 'Embaixador Mundial da Paz', line2: 'Instituto Mundial pela Paz', line3: 'Reconhecimento' },
  { src: '/carrossel/39.jpg', type: 'image', socialProof: 'Nomeação internacional', line1: 'União Intercontinental das Américas', line2: 'Casa Imperial e Dinastia de San Brisos e Sounty Dubarasi', line3: 'Diploma Emérito' },
  { src: '/carrossel/40.jpg', type: 'image', socialProof: 'Illuminati', line1: 'Nova Ordem Mundial', line2: 'Governo Político Universal', line3: 'Reconhecimento' },
  { src: '/carrossel/41.jpg', type: 'image', socialProof: 'Homenagem Social', line1: 'Representante da Cultura Afro', line2: 'CONNGO e outras instituições guardiãs da cultura Afro', line3: 'Homenagem' },
  { src: '/carrossel/42.jpg', type: 'image', socialProof: 'Certificado', line1: 'Príncipe da Dinastia Romanov', line2: 'Reconhecimento por 8 organizações imperiais mundiais', line3: 'Diploma Diamante' },
  { src: '/carrossel/43.jpg', type: 'image', socialProof: 'Honraria Solene Mundial', line1: 'Endorso a governança nas Américas', line2: 'Casa Real e Imperial de San Brisos e Dinastia Romanov', line3: 'Honraria Imperial' },
  { src: '/carrossel/45.jpg', type: 'image', socialProof: 'Nova Ordem Mundial', line1: 'Cidadania oficial da Nova Ordem Mundial', line2: 'Sistema Quântico de Inteligência Artificial Governamental', line3: 'Cidadania Internacional' },
  { src: '/carrossel/46.jpg', type: 'image', socialProof: 'Título Nobiliárquico', line1: 'Sultão das Filipinas', line2: 'Defensores da Paz Mundial da Realeza – Filipinas', line3: 'Sultão das Filipinas' },
  { src: '/carrossel/47.jpg', type: 'image', socialProof: 'Certificado de Diplomacia', line1: 'Autorização diplomática mundial', line2: 'Federação Planetária – Clube de Roma', line3: 'Diplomacia internacional' },
  { src: '/carrossel/48.jpg', type: 'image', socialProof: 'Título de Nobreza Mundial', line1: 'Personalidade Notável', line2: '18 organizações – Grupo da Real Sociedade – Arábia Saudita', line3: 'Sultão da Arábia Saudita' },
  { src: '/carrossel/49.jpg', type: 'image', socialProof: 'Certificado de Autoridade', line1: 'Embaixador, desenvolvimento e negócios', line2: 'Grupo Econômico Internacional', line3: 'Membro Honorário' },
  { src: '/carrossel/50.jpg', type: 'image', socialProof: 'ONU – Diploma Honorário', line1: 'ONU – Guardião Mundial da Cultura', line2: 'Comissão de Assuntos Econômicos e Sociais da ONU', line3: 'Membro Honorário' },
  { src: '/carrossel/52.png', type: 'image', socialProof: 'Troféu Honorário', line1: 'Os Melhores do Brasil', line2: 'Troféu os Melhores do Brasil', line3: 'Homenagem' },
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
          {item.type === 'video' ? (
            <video 
              src={item.src}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={item.src}
              alt={item.line1}
              className="w-full h-full object-contain"
            />
          )}
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
