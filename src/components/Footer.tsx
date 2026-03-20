import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto pt-8 pb-4 flex flex-col items-center w-full border-t border-white/10">
      <p className="text-gray-500 text-[10px] tracking-widest uppercase text-center">
        © 2026 | {t('name')} | {t('rights')} | V 4.0
      </p>
    </footer>
  );
}
