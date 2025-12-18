import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto pt-8 pb-4 flex flex-col items-center w-full border-t border-white/10">
      <div className="flex gap-6 mb-4">
        <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Instagram size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Linkedin size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Facebook size={20} />
        </a>
      </div>
      <p className="text-gray-500 text-[10px] tracking-widest uppercase">
        © 2024 LuxEstate. All Rights Reserved.
      </p>
    </footer>
  );
};