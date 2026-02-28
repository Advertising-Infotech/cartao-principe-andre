import React from 'react';
import { Instagram, Twitter, Facebook, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto pt-8 pb-4 flex flex-col items-center w-full border-t border-white/10">
      <div className="flex gap-6 mb-4">
        <a href="https://www.instagram.com/tiranossaurusrex/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Instagram size={20} />
        </a>
        <a href="https://x.com/Tiranossaurus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Twitter size={20} />
        </a>
        <a href="https://www.facebook.com/t.rex.hacker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Facebook size={20} />
        </a>
        <a href="https://t.me/+5562991599031" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Send size={20} />
        </a>
      </div>
      <p className="text-gray-500 text-[10px] tracking-widest uppercase">
        © 2026 | Príncipe André Luís | All Rights Reserved.
      </p>
    </footer>
  );
};