import { useTranslation } from 'react-i18next';

const flags = [
  { code: 'pt', flag: 'br', name: 'Brasil' },
  { code: 'he', flag: 'il', name: 'Israel' },
  { code: 'en', flag: 'gb', name: 'Grã-Bretanha' },
  { code: 'ru', flag: 'ru', name: 'Russia' },
  { code: 'ar', flag: 'sa', name: 'Arábia Saudita' },
  { code: 'zh', flag: 'cn', name: 'China' },
  { code: 'es', flag: 'es', name: 'Espanha' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const isRtl = lng === 'he' || lng === 'ar';
    document.body.dir = isRtl ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex gap-3 mb-4" dir="ltr">
      {flags.map((flag) => (
        <button
          key={flag.code}
          onClick={() => changeLanguage(flag.code)}
          className={`
            w-8 h-6 overflow-hidden rounded-sm transition-all duration-300 hover:scale-125 
            ${
              i18n.language === flag.code
                ? 'scale-125 ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-black drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                : 'opacity-60 grayscale-[0.5]'
            }
          `}
          title={flag.name}
        >
          <img
            src={`https://flagcdn.com/w40/${flag.flag}.png`}
            alt={flag.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      ))}
    </div>
  );
}
