import React from 'react';
import { Instagram, Twitter, Facebook, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto pt-8 pb-4 flex flex-col items-center w-full border-t border-white/10">
      <p className="text-gray-500 text-[10px] tracking-widest uppercase">
        © 2026 | Príncipe André Luís | All Rights Reserved.
      </p>
    </footer>
  );
};