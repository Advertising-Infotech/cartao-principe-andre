'use client';

import React from 'react';
import { MessageCircle, Linkedin, Mail, Globe } from 'lucide-react';

const ButtonItem: React.FC<{ icon: React.ReactNode; href?: string }> = ({ icon, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 group backdrop-blur-sm transform hover:scale-105"
  >
    <div className="text-[#D4AF37] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
  </a>
);

export const ActionGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-3 w-full mb-2">
      <ButtonItem 
        icon={<MessageCircle size={20} />} 
        href="https://wa.me/5562991599031"
      />
      <ButtonItem 
        icon={<Linkedin size={20} />} 
        href="https://www.linkedin.com/in/advertising-propaganda-162220185/"
      />
      <ButtonItem 
        icon={<Mail size={20} />} 
        href="mailto:advertisingpropaganda@gmail.com"
      />
      <ButtonItem 
        icon={<Globe size={20} />} 
        href="https://advertisinginfotech.com.br"
      />
    </div>
  );
};
